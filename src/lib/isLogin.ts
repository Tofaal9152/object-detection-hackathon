"use client";
import GetProfile from "@/actions/profile/GetProfile";
import { selectProfilRefresh, setGetProfile } from "@/redux/allStateSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

const IsLogin = () => {
  const dispatch = useAppDispatch();

  const token =
    localStorage.getItem("access_token") &&
    localStorage.getItem("refresh_token") === "true";
  console.log("asdasd",token);
  const refresh = useAppSelector(selectProfilRefresh);

  useEffect(() => {
    if (token) {
      GetProfile()
        .then((e) => {
          if (e) {
            dispatch(setGetProfile(e));
          } else {
            dispatch(setGetProfile(null));
          }
        })
        .catch(() => {
          dispatch(setGetProfile(null));
        });
    }
  }, [dispatch, refresh, token]);

  return token ? true : false;
};
export default IsLogin;
