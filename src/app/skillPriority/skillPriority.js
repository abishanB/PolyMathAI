"use client"
import "./skillPriority.css";
import { useState } from "react";

export default function SkillPriority() {
  const [priorities, setPriorities] = useState({
    electronics: 5,
    gardening: 5,
  });

  const updatePriority = (skill, value) => {
    setPriorities((prev) => ({
      ...prev,
      [skill]: Number.parseInt(value),
    }));
  };

  const goBack = () => {
    console.log("Going back to step 1");
    // Add navigation logic here
  };

  const nextStep = () => {
    console.log("Going to step 3");
    console.log("Current priorities:", priorities);
    // Add navigation logic here
  };

  const getSliderBackground = (value) => {
    const percentage = ((value - 1) / 9) * 100;
    return `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;
  };

  return (
    <div>
      <header>
        <div className="container">
          <div className="header-content">
            <a href="#" className="logo">
              <div className="logo-icon">P</div>
              PolymathAI
            </a>
            <div className="step-indicator">Step 2 of 3</div>
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
            <div className="progress-percentage">67%</div>
          </div>
        </section>

        <section className="form-section">
          <div className="container">
            <div className="form-card">
              <h1 className="form-title">Set Your Priorities</h1>
              <p className="form-subtitle">
                How important is each skill to you? This helps our AI allocate
                time more effectively.
              </p>

              <form className="priorities-form">
                <div className="priorities-list">
                  {/* Electronics Priority */}
                  <div className="priority-item">
                    <div className="priority-header">
                      <span className="skill-name">Electronics</span>
                      <span className="priority-value">
                        Priority: {priorities.electronics}/10
                      </span>
                    </div>
                    <div className="slider-container">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={priorities.electronics}
                        className="priority-slider"
                        style={{
                          background: getSliderBackground(
                            priorities.electronics
                          ),
                        }}
                        onChange={(e) =>
                          updatePriority("electronics", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Gardening Priority */}
                  <div className="priority-item">
                    <div className="priority-header">
                      <span className="skill-name">Gardening</span>
                      <span className="priority-value">
                        Priority: {priorities.gardening}/10
                      </span>
                    </div>
                    <div className="slider-container">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={priorities.gardening}
                        className="priority-slider"
                        style={{
                          background: getSliderBackground(priorities.gardening),
                        }}
                        onChange={(e) =>
                          updatePriority("gardening", e.target.value)
                        }
                      />
                    </div>
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
                    onClick={nextStep}>
                    Next Step
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
