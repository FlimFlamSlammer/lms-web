"use client";

import { getAuthenticatedUser } from "@/actions/auth/get-authenticated-user";
import { login as loginAction } from "@/actions/auth/login";
import { logout as logoutAction } from "@/actions/auth/logout";
import { updatePassword as updatePasswordAction } from "@/actions/auth/update-password";
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
    updatePassword: (
        params: Parameters<typeof updatePasswordAction>[0]
    ) => ReturnType<typeof updatePasswordAction>;
};

const AuthContext = createContext<AuthContextValue>({
    user: null,
    isLoggedIn: false,
    logout: async () => {},
    login: (params) => {
        return loginAction(params);
    },
    updatePassword: (params) => {
        return updatePasswordAction(params);
    },
});

type Props = {
    user: User | null;
    children: ReactNode;
};

export const AuthProvider = ({ user, children }: Props) => {
    const [_user, _setUser] = useState<User | null>(user);

    const isLoggedIn = _user !== null;

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

    const updatePassword = useCallback(
        async (params: Parameters<typeof updatePasswordAction>[0]) => {
            const response = await updatePasswordAction(params);
            _setUser((await getAuthenticatedUser()).data);
            return response;
        },
        []
    );

    return (
        <AuthContext.Provider
            value={{ user: _user, isLoggedIn, login, logout, updatePassword }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthGuard = ({ children }: { children: ReactNode }) => {
    const { isLoggedIn, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace("/login");
        } else if (user?.needsPasswordChange) {
            router.replace("/change-password");
        }
    }, [isLoggedIn, router, user]);

    if (!isLoggedIn || user?.needsPasswordChange) {
        return null;
    }

    return children;
};
