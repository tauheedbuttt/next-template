import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../apiConfig";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (body: { email: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSignInMutation } = authApi;
export default authApi;
