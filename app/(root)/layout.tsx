import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { isAuthenticated, getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import UserDropdown from "@/components/UserDropdown";
import { LanguageProvider } from "@/context/LanguageContext";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) redirect("/sign-in");

  const user = await getCurrentUser();

  return (
    <LanguageProvider>
      <div className="root-layout">
        <nav className="flex justify-between items-center p-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Logo" height={32} width={38} />
            <h2 className="text-primary-100">MockTalk.</h2>
          </Link>

          {user && <UserDropdown username={user.name} />}
        </nav>

        {children}
      </div>
    </LanguageProvider>
  );
};

export default RootLayout;
