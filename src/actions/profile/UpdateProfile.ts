import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";

const ProfileSchema = z.object({
  name: z.string().min(1, "Please enter a valid name"),
});
type profileProps = {
  errors?: {
    name?: string[];
    formError?: string[];
  };
};
export const ProfileAction = async (
  previousState: profileProps,
  formData: FormData
): Promise<profileProps> => {
  const result = ProfileSchema.safeParse({
    name: formData.get("name"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/profile/`,
      {
        name: formData.get("name"),
      },
      {
        withCredentials: true,
      }
    );

    toast.success("Profile updated successfully");
    return {
      errors: {},
    };
  } catch (error) {
    toast.error("Failed to update profile");
    if (error instanceof Error) {
      return {
        errors: {
          formError: axios.isAxiosError(error)
            ? error.response?.data.message
            : [error.message],
        },
      };
    } else {
      return {
        errors: {
          formError: ["Unknown error"],
        },
      };
    }
  }
};
