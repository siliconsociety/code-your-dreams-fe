import styles from "./page.module.scss"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function Page() {
  const { data: session } = useSession();
  if (!session) {
    redirect("/api/auth/signin");
  };

  return (
    <main className={styles.account}>
      <section>
        <h1>Account</h1>
        <p>Organization: Code Your Dreams</p>
        <p>Email address: john.doe@gmail.com</p>
        {/* Check to see what is managed in Auth0 vs locally in-app */}
        <button>Edit account</button>
      </section>
      <section>
        <p>Sign out from the app.</p>
        <button className="secondary">Sign Out</button>
      </section>
    </main>
  )
}
