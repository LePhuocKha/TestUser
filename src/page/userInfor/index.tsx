import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import type { user } from "../../type/user";

const UserInfor = () => {
  const navigate = useNavigate();

  let userData: user | null = null;
  const cookie = Cookies.get("user");
  userData = cookie ? JSON.parse(cookie) : null;
  return (
    <div className="flex items-center">
      <div className="p-6 rounded-2xl w-[400px] shadow-lg border border-gray-200 bg-white">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
          User Information
        </h2>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center text-lg font-bold">
            {userData?.user?.charAt(0)?.toUpperCase() || "?"}
          </div>

          <div>
            <p className="font-medium text-lg">
              {userData?.user || "Unknown"}
            </p>
            <p className="text-sm text-gray-500">
              {userData?.email || "No email"}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            Cookies.remove("access_token");
            Cookies.remove("expires");
            Cookies.remove("refresh_token");
            Cookies.remove("user");

            navigate("/user/login");
          }}
          className="py-3 w-full rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserInfor;