import { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[];
    addProductToCart: (product: CartProduct) => void;
    getTotalItems: () => number;
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
        }),
        {
            name: "cart-storage",

        }
    )
);