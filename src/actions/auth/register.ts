import HandleError from "@/lib/errorHandle";
import { validateForm } from "@/lib/validateForm";
import { RegisterSchema } from "@/Schemas/auth";
import { RegisterType } from "@/types/auth";
import axios from "axios";
import { redirect } from "next/navigation";

export const RegisterAction = async (
  previousState: RegisterType,
  formData: FormData
): Promise<RegisterType> => {
  const validationErrors = validateForm(RegisterSchema, formData);

  if (validationErrors) {
    return validationErrors;
  }

  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/registration/`,
      {
        name: formData.get("name"),
        phone_number: formData.get("phone_number"),
        email: formData.get("email"),
        password1: formData.get("password1"),
        password2: formData.get("password2"),
      },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    HandleError(error);
  }

  redirect("/auth/login");
};
