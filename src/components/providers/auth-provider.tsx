"use client";

import { login as loginAction } from "@/actions/auth/login";
import { logout as logoutAction } from "@/actions/auth/logout";
import { User } from "@/types";
import { useRouter } from "next/navigation";
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

type AuthContextValue = {
    user: User | null;
    isLoggedIn: boolean;
    logout: () => Promise<void>;
    login: (
        params: Parameters<typeof loginAction>[0]
    ) => ReturnType<typeof loginAction>;
};

const AuthContext = createContext<AuthContextValue>({
    user: null,
    isLoggedIn: false,
    logout: async () => {},
    login: (params) => {
        return loginAction(params);
    },
});

type Props = {
    user: User | null;
    children: ReactNode;
};

export const AuthProvider = ({ user, children }: Props) => {
    const [_user, _setUser] = useState<User | null>(user);

    const isLoggedIn = !!_user;

    const logout = useCallback(async () => {
        _setUser(null);
        await logoutAction();
        return;
    }, []);

    const login = useCallback(
        async (params: Parameters<typeof loginAction>[0]) => {
            const response = await loginAction(params);
            const { data } = response;

            if (data?.user) {
                _setUser(data.user);
            }

            return response;
        },
        []
    );
    return (
        <AuthContext.Provider
            value={{ user: _user, isLoggedIn, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthGuard = ({ children }: { children: ReactNode }) => {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace("/login");
        }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) {
        return null;
    }

    return children;
};
