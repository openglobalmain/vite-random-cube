import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {
    getItemWebStorage,
    setItemWebStorage,
} from "../features/webStorageSaver";

interface IAuthResponse {
    status: string;
    token?: string;
}

const baseQuery = fetchBaseQuery({
    baseUrl: "https://api.cibet.dev.bet4skill.com/api/",
    credentials: "include",
    responseHandler: (response: Response) => {
        if (response.status === 200) {
            return response.json();
        }
        return response.text();
    },
});

const baseQueryWithReAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result: any = await baseQuery(args, api, extraOptions);

    const token = getItemWebStorage("token");
    if (token) {
        api.dispatch(setAuthToken(token));
    }

    if (
        typeof args === "object" &&
        args.url === "/client-login" &&
        (result as IAuthResponse).status === "success"
    ) {
        setItemWebStorage("token", (result as IAuthResponse).token);
    }

    if (
        typeof args === "object" &&
        args.url === "/auth/me" &&
        (result as { error: { status: number } }).error &&
        (result as { error: { status: number } }).error.status === 401
    ) {
        if (token) {
            api.dispatch(setAuthToken(token));
            result = (await baseQuery(args, api, extraOptions)) as any;
        }
    }

    return result;
};

export const newBettingApi = createApi({
    reducerPath: "newBettingApi",
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({
        login: builder.mutation<any, { login: string; password: string }>({
            query: (body) => ({
                url: "client-login",
                method: "POST",
                body,
                credentials: "include",
            }),
        }),
        getCurrentUser: builder.query<any, void>({
            query: () => ({
                url: "auth/me",
                credentials: "include",
            }),
        }),
    }),
});

export const { useLoginMutation, useGetCurrentUserQuery } = newBettingApi;

const setAuthToken = (token: string) => ({
    type: "newBetting/setAuthToken",
    payload: token,
});
