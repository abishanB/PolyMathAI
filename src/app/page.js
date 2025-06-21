"use client";
import "./globals.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Image from "next/image";
export default function Home() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setShowAuth(false);
        router.push("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleClick = () => {
    router.push("/onboarding");
  };

  const handleSignIn = () => {
    setShowAuth(true);
  };
  if (showAuth) {
    return (
      <div className="auth-container">
        <div className="auth-wrapper">
          <h2>Welcome to PolymathAI</h2>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["google", "github"]}
          />
          <button
            onClick={() => setShowAuth(false)}
            className="btn btn-outline">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header>
        <div className="container">
          <div className="header-content">
            <div className="nav-brand">
              <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
              <h1 className="nav-title">PolymathAI</h1>
            </div>
            <div className="nav-buttons">
              <button onClick={handleSignIn} className="btn btn-outline">
                Sign In
              </button>
              <button onClick={handleClick} className="btn btn-primary">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <h1>
              Master Every Skill with{" "}
              <span className="highlight">AI Scheduling</span>
            </h1>
            <p>
              The intelligent learning platform for polymaths. Let AI optimize
              your schedule to help you learn guitar, coding, languages, and any
              skill you want to master - all in perfect balance.
            </p>
            <div className="cta-buttons">
              <button onClick={handleClick} className="btn btn-cta btn-primary">
                Start Learning Today
              </button>
              <a href="#" className="btn btn-cta btn-secondary">
                Watch Demo
              </a>
            </div>
          </div>
        </section>

        <section className="secondary-section">
          <div className="container">
            <h2>AI-Powered Learning for Polymaths</h2>
            <p>
              Stop juggling multiple learning goals. Let our AI create the
              perfect schedule that adapts to your pace, preferences, and
              progress across all your interests.
            </p>
          </div>
        </section>
      </main>

      <div className="floating-icon">N</div>
    </div>
  );
}
