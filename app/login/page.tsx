import LoginClient from "./login-client";
import { getLoginBranding } from "@/lib/login-branding";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function LoginPage() {
  const initialBranding = await getLoginBranding();
  return <LoginClient initialBranding={initialBranding} />;
}
