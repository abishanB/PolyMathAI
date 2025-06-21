"use client";
import "./skillSelect.css";
import Image from "next/image";
export default function SkillSelect({ setSkills, setStep }) {
  const toggleSkill = (skill) => {
    setSkills(
      (prev) =>
        prev.includes(skill)
          ? prev.filter((s) => s !== skill) // remove if already selected
          : [...prev, skill] // add if not selected
    );
  };
  const musicSkills = ["Guitar", "Drums", "Piano", "Violin"];
  const programmingSkills = [
    "Python",
    "Machine Learning",
    "JavaScript",
    "Web Development",
    "React",
    "Mobile Development",
  ];
  const languageSkills = [
    "Spanish",
    "Japanese",
    "French",
    "Mandarin",
    "German",
    "Italian",
  ];
  const artsDesignSkills = [
    "Drawing",
    "Photography",
    "Painting",
    "Graphic Design",
    "Digital Art",
    "UI/UX Design",
  ];
  const fitnessHealthSkills = [
    "Yoga",
    "Martial Arts",
    "Weight Training",
    "Dance",
    "Running",
    "Meditation",
  ];
  const academicSkills = [
    "Mathematics",
    "History",
    "Physics",
    "Philosophy",
    "Chemistry",
    "Literature",
  ];
  const handleNextStep = () => {
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
              <div className="progress-fill"></div>
            </div>
            <div className="progress-percentage">33%</div>
          </div>
        </section>

        <section className="form-section">
          <div className="container">
            <div className="form-card">
              <h1 className="form-title">What do you want to learn?</h1>
              <p className="form-subtitle">
                Select all the skills you're interested in mastering. Don't
                worry, you can always add more later!
              </p>

              <form className="categories-grid">
                <div className="category">
                  <div className="category-header">
                    <span className="category-icon"></span>
                    Music
                  </div>

                  <div className="skills-grid">
                    {musicSkills.map((skill, index) => (
                      <label key={index} className="skill-item">
                        <input
                          type="checkbox"
                          className="skill-checkbox"
                          name="skills"
                          value={skill}
                          onChange={(e) => toggleSkill(e.target.value)}
                        />
                        <span className="skill-label">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="category">
                  <div className="category-header">
                    <span className="category-icon"></span>
                    Programming
                  </div>
                  <div className="skills-grid">
                    {programmingSkills.map((skill, index) => (
                      <label key={index} className="skill-item">
                        <input
                          type="checkbox"
                          className="skill-checkbox"
                          name="skills"
                          value={skill}
                          onChange={(e) => toggleSkill(e.target.value)}
                        />
                        <span className="skill-label">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="category">
                  <div className="category-header">
                    <span className="category-icon"></span>
                    Languages
                  </div>
                  <div className="skills-grid">
                    {languageSkills.map((skill, index) => (
                      <label key={index} className="skill-item">
                        <input
                          type="checkbox"
                          className="skill-checkbox"
                          name="skills"
                          value={skill}
                          onChange={(e) => toggleSkill(e.target.value)}
                        />
                        <span className="skill-label">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="category">
                  <div className="category-header">
                    <span className="category-icon"></span>
                    Arts & Design
                  </div>
                  <div className="skills-grid">
                    {artsDesignSkills.map((skill, index) => (
                      <label key={index} className="skill-item">
                        <input
                          type="checkbox"
                          className="skill-checkbox"
                          name="skills"
                          value={skill}
                          onChange={(e) => toggleSkill(e.target.value)}
                        />
                        <span className="skill-label">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="category">
                  <div className="category-header">
                    <span className="category-icon"></span>
                    Academic
                  </div>
                  <div className="skills-grid">
                    {academicSkills.map((skill, index) => (
                      <label key={index} className="skill-item">
                        <input
                          type="checkbox"
                          className="skill-checkbox"
                          name="skills"
                          value={skill}
                          onChange={(e) => toggleSkill(e.target.value)}
                        />
                        <span className="skill-label">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="category">
                  <div className="category-header">
                    <span className="category-icon"></span>
                    Fitness & Health
                  </div>
                  <div className="skills-grid">
                    {fitnessHealthSkills.map((skill, index) => (
                      <label key={index} className="skill-item">
                        <input
                          type="checkbox"
                          className="skill-checkbox"
                          name="skills"
                          value={skill}
                          onChange={(e) => toggleSkill(e.target.value)}
                        />
                        <span className="skill-label">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="navigation">
                  <button style={{ visibility: "hidden" }}></button>
                  <button
                    onClick={handleNextStep}
                    type="button"
                    className="btn btn-primary">
                    Next Step
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
