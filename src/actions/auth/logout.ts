// import { redirect } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export const LogOutAction = async () => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/rest-auth/logout/`,
      {},
      {
        withCredentials: true,
      }
    );

    toast.success("You have been logged out");
    return {};
  } catch {
    toast.error("An error occurred");
  }
};
