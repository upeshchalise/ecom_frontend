import {create} from "zustand";
import { Checkout } from "../types/checkout";

interface CheckoutStore {
item: Checkout,
addItem: (item: Checkout['items'][number]) => void,
clearCheckoutItem: () => void
}

export const defaultCheckoutState: Checkout = {
    items: [],
}

export const useCheckoutStore = create<CheckoutStore>()(((set) => ({
    item: defaultCheckoutState,
    addItem: (item) => set((state) => {
        return {
            item: {
                items: [...state.item.items, item],
            }
        }
    }),
    clearCheckoutItem: () => set(() => ({ item: defaultCheckoutState }))
})))