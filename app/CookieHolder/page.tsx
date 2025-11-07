"use client"
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const params = useSearchParams();
    const cookie = params.get("cookie");

    useEffect(() => {
        alert("Your cookies are: " + cookie)
    }, [])

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[8px] row-start-2 items-center sm:items-start">
                <Link href="/">Take me back</Link>
            </main>
        </div>
    );

}
