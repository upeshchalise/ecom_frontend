import { useUserStore } from "@/lib/store/user";

export const useIsAuthenticated = () => {
  const user = useUserStore((state) => state.user.user);
  return !!user.id;
};
