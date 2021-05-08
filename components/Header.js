// _rfc
import Link from "next/link";
// import styles from "../styles/Header.module.css";
import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>DJ Events</a>
        </Link>
      </div>
      <div>
        {process.env.NODE_ENV === "development" && (
          <span className={styles.envDev}>✘ DEV</span>
        )}
        {process.env.NODE_ENV === "production" && (
          <span className={styles.envProd}>✔ PROD</span>
        )}
      </div>
      <nav>
        <ul>
          <li>
            <Link href='/events'>
              <a>Events</a>
            </Link>
          </li>
          <li>
            <Link href='/events/add'>
              <a>Add Event</a>
            </Link>
          </li>
          <li>
            <Link href='/test'>
              <a>404</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
