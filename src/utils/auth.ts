import { api } from "@/api";
import { jwtDecode } from "jwt-decode";
import {router} from "@/main";
import {Routes} from "@/model/router";

interface JwtPayload {
    exp?: number;
    [key: string]: any;
}

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

export function isTokenValid(token: string | null): boolean {
    if (!token) return false;

    try {
        const decoded: JwtPayload = jwtDecode(token);
        const now = Date.now() / 1000; // секунды

        return !!decoded.exp && decoded.exp > now;
    } catch {
        return false;
    }
}
