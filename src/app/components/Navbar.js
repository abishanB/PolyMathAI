"use client";
import Link from "next/link";
import "./Navbar.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function Navbar() {
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleSettingsDropdown = () => {
    setShowSettingsDropdown(!showSettingsDropdown);
  };

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
            <div className="settings-dropdown">
              <button 
                onClick={toggleSettingsDropdown} 
                className="nav-btn settings-btn"
              >
                Settings
              </button>
              {showSettingsDropdown && (
                <div className="dropdown-menu">
                  <button 
                    onClick={handleSignOut} 
                    className="dropdown-item sign-out-btn"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
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
