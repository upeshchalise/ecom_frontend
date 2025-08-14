import {create} from "zustand";
import { Checkout } from "../types/checkout";
import { persist } from "zustand/middleware";

interface CheckoutStore {
item: Checkout,
addItem: (item: Checkout['items'][number]) => void,
clearCheckoutItem: () => void
}

export const defaultCheckoutState: Checkout = {
    items: [],
}

export const useCheckoutStore = create<CheckoutStore>()(persist((set) => ({
    item: defaultCheckoutState,
    addItem: (item) => set((state) => {
        return {
            item: {
                items: [...state.item.items, item],
            }
        }
    }),
    clearCheckoutItem: () => set(() => ({ item: defaultCheckoutState }))
}), {
    name: "checkout-storage",
    partialize(state) {
        return {
            item: state.item
        }
    },
}))