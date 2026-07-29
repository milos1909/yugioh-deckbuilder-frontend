import axios, { AxiosError } from "axios";

export const Api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 300000,
    headers: {
        'Content-Type': 'application/json',
    },
});

Api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            window.location.href = "/";
        } else if (error.response?.status === 403) {
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

export const get = async(url : string, params? : Record <string , any>) => {
    return await Api.get(url,{params});
}

export const post = async (url : string, params? : Record <string , any>) => {
    return await Api.post(url, params);
}

export const put = async (url : string, params? : Record <string , any>) => {
    try {
        console.log("PUT request data:", params);

        const response = await Api.put(url, params);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error("Axios PUT error:", error.message);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
            }
        } else {
            console.error("Unexpected error:", error);
        }
        throw error;
    }
};