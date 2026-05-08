import { Link, useNavigate }
  from "react-router-dom";

import toast
  from "react-hot-toast";

function Sidebar() {

  const navigate =
    useNavigate();

  const handleLogout =
    () => {

      localStorage.removeItem(
        "token"
      );

      toast.success(
        "Logged out"
      );

      navigate("/");

    };

  return (

    <div className="w-72 h-screen sticky top-0 bg-white shadow-xl p-6 flex flex-col justify-between">
      <div>

        <h1 className="text-3xl font-bold text-purple-600 mb-10">
          Chronos
        </h1>

        <div className="space-y-4">

          <Link
            to="/dashboard"
            className="block bg-purple-100 hover:bg-purple-200 text-purple-700 p-4 rounded-xl font-semibold transition"
          >
            Dashboard
          </Link>

          <Link
            to="/create-job"
            className="block bg-purple-100 hover:bg-purple-200 text-purple-700 p-4 rounded-xl font-semibold transition"
          >
            Create Job
          </Link>

        </div>

      </div>

      <button
        onClick={handleLogout}
        className="w-full bg-red-500 hover:bg-red-600 text-white p-4 rounded-xl font-semibold transition"
      >
        Logout
      </button>

    </div>

  );

}

export default Sidebar;