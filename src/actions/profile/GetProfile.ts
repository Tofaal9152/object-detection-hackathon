import axios from "axios";

const GetProfile = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/profile/`,
      { withCredentials: true }
    );
    

    return res?.data;
  } catch {}
};

export default GetProfile;
