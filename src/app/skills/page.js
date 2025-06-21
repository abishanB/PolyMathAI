"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./skills.css";
import Navbar from '../components/Navbar';

// Modal for skill feedback
function FeedbackModal({ open, onClose, skill, feedback, loading }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.3)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 10, padding: 32, maxWidth: 500, width: "90%", boxShadow: "0 4px 24px #0002", position: "relative", maxHeight: "90vh", overflowY: "auto" }}>
        <button onClick={onClose} aria-label="Close modal" style={{ position: "absolute", top: 12, right: 16, fontSize: 28, background: "none", border: "none", cursor: "pointer", zIndex: 2, color: '#888', fontWeight: 700, lineHeight: 1 }}>
          <span aria-hidden="true">×</span>
        </button>
        <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 8 }}>{skill} Progress</div>
        <div style={{ background: "#f0f7ff", borderRadius: 6, padding: 12, fontSize: 15, color: "#1a4a7a" }}>
          <b>AI Feedback:</b><br />
          {loading ? "Generating feedback..." : feedback}
        </div>
      </div>
    </div>
  );
}

export default function SkillsPage() {
  const [userProfile, setUserProfile] = useState(null);
  const [skillsProgress, setSkillsProgress] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const [modalSkill, setModalSkill] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    const profile = localStorage.getItem("polymathProfile");
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      setUserProfile(parsedProfile);
      generateSkillsProgress(parsedProfile);
    }
  }, []);

  const generateSkillsProgress = (profile) => {
    const progress = profile.skills.map((skill) => ({
      skill,
      level: Math.floor(Math.random() * 50) + 10, // Random level between 10-60
      totalHours: Math.floor(Math.random() * 100) + 20, // Random hours between 20-120
      weeklyHours: Math.floor(Math.random() * 10) + 2, // Random weekly hours between 2-12
      streak: Math.floor(Math.random() * 30) + 1, // Random streak between 1-30
    }));
    setSkillsProgress(progress);
  };

  const updatePriority = (skill, newPriority) => {
    if (!userProfile) return;

    const updatedProfile = {
      ...userProfile,
      priorities: {
        ...userProfile.priorities,
        [skill]: newPriority,
      },
    };
    setUserProfile(updatedProfile);
    localStorage.setItem("polymathProfile", JSON.stringify(updatedProfile));
  };

  const getSkillColor = (skill) => {
    const colors = ["skill-purple", "skill-blue", "skill-green", "skill-yellow", "skill-pink", "skill-indigo"];
    return colors[skill.length % colors.length];
  };

  const getLevelBadge = (level) => {
    if (level < 20) return { label: "Beginner", color: "level-beginner" };
    if (level < 40) return { label: "Intermediate", color: "level-intermediate" };
    if (level < 60) return { label: "Advanced", color: "level-advanced" };
    return { label: "Expert", color: "level-expert" };
  };

  // Fetch feedback for all skills
  useEffect(() => {
    if (!userProfile) return;
    const fetchAllFeedbacks = async () => {
      const logs = JSON.parse(localStorage.getItem("progressLogs") || "[]");
      const feedbackMap = {};
      for (const skill of userProfile.skills) {
        setModalLoading(true);
        const res = await fetch("/api/generate-skill-feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ skillId: skill })
        });
        const data = await res.json();
        feedbackMap[skill] = data.feedback || "No feedback.";
      }
      setFeedbacks(feedbackMap);
      setModalLoading(false);
    };
    fetchAllFeedbacks();
  }, [userProfile]);

  // Regenerate feedback if journal logs change
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "progressLogs") {
        // Re-fetch feedbacks
        if (userProfile) {
          const fetchAllFeedbacks = async () => {
            const feedbackMap = {};
            for (const skill of userProfile.skills) {
              setModalLoading(true);
              const res = await fetch("/api/generate-skill-feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ skillId: skill })
              });
              const data = await res.json();
              feedbackMap[skill] = data.feedback || "No feedback.";
            }
            setFeedbacks(feedbackMap);
            setModalLoading(false);
          };
          fetchAllFeedbacks();
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [userProfile]);

  if (!userProfile) {
    return (
      <div className="skills-loading">
        <div className="skills-loading-card">
          <div className="skills-loading-header">
            <h2 className="skills-loading-title">No Skills Found</h2>
            <p className="skills-loading-description">Complete onboarding to set up your skills</p>
          </div>
          <div className="skills-loading-content">
            <Link href="/onboarding">
              <button className="btn btn-primary">Start Onboarding</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="skills-page">
      <Navbar variant="skills" />

      <div className="skills-container">
        {/* Header */}
        <div className="skills-header">
          <div className="skills-header-content">
            <h1 className="skills-title">Your Skills</h1>
            <p className="skills-subtitle">Manage your learning priorities and track progress</p>
          </div>
          <button className="skills-add-btn">
            <span className="skills-add-icon">+</span>
            Add Skill
          </button>
        </div>

        {/* Skills Overview */}
        <div className="skills-overview">
          <div className="overview-card">
            <div className="overview-card-content">
              <div className="overview-item">
                <div className="overview-icon overview-icon-purple">🎯</div>
                <div className="overview-info">
                  <p className="overview-label">Total Skills</p>
                  <p className="overview-value">{userProfile.skills.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-card-content">
              <div className="overview-item">
                <div className="overview-icon overview-icon-blue">⏰</div>
                <div className="overview-info">
                  <p className="overview-label">Weekly Hours</p>
                  <p className="overview-value">{skillsProgress.reduce((sum, skill) => sum + skill.weeklyHours, 0)}h</p>
                </div>
              </div>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-card-content">
              <div className="overview-item">
                <div className="overview-icon overview-icon-green">📈</div>
                <div className="overview-info">
                  <p className="overview-label">Avg Level</p>
                  <p className="overview-value">
                    {skillsProgress.length > 0 ? Math.round(skillsProgress.reduce((sum, skill) => sum + skill.level, 0) / skillsProgress.length) : 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-card-content">
              <div className="overview-item">
                <div className="overview-icon overview-icon-orange">⭐</div>
                <div className="overview-info">
                  <p className="overview-label">Best Streak</p>
                  <p className="overview-value">{skillsProgress.length > 0 ? Math.max(...skillsProgress.map((skill) => skill.streak)) : 0} days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills List */}
        <div className="skills-list">
          {skillsProgress.map((skillData) => {
            const levelBadge = getLevelBadge(skillData.level);
            const priority = userProfile.priorities[skillData.skill] || 5;

            return (
              <div key={skillData.skill} className="skill-card">
                <div className="skill-card-header">
                  <div className="skill-badges">
                    <span className={`skill-badge ${getSkillColor(skillData.skill)}`}>{skillData.skill}</span>
                    <span className={`level-badge ${levelBadge.color}`}>{levelBadge.label}</span>
                  </div>
                  <button className="skill-settings-btn">
                    <span className="skill-settings-icon">⚙️</span>
                  </button>
                </div>
                <div className="skill-card-content">
                  {/* Progress Bar */}
                  <div className="skill-progress-section">
                    <div className="skill-progress-header">
                      <span>Level Progress</span>
                      <span>{skillData.level}%</span>
                    </div>
                    <div className="skill-progress-bar">
                      <div
                        className="skill-progress-fill"
                        style={{ width: `${skillData.level}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="skill-stats">
                    <div className="skill-stat">
                      <p className="skill-stat-value">{skillData.totalHours}</p>
                      <p className="skill-stat-label">Total Hours</p>
                    </div>
                    <div className="skill-stat">
                      <p className="skill-stat-value">{skillData.weeklyHours}</p>
                      <p className="skill-stat-label">This Week</p>
                    </div>
                    <div className="skill-stat">
                      <p className="skill-stat-value">{skillData.streak}</p>
                      <p className="skill-stat-label">Day Streak</p>
                    </div>
                  </div>

                  {/* Priority Slider */}
                  <div className="priority-section">
                    <div className="priority-header">
                      <label className="priority-label">Priority</label>
                      <span className="priority-value">{priority}/10</span>
                    </div>
                    <div className="priority-slider-container">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={priority}
                        className="priority-slider"
                        onChange={(e) => updatePriority(skillData.skill, parseInt(e.target.value))}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="skill-actions">
                    <button className="skill-action-btn" onClick={() => { setModalSkill(skillData.skill); setModalOpen(true); }}>
                      View Progress
                    </button>
                    <button className="skill-action-btn">Practice Now</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <FeedbackModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          skill={modalSkill}
          feedback={modalSkill ? feedbacks[modalSkill] : ""}
          loading={modalLoading}
        />
        {/* Add More Skills CTA */}
        <div className="add-skills-cta">
          <div className="add-skills-content">
            <div className="add-skills-icon">+</div>
            <h3 className="add-skills-title">Add More Skills</h3>
            <p className="add-skills-description">Expand your polymath journey by adding new skills to master</p>
            <button className="add-skills-btn">Browse Skills</button>
          </div>
        </div>
      </div>
    </div>
  );
}