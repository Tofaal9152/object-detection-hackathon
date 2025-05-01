import HandleError from "@/lib/errorHandle";
import { validateForm } from "@/lib/validateForm";
import { LoginSchema } from "@/Schemas/auth";
import { LoginType } from "@/types/auth";
import axios from "axios";
import { toast } from "sonner";

export const LoginAction = async (
  previousState: LoginType,
  formData: FormData
): Promise<LoginType> => {
  //  Validate the form data
  const validationErrors = validateForm(LoginSchema, formData);

  if (validationErrors) {
    return validationErrors;
  }

  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/rest-auth/login/`,
      {
        email: formData.get("email"),
        password: formData.get("password"),
      },
      {
        withCredentials: true,
      }
    );

    toast.success("Log in successful");
  } catch (error) {
    HandleError(error);
  }

  return { success: true, errors: {} };
};
