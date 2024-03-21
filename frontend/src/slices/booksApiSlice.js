import { BOOKS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const booksApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => ({
                url: BOOKS_URL,
            }),
            keepUnusedDataFor: 5
        }),

        getBookDetails: builder.query({
            query: (bookId) => ({
                url: `${BOOKS_URL}/${bookId}`,
            }),
            keepUnusedDataFor: 5
        })

    }), /*endpoint end */

});

export const { useGetBooksQuery, useGetBookDetailsQuery } = booksApiSlice;