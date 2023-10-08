import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Hi {currentUser.data.first_name}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Last name :</strong> {currentUser.data.last_name}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.data.email}
      </p>
      <strong>ID :</strong> {currentUser.data.id}
      
    </div>
  );
};

export default Profile;
