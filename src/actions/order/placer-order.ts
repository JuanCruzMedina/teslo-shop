"use server";

import { auth } from "@/auth.config";
import { Address } from "@/interfaces/address.interface";
import { Size } from "@/interfaces/product.interface";
import prisma from "@/lib/prisma";
import { ok } from "assert";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async (productsToOrder: ProductToOrder[], userAddress: Address) => {
    const session = await auth();
    const userId = session?.user.id;
    if (!userId) {
        return {
            ok, message: "User not authenticated"
        };
    }

    // note: podemos llevar mas de un producto con el mismo id pero diferente size

    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productsToOrder.map((product) => product.productId),
            },
        },
    });

    // calculate amount and header
    const itemsInOrder = productsToOrder.reduce((count, product) => count + product.quantity, 0);

    const { subtotal, tax, total } = productsToOrder.reduce((total, productToOrder) => {
        const productQuantity = productToOrder.quantity;
        const productInOrder = products.find((item) => item.id === productToOrder.productId);

        if (!productInOrder) throw new Error(`Product ${productToOrder.productId} not found`);

        const subtotal = productInOrder.price * productQuantity;
        total.subtotal += subtotal;
        total.tax += subtotal * 0.15;
        total.total += subtotal * 1.15;
        return total;
    }, {
        subtotal: 0,
        tax: 0,
        total: 0,
    });

    try {
        const prismaTx = await prisma.$transaction(async (tx) => {
            // update product stock
            const updatedProductsPromises = productsToOrder.map(async (product) => {

                const productQuantity = productsToOrder.filter((item) => item.productId === product.productId).reduce((count, item) => count + item.quantity, 0);

                if (productQuantity === 0) {
                    throw new Error(`Product ${product.productId} does not have stock`);
                }

                return tx.product.update({
                    where: {
                        id: product.productId,
                    },
                    data: {
                        inStock: {
                            decrement: productQuantity,
                        },
                    }
                });
            });
            const updatedProducts = await Promise.all(updatedProductsPromises);
            // check negative stock
            updatedProducts.forEach((product) => {
                if (product.inStock < 0) {
                    throw new Error(`Product ${product.title} does not have stock`);
                }
            });

            // create order, order details and header
            const order = await tx.order.create({
                data: {
                    userId,
                    itemsInOrder,
                    subTotal: subtotal,
                    tax,
                    total,

                    OrderItem: {
                        createMany: {
                            data: productsToOrder.map((product) => ({
                                productId: product.productId,
                                quantity: product.quantity,
                                size: product.size,
                                price: products.find((item) => item.id === product.productId)?.price ?? 0,
                            })),
                        }
                    }
                },
            });

            const { country, ...restAddress } = userAddress;
            const orderAddress = await tx.orderAddress.create({
                data: {
                    ...restAddress,
                    countryId: country,
                    orderId: order.id,
                }
            });

            return {
                updatedProducts: [],
                order: order,
                orderAddress: orderAddress,
            };
        });
        return {
            ok: true,
            message: "Order placed successfully",
            order: prismaTx.order,
            prismaTx: prismaTx, // TODO: remove this
        }

    } catch (error) {
        console.error("Error placing order", error);

        return {
            ok: false,
            message: error instanceof Error ? error.message : "An unknown error occurred"
        }
    }
}