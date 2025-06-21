"use client";

import { useState } from "react";
import "./preferences.css";
//users pick their preffered times for their schedule.
export default function SchedulePreferences({ setPreferences, setStep, onComplete }) {
  const [dailyHours, setDailyHours] = useState(2);
  const [selectedTimes, setSelectedTimes] = useState([]);

  const timeSlots = [
    { id: "early-morning", label: "Early Morning (6-9 AM)" },
    { id: "morning", label: "Morning (9-12 PM)" },
    { id: "afternoon", label: "Afternoon (12-5 PM)" },
    { id: "evening", label: "Evening (5-8 PM)" },
    { id: "night", label: "Night (8-11 PM)" },
    { id: "late-night", label: "Late Night (11 PM+)" },
  ];

  const handleTimeSlotChange = (timeSlotId) => {
    setSelectedTimes((prev) => {
      if (prev.includes(timeSlotId)) {
        return prev.filter((id) => id !== timeSlotId);
      } else {
        return [...prev, timeSlotId];
      }
    });
  };

  const getSliderBackground = (value) => {
    const percentage = ((value - 0.5) / 7.5) * 100;
    return `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;
  };

  const formatHours = (hours) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)} min`;
    } else {
      return `${hours} hour${hours !== 1 ? "s" : ""}`;
    }
  };

  const goBack = () => {
    console.log("Going back to step 2");
    // Add navigation logic here
  };

  const handleNextStep = () => {
    const preferencesData = {
      dailyHours: dailyHours,
      selectedTimes: selectedTimes,
    };
    setPreferences(preferencesData);
    
    // If onComplete function is provided, call it instead of setting step
    if (onComplete) {
      onComplete();
    } else {
      setStep("createSchedule");
    }
  };

  return (
    <div className="app">
      <header>
        <div className="container">
          <div className="header-content">
            <a href="#" className="logo">
              <div className="logo-icon">P</div>
              PolymathAI
            </a>
            <div className="step-indicator">Step 3 of 3</div>
          </div>
        </div>
      </header>

      <main>
        <section className="progress-section">
          <div className="container">
            <div className="progress-label">Progress</div>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <div className="progress-percentage">100%</div>
          </div>
        </section>

        <section className="form-section">
          <div className="container">
            <div className="form-card">
              <h1 className="form-title">Schedule Preferences</h1>
              <p className="form-subtitle">
                Tell us about your availability so we can create the perfect
                learning schedule.
              </p>

              <form className="schedule-form">
                {/* Daily Hours Slider */}
                <div className="form-group">
                  <label className="form-label">
                    How many hours per day can you dedicate to learning?
                  </label>
                  <div className="slider-section">
                    <div className="slider-container">
                      <input
                        type="range"
                        min="0.5"
                        max="8"
                        step="0.5"
                        value={dailyHours}
                        className="time-slider"
                        style={{ background: getSliderBackground(dailyHours) }}
                        onChange={(e) =>
                          setDailyHours(Number.parseFloat(e.target.value))
                        }
                      />
                     
                    </div>
                    <div className="current-value">
                      {formatHours(dailyHours)}
                    </div>
                  </div>
                </div>

                {/* Time Preferences */}
                <div className="form-group">
                  <label className="form-label">
                    When do you prefer to learn? (Select all that apply)
                  </label>
                  <div className="time-slots-grid">
                    {timeSlots.map((slot) => (
                      <label key={slot.id} className="time-slot-item">
                        <input
                          type="checkbox"
                          className="time-checkbox"
                          checked={selectedTimes.includes(slot.id)}
                          onChange={() => handleTimeSlotChange(slot.id)}
                        />
                        <span className="time-slot-label">{slot.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="navigation">
                  <button
                    type="button"
                    className="btn btn-back"
                    onClick={goBack}>
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNextStep}>
                    Create My Schedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
