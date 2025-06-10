import {create} from 'zustand';
import { AuthenticatedUser } from "../types/user";
import { persist } from 'zustand/middleware';
import { UserRole } from '../enums';

interface UserStore {
    user: AuthenticatedUser;
    setUser: (user: AuthenticatedUser) => void;
    clearUser: () => void;
}

export const defaultUserState : AuthenticatedUser = {
    token : {
        access_token: '',
        refresh_token: ''
    },
    user :{
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        image: '',
        phone: '',
        role: UserRole.USER
    }
}

// can also add get in persist to get items
export const useUserStore = create<UserStore>()(persist((set) => ({
    user: defaultUserState,
    setUser: (user: AuthenticatedUser) => set({user}),
    clearUser: () => set(() => ({ user: defaultUserState }))
}), 
    {
        name: "user"
    }
))