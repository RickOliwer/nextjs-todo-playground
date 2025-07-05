// app/lib/dto.ts
import { getAccount } from "@/lib/dal";

export async function getUserDTO() {
  const account = await getAccount();
  if (!account) return null;

  return {
    id: account.id,
    email: account.email,
    isAdmin: account.email?.endsWith("rc9.dev"),
  };
}
