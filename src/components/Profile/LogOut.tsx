"use client";
import { LogOutAction } from "@/actions/auth/logout";
import { setIsLogin } from "@/redux/allStateSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Loader, LogOut } from "lucide-react";
import { useActionState, useEffect } from "react";

const SignOut = () => {
  const dispatch = useAppDispatch();

  const [, action, isPending] = useActionState(LogOutAction, {
    errors: {},
  });
  useEffect(() => {
    if (isPending) {
      dispatch(setIsLogin(false));
    }
  }, [isPending, dispatch]);
  return (
    <form
      action={action}
      className="text-red-400 p-2 rounded-md hover:bg-accent font-semibold text-xs  flex items-center gap-2 cursor-pointer"
    >
      <button
        type="submit"
        disabled={isPending}
        className="text-red-400 w-full flex items-center gap-2 cursor-pointer"
      >
        <LogOut className="w-4 h-4 " />
        {isPending ? (
          <>
            <Loader className="w-4 h-4 animate-spin" />
            Signing Out...
          </>
        ) : (
          "Sign Out"
        )}
      </button>
    </form>
  );
};

export default SignOut;
