import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Menu, Navbar } from "react-daisyui";

const NavbarComponent = () => {
  return (
    <Navbar className="bg-gray-900">
      <Navbar.Start />
      <Navbar.Center>
        <Menu horizontal className="p-0 text-white">
          <Menu.Item>
            <Link href="/" className="rounded-lg hover:bg-gray-600">
              Exams
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link href="/users" className="rounded-lg hover:bg-gray-600">
              Owners
            </Link>
          </Menu.Item>
        </Menu>
      </Navbar.Center>
      <Navbar.End>
        <AuthShowcase />
      </Navbar.End>
    </Navbar>
  );
};

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default NavbarComponent;
