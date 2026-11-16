import { requreRole } from "@/lib/core/server";

const SeekerDashboadLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  await requreRole("seeker");
  return children;
};

export default SeekerDashboadLayout;