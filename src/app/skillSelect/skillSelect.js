"use client";
import "./skillSelect.css";
export default function SkillSelect({setSkills, setStep}) {

  const toggleSkill = (skill) => {
    setSkills(
      (prev) =>
        prev.includes(skill)
          ? prev.filter((s) => s !== skill) // remove if already selected
          : [...prev, skill] // add if not selected
    );
    
  };
  const musicSkills = ["Guitar", "Drums", "Piano", "Violin"]
  const programmingSkills = ["Python", "Machine Learning", "JavaScript", "Web Development", "React", "Mobile Development"]
  const languageSkills = ["Spanish", "Japanese", "French", "Mandarin", "German", "Italian"]
  const artsDesignSkills = ["Drawing", "Photography", "Painting", "Graphic Design", "Digital Art", "UI/UX Design"]
  const fitnessHealthSkills = ["Yoga", "Martial Arts", "Weight Training", "Dance", "Running", "Meditation"]
  const academicSkills = ["Mathematics", "History", "Physics", "Philosophy", "Chemistry", "Literature"]
  const handleNextStep = () => {
    setStep("skillPriority")
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
            <div class="step-indicator">Step 1 of 3</div>
          </div>
        </div>
      </header>

      <div>
        <section class="progress-section">
          <div class="container">
            <div class="progress-label">Progress</div>
            <div class="progress-bar">
              <div class="progress-fill"></div>
            </div>
            <div class="progress-percentage">33%</div>
          </div>
        </section>

        <section class="form-section">
          <div class="container">
            <div class="form-card">
              <h1 class="form-title">What do you want to learn?</h1>
              <p class="form-subtitle">
                Select all the skills you're interested in mastering. Don't
                worry, you can always add more later!
              </p>

              <form class="categories-grid">
                <div class="category">
                  <div class="category-header">
                    <span class="category-icon">🎵</span>
                    Music
                  </div>
                  
                  <div class="skills-grid">
                    {musicSkills.map((skill, index) =>(
                     <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value={skill}
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">{skill}</span>
                    </label>
                  ))}
                  </div>
                </div>

                <div class="category">
                  <div class="category-header">
                    <span class="category-icon">💻</span>
                    Programming
                  </div>
                  <div class="skills-grid">
                    {programmingSkills.map((skill, index) =>(
                     <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value={skill}
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">{skill}</span>
                    </label>
                  ))}
                  </div>
                </div>

                <div class="category">
                  <div class="category-header">
                    <span class="category-icon"></span>
                    Languages
                  </div>
                  <div class="skills-grid">
                    {languageSkills.map((skill, index) =>(
                     <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value={skill}
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">{skill}</span>
                    </label>
                  ))}
                  </div>
                </div>

                <div class="category">
                  <div class="category-header">
                    <span class="category-icon">🎨</span>
                    Arts & Design
                  </div>
                  <div class="skills-grid">
                    {artsDesignSkills.map((skill, index) =>(
                     <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value={skill}
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">{skill}</span>
                    </label>
                  ))}
                  </div>
                </div>

                <div class="category">
                  <div class="category-header">
                    <span class="category-icon">📚</span>
                    Academic
                  </div>
                  <div class="skills-grid">
                    {academicSkills.map((skill, index) =>(
                     <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value={skill}
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">{skill}</span>
                    </label>
                  ))}
                  </div>
                </div>

                <div class="category">
                  <div class="category-header">
                    <span class="category-icon">💪</span>
                    Fitness & Health
                  </div>
                  <div class="skills-grid">
                    {fitnessHealthSkills.map((skill, index) =>(
                     <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value={skill}
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">{skill}</span>
                    </label>
                  ))}
                  </div>
                </div>

                <div className="navigation">
                  <button onClick={handleNextStep} type="button" className="btn btn-primary">
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
