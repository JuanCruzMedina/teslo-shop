export const revalidate = 0;

import { getPaginatedUsers } from "@/actions/users/get-paginated-users";
import { Title } from "@/components/ui/title/Title";
import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";

export default async function OrdersPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Users management" />

      <div className="mb-10">
        <UsersTable users={users} />
        {/* TODO: add pagination */}
      </div>
    </>
  );
}
