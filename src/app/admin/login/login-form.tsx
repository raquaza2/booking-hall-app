"use client";

import { useActionState } from "react";
import { LogIn } from "lucide-react";
import { loginAdmin, type FormState } from "@/app/actions";
import { FieldError } from "@/components/field-error";

const initialState: FormState = {
  ok: false,
};

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAdmin, initialState);

  return (
    <form action={action} className="grid gap-5">
      {state.message ? (
        <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {state.message}
        </div>
      ) : null}

      <label className="text-sm font-semibold text-stone-800">
        Email
        <input
          name="email"
          type="email"
          defaultValue={state.values?.email}
          autoComplete="email"
          className="mt-2 h-11 w-full rounded-md border border-stone-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
          required
        />
        <FieldError errors={state.errors?.email} />
      </label>

      <label className="text-sm font-semibold text-stone-800">
        Password
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          className="mt-2 h-11 w-full rounded-md border border-stone-300 px-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
          required
        />
        <FieldError errors={state.errors?.password} />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-700 px-5 text-sm font-bold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-stone-400"
      >
        <LogIn size={18} />
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
