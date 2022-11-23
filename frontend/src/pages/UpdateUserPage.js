import React from "react";
import AuthUpdateForm from "../components/auth/AuthUpdateForm";
import AuthTemplate from "../components/auth/AuthTemplate";

const UpdateUserPage = () => {
  return (
    <div>
      <AuthTemplate>
        <AuthUpdateForm />
      </AuthTemplate>
    </div>
  );
};

export default UpdateUserPage;
