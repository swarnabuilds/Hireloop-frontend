import React from "react";
import { requreRole } from "@/lib/api/users";

const RecruiterDashboadLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  await requreRole("recruiter");
  return children;
};

export default RecruiterDashboadLayout;