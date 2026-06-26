export const CART_COOKIE_NAME =
    process.env.CART_COOKIE_NAME ?? "cart_id";

export const CART_COOKIE_MAX_AGE = process.env.CART_COOKIE_MAX_AGE
    ? Number(process.env.CART_COOKIE_MAX_AGE)
    : 60 * 60 * 24 * 30; // 30 days