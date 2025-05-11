import { UserRole } from "../enums";

export interface UserSignup {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    image: string;
}

export interface UserSignin {
    email: string;
    password: string;
}

export interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    role: UserRole,
    image: string,
    phone: string
}

export interface AuthenticatedUser {
    token: {
        access_token: string,
        refresh_token: string
    },
    user: User
}