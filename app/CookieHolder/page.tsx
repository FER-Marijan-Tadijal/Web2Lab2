import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const cookie = params.cookie

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[8px] row-start-2 items-center sm:items-start">
                {cookie && <p>I now have your cookie! {cookie}</p>}
                <Link href="/">Take me back</Link>
            </main>
        </div>
    );
}
