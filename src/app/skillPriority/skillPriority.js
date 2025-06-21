"use client";
import "./skillPriority.css";
import { useState } from "react";
import Image from "next/image";
export default function SkillPriority({ skills, setSkillPriority, setStep }) {
  const [priorities, setPriorities] = useState(
    //set each skills initally to 5/10
    skills.reduce((acc, skill) => {
      acc[skill] = 5;
      return acc;
    }, {})
  );
  const updatePriority = (skill, value) => {
    setPriorities((prev) => ({
      ...prev,
      [skill]: Number.parseInt(value),
    }));
  };

  const goBack = () => {
    setStep("skillSelect");
    // Add navigation logic here
  };

  const handleNextStep = () => {
    setSkillPriority(priorities);
    setStep("preferences");
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
            <div className="nav-brand">
                        <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
                        <h1 className="nav-title">PolymathAI</h1>
                      </div>
            <div className="step-indicator">Step 2 of 3</div>
          </div>
        </div>
      </header>

      <main>
        <section className="progress-section">
          <div className="container">
            <div className="progress-label">Progress</div>
            <div className="progress-bar">
              <div className="progress-fill-2"></div>
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
                  {skills.map((item, index) => (
                    <div key={index} className="priority-item">
                      <div className="priority-header">
                        <span className="skill-name">{item}</span>
                        <span className="priority-value">
                          Priority: {priorities[item]}/10
                        </span>
                      </div>
                      <div className="slider-container">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={priorities[item]}
                          className="priority-slider"
                          style={{
                            background: getSliderBackground(priorities[item]),
                          }}
                          onChange={(e) => updatePriority(item, e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
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
