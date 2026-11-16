import { requreRole } from "@/lib/core/server";
import React from "react";

const RecruiterDashboadLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  await requreRole("recruiter");
  return children;
};

export default RecruiterDashboadLayout;