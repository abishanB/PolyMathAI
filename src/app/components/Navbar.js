import Link from 'next/link';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav className="dashboard-nav">
            <div className="nav-container">
                <div className="nav-content">
                    <div className="nav-brand">
                        <div className="nav-icon">🧠</div>
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
