import { getUserDTO } from "@/lib/dto";

export async function GET() {
  try {
    const user = await getUserDTO();
    return Response.json({ user });
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 401 });
  }
}
