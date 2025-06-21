import Link from "next/link";
import "./Navbar.css";
import Image from "next/image";
export default function Navbar() {
  return (
    <nav className="dashboard-nav">
      <div className="nav-container">
        <div className="nav-content">
          <div className="nav-brand">
            <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
            <h1 className="nav-title">PolymathAI</h1>
          </div>
          <div className="nav-links">
            <Link href="/skills">
              <button className="nav-btn">Skills</button>
            </Link>
            <Link href="/calendar">
              <button className="nav-btn">Calendar</button>
            </Link>
            <button className="nav-btn">Settings</button>
            <Link href="/feed">
              <button className="nav-btn">Feed</button>
            </Link>
            <Link href="/journal">
              <button className="nav-btn">Journal</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
