"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import SkillSelect from "../skillSelect/skillSelect.js";
import SkillPriority from "../skillPriority/skillPriority.js";
import SchedulePreferences from "../preferences/preferences.js";
import "./onboarding.css";

export default function Onboarding() {
  const [step, setStep] = useState("skillSelect");
  const [skills, setSkills] = useState([]);
  const [skillPriority, setSkillPriority] = useState({});
  const [preferences, setPreferences] = useState({
    dailyHours: null,
    selectedTimes: null,
  });
  const [isGeneratingSchedule, setIsGeneratingSchedule] = useState(false);
  const router = useRouter();

  const handleCreateSchedule = async () => {
    setIsGeneratingSchedule(true);
    
    // Save user preferences to localStorage
    const userProfile = {
      skills: skills,
      priorities: skillPriority,
      availableHours: preferences.dailyHours,
      preferredTimes: preferences.selectedTimes,
    };
    localStorage.setItem("polymathProfile", JSON.stringify(userProfile));
    
    // Generate schedule using Gemini AI
    try {
      const response = await fetch('/api/generate-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfile),
      });
      
      if (response.ok) {
        const { schedule } = await response.json();
        localStorage.setItem("generatedSchedule", JSON.stringify(schedule));
        console.log("AI-generated schedule saved successfully");
      } else {
        console.error("Failed to generate schedule with Gemini AI");
      }
    } catch (error) {
      console.error("Failed to generate schedule with Gemini AI:", error);
    }
    
    // Save skills to database and mark onboarding as completed
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // First, save skills to user_skills table
        const skillsToInsert = skills.map(skillName => ({
          user_id: user.id,
          skill_name: skillName,
          priority: skillPriority[skillName] || 5,
          total_hours: 0,
          day_streak: 0
        }));

        const { error: skillsError } = await supabase
          .from('user_skills')
          .insert(skillsToInsert);

        if (skillsError) {
          console.error("Failed to save skills to database:", skillsError);
        } else {
          console.log("Skills saved to database successfully");
        }

        // Then mark onboarding as completed
        await supabase
          .from('profiles')
          .update({ onboarding_completed: true })
          .eq('id', user.id);
        console.log("Onboarding marked as completed");
      }
    } catch (error) {
      console.error("Failed to update onboarding status:", error);
    }
    
    setIsGeneratingSchedule(false);
    router.push("/dashboard");
  };

  // Loading screen for AI schedule generation
  if (isGeneratingSchedule) {
    return (
      <div className="schedule-loading-screen">
        <div className="loading-container">
          <div className="loading-spinner-large"></div>
          <div className="loading-text">Creating your personalized schedule</div>
          <div className="loading-dots">
            <span className="dot-1">.</span>
            <span className="dot-2">.</span>
            <span className="dot-3">.</span>
          </div>
          <div className="loading-progress-bar">
            <div className="loading-progress-fill"></div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "skillSelect") {
    return <SkillSelect passSkillsToParent={setSkills} setStep={setStep} />;
  }
  
  if (step === "skillPriority") {
    return (
      <SkillPriority
        skills={skills}
        setSkillPriority={setSkillPriority}
        setStep={setStep}
      />
    );
  }

  if (step === "preferences") {
    return (
      <SchedulePreferences 
        setPreferences={setPreferences} 
        setStep={setStep}
        onComplete={handleCreateSchedule}
      />
    );
  }

  if (step === "createSchedule") {
    handleCreateSchedule();
    return null;
  }

  return null;
}
