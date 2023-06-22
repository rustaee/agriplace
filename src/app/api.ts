// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Fruit } from "types/Fruit";
import { fruitsCrud } from "./mocks/fruits";
import { Vegetable } from "../types/Vegetable";
import { Tag } from "../types/Tag";
import { fruitTags } from "./mocks/fruitTags";
import { vegetableTags } from "./mocks/vegetableTags";
import { vegetablesCrud } from "./mocks/vegetables";

const resolveAsync = <T>(data: any, delay = 0) =>
  new Promise<T>((resolve) => {
    setTimeout(() => resolve({ ...data }), Math.random() * 1000 + delay);
  });

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Fruit", "Vegetable"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://" }),
  endpoints: (builder) => ({
    getFruits: builder.query<Fruit[], void>({
      queryFn: () => resolveAsync({ data: fruitsCrud.getItems() }, 500),
      providesTags: ["Fruit"],
    }),
    addFruit: builder.mutation<Fruit, Omit<Fruit, "id">>({
      queryFn: (fruit) => resolveAsync({ data: fruitsCrud.addItem(fruit) }),
      invalidatesTags: ["Fruit"],
    }),
    updateFruit: builder.mutation<Fruit, Fruit>({
      queryFn: (fruit) => resolveAsync({ data: fruitsCrud.updateItem(fruit) }),
      invalidatesTags: ["Fruit"],
    }),
    deleteFruit: builder.mutation<Fruit, Fruit>({
      queryFn: (fruit) => resolveAsync({ data: fruitsCrud.deleteItem(fruit) }),
      invalidatesTags: ["Fruit"],
    }),
    getVegetables: builder.query<Vegetable[], void>({
      queryFn: () => resolveAsync({ data: vegetablesCrud.getItems() }, 500),
      providesTags: ["Vegetable"],
    }),
    addVegetable: builder.mutation<Vegetable, Omit<Vegetable, "id">>({
      queryFn: (vegetable) =>
        resolveAsync({ data: vegetablesCrud.addItem(vegetable) }),
      invalidatesTags: ["Vegetable"],
    }),
    updateVegetable: builder.mutation<Vegetable, Vegetable>({
      queryFn: (vegetable) =>
        resolveAsync({ data: vegetablesCrud.updateItem(vegetable) }),
      invalidatesTags: ["Vegetable"],
    }),
    getFruitTags: builder.query<Tag[], void>({
      queryFn: () => resolveAsync({ data: fruitTags }),
    }),
    getVegetableTags: builder.query<Tag[], void>({
      queryFn: () => resolveAsync({ data: vegetableTags }),
    }),
  }),
});

export const {
  useGetFruitsQuery,
  useAddFruitMutation,
  useUpdateFruitMutation,
  useDeleteFruitMutation,
  useGetVegetablesQuery,
  useAddVegetableMutation,
  useUpdateVegetableMutation,
  useGetFruitTagsQuery,
  useGetVegetableTagsQuery,
} = api;
