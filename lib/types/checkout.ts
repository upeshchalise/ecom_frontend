type CheckoutItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
} 

const Checkout = {
    items: [] as CheckoutItem[],
}

export type Checkout = typeof Checkout;