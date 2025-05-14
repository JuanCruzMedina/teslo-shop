import { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[];
    addProductToCart: (product: CartProduct) => void;
    getTotalItems: () => number;
    updateProductQuantity: (cartProduct: CartProduct, quantity: number) => void;
    removeProductFromCart: (cartProduct: CartProduct) => void;
}

export const useCartStore = create<State>()(

    persist(
        (set, get) => ({
            cart: [],

            addProductToCart: (product: CartProduct) => {
                const { cart } = get();
                const existingProduct = cart.some((item) => item.id === product.id && item.size === product.size);
                if (!existingProduct) {
                    set({
                        cart: [...cart, product],
                    });
                    return;
                }

                set({
                    cart: cart.map((item) =>
                        item.id === product.id && item.size === product.size
                            ? { ...item, quantity: item.quantity + product.quantity }
                            : item
                    ),
                });

            },

            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((total, item) => total + item.quantity, 0);
            },

            updateProductQuantity: (cartProduct: CartProduct, quantity: number) => {
                const { cart } = get();
                set({
                    cart: cart.map((item) =>
                        item.id === cartProduct.id && item.size === cartProduct.size
                            ? { ...item, quantity }
                            : item
                    ),
                });
            },

            removeProductFromCart: (cartProduct: CartProduct) => {
                const { cart } = get();
                set({
                    cart: cart.filter(
                        (item) => !(item.id === cartProduct.id && item.size === cartProduct.size)
                    ),
                });
            },

        }),
        {
            name: "cart-storage",

        }
    )
);