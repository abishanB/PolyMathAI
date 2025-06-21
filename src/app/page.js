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
    setShowAuth(true);
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
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="container">
            <div className="features-header">
              <h2>AI-Powered Learning for Polymaths</h2>
              <p>
                Stop juggling multiple learning goals. Let our AI create the
                perfect schedule that adapts to your pace, preferences, and
                progress across all your interests.
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-card feature-card-purple">
                <div className="feature-icon feature-icon-purple">
                  <span>🧠</span>
                </div>
                <h3>Smart Scheduling</h3>
                <p>
                  AI analyzes your goals, availability, and learning patterns to create optimal practice schedules.
                </p>
              </div>

              <div className="feature-card feature-card-blue">
                <div className="feature-icon feature-icon-blue">
                  <span>🎯</span>
                </div>
                <h3>Multi-Skill Balance</h3>
                <p>
                  Learn guitar, coding, languages, and more - all balanced perfectly to maximize your progress.
                </p>
              </div>

              <div className="feature-card feature-card-green">
                <div className="feature-icon feature-icon-green">
                  <span>📈</span>
                </div>
                <h3>Progress Tracking</h3>
                <p>
                  Visual progress tracking and adaptive scheduling that evolves with your learning journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="how-it-works-section">
          <div className="container">
            <div className="how-it-works-header">
              <h2>How It Works</h2>
              <p>Three simple steps to optimize your learning</p>
            </div>

            <div className="steps-grid">
              <div className="step">
                <div className="step-number step-number-purple">
                  <span>1</span>
                </div>
                <h3>Choose Your Skills</h3>
                <p>
                  Select the skills you want to learn - from music and languages to coding and art.
                </p>
              </div>

              <div className="step">
                <div className="step-number step-number-blue">
                  <span>2</span>
                </div>
                <h3>Set Your Availability</h3>
                <p>
                  Tell us when you're free to learn and how much time you want to dedicate to each skill.
                </p>
              </div>

              <div className="step">
                <div className="step-number step-number-green">
                  <span>3</span>
                </div>
                <h3>Follow Your AI Schedule</h3>
                <p>
                  Get personalized daily schedules that adapt to your progress and optimize your learning.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="schedule-preview-section">
          <div className="container">
            <div className="schedule-preview-header">
              <h2>Your AI-Generated Schedule</h2>
              <p>Here's what a typical day might look like</p>
            </div>

            <div className="schedule-card">
              <div className="schedule-header">
                <span>📅</span>
                <h3>Today's Learning Schedule</h3>
              </div>
              <div className="schedule-content">
                <div className="schedule-item schedule-item-purple">
                  <div className="schedule-item-content">
                    <span className="schedule-item-icon">🕐</span>
                    <div>
                      <div className="schedule-item-title">Guitar Practice</div>
                      <div className="schedule-item-subtitle">Chord progressions & scales</div>
                    </div>
                  </div>
                  <div className="schedule-item-time">5:00 PM - 6:00 PM</div>
                </div>

                <div className="schedule-item schedule-item-blue">
                  <div className="schedule-item-content">
                    <span className="schedule-item-icon">🕐</span>
                    <div>
                      <div className="schedule-item-title">Python Coding</div>
                      <div className="schedule-item-subtitle">Data structures practice</div>
                    </div>
                  </div>
                  <div className="schedule-item-time">7:30 PM - 8:30 PM</div>
                </div>

                <div className="schedule-item schedule-item-green">
                  <div className="schedule-item-content">
                    <span className="schedule-item-icon">🕐</span>
                    <div>
                      <div className="schedule-item-title">Spanish Learning</div>
                      <div className="schedule-item-subtitle">Conversation practice</div>
                    </div>
                  </div>
                  <div className="schedule-item-time">9:00 PM - 9:30 PM</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="final-cta-section">
          <div className="container">
            <h2>Ready to Become a Modern Polymath?</h2>
            <p>
              Join thousands of learners who are mastering multiple skills with AI-powered scheduling.
            </p>
          </div>
        </section>
      </main>

    </div>
  );
}
