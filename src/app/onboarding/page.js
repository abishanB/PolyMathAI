"use client"
import { useState } from "react";
import SkillSelect from "../skillSelect/skillSelect.js";
import SkillPriority from "../skillPriority/skillPriority.js";
import SchedulePreferences from "../preferences/preferences.js";
export default function onboarding() {
  const [step, setStep] = useState("skillSelect")
  const [skills, setSkills] = useState([])
  const [skillPriority, setSkillPriority] = useState({})
  const [preferences, setPreferences] = useState({
    dailyHours: null,
    selectedTimes: null
  })
  if (step == "skillSelect"){
    return <SkillSelect setSkills={setSkills} setStep={setStep}/>
  }
  if (step == "skillPriority"){
    console.log(skills)
    return <SkillPriority skills={skills} setSkillPriority={setSkillPriority} setStep={setStep} />
  }

  if (step == "preferences"){
    return <SchedulePreferences setPreferences={setPreferences} setStep={setStep}/>
  }

  if (step == "createSchedule"){
    console.log(skills)
    console.log(skillPriority)
    console.log(preferences)


  }
}
