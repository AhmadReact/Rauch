import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const fetchAPi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_ENV_VARIABLE}`,
    prepareHeaders: (headers, { getState }) => {
      //   if (token()) {
      //     headers.set("token", token());
      //   }

      headers.set("Content-Type", "application/json");
      headers.set("Authorization", process.env.NEXT_PUBLIC_API_KEY);

      return headers;
    },
  }),
  tagTypes: ["subscriptions", "orders", "plans"],
  endpoints(builder) {
    return {
      fetchPlans: builder.query({
        query: () => {
          return {
            url: "/plans",
            method: "GET",
          };
        },
        providesTags: ["plans"],
      }),

      fetchSubscriptions: builder.query({
        query: (obj) => {
          return {
            url: `/customer-subscriptions?hash=${obj.hash}&id=${obj.id}`,
            method: "GET",
          };
        },
        providesTags: ["subscriptions"],
      }),

      fetchOrders: builder.query({
        query: (obj) => {
          return {
            url: `/customer-orders?hash=${obj.hash}&id=${obj.id}`,
            method: "GET",
          };
        },
        providesTags: ["orders"],
      }),

      dowloadFileData: builder.mutation({
        query: (obj) => {
          return {
            url: "/admin/download-result-file",
            body: obj,
            method: "GET",
          };
        },
      }),

      generateInvoice: builder.mutation({
        query: (obj) => {
          return {
            url: "/generate-one-time-invoice",
            body: obj,
            method: "POST",
          };
        },
        invalidatesTags: ["subscriptions", "orders"],
      }),

      authenticateUser: builder.mutation({
        query: (obj) => {
          return {
            url: "/sign-on",
            body: obj,
            method: "POST",
          };
        },
      }),

      checkEmail: builder.mutation({
        query: (email) => {
          return {
            url: `/check-email?newEmail=${email}`,
            method: "GET",
          };
        },
      }),

      getExpress: builder.query({
        query: (id) => {
          return {
            url: `/devices/${id}`,
            method: "GET",
          };
        },
        providesTags: (result, error, id) => [{ type: "devices", id }],
      }),

      getCompatiblePlan: builder.query({
        query: (obj) => {
          return {
            url: `/compatible-plans?subscription_id=${obj.subscription_id}&customer_id=${obj.customer_id}`,
            method: "GET",
          };
        },
      }),

      getCompatibleAddon: builder.query({
        query: (obj) => {
          return {
            url: `/compatible-addons?plan_id=${obj}`,
            method: "GET",
          };
        },
      }),

      changePlan: builder.mutation({
        query: (obj) => {
          return {
            url: `/change-plan`,
            body: obj,
            method: "POST",
          };
        },
      }),
    };
  },
});

export const {
  useChangePlanMutation,
  useGetCompatibleAddonQuery,
  useFetchPlansQuery,
  useGenerateInvoiceMutation,
  useAuthenticateUserMutation,
  useCheckEmailMutation,
  useFetchSubscriptionsQuery,
  useFetchOrdersQuery,
  useGetExpressQuery,
  useGetCompatiblePlanQuery,
} = fetchAPi;
export { fetchAPi };
