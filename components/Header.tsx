import { getServerSession } from "next-auth";
import DarkModeToggle from "./DarkModeToggle";
import Logo from "./Logo";
import UserButton from "./UserButton";
import { authOptions } from "@/auth";
import { MessageSquareIcon } from "lucide-react";
import Link from "next/link";
import CreateChatButton from "./CreateChatButton";
import UpgradeBanner from "./UpgradeBanner";
import LanguageSelect from "./LanguageSelect";

async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900">
      <nav className="flex flex-col items-center sm:flex-row sm:items-center bg-white mt-8 mr-6 ml-6 mb-6 dark:bg-gray-900 max-w-7xl">
        <Logo />

        <div className="flex-1 flex items-center justify-end gap-3">
          <LanguageSelect />

          {session ? (
            <>
              <Link
                href={'/chat'} prefetch={false}>
                <MessageSquareIcon className="text-black dark:text-white" />
              </Link>
              <CreateChatButton />
            </>
          ) : (
            <Link href="/pricing">Subscription Plans</Link>
          )}
          <DarkModeToggle />
          <UserButton session={session} />

        </div>
      </nav>

      <UpgradeBanner />
    </header>
  );
}

export default Header;