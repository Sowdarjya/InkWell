import React from "react";
import UserDetails from "../components/UserDetails";
import UserPosts from "../components/UserPosts";

const Profile = () => {
  return (
    <div className="min-h-screen p-4 flex flex-col md:flex-row md:items-start gap-6">
      <UserDetails />
      <UserPosts />
    </div>
  );
};

export default Profile;
