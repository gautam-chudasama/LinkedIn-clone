import { User, LogOut, UserCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-4xl">
            {/* <User className="text-white" size={24} /> */}
            <img
              src="https://media.licdn.com/dms/image/v2/C560BAQHaVYd13rRz3A/company-logo_100_100/company-logo_100_100/0/1638831590218/linkedin_logo?e=1764201600&v=beta&t=62UB1_bAFICk1w4pN8wriSPIUXftH4oLjm4wIn06eyk
"
              alt="linkedin"
              className="w-7 rounded-xl"
            />
          </div>
          <span className="text-xl font-bold text-gray-800">
            LinkedIn Clone
          </span>
        </div>
        {user && (
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/profile/${user.id}`)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <UserCircle size={20} />
              <span className="hidden sm:inline">{user.name}</span>
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
