import { Link } from "react-router-dom";
import { User } from "lucide-react";

const AuthContainer = ({
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLink,
  children,
}) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-blue-600 p-3 rounded-xl">
            <User className="text-white" size={32} />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
          {title}
        </h2>
        <p className="text-center text-gray-600 mb-8">{subtitle}</p>

        {children}

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {footerText}{" "}
            <Link
              to={footerLink}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
