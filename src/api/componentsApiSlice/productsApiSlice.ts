import { dummyApi } from "../apiSlice";

export const productsApiSlice = dummyApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query<any, any>({
            query: () => "products?skip=0&limit=100",
        }),
        getSingleProduct: builder.query<any, any>({
            query: (args) => `products/${args.id}`,
        }),
        getSearchProduct: builder.query<any, any>({
            query: (args) => `products/search?q=${args.searchData}`,
        }),
        getAllCategory: builder.query<any, any>({
            query: () => "products/categories",
        }),
        getProductsOfCategory: builder.query<any, any>({
            query: (args) => `products/category${args.category}`,
        }),
        addProduct: builder.mutation<any, any>({
            query: (args) => ({
                url: "products/add",
                method: "POST",
                body: args.data,
            }),
        }),
        updateProduct: builder.mutation<any, any>({
            query: (args) => ({
                url: `products/${args.id}`,
                method: "PATCH",
                body: args.data,
            }),
        }),
        removeProduct: builder.mutation<any, any>({
            query: (args) => ({
                url: `products/${args.id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useLazyGetAllCategoryQuery,
    useGetSingleProductQuery,
    useGetSearchProductQuery,
    useGetAllCategoryQuery,
    useGetProductsOfCategoryQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useRemoveProductMutation,
} = productsApiSlice;
