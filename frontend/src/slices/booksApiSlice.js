import { BOOKS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

/* Implementing Redux: 
        getBooks:  is a query endpoint defined using the builder.query method. This is used to fetch a list of books.
        keepUnusedDataFor: This option tells RTK Query to keep the data returned by this query in the cache for 5 minutes 
                        after it was last used. This can help in optimizing performance and reducing the number of network request.
        getBookDetails: query endpoint for fetching the details of a specific book. Takes a bookId parameter and returns an object 
                        with a URL for fetching details of a specific book, constructed by appending the bookId to the BOOKS_URL.
*/
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