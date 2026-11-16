import { requreRole } from "@/lib/api/users";

const SeekerDashboadLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  await requreRole("seeker");
  return children;
};

export default SeekerDashboadLayout;