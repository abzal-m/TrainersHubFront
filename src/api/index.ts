import axios, {AxiosError, AxiosResponse} from "axios";
import {checkAuth, clearAccessToken, getAccessToken, setAccessToken} from "@/utils/auth";
import {router} from "@/main";
import {Routes} from "@/model/router";
import {Trainings} from "@/model/types";



export const createInternalAxios = () => {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        withCredentials: true, // для refresh-токена в HttpOnly Cookie
    });

    // 🔹 Request interceptor
    instance.interceptors.request.use((config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    // 🔹 Response interceptor
    instance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as any;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const res = await axios.post(
                        `${import.meta.env.VITE_API_URL}/api/Account/refresh`,
                        {},
                        { withCredentials: true }
                    );

                    const newToken = (res.data as any).accessToken;
                    setAccessToken(newToken);

                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return instance(originalRequest);
                } catch (refreshError) {
                    clearAccessToken();
                    window.location.href = "/AuthForm";
                }
            }

            return Promise.reject(error);
        }
    );

    return instance;
};

export const internalAxios = createInternalAxios();

export const api = {
    stravaAuth: async (authCode: string): Promise<AxiosResponse> => {
        const result = await internalAxios.get(`api/StravaActivity/Authorize/?code=${authCode}`);
        return result.data;
    },
    getStravaActivity: async () => {
        const result = await internalAxios.get("api/StravaActivity/GetLastActivity");
        return result.data;
    },
    login: async (data: { username: string; password: string }) => {
        const res = await internalAxios.post("api/Account/login", data);
        return res.data; // { accessToken, refreshToken }
    },

    register: async (data: { username: string; password: string; email:string, role: string }) => {
        const res = await internalAxios.post("api/Account/register", data);
        return res.data; // { id, username, role }
    },
    checkAuth: async () => {
        const res = await internalAxios.get("api/Account/isAuthenticated");
        if (res.status === 401) {
            await router.push({name: Routes.AuthForm});
        }
        if (res.status === 200) {
            await router.push({name: Routes.AthleteDashboard});
        }
    },
    exit: async () => {
        const res = await internalAxios.post("api/Account/logout");
        return res.data;
    },
    isConnectToStrava: async () => {
        const res = await internalAxios.get("/api/StravaActivity/IsConnected");
        return res.data as boolean;
    },
    getAthleteTrainings: async () => {
        const res = await internalAxios.get("api/Athlete/Trainings");
        return res.data as Trainings[]
    }


};
