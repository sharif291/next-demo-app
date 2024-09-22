import Link from 'next/link';
import NavLink from './nav-link';
import LoginLogoutButtonComponent from "@/components/login-logout-button"

export default function MainHeader() {
  return (
    <header id="main-header">
      <div id="logo">
        <Link href="/">
          HairBox
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            {/* <Link href="/archive" className={path.startsWith('/archive') ? "active" : undefined}>Archives </Link> */}
            <NavLink href={'/articles/create'}>Create Your's</NavLink>
          </li>
          <li>
            {/* <Link href="/archive" className={path.startsWith('/archive') ? "active" : undefined}>Archives </Link> */}
            <NavLink href={'/archive'}>Archive</NavLink>
          </li>
          <li>
            <LoginLogoutButtonComponent />
          </li>
        </ul>
      </nav>
    </header>
  );
}