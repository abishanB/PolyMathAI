"use client"
import { useState } from "react";
import SkillSelect from "../skillSelect/skillSelect.js";

export default function SkillPriority() {
  const [step, setStep] = useState("skillSelect")
  const [skills, setSkills] = useState([])
  if (step == "skillSelect"){
    return <SkillSelect setSkills={setSkills} setStep={setStep}/>
  }
  if (step == "skillPriority"){

  }
}
