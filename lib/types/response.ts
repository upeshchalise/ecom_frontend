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

export interface PaginationRequest {
    page: number,
    pageSize: number,
    search:string
}

export interface PaginationMeta {
    limit: number,
    total_records: number,
    total_pages: number,
    current_page: number,
    is_first_page: boolean,
    is_last_page: boolean
}

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  userId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt: string | null;
  categories: Category[];
}
