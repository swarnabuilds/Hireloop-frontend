import { requreRole } from "@/lib/api/users";

const AdminDashboadLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  await requreRole("admin");
  return children;
};

export default AdminDashboadLayout;