"use client";
import { ProfileAction } from "@/actions/profile/UpdateProfile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setProfilRefresh } from "@/redux/allStateSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Loader, Settings } from "lucide-react";
import { useActionState, useEffect } from "react";
import Aavtar from "./Aavtar";
type User = {
  name: string;
  email: string;
  phone_number: string;
};
const ManageAccount: React.FC<{ user: User }> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [state, action, isPending] = useActionState(ProfileAction, {
    errors: {},
  });
  useEffect(() => {
    if (!isPending) {
      dispatch(setProfilRefresh());
    }
  }, [isPending, dispatch]);
  return (
    <Dialog>
      <DialogTrigger className="flex p-2  mt-2 rounded-md hover:bg-accent items-center gap-3  cursor-pointer transition dark:text-slate-300">
        <Settings className="w-4 h-4" />
        <span className="text-xs font-medium">Manage Account</span>
      </DialogTrigger>

      <DialogContent className="max-w-lg p-6 rounded-lg ">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Manage Your Account
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
            Update your personal information.
          </DialogDescription>
        </DialogHeader>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center gap-3">
          <Aavtar className="w-20 h-20 border" />
        </div>

        {/* Form Fields */}
        <form action={action} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name" className="text-sm">
              Full Name
            </Label>
            <Input name="name" className="mt-1" defaultValue={user?.name} />
          </div>
          {state.errors?.name && (
            <p className="text-red-500 text-xs">{state.errors.name[0]}</p>
          )}

          <div>
            <Label htmlFor="email" className="text-sm">
              Email
            </Label>
            <Input disabled defaultValue={user?.email} className="mt-1" />
          </div>

          <div>
            <Label htmlFor="address" className="text-sm">
              Phone Number
            </Label>
            <Input
              disabled
              defaultValue={user?.phone_number}
              className="mt-1"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <DialogClose>
              <div className="border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md text-sm cursor-pointer">
                Cancel
              </div>
            </DialogClose>
            <Button disabled={isPending}>
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader className="animate-spin" /> Updating...
                </span>
              ) : (
                "Update Account"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ManageAccount;
