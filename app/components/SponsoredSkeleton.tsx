export function SponsoredSkeleton () {
    return (
        <section className="mt-16 border-t border-zinc-200 pt-12 dark:border-zinc-800">
            <div className="h-8 w-48 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="h-72 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800"
                    />
                ))}
            </div>
        </section>
    );
}