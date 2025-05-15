"use client";

import { authenticate } from "@/actions/auth/login";
import { buttonStyles } from "@/app/styles";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { BsExclamationCircle } from "react-icons/bs";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [message, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  useEffect(() => {
    if (message === "Success") {
      window.location.replace(callbackUrl);
    }
  }, [message, callbackUrl]);

  const thereIsAnError = !!message && message !== "Success";

  return (
    <form action={formAction} className="flex flex-col">
      <label htmlFor="email">Email</label>
      <input
        className="px-5 py-2 bg-gray-100 rounded mb-5"
        name="email"
        type="email"
      />

      <label htmlFor="password">Password</label>
      <input
        className="px-5 py-2 bg-gray-100 rounded mb-5"
        name="password"
        type="password"
      />

      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <button
        type="submit"
        className={isPending ? buttonStyles.disabled : buttonStyles.primary}
        aria-disabled={isPending}
        disabled={isPending}
      >
        Login
      </button>

      {!!thereIsAnError && (
        <div className="flex items-center justify-center my-5">
          <BsExclamationCircle className="h-5 w-5 text-red-500 mr-2" />
          <p className="text-sm text-red-500">{message}</p>
        </div>
      )}

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/new-account"
        className={`${buttonStyles.secondary} text-center`}
      >
        Create account
      </Link>
    </form>
  );
}
