"use client";

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    type ReactNode,
} from "react";
import type { Product } from "@/domains/catalog/entity/product";

export type CartItem = {
    id: string;
    slug: string;
    name: string;
    price: number;
    currency: string;
    image?: string;
    quantity: number;
};

type CartState = { items: CartItem[] };

type CartAction =
    | { type: "ADD"; product: Product }
    | { type: "REMOVE"; id: string }
    | { type: "SET_QTY"; id: string; quantity: number }
    | { type: "CLEAR" }
    | { type: "HYDRATE"; items: CartItem[] };

const STORAGE_KEY = "cart";

function reducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD": {
            const p = action.product;
            const existing = state.items.find((i) => i.id === p.id);
            if (existing) {
                return {
                    items: state.items.map((i) =>
                        i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                };
            }
            return {
                items: [
                    ...state.items,
                    {
                        id: p.id,
                        slug: p.slug,
                        name: p.name,
                        price: p.price,
                        currency: p.currency,
                        image: p.images.main,
                        quantity: 1,
                    },
                ],
            };
        }
        case "REMOVE":
            return { items: state.items.filter((i) => i.id !== action.id) };
        case "SET_QTY":
            return {
                items: state.items
                    .map((i) =>
                        i.id === action.id ? { ...i, quantity: action.quantity } : i
                    )
                    .filter((i) => i.quantity > 0),
            };
        case "CLEAR":
            return { items: [] };
        case "HYDRATE":
            return { items: action.items };
        default:
            return state;
    }
}

type CartContextValue = {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (id: string) => void;
    setQuantity: (id: string, quantity: number) => void;
    clear: () => void;
    totalQuantity: number;
    totalPrice: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, { items: [] });

    // Hydratation depuis localStorage après montage (donc côté client uniquement :
    // pas de mismatch d'hydratation, le serveur rend toujours un panier vide).
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) dispatch({ type: "HYDRATE", items: JSON.parse(raw) });
        } catch {
            // localStorage indisponible ou JSON corrompu : on ignore.
        }
    }, []);

    // Persistance à chaque changement du panier.
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
        } catch {
            // ignore
        }
    }, [state.items]);

    const value = useMemo<CartContextValue>(() => {
        const totalQuantity = state.items.reduce((n, i) => n + i.quantity, 0);
        const totalPrice = state.items.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0
        );
        return {
            items: state.items,
            addItem: (product) => dispatch({ type: "ADD", product }),
            removeItem: (id) => dispatch({ type: "REMOVE", id }),
            setQuantity: (id, quantity) =>
                dispatch({ type: "SET_QTY", id, quantity }),
            clear: () => dispatch({ type: "CLEAR" }),
            totalQuantity,
            totalPrice,
        };
    }, [state.items]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) {
        throw new Error("useCart doit être utilisé à l'intérieur d'un <CartProvider>");
    }
    return ctx;
}
