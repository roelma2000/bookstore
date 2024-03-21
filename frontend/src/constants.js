export const BASE_URL = process.env.NODE_ENV === 'development' ?
'http://localhost:8082': '';

export const BOOKS_URL = '/api/books';
export const USERS_URL = '/api/users';
export const ORDERS_URL = '/api/orders';
export const PAYPAL_URL = '/api/config/paypal';
