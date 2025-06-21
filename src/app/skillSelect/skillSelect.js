"use client";
import { useState } from "react";
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

  const handleNextStep = () => {
    set
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

      <main>
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
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="guitar"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Guitar</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="drums"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Drums</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="piano"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Piano</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="singing"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Singing</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="violin"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Violin</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="music-theory"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Music Theory</span>
                    </label>
                  </div>
                </div>

                <div class="category">
                  <div class="category-header">
                    <span class="category-icon">💻</span>
                    Programming
                  </div>
                  <div class="skills-grid">
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="python"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Python</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="machine-learning"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Machine Learning</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="javascript"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">JavaScript</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="web-development"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Web Development</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="react"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">React</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="mobile-development"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Mobile Development</span>
                    </label>
                  </div>
                </div>

                <div class="category">
                  <div class="category-header">
                    <span class="category-icon"></span>
                    Languages
                  </div>
                  <div class="skills-grid">
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="spanish"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Spanish</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="japanese"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Japanese</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="french"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">French</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="mandarin"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Mandarin</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="german"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">German</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="italian"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Italian</span>
                    </label>
                  </div>
                </div>

                <div class="category">
                  <div class="category-header">
                    <span class="category-icon">🎨</span>
                    Arts & Design
                  </div>
                  <div class="skills-grid">
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="drawing"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Drawing</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="photography"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Photography</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="painting"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Painting</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="graphic-design"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Graphic Design</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="digital-art"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Digital Art</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="uiux-design"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">UI/UX Design</span>
                    </label>
                  </div>
                </div>

                <div class="category">
                  <div class="category-header">
                    <span class="category-icon">📚</span>
                    Academic
                  </div>
                  <div class="skills-grid">
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="mathematics"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Mathematics</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="history"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">History</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="physics"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Physics</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="philosophy"
                      />
                      <span class="skill-label">Philosophy</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="chemistry"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Chemistry</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="literature"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Literature</span>
                    </label>
                  </div>
                </div>

                <div class="category">
                  <div class="category-header">
                    <span class="category-icon">💪</span>
                    Fitness & Health
                  </div>
                  <div class="skills-grid">
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="yoga"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Yoga</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="martial-arts"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Martial Arts</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="weight-training"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Weight Training</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="dance"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Dance</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="running"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Running</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="meditation"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Meditation</span>
                    </label>
                  </div>
                </div>

                <div class="category">
                  <div class="category-header">
                    <span class="category-icon">🔧</span>
                    Practical Skills
                  </div>
                  <div class="skills-grid">
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="cooking"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Cooking</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="car-maintenance"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Car Maintenance</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="woodworking"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Woodworking</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="home-repair"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Home Repair</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="gardening"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Gardening</span>
                    </label>
                    <label class="skill-item">
                      <input
                        type="checkbox"
                        class="skill-checkbox"
                        name="skills"
                        value="electronics"
                        onChange={(e) => toggleSkill(e.target.value)}
                      />
                      <span class="skill-label">Electronics</span>
                    </label>
                  </div>
                </div>
                <div className="navigation">
                  <button type="button" className="btn btn-primary">
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
