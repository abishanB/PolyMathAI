"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./dashboard.css";

const formatTo12Hour = (time24) => {
  const [hours, minutes] = time24.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
};

export default function DashboardPage() {
  const [userProfile, setUserProfile] = useState(null);
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user profile
    const profile = localStorage.getItem("polymathProfile");
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      setUserProfile(parsedProfile);

      // Check if we have a Gemini-generated schedule first
      const geminiSchedule = localStorage.getItem("generatedSchedule");
      if (geminiSchedule) {
        setTodaySchedule(JSON.parse(geminiSchedule));
      } else {
        generateSchedule(parsedProfile);
      }
    }

    // Load completed tasks
    const completed = localStorage.getItem("completedTasks");
    if (completed) {
      setCompletedTasks(JSON.parse(completed));
    }

    setIsLoading(false);
  }, []);

  const generateSchedule = (profile) => {
    // Simulate AI-generated schedule based on user preferences
    const schedule = [];
    const skillTasks = {
      Guitar: ["Chord progressions", "Scale practice", "Song learning", "Finger exercises"],
      Piano: ["Scales practice", "Piece rehearsal", "Sight reading", "Technique work"],
      Python: ["Algorithm practice", "Project coding", "Code review", "Documentation"],
      JavaScript: ["Framework learning", "Project development", "Debugging practice", "API integration"],
      Spanish: ["Vocabulary review", "Grammar exercises", "Conversation practice", "Listening comprehension"],
      French: ["Pronunciation practice", "Reading comprehension", "Writing exercises", "Cultural study"],
      Drawing: ["Figure drawing", "Still life practice", "Technique study", "Portfolio work"],
      Photography: ["Composition practice", "Editing workflow", "Portfolio review", "Technique exploration"],
      Music: ["Practice session", "Theory study", "Song learning", "Technique work"],
      Programming: ["Code practice", "Project work", "Learning new concepts", "Problem solving"],
      Languages: ["Vocabulary practice", "Grammar study", "Conversation practice", "Reading comprehension"],
      "Arts & Design": ["Creative practice", "Skill development", "Project work", "Technique study"],
      Academic: ["Study session", "Research", "Problem solving", "Review"],
      "Fitness & Health": ["Exercise routine", "Skill practice", "Goal tracking", "Technique work"]
    };

    let currentTime = 17; // Start at 5 PM
    const totalMinutes = profile.availableHours * 60;
    const skillCount = profile.skills.length;
    const baseTimePerSkill = Math.floor(totalMinutes / skillCount);

    profile.skills.forEach((skill, index) => {
      const priority = profile.priorities[skill] || 5;
      const adjustedTime = Math.floor(baseTimePerSkill * (priority / 5));
      const tasks = skillTasks[skill] || ["Practice session", "Study time", "Skill development"];
      const randomTask = tasks[Math.floor(Math.random() * tasks.length)];

      const startHour = Math.floor(currentTime);
      const startMinute = Math.round((currentTime % 1) * 60);
      const endTime = currentTime + adjustedTime / 60;
      const endHour = Math.floor(endTime);
      const endMinute = Math.round((endTime % 1) * 60);

      const startTime24 = `${startHour.toString().padStart(2, "0")}:${startMinute.toString().padStart(2, "0")}`;
      const endTime24 = `${endHour.toString().padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}`;

      schedule.push({
        id: `${skill}-${index}`,
        skill,
        task: randomTask,
        startTime: formatTo12Hour(startTime24),
        endTime: formatTo12Hour(endTime24),
        duration: adjustedTime,
        completed: false,
        priority,
      });

      currentTime = endTime + 0.5; // 30-minute break
    });

    setTodaySchedule(schedule);
  };

  const toggleTaskCompletion = (taskId) => {
    const newCompleted = completedTasks.includes(taskId)
      ? completedTasks.filter((id) => id !== taskId)
      : [...completedTasks, taskId];

    setCompletedTasks(newCompleted);
    localStorage.setItem("completedTasks", JSON.stringify(newCompleted));
  };

  const getSkillColor = (skill) => {
    const colors = ["skill-purple", "skill-blue", "skill-green", "skill-yellow", "skill-pink", "skill-indigo"];
    return colors[skill.length % colors.length];
  };

  const completionRate =
    todaySchedule.length > 0
      ? (completedTasks.filter((id) => todaySchedule.some((task) => task.id === id)).length / todaySchedule.length) * 100
      : 0;

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="dashboard-loading">
        <div className="loading-card">
          <div className="loading-card-header">
            <h2 className="loading-card-title">Welcome to PolymathAI</h2>
            <p className="loading-card-description">Let's set up your learning profile first</p>
          </div>
          <div className="loading-card-content">
            <Link href="/onboarding">
              <button className="btn btn-primary">Start Onboarding</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Navigation */}
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
            </div>
          </div>
        </div>
      </nav>

      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Good evening! Ready to learn?</h1>
          <p className="dashboard-subtitle">Here's your AI-optimized schedule for today</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-item">
                <div className="stat-icon stat-icon-purple">🎯</div>
                <div className="stat-info">
                  <p className="stat-label">Today's Progress</p>
                  <p className="stat-value">{Math.round(completionRate)}%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-item">
                <div className="stat-icon stat-icon-blue">⏰</div>
                <div className="stat-info">
                  <p className="stat-label">Learning Time</p>
                  <p className="stat-value">{userProfile.availableHours}h</p>
                </div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-item">
                <div className="stat-icon stat-icon-green">⚡</div>
                <div className="stat-info">
                  <p className="stat-label">Active Skills</p>
                  <p className="stat-value">{userProfile.skills.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-content">
              <div className="stat-item">
                <div className="stat-icon stat-icon-orange">📈</div>
                <div className="stat-info">
                  <p className="stat-label">Streak</p>
                  <p className="stat-value">7 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Today's Schedule */}
          <div className="schedule-section">
            <div className="schedule-card">
              <div className="schedule-card-header">
                <div className="schedule-header">
                  <div>
                    <h2 className="schedule-title">
                      <span className="schedule-icon">📅</span>
                      Today's Schedule
                    </h2>
                    <p className="schedule-description">
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <button className="schedule-menu-btn">⋯</button>
                </div>
              </div>
              <div className="schedule-content">
                {todaySchedule.map((item) => {
                  const isCompleted = completedTasks.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className={`schedule-item ${isCompleted ? "schedule-item-completed" : "schedule-item-pending"}`}
                    >
                      <div className="schedule-item-left">
                        <button
                          onClick={() => toggleTaskCompletion(item.id)}
                          className={`completion-btn ${isCompleted ? "completion-btn-completed" : "completion-btn-pending"}`}
                        >
                          {isCompleted ? "✅" : "▶️"}
                        </button>
                        <div>
                          <div className="schedule-item-badges">
                            <span className={`skill-badge ${getSkillColor(item.skill)}`}>{item.skill}</span>
                            <span className="priority-text">Priority {item.priority}/10</span>
                          </div>
                          <div className={`schedule-item-task ${isCompleted ? "task-completed" : "task-pending"}`}>
                            {item.task}
                          </div>
                          <div className="schedule-item-duration">{item.duration} minutes</div>
                        </div>
                      </div>
                      <div className="schedule-item-right">
                        <div className="schedule-item-time">
                          {item.startTime} - {item.endTime}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            {/* Progress Overview */}
            <div className="sidebar-card">
              <div className="sidebar-card-header">
                <h3>Today's Progress</h3>
              </div>
              <div className="sidebar-card-content">
                <div className="progress-section">
                  <div className="overall-progress">
                    <div className="progress-header">
                      <span>Overall Completion</span>
                      <span>{Math.round(completionRate)}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${completionRate}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="skills-progress">
                    <h4 className="skills-progress-title">Skills Progress</h4>
                    {userProfile.skills.slice(0, 5).map((skill) => {
                      const skillTasks = todaySchedule.filter((task) => task.skill === skill);
                      const completedSkillTasks = skillTasks.filter((task) => completedTasks.includes(task.id));
                      const skillProgress =
                        skillTasks.length > 0 ? (completedSkillTasks.length / skillTasks.length) * 100 : 0;

                      return (
                        <div key={skill} className="skill-progress-item">
                          <div className="skill-progress-header">
                            <span>{skill}</span>
                            <span>{Math.round(skillProgress)}%</span>
                          </div>
                          <div className="skill-progress-bar">
                            <div
                              className="skill-progress-fill"
                              style={{ width: `${skillProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="sidebar-card">
              <div className="sidebar-card-header">
                <h3>Quick Actions</h3>
              </div>
              <div className="sidebar-card-content quick-actions">
                <button className="action-btn">
                  <span className="action-icon">📅</span>
                  View Full Calendar
                </button>
                <Link href="/skills">
                  <button className="action-btn">
                    <span className="action-icon">🎯</span>
                    Manage Skills
                  </button>
                </Link>
                <button className="action-btn">
                  <span className="action-icon">📈</span>
                  View Analytics
                </button>
              </div>
            </div>

            {/* AI Insights */}
            <div className="sidebar-card">
              <div className="sidebar-card-header">
                <h3>AI Insights</h3>
              </div>
              <div className="sidebar-card-content">
                <div className="insights">
                  <div className="insight insight-blue">
                    <p className="insight-title">Optimization Tip</p>
                    <p className="insight-text">
                      Consider practicing guitar before coding - physical activities can improve focus for mental tasks.
                    </p>
                  </div>
                  <div className="insight insight-green">
                    <p className="insight-title">Progress Note</p>
                    <p className="insight-text">
                      You're maintaining a great learning streak! Your consistency is paying off.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}