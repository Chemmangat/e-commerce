import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export function requireAuth() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token");

  if (!token) {
    const headersList = headers();
    const fullUrl = headersList.get("x-url") || "/";
    redirect("/sign-in?redirect=" + encodeURIComponent(fullUrl));
  }
}
