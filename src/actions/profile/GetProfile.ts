import api from "@/lib/api";

const GetProfile = async () => {
  try {
    const res = await api.get("administrator/profile/");
    // console.log(res);
    return res?.data;
  } catch {}
};

export default GetProfile;
