import { getUserDTO } from "@/lib/dto";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const account = await getUserDTO();

  return (
    <main className="p-8">
      <h1 className="text-xl font-bold">Welcome {account?.email}</h1>
      <p>ID: {account?.id}</p>
    </main>
  );
}
