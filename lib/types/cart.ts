type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
} 

const Cart = {
    items: [] as CartItem[],
    totalPrice: 0,
}

export type Cart = typeof Cart;