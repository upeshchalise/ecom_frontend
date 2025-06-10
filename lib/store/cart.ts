import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    Cart
} from '../types/cart';


interface CartStore {
    cart: Cart;
    addItem: (item: Cart['items'][number]) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
}

export const defaultCartState: Cart = {
    items: [],
    totalPrice: 0,
}


export const useCartStore = create<CartStore>()(persist((set) => ({

    cart: defaultCartState,
    addItem: (item) => set((state) => {
        const existingItemIndex = state.cart.items.findIndex(i => i.id === item.id);
        let updatedItems;

        if (existingItemIndex >= 0) {
            updatedItems = state.cart.items.map((i, index) => {
                if (index === existingItemIndex) {
                    return {
                        ...i,
                        quantity: i.quantity + item.quantity
                    };
                }
                return i;
            });
        } else {
            updatedItems = [...state.cart.items, item];
        }

        const updatedTotalPrice = updatedItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        return {
            cart: {
                items: updatedItems,
                totalPrice: updatedTotalPrice
            }
        };
    }),
    removeItem: (id) => set((state) => {
        const updatedItems = state.cart.items.filter(item => item.id !== id);
        const updatedTotalPrice = updatedItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
        return {
            cart: {
                ...state.cart,
                items: updatedItems,
                totalPrice: updatedTotalPrice
            }
        };
    }),

    clearCart: () => set(() => ({ cart: defaultCartState }))
}), {
    name: "cart",
    partialize: (state) => ({cart: state.cart})
}))