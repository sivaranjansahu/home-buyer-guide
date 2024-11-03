import s from '../Navbar/Navbar.module.css';
import SignOutButton from '../Navbar/SignOutButton';
import { User } from '@supabase/auth-helpers-nextjs';
import { Menu } from 'lucide-react';
import Link from 'next/link';

const Sidebar = ({
  isOpen,
  toggle,
  user,
  navLinks,
  pathname
}: {
  isOpen: boolean;
  toggle: () => void;
  pathname: string;
  navLinks: { title: string; path: string }[];
  user?: User | null;
}): JSX.Element => {
  return (
    <>
      <div
        className="w-72 sidebar-container fixed  h-full overflow-hidden justify-center bg-slate-800 p-8 pt-[90px] right-0 z-10"
        style={{
          opacity: `${isOpen ? '1' : '0'}`,
          top: ` ${isOpen ? '0' : '-100%'}`
        }}
      >
        
        <ul>
          {navLinks.map((n, index) => {
            return (
              <li key={`nav-${index}`}>
                <Link
                  onClick={toggle}
                  key={'link' + index}
                  href={n.path}
                  className={s.link}
                  style={{
                    borderBottom:
                      pathname === n.path
                        ? '2px solid #A062CD'
                        : '2px solid transparent'
                  }}
                >
                  {n.title}
                </Link>
              </li>
            );
          })}

          {user && (
            <li>
              <Link
                onClick={toggle}
                href="/account"
                className={s.link}
                style={{
                  borderBottom:
                    pathname === '/account'
                      ? '2px solid #A062CD'
                      : '2px solid transparent'
                }}
              >
                Account
              </Link>
            </li>
          )}
          {user ? (
            <li>
              <SignOutButton />
            </li>
          ) : (
            <li>
              <Link href="/signin" className={s.link} onClick={toggle}>
                Sign in
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
