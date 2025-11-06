import { UserCircle } from "lucide-react";

const ProfileHeader = ({ user, postsCount }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-blue-600 p-4 rounded-full">
          <UserCircle className="text-white" size={48} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <p className="text-gray-700 font-medium">Posts: {postsCount}</p>
    </div>
  );
};

export default ProfileHeader;
