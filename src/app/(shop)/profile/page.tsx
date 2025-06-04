import { auth } from "@/auth.config";
import { Title } from "@/components/ui/title/Title";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }
  return (
    <>
      <Title title={"Perfil"} />
      <div>
        <p>Email: {session.user.email}</p>
        <p>Name: {session.user.name}</p>
        <p>Image: {session.user.image}</p>
        <p>Id: {session.user.id}</p>
        <p>Role: {session.user.role}</p>
        <div>{JSON.stringify(session.user.role)}</div>
      </div>
    </>
  );
}
