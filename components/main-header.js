import Link from 'next/link';
import NavLink from './nav-link';

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
          {/* <li>
            <NavLink href={'/articles'} >Articles</NavLink>
          </li> */}
          <li>
            {/* <Link href="/archive" className={path.startsWith('/archive') ? "active" : undefined}>Archives </Link> */}
            <NavLink href={'/archive'}>Archive</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}