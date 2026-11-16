import { requreRole } from "@/lib/core/server";

const AdminDashboadLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  await requreRole("admin");
  return children;
};

export default AdminDashboadLayout;