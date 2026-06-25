export default function ProductLoading() {
    return (
        <div className="grid gap-10 lg:grid-cols-2">
            <div className="aspect-square animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-800"/>
            <div className="space-y-4">
                <div className="h-10 w-3/4 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800"/>
                <div className="h-64 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800"/>
            </div>
        </div>
    );
}