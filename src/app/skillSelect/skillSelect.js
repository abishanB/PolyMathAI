"use client";
import "./skillSelect.css";
import Image from "next/image";
import { useState } from "react";
export default function SkillSelect({passSkillsToParent, setStep }) {
  const capitalizeFirstLetter = (skill) => skill.charAt(0).toUpperCase() + skill.slice(1);

  const [skills, setSkills] = useState([
    "Python (Suggestion)",
    "Piano (Suggestion)",
  ]);
  const [searchTerm, setSearchTerm] = useState(""); //current skill being typed
  const [maxSkillsMessage, setMaxSkillsMessage] = useState("");
  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };
  const handleEnter = (e) => {
    //when user types a skill then enter
    if (e.key === "Enter") {
      if (searchTerm == "") {
        return;
      }
      if (skills.length >= 5) {
        setMaxSkillsMessage("Maximum 5 Skills");
        return;
      } else {
        setMaxSkillsMessage("");
      }

      setSkills(
        (prev) =>
          prev.includes(searchTerm)
            ? prev.filter((s) => s !== searchTerm) // remove if already selected
            : [...prev, searchTerm] // add if not selected
      );
      setSearchTerm("");
    }
  };


  const handleNextStep = () => {
    passSkillsToParent(skills);
    setStep("skillPriority");
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
            <div className="step-indicator">Step 1 of 3</div>
          </div>
        </div>
      </header>

      <div>
        <section className="progress-section">
          <div className="container">
            <div className="progress-label">Progress</div>
            <div className="progress-bar">
              <div className="progress-fill-1"></div>
            </div>
            <div className="progress-percentage">33%</div>
          </div>
        </section>

        <div className="skills-container">
          <h2 className="skills-title">What do you want to learn?</h2>
          <p className="skills-subtitle">
            Type to Add Skills. Don&#39;t Worry! You can always add more later. Max
            5
          </p>

          <div className="skills-box">
            <div className="skills-header">
              <div className="skills-tags">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-tag">
                    <button
                      className="remove-btn"
                      onClick={() => removeSkill(skill)}
                      aria-label={`Remove ${skill}`}>
                      x
                    </button>
                    <span className="skill-text">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="search-section">
              <input
                type="text"
                className="search-input"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(capitalizeFirstLetter(e.target.value))
                }
                onKeyDown={handleEnter}
              />

              <div className="no-items">{maxSkillsMessage}</div>
            </div>
          </div>
           <div className="navigation">
                  <button
                    style={{visibility: "hidden"}}
                    >
                   
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNextStep}>
                    Next Step
                  </button>
                </div>
        </div>
      </div>
      
    </div>
  );
}
