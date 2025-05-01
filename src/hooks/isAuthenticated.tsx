"use client";
import { selectIsLogin } from "@/redux/allStateSlice";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const IsAuthenticatedInDashboard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isLogin = useAppSelector(selectIsLogin);
  const router = useRouter();
  useEffect(() => {
    if (!isLogin) {
      router.replace("/auth/login");
    }
  }, [isLogin, router]);

  if (!isLogin) return null;

  return <>{children}</>
};

const IsAuthenticatedInAuth = ({ children }: { children: React.ReactNode }) => {
  const isLogin = useAppSelector(selectIsLogin);
  const router = useRouter();
  useEffect(() => {
    if (isLogin) {
      router.replace("/");
    }
  }, [isLogin, router]);

  if (isLogin) return null;

  return <>{children}</>;
};

export default IsAuthenticatedInAuth;
