import {api} from "@/api";

const ACCESS_TOKEN_KEY = "access_token";

export function setAccessToken(token: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function clearAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}
export const checkAuth = async () => {
    try {
        const res = await api.secure(); // GET api/Account/secure
        return { isAuth: true, user: res };
    } catch {
        return { isAuth: false, user: null };
    }
};