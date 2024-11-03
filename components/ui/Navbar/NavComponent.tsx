'use client';

import Button from '../Button/Button';
import Sidebar from '../Sidebar';
import s from './Navbar.module.css';
import SignOutButton from './SignOutButton';
import Logo from '@/components/icons/Logo';
import { User } from '@supabase/supabase-js';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks: { title: string; path: string }[] = [
  
  {
    title: 'Get pro',
    path: '/pricing'
  },

];

const NavComp = ({ user }: { user: User | null }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className={s.root}>
        <a href="#skip" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        <div className="max-w-6xl px-6 mx-auto">
          <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
            <div className="flex items-center justify-between flex-1">
              <Link href="/" className={s.logo} aria-label="Logo">
                <Logo />
              </Link>
              
              <nav className="hidden ml-6 space-x-2 lg:block justify-self-center text-sm	">
                {navLinks.map((n, index) => {
                  return (
                    <Link
                      key={'link' + index}
                      href={n.path}
                      className={n.path === '/pricing' ? s.highlight : s.link}
                      style={{
                        borderBottom:
                          pathname === n.path
                            ? '2px solid #A062CD'
                            : '2px solid transparent'
                      }}
                    >
                      {n.title}
                    </Link>
                  );
                })}

                {user && (
                  <Link
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
                )}
                {user ? (
                <SignOutButton />
              ) : (
                <Link href="/signin" className={s.link}>
                  Sign in
                </Link>
              )}
              </nav>
              <div className="md:hidden" >
              <Button variant='link' onClick={toggle}>
                <Menu/>
              </Button>
              </div>
            </div>
          
          </div>
        </div>
      </nav>
      <Sidebar pathname={pathname} user={user} isOpen={isOpen} toggle={toggle} navLinks={navLinks} />
    </>
  );
};

export default NavComp;
