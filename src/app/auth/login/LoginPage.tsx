"use client";
import { LoginAction } from "@/actions/auth/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setIsLogin } from "@/redux/allStateSlice";
import { useAppDispatch } from "@/redux/hooks";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader, Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [state, action, isPending] = useActionState(LoginAction, {
    errors: {},
  });

  // if login is successful, redirect to dashboard
  useEffect(() => {
    if (state.success) {
      dispatch(setIsLogin(true));
    }
  }, [state.success, dispatch]);
  // if user is already logged in, redirect to dashboard
  const handleResendOtp = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/resend-otp/`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success("Otp sent successfully");
      router.push("/auth/verify-otp");
    } catch {
      toast.error("Error in resending otp");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl w-full bg-white dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl drop-shadow-xl border overflow-hidden flex"
    >
      {/* Left Side Image */}
      <div className="hidden md:flex w-1/2  items-center justify-center bg-gradient-to-r from-[#686df6] to-emerald-500">
        <Image
          src="/login.webp"
          alt="Login Illustration"
          width={300}
          height={400}
          className=" object-cover animate-pulse"
        />
      </div>

      {/* Right Side Login Form */}
      <div className="w-full md:w-1/2 p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#686df6] to-emerald-500 text-transparent bg-clip-text">
          Welcome Back
        </h2>

        <form action={action}>
          <div className="relative mb-4">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <Input
              type="email"
              required
              name="email"
              placeholder="Enter your email"
              className="pl-10 dark:bg-gray-800 dark:text-white focus:ring-[#686df6]"
            />
          </div>
          {state.errors.email && (
            <div className="bg-red-100 text-red-500 p-2 text-sm rounded-lg mb-4">
              {state.errors.email}
            </div>
          )}

          <div className="relative mb-6">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <Input
              type="password"
              required
              name="password"
              placeholder="Enter your password"
              className="pl-10 dark:bg-gray-800 dark:text-white focus:ring-[#686df6]"
            />
          </div>
          {state.errors.password && (
            <div className="bg-red-100 text-red-500 p-2 text-sm rounded-lg mb-4">
              {state.errors.password}
            </div>
          )}

          <div className="flex items-center justify-between mb-6">
            <p
              // href="/forgot-password"
              className="text-sm text-[#686df6] hover:underline"
            >
              Forgot password?
            </p>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-[#686df6] to-emerald-500 text-white flex items-center justify-center"
          >
            {isPending && <Loader className="mr-2 animate-spin" size={18} />}
            Login
          </Button>
          {state.errors.formError && (
            <div className="bg-red-100 text-red-500 p-2 text-sm rounded-lg mt-4">
              {state.errors.formError}
            </div>
          )}
          {state.errors.verified && (
            <div className="bg-red-100 text-red-500 p-2 text-sm  rounded-lg mt-4">
              Please verify your phone number.
              <span
                onClick={handleResendOtp}
                className="underline cursor-pointer"
              >
                Send OTP
              </span>
            </div>
          )}
        </form>

        <div className="px-8 py-4 mt-4 bg-gray-100 dark:bg-gray-800 text-center rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {"Don't have an account?"}
            <Link
              href="/auth/register"
              className="text-[#686df6] hover:underline ml-1"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
