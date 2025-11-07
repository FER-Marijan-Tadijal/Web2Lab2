import Link from "next/link";
import { cookies } from "next/headers";

export default async function Home() {
    const SDEEnabled = (await cookies()).get("SDEEnabled")?.value

    const pairs = [
        { username: 'admin', password: 'admin' },
        { username: 'Marijan', password: 'marijan123' },
        { username: 'Hrvoje', password: 'Password1' },
    ];

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[8px] row-start-2 items-center sm:items-start">
                <Link href="/">Take me back</Link>

                {SDEEnabled == "enabled" &&
                    <>
                    <p>If you forgot your password, please search for it in this table:</p>
                    <ul>
                    {pairs.map((val, idx) => (
                        <li key={idx}>
                        {val.username}: {val.password}
                        </li>
                    ))}
                    </ul>
                    </>}
            </main>
        </div>
    );
}
