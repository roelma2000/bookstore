{/* Implementing Redux: parent api slice. In here import the constants*/}
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL});  
{/* Implementing Redux: 
        baseQuery: This tells the slice which query function to use for sending requests.
        tagTypes: This line defines the types of data (or "tags") that the API slice will manage.
        endpoints:  defining the endpoints of my API. The builder provides methods to define endpoints 
                    for fetching, updating, deleting, etc. In this snippet, it's an empty object, 
                    meaning no endpoints are defined yet. Normally, you would use the builder to 
                    define various operations like fetching a book or creating a user.*/}
export const apiSlice = createApi({
    baseQuery,   
    tagTypes: ['Book', 'Order', 'User'],
    endpoints: (builder) => ({})
});