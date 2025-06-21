"use client"
import "./globals.css"
import { useRouter } from 'next/navigation'
import { Metadata } from 'next'

export const metadata = {
  title: 'PolyMathAI',
}
export default function Home() {
  const router = useRouter()
  const handleClick = () => {
     router.push('/onboarding')
  }
  return (
    <div>
      <header>
        <div class="container">
          <div class="header-content">
            <a href="#" class="logo">
              <div class="logo-icon">P</div>
              PolymathAI
            </a>
            <div class="nav-buttons">
              <a href="#" class="btn btn-outline">
                Sign In
              </a>
              <a href="#" class="btn btn-primary">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section class="hero">
          <div class="container">
            <h1>
              Master Every Skill with{" "}
              <span class="highlight">AI Scheduling</span>
            </h1>
            <p>
              The intelligent learning platform for polymaths. Let AI optimize
              your schedule to help you learn guitar, coding, languages, and any
              skill you want to master - all in perfect balance.
            </p>
            <div class="cta-buttons">
              <a onClick={handleClick} class="btn btn-cta btn-primary">
                Start Learning Today
              </a>
              <a href="#" class="btn btn-cta btn-secondary">
                Watch Demo
              </a>
            </div>
          </div>
        </section>

        <section class="secondary-section">
          <div class="container">
            <h2>AI-Powered Learning for Polymaths</h2>
            <p>
              Stop juggling multiple learning goals. Let our AI create the
              perfect schedule that adapts to your pace, preferences, and
              progress across all your interests.
            </p>
          </div>
        </section>
      </main>

      <div class="floating-icon">N</div>
    </div>
  );
}
