// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import {
//     Cart
// } from '../types/cart';


// interface CartStore {
//     cart: Cart;
//     addItem: (item: Cart['items'][number]) => void;
//     removeItem: (id: string) => void;
//     clearCart: () => void;
// }

// export const defaultCartState: Cart = {
//     items: [],
//     totalPrice: 0,
// }


// export const useCartStore = create<CartStore>()(persist((set) => ({

//     cart: defaultCartState,
//     addItem: (item) => set((state) => {
//         const existingItemIndex = state.cart.items.findIndex(i => i.id === item.id);
//         let updatedItems;

//         if (existingItemIndex >= 0) {
//             updatedItems = state.cart.items.map((i, index) => {
//                 if (index === existingItemIndex) {
//                     return {
//                         ...i,
//                         quantity: i.quantity + item.quantity
//                     };
//                 }
//                 return i;
//             });
//         } else {
//             updatedItems = [...state.cart.items, item];
//         }

//         const updatedTotalPrice = updatedItems.reduce((total, item) => {
//             return total + (item.price * item.quantity);
//         }, 0);

//         return {
//             cart: {
//                 items: updatedItems,
//                 totalPrice: updatedTotalPrice
//             }
//         };
//     }),
//     removeItem: (id) => set((state) => {
//         const itemToRemove = state.cart.items.find(item => item.id === id);
//         if (itemToRemove && itemToRemove.quantity === 1) {
//             const updatedItems = state.cart.items.filter(item => item.id !== id);
//             const updatedTotalPrice = updatedItems.reduce((total, item) => {
//                 return total + (item.price * item.quantity);
//             }, 0);
//             return {
//                 cart: {
//                     ...state.cart,
//                     items: updatedItems,
//                     totalPrice: updatedTotalPrice
//                 }
//             };
//         } else if (itemToRemove) {
//             const updatedItems = state.cart.items.map(item => {
//                 if (item.id === id) {
//                     return {
//                         ...item,
//                         quantity: item.quantity - 1
//                     };
//                 }
//                 return item;
//             });
//             const updatedTotalPrice = updatedItems.reduce((total, item) => {
//                 return total + (item.price * item.quantity);
//             }, 0);
//             return {
//                 cart: {
//                     ...state.cart,
//                     items: updatedItems,
//                     totalPrice: updatedTotalPrice
//                 }
//             };
//         }
//         return state;
//     }),

//     clearCart: () => set(() => ({ cart: defaultCartState }))
// }), {
//     name: "cart",
//     partialize: (state) => ({cart: state.cart})
// }))

import { create } from 'zustand';
import {
    Cart
} from '../types/cart';

interface CartStore {
    cart: Cart;
    userId: string | null;
    initializeCart: (userId: string) => void;
    addItem: (item: Cart['items'][number]) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
}

const defaultCartState: Cart = {
    items: [],
    totalPrice: 0,
};

const getCartFromStorage = (userId: string): Cart => {
    const stored = localStorage.getItem(`cart-${userId}`);
    return stored ? JSON.parse(stored) : defaultCartState;
};

const saveCartToStorage = (userId: string, cart: Cart) => {
    localStorage.setItem(`cart-${userId}`, JSON.stringify(cart));
};

export const useCartStore = create<CartStore>((set, get) => ({
    cart: defaultCartState,
    userId: null,

    initializeCart: (userId: string) => {
        const storedCart = getCartFromStorage(userId);
        set({ userId, cart: storedCart });
    },

    addItem: (item) => {
        const { cart, userId } = get();
        if (!userId) return;

        const existingItemIndex = cart.items.findIndex(i => i.id === item.id);
        let updatedItems;

        if (existingItemIndex >= 0) {
            updatedItems = cart.items.map((i, index) =>
                index === existingItemIndex
                    ? { ...i, quantity: i.quantity + item.quantity }
                    : i
            );
        } else {
            updatedItems = [...cart.items, item];
        }

        const updatedTotalPrice = updatedItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        const updatedCart = {
            items: updatedItems,
            totalPrice: updatedTotalPrice,
        };

        saveCartToStorage(userId, updatedCart);
        set({ cart: updatedCart });
    },

    removeItem: (id) => {
        const { cart, userId } = get();
        if (!userId) return;

        const itemToRemove = cart.items.find(item => item.id === id);
        let updatedItems = [];

        if (itemToRemove) {
            if (itemToRemove.quantity === 1) {
                updatedItems = cart.items.filter(item => item.id !== id);
            } else {
                updatedItems = cart.items.map(item =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                );
            }
        } else {
            return;
        }

        const updatedTotalPrice = updatedItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        const updatedCart = {
            items: updatedItems,
            totalPrice: updatedTotalPrice,
        };

        saveCartToStorage(userId, updatedCart);
        set({ cart: updatedCart });
    },

    clearCart: () => {
        const { userId } = get();
        if (!userId) return;
        localStorage.removeItem(`cart-${userId}`);
        set({ cart: defaultCartState });
    },
}));
