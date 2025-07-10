import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function AuthDashboard({ children }: { children: ReactNode }) {
  const auth = (await cookies()).get("auth");

  if (!auth || auth.value !== "true") {
    redirect("/Login");
  }

  return <>{children}</>;
}
