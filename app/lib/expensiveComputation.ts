import {unstable_cache} from "next/cache";

export function computePrimes(limit: number): {
    count: number;
    sum: number;
    limit: number;
} {
    const isPrime = new Uint8Array(limit + 1).fill(1);
    isPrime[0] = isPrime[1] = 0;

    for (let i = 2; i * i <= limit; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= limit; j += i) {
                isPrime[j] = 0;
            }
        }
    }

    let count = 0;
    let sum = 0;
    for (let i = 2; i <= limit; i++) {
        if (isPrime[i]) {
            count++;
            sum += i;
        }
    }

    return {count, sum, limit};
}

export const getCachedPrimes = unstable_cache(
    async (limit: number) => computePrimes(limit),
    ["primes"],
    {tags: ["primes-demo"]},
);