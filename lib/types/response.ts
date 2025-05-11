import { UserRole } from "../enums"

export interface AuthUser {
        token: {
            access_token: string,
            refresh_token: string
        },
        user: {
            id: string,
            firstName: string,
            lastName: string,
            email: string,
            address: string,
            role: UserRole,
            image: string,
            phone: string
        }
    
}

