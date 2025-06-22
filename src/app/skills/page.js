"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./skills.css";
import Navbar from '../components/Navbar';
import { supabase } from '../../lib/supabase';

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
  const [userSkills, setUserSkills] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const [modalSkill, setModalSkill] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [addSkillModalOpen, setAddSkillModalOpen] = useState(false);
  const [newSkills, setNewSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [skillDropdown, setSkillDropdown] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [scheduleNeedsUpdate, setScheduleNeedsUpdate] = useState(false);
  const [isUpdatingSchedule, setIsUpdatingSchedule] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      console.log('Getting user...');
      const { data: { user }, error } = await supabase.auth.getUser();
      console.log('Auth response:', { user, error });

      setUser(user);

      if (user) {
        console.log('User found:', user.id);
        // Load user profile from localStorage for now
        const profile = localStorage.getItem("polymathProfile");
        if (profile) {
          const parsedProfile = JSON.parse(profile);
          setUserProfile(parsedProfile);
        }

        // Fetch skills from database
        await fetchUserSkills(user.id);
      } else {
        console.log('No user found');
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const fetchUserSkills = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_skills')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching skills:', error);
        return;
      }

      setUserSkills(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (skillDropdown && !event.target.closest('.skill-settings-container')) {
        setSkillDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [skillDropdown]);

  const getLevelFromHours = (hours) => {
    // Convert hours to level (0-100)
    return Math.min(Math.floor(hours * 2), 100);
  };

  const updatePriority = async (skillName, newPriority) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_skills')
        .update({ priority: newPriority })
        .eq('user_id', user.id)
        .eq('skill_name', skillName);

      if (error) {
        console.error('Error updating priority:', error);
        return;
      }

      // Update local state
      setUserSkills(prev => prev.map(skill =>
        skill.skill_name === skillName
          ? { ...skill, priority: newPriority }
          : skill
      ));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addSkills = async () => {
    console.log('addSkills called', { newSkills, user });

    if (newSkills.length === 0 || !user) {
      console.log('Early return - no skills or no user');
      return;
    }

    try {
      const skillsToInsert = newSkills.map(skillName => ({
        user_id: user.id,
        skill_name: skillName,
        priority: 5,
        total_hours: 0,
        day_streak: 0
      }));

      console.log('Inserting skills:', skillsToInsert);

      const { data, error } = await supabase
        .from('user_skills')
        .insert(skillsToInsert)
        .select();

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Error adding skills:', error);
        alert('Error adding skills: ' + error.message);
        return;
      }

      console.log('Skills added successfully:', data);

      // Update local state
      setUserSkills(prev => [...prev, ...data]);

      // Mark schedule for update
      setScheduleNeedsUpdate(true);

      // Reset modal state
      setNewSkills([]);
      setSearchTerm("");
      setAddSkillModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  const removeSkill = async (skillToRemove) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_skills')
        .delete()
        .eq('user_id', user.id)
        .eq('skill_name', skillToRemove);

      if (error) {
        console.error('Error deleting skill:', error);
        return;
      }

      // Update local state
      setUserSkills(prev => prev.filter(skill => skill.skill_name !== skillToRemove));
      setSkillDropdown(null);

      // Mark schedule for update
      setScheduleNeedsUpdate(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const capitalizeFirstLetter = (skill) => skill.charAt(0).toUpperCase() + skill.slice(1);

  const handleAddSkillInput = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      if (newSkills.length >= 5) return;

      const skill = capitalizeFirstLetter(searchTerm.trim());
      const existingSkillNames = userSkills.map(s => s.skill_name);
      if (!newSkills.includes(skill) && !existingSkillNames.includes(skill)) {
        setNewSkills([...newSkills, skill]);
      }
      setSearchTerm("");
    }
  };

  const removeNewSkill = (skillToRemove) => {
    setNewSkills(newSkills.filter(skill => skill !== skillToRemove));
  };

  const updateSchedule = async () => {
    if (!userProfile || userSkills.length === 0) return;

    setIsUpdatingSchedule(true);

    try {
      // Create updated profile with current skills and priorities
      const skillNames = userSkills.map(skill => skill.skill_name);
      const priorities = userSkills.reduce((acc, skill) => {
        acc[skill.skill_name] = skill.priority;
        return acc;
      }, {});

      const updatedProfile = {
        skills: skillNames,
        priorities: priorities,
        availableHours: userProfile.availableHours || 2,
        preferredTimes: userProfile.preferredTimes || ['evening'],
      };

      // Update localStorage profile
      localStorage.setItem("polymathProfile", JSON.stringify(updatedProfile));
      setUserProfile(updatedProfile);

      // Generate new schedule using AI
      const response = await fetch('/api/generate-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });

      if (response.ok) {
        const { schedule } = await response.json();
        localStorage.setItem("generatedSchedule", JSON.stringify(schedule));
        console.log("Schedule updated successfully");
        setScheduleNeedsUpdate(false);
      } else {
        console.error("Failed to generate new schedule");
      }
    } catch (error) {
      console.error("Error updating schedule:", error);
    } finally {
      setIsUpdatingSchedule(false);
    }
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
    if (userSkills.length === 0) return;
    const fetchAllFeedbacks = async () => {
      const logs = JSON.parse(localStorage.getItem("progressLogs") || "[]");
      const feedbackMap = {};
      for (const skill of userSkills) {
        setModalLoading(true);
        const res = await fetch("/api/generate-skill-feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ skillId: skill.skill_name })
        });
        const data = await res.json();
        feedbackMap[skill.skill_name] = data.feedback || "No feedback.";
      }
      setFeedbacks(feedbackMap);
      setModalLoading(false);
    };
    fetchAllFeedbacks();
  }, [userSkills]);

  // Regenerate feedback if journal logs change
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "progressLogs") {
        // Re-fetch feedbacks
        if (userSkills.length > 0) {
          const fetchAllFeedbacks = async () => {
            const feedbackMap = {};
            for (const skill of userSkills) {
              setModalLoading(true);
              const res = await fetch("/api/generate-skill-feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ skillId: skill.skill_name })
              });
              const data = await res.json();
              feedbackMap[skill.skill_name] = data.feedback || "No feedback.";
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
  }, [userSkills]);

  if (loading) {
    return (
      <div className="skills-loading">
        <div className="skills-loading-card">
          <div className="skills-loading-header">
            <h2 className="skills-loading-title">Loading Skills...</h2>
            <p className="skills-loading-description">Please wait while we fetch your skills</p>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="skills-header-buttons">
            <button className="skills-add-btn" onClick={() => setAddSkillModalOpen(true)}>
              <span className="skills-add-icon">+</span>
              Add Skill
            </button>
            <button
              className={`update-schedule-btn ${scheduleNeedsUpdate ? 'enabled' : 'disabled'}`}
              onClick={updateSchedule}
              disabled={!scheduleNeedsUpdate || isUpdatingSchedule}
            >
              {isUpdatingSchedule ? 'Updating...' : 'Update Schedule'}
            </button>
          </div>
        </div>

        {/* Skills Overview */}
        <div className="skills-overview">
          <div className="overview-card">
            <div className="overview-card-content">
              <div className="overview-item">
                <div className="overview-icon overview-icon-purple">🎯</div>
                <div className="overview-info">
                  <p className="overview-label">Total Skills</p>
                  <p className="overview-value">{userSkills.length}</p>
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
                  <p className="overview-value">{Math.round(userSkills.reduce((sum, skill) => sum + parseFloat(skill.total_hours), 0))}h</p>
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
                    {userSkills.length > 0 ? Math.round(userSkills.reduce((sum, skill) => sum + getLevelFromHours(skill.total_hours), 0) / userSkills.length) : 0}
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
                  <p className="overview-value">{userSkills.length > 0 ? Math.max(...userSkills.map((skill) => skill.day_streak)) : 0} days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills List */}
        <div className="skills-list">
          {userSkills.map((skillData) => {
            const level = getLevelFromHours(skillData.total_hours);
            const levelBadge = getLevelBadge(level);

            return (
              <div key={skillData.id} className="skill-card">
                <div className="skill-card-header">
                  <div className="skill-badges">
                    <span className={`skill-badge ${getSkillColor(skillData.skill_name)}`}>{skillData.skill_name}</span>
                    <span className={`level-badge ${levelBadge.color}`}>{levelBadge.label}</span>
                  </div>
                  <div className="skill-settings-container">
                    <button
                      className="skill-settings-btn"
                      onClick={() => setSkillDropdown(skillDropdown === skillData.skill_name ? null : skillData.skill_name)}
                    >
                      <span className="skill-settings-icon">⚙️</span>
                    </button>
                    {skillDropdown === skillData.skill_name && (
                      <div className="skill-dropdown">
                        <button
                          className="skill-dropdown-item skill-delete"
                          onClick={() => removeSkill(skillData.skill_name)}
                        >
                          <span className="skill-dropdown-icon">🗑️</span>
                          Delete Skill
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="skill-card-content">
                  {/* Progress Bar */}
                  <div className="skill-progress-section">
                    <div className="skill-progress-header">
                      <span>Level Progress</span>
                      <span>{level}%</span>
                    </div>
                    <div className="skill-progress-bar">
                      <div
                        className="skill-progress-fill"
                        style={{ width: `${level}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="skill-stats">
                    <div className="skill-stat">
                      <p className="skill-stat-value">{Math.round(skillData.total_hours)}</p>
                      <p className="skill-stat-label">Total Hours</p>
                    </div>
                    <div className="skill-stat">
                      <p className="skill-stat-value">{skillData.day_streak}</p>
                      <p className="skill-stat-label">Day Streak</p>
                    </div>
                  </div>

                  {/* Priority Slider */}
                  <div className="priority-section">
                    <div className="priority-header">
                      <label className="priority-label">Priority</label>
                      <span className="priority-value">{skillData.priority}/10</span>
                    </div>
                    <div className="priority-slider-container">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={skillData.priority}
                        className="priority-slider"
                        onChange={(e) => updatePriority(skillData.skill_name, parseInt(e.target.value))}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="skill-actions">
                    <button className="skill-action-btn" onClick={() => { setModalSkill(skillData.skill_name); setModalOpen(true); }}>
                      View Progress
                    </button>
                    <Link href="/dashboard">
                      <button className="skill-action-btn">Practice Now</button>
                    </Link>
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

        {/* Add Skills Modal */}
        {addSkillModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Add New Skills</h3>
                <button
                  className="modal-close-btn"
                  onClick={() => {
                    setAddSkillModalOpen(false);
                    setNewSkills([]);
                    setSearchTerm("");
                  }}
                >
                  ×
                </button>
              </div>

              <div className="modal-body">
                <p className="modal-subtitle">Type to add skills. Press Enter to add each skill. Maximum 5 skills at once.</p>

                <div className="add-skills-box">
                  <div className="add-skills-tags">
                    {newSkills.map((skill, index) => (
                      <div key={index} className="skill-tag">
                        <button
                          className="remove-btn"
                          onClick={() => removeNewSkill(skill)}
                          aria-label={`Remove ${skill}`}
                        >
                          ×
                        </button>
                        <span className="skill-text">{skill}</span>
                      </div>
                    ))}
                  </div>

                  <div className="add-skills-input-section">
                    <input
                      type="text"
                      className="add-skills-input"
                      placeholder="Type skill name and press Enter"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={handleAddSkillInput}
                      disabled={newSkills.length >= 5}
                    />
                    {newSkills.length >= 5 && (
                      <div className="max-skills-message">Maximum 5 skills reached</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setAddSkillModalOpen(false);
                    setNewSkills([]);
                    setSearchTerm("");
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={addSkills}
                  disabled={newSkills.length === 0}
                >
                  Add {newSkills.length} Skill{newSkills.length !== 1 ? 's' : ''}
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Add More Skills CTA */}
        <div className="add-skills-cta">
          <div className="add-skills-content">
            <div className="add-skills-icon">+</div>
            <h3 className="add-skills-title">Add More Skills</h3>
            <p className="add-skills-description">Expand your polymath journey by adding new skills to master</p>
            <button className="add-skills-btn" onClick={() => setAddSkillModalOpen(true)}>Browse Skills</button>
          </div>
        </div>
      </div>
    </div>
  );
}