import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { LoginForm } from "./login-form";

export default function AdminLoginPage() {
  return (
    <>
      <SiteHeader />
      <main className="grid flex-1 place-items-center bg-stone-50 px-5 py-12">
        <section className="w-full max-w-md rounded-md border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase text-emerald-700">
            Admin access
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-950">
            Review booking requests
          </h1>
          <p className="mt-3 text-sm leading-6 text-stone-600">
            Sign in to approve, reject, or monitor incoming venue bookings.
          </p>
          <div className="mt-7">
            <LoginForm />
          </div>
          <p className="mt-6 text-sm text-stone-500">
            Demo seed login:{" "}
            <span className="font-medium text-stone-800">admin@aurorahall.test</span>
          </p>
          <Link href="/" className="mt-5 inline-flex text-sm font-semibold text-emerald-700">
            Back to public site
          </Link>
        </section>
      </main>
    </>
  );
}
