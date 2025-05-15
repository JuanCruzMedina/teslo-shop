"use client";
import { buttonStyles } from "@/app/styles";
import clsx from "clsx";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { name, email, password } = data;
    console.log("Form submitted:", { name, email, password });
  };
  console.log(errors);
  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Full name</label>
      <input
        className={clsx("px-5 py-2 bg-gray-100 rounded mb-5", {
          "border border-red-500": errors.name,
        })}
        type="text"
        {...register("name", { required: true })}
      />

      <label htmlFor="email">Email</label>
      <input
        className={clsx("px-5 py-2 bg-gray-100 rounded mb-5", {
          "border border-red-500": errors.email,
        })}
        type="email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />

      <label htmlFor="password">Password</label>
      <input
        className={clsx("px-5 py-2 bg-gray-100 rounded mb-5", {
          "border border-red-500": errors.password,
        })}
        type="password"
        {...register("password", {
          required: true,
        })}
      />

      <button className={buttonStyles.primary}>Create account</button>

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/login"
        className={`${buttonStyles.secondary} text-center`}
      >
        Login
      </Link>
    </form>
  );
};
