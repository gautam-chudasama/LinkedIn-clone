import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfilePosts from "../components/Profile/ProfilePosts";
import { api } from "../api/api";

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const data = await api(`users/${id}`, "GET", null, token);
      setProfile(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:text-blue-700 mb-4 font-medium"
        >
          ← Back to Feed
        </button>

        <ProfileHeader user={profile.user} postsCount={profile.posts.length} />
        <ProfilePosts posts={profile.posts} />
      </div>
    </>
  );
};

export default ProfilePage;
