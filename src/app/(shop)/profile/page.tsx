import { auth } from "@/auth.config";
import { Title } from "@/components/ui/title/Title";
import { redirect } from "next/navigation";

export const ProfilePage = async () => {
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
        <div>{JSON.stringify(session.user)}</div>
      </div>
    </>
  );
};

export default ProfilePage;
