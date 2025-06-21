"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import "./year-review.css";

export default function YearReviewPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [yearStats, setYearStats] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    generateYearStats();
  }, []);

  const generateYearStats = () => {
    // Simulate year-end statistics
    const skills = ["Guitar", "Python", "Spanish", "Drawing", "Piano", "French", "JavaScript", "Photography"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const topSkills = skills.slice(0, 5).map((skill, index) => ({
      skill,
      hours: Math.floor(Math.random() * 100) + 50 - index * 10,
      sessions: Math.floor(Math.random() * 80) + 40 - index * 8,
      level: Math.floor(Math.random() * 30) + 70 - index * 5,
    }));

    const monthlyProgress = months.map((month) => ({
      month,
      hours: Math.floor(Math.random() * 40) + 20,
      sessions: Math.floor(Math.random() * 25) + 15,
    }));

    const achievements = [
      { title: "Polymath Pioneer", description: "Learned 5+ skills simultaneously", icon: "🎯", unlocked: true },
      { title: "Consistency King", description: "Maintained a 30-day streak", icon: "🔥", unlocked: true },
      { title: "Night Owl", description: "Completed 50+ evening sessions", icon: "🦉", unlocked: true },
      { title: "Speed Learner", description: "Reached intermediate level in 3 months", icon: "⚡", unlocked: true },
      { title: "Dedication Master", description: "Logged 200+ total hours", icon: "💪", unlocked: true },
      { title: "Skill Collector", description: "Started learning 8+ different skills", icon: "🎨", unlocked: false },
    ];

    setYearStats({
      totalHours: topSkills.reduce((sum, skill) => sum + skill.hours, 0),
      totalSessions: topSkills.reduce((sum, skill) => sum + skill.sessions, 0),
      skillsLearned: skills.length,
      longestStreak: 47,
      topSkills,
      monthlyProgress,
      achievements,
      personalBests: {
        mostProductiveDay: { date: "March 15th", hours: 6.5 },
        favoriteTimeSlot: "7:00 PM - 9:00 PM",
        fastestSkillProgress: "Spanish",
      },
    });
  };

  const slides = [
    "welcome",
    "total-stats",
    "top-skills",
    "monthly-journey",
    "achievements",
    "personal-bests",
    "looking-ahead",
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const getSkillColor = (skill) => {
    const colors = [
      "gradient-purple-pink",
      "gradient-blue-cyan",
      "gradient-green-emerald",
      "gradient-yellow-orange",
      "gradient-pink-rose",
      "gradient-indigo-purple",
    ];
    return colors[skill.length % colors.length];
  };

  if (!yearStats) {
    return (
      <div className="year-review-loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Generating your 2024 learning story...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="year-review">
      <Navbar variant="year-review" />

      {/* Progress Indicator */}
      <div className="progress-indicator">
        <div className="progress-dots">
          {slides.map((_, index) => (
            <div key={index} className={`progress-dot ${index === currentSlide ? "progress-dot-active" : ""}`} />
          ))}
        </div>
      </div>

      {/* Slide Content */}
      <div className={`slide-container ${isAnimating ? "slide-animating" : ""}`}>
        {/* Welcome Slide */}
        {currentSlide === 0 && (
          <div className="slide welcome-slide">
            <div className="welcome-content">
              <div className="welcome-icon">
                <span className="trophy-icon">🏆</span>
              </div>
              <h1 className="welcome-title">Your 2024</h1>
              <h2 className="welcome-subtitle">Learning Journey</h2>
              <p className="welcome-description">
                This year, you embarked on an incredible polymath journey. Let's celebrate your dedication, growth, and
                the amazing skills you've developed.
              </p>
            </div>
            <button onClick={nextSlide} className="welcome-btn">
              Let's Begin
              <span className="btn-icon">›</span>
            </button>
          </div>
        )}

        {/* Total Stats Slide */}
        {currentSlide === 1 && (
          <div className="slide stats-slide">
            <h2 className="slide-title">Your Year in Numbers</h2>
            <div className="stats-grid-year">
              <div className="year-stat-card">
                <div className="year-stat-content">
                  <span className="year-stat-icon year-stat-icon-blue">⏰</span>
                  <div className="year-stat-value">{yearStats.totalHours}</div>
                  <div className="year-stat-label">Hours Learned</div>
                  <div className="year-stat-note">That's {Math.round(yearStats.totalHours / 24)} full days!</div>
                </div>
              </div>

              <div className="year-stat-card">
                <div className="year-stat-content">
                  <span className="year-stat-icon year-stat-icon-green">🎯</span>
                  <div className="year-stat-value">{yearStats.totalSessions}</div>
                  <div className="year-stat-label">Learning Sessions</div>
                  <div className="year-stat-note">Average {Math.round(yearStats.totalSessions / 12)} per month</div>
                </div>
              </div>

              <div className="year-stat-card">
                <div className="year-stat-content">
                  <span className="year-stat-icon year-stat-icon-purple">📚</span>
                  <div className="year-stat-value">{yearStats.skillsLearned}</div>
                  <div className="year-stat-label">Skills Explored</div>
                  <div className="year-stat-note">True polymath spirit!</div>
                </div>
              </div>

              <div className="year-stat-card">
                <div className="year-stat-content">
                  <span className="year-stat-icon year-stat-icon-orange">⚡</span>
                  <div className="year-stat-value">{yearStats.longestStreak}</div>
                  <div className="year-stat-label">Day Streak</div>
                  <div className="year-stat-note">Incredible consistency!</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Top Skills Slide */}
        {currentSlide === 2 && (
          <div className="slide skills-slide">
            <h2 className="slide-title">Your Top Skills</h2>
            <p className="slide-description">The skills that captured your attention the most</p>

            <div className="top-skills-list">
              {yearStats.topSkills.map((skill, index) => (
                <div key={skill.skill} className="top-skill-card">
                  <div className="top-skill-content">
                    <div className="top-skill-info">
                      <div className="top-skill-left">
                        <div className={`skill-rank ${getSkillColor(skill.skill)}`}>{index + 1}</div>
                        <div className="skill-details">
                          <h3 className="skill-name">{skill.skill}</h3>
                          <p className="skill-stats">
                            {skill.sessions} sessions • Level {skill.level}
                          </p>
                        </div>
                      </div>
                      <div className="skill-hours">
                        <div className="skill-hours-value">{skill.hours}h</div>
                        <div className="skill-hours-label">total time</div>
                      </div>
                    </div>
                    <div className="skill-progress">
                      <div className="skill-progress-bar">
                        <div
                          className="skill-progress-fill"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Monthly Journey Slide */}
        {currentSlide === 3 && (
          <div className="slide journey-slide">
            <h2 className="slide-title">Your Learning Journey</h2>
            <p className="slide-description">How you progressed throughout the year</p>

            <div className="journey-card">
              <div className="monthly-chart">
                {yearStats.monthlyProgress.map((month, index) => (
                  <div key={month.month} className="month-bar">
                    <div
                      className="month-bar-fill"
                      style={{
                        height: `${Math.max(month.hours * 3, 20)}px`,
                      }}
                    />
                    <div className="month-label">{month.month}</div>
                    <div className="month-hours">{month.hours}h</div>
                  </div>
                ))}
              </div>
              <div className="journey-stats">
                <div className="journey-stat">
                  <div className="journey-stat-value journey-stat-green">
                    {Math.max(...yearStats.monthlyProgress.map((m) => m.hours))}h
                  </div>
                  <div className="journey-stat-label">Best Month</div>
                </div>
                <div className="journey-stat">
                  <div className="journey-stat-value journey-stat-blue">
                    {Math.round(yearStats.monthlyProgress.reduce((sum, m) => sum + m.hours, 0) / 12)}h
                  </div>
                  <div className="journey-stat-label">Monthly Average</div>
                </div>
                <div className="journey-stat">
                  <div className="journey-stat-value journey-stat-purple">
                    {yearStats.monthlyProgress.reduce((sum, m) => sum + m.sessions, 0)}
                  </div>
                  <div className="journey-stat-label">Total Sessions</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Achievements Slide */}
        {currentSlide === 4 && (
          <div className="slide achievements-slide">
            <h2 className="slide-title">Achievements Unlocked</h2>
            <p className="slide-description">Celebrating your learning milestones</p>

            <div className="achievements-grid">
              {yearStats.achievements.map((achievement, index) => (
                <div
                  key={achievement.title}
                  className={`achievement-card ${achievement.unlocked ? "achievement-unlocked" : "achievement-locked"}`}
                >
                  <div className="achievement-content">
                    <div className={`achievement-icon ${achievement.unlocked ? "" : "achievement-icon-locked"}`}>
                      {achievement.icon}
                    </div>
                    <h3
                      className={`achievement-title ${achievement.unlocked ? "achievement-title-unlocked" : "achievement-title-locked"}`}
                    >
                      {achievement.title}
                    </h3>
                    <p
                      className={`achievement-description ${achievement.unlocked ? "achievement-description-unlocked" : "achievement-description-locked"}`}
                    >
                      {achievement.description}
                    </p>
                    {achievement.unlocked && <span className="achievement-badge">Unlocked!</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Personal Bests Slide */}
        {currentSlide === 5 && (
          <div className="slide bests-slide">
            <h2 className="slide-title">Personal Bests</h2>
            <p className="slide-description">Your standout moments from 2024</p>

            <div className="bests-content">
              <div className="best-card best-card-main">
                <div className="best-content">
                  <span className="best-icon best-icon-purple">🏅</span>
                  <h3 className="best-title">Most Productive Day</h3>
                  <p className="best-value best-value-purple">{yearStats.personalBests.mostProductiveDay.date}</p>
                  <p className="best-description">
                    {yearStats.personalBests.mostProductiveDay.hours} hours of focused learning
                  </p>
                </div>
              </div>

              <div className="bests-grid">
                <div className="best-card best-card-blue">
                  <div className="best-content">
                    <span className="best-icon best-icon-blue">⏰</span>
                    <h3 className="best-title-small">Favorite Time Slot</h3>
                    <p className="best-value-small best-value-blue">{yearStats.personalBests.favoriteTimeSlot}</p>
                    <p className="best-description-small">Your peak learning hours</p>
                  </div>
                </div>

                <div className="best-card best-card-green">
                  <div className="best-content">
                    <span className="best-icon best-icon-green">📈</span>
                    <h3 className="best-title-small">Fastest Progress</h3>
                    <p className="best-value-small best-value-green">{yearStats.personalBests.fastestSkillProgress}</p>
                    <p className="best-description-small">Your quickest skill advancement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Looking Ahead Slide */}
        {currentSlide === 6 && (
          <div className="slide ahead-slide">
            <div className="ahead-content">
              <span className="ahead-icon">⭐</span>
              <h2 className="slide-title">Looking Ahead to 2025</h2>
              <p className="slide-description">
                You've built incredible momentum in 2024. Your polymath journey is just getting started!
              </p>

              <div className="summary-card">
                <h3 className="summary-title">2024 Achievements Summary</h3>
                <div className="summary-stats">
                  <div className="summary-stat">
                    <div className="summary-stat-value summary-stat-purple">{yearStats.totalHours}h</div>
                    <div className="summary-stat-label">Total Learning</div>
                  </div>
                  <div className="summary-stat">
                    <div className="summary-stat-value summary-stat-blue">{yearStats.skillsLearned}</div>
                    <div className="summary-stat-label">Skills Explored</div>
                  </div>
                  <div className="summary-stat">
                    <div className="summary-stat-value summary-stat-green">{yearStats.longestStreak}</div>
                    <div className="summary-stat-label">Day Streak</div>
                  </div>
                  <div className="summary-stat">
                    <div className="summary-stat-value summary-stat-orange">
                      {yearStats.achievements.filter((a) => a.unlocked).length}
                    </div>
                    <div className="summary-stat-label">Achievements</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ahead-actions">
              <Link href="/dashboard">
                <button className="ahead-primary-btn">
                  Continue Learning
                  <span className="btn-icon">›</span>
                </button>
              </Link>
              <button className="ahead-secondary-btn">
                <span className="btn-icon">📤</span>
                Share Your Journey
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="slide-controls">
        <button onClick={prevSlide} disabled={currentSlide === 0} className="control-btn">
          Previous
        </button>
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="control-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
}