'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '../store/user';
import { UserRole } from '../enums';

export default function AuthWrapper({ children, role }: Readonly<{ children: React.ReactNode; role: string }>) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const { user } = useUserStore();

  useEffect(() => {
    const isAdmin = user.user.role === UserRole.ADMIN;

    if (!isAdmin) {
      router.push('/signin');
      return;
    }

    try {

      const payload = JSON.parse(atob(user.token.access_token.split('.')[1]));

      if (payload.role !== role) {
        router.push('/signin');
      } else {
        setAuthorized(true);
      }
    } catch {
      router.push('/signin');
    }
  }, []);

  if (!authorized) return null;

  return <>
    {children};
  </>
}
