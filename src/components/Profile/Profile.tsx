"use client";
import GetProfile from "@/actions/profile/GetProfile";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  selectGetProfile,
  selectIsLogin,
  selectProfilRefresh,
  setGetProfile,
  setIsLogin,
} from "@/redux/allStateSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import Aavtar from "./Aavtar";
import UserButtonPopover from "./UserButtonPopover";

const Profile = () => {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(selectIsLogin);
  const refresh = useAppSelector(selectProfilRefresh);

  useEffect(() => {
    GetProfile()
      .then((e) => {
        if (e) {
          dispatch(setGetProfile(e));
          dispatch(setIsLogin(true));
        } else {
          dispatch(setGetProfile(null));
          dispatch(setIsLogin(false));
        }
      })
      .catch(() => {
        dispatch(setGetProfile(null));

        dispatch(setIsLogin(false));
      });
  }, [dispatch, refresh, isLogin]);

  const user = useAppSelector(selectGetProfile);
  return (
    <Popover>
      <PopoverTrigger>
        <Aavtar className="w-8 h-8" />
      </PopoverTrigger>
      <PopoverContent>
        {user && <UserButtonPopover user={user} />}
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
