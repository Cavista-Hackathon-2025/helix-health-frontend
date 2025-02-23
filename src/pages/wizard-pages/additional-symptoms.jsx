/* eslint-disable react/prop-types */
"use client"

import { Label } from "@/components/ui/label"
import { PillButton } from "@/components/ui/pill-button"
import { Textarea } from "@/components/ui/textarea"
import { MultiSelectHint } from "@/components/ui/multi-select-hint"
import { OtherInput } from "@/components/ui/other-input"

export default function AdditionalSymptoms({ data, updateData }) {
  const additionalSymptoms = ["Nausea", "Vomiting", "Dizziness", "Shortness of Breath", "Other"]
  const conditions = ["Diabetes", "Hypertension", "Asthma", "None", "Other"]

  const toggleSymptom = (symptom) => {
    if (symptom === "Other") {
      if (!data.additionalSymptoms.includes("Other")) {
        updateData({
          additionalSymptoms: [...data.additionalSymptoms, "Other"],
          otherAdditionalSymptoms: data.otherAdditionalSymptoms || "",
        })
      } else {
        const newSymptoms = data.additionalSymptoms.filter((s) => s !== "Other")
        updateData({
          additionalSymptoms: newSymptoms,
          otherAdditionalSymptoms: "",
        })
      }
      return
    }

    const newSymptoms = data.additionalSymptoms.includes(symptom)
      ? data.additionalSymptoms.filter((s) => s !== symptom)
      : [...data.additionalSymptoms, symptom]
    updateData({ additionalSymptoms: newSymptoms })
  }

  const toggleCondition = (condition) => {
    if (condition === "Other") {
      if (!data.medicalConditions.includes("Other")) {
        updateData({
          medicalConditions: [...data.medicalConditions, "Other"],
          otherMedicalConditions: data.otherMedicalConditions || "",
        })
      } else {
        const newConditions = data.medicalConditions.filter((c) => c !== "Other")
        updateData({
          medicalConditions: newConditions,
          otherMedicalConditions: "",
        })
      }
      return
    }

    const newConditions = data.medicalConditions.includes(condition)
      ? data.medicalConditions.filter((c) => c !== condition)
      : [...data.medicalConditions, condition]
    updateData({ medicalConditions: newConditions })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-purple-900">Additional Symptoms & Conditions</h2>
      <div className="space-y-4">
        <div>
          <Label>Additional Symptoms</Label>
          <MultiSelectHint />
          <div className="mt-2 flex flex-wrap gap-2">
            {additionalSymptoms.map((symptom) => (
              <PillButton
                key={symptom}
                selected={data.additionalSymptoms.includes(symptom)}
                onClick={() => toggleSymptom(symptom)}
              >
                {symptom}
              </PillButton>
            ))}
          </div>
          {data.additionalSymptoms.includes("Other") && (
            <OtherInput
              value={data.otherAdditionalSymptoms || ""}
              onChange={(e) => updateData({ otherAdditionalSymptoms: e.target.value })}
              placeholder="Please specify other symptoms (Seperate with comma)"
            />
          )}
        </div>

        <div>
          <Label>Existing Medical Conditions</Label>
          <MultiSelectHint />
          <div className="mt-2 flex flex-wrap gap-2">
            {conditions.map((condition) => (
              <PillButton
                key={condition}
                selected={data.medicalConditions.includes(condition)}
                onClick={() => toggleCondition(condition)}
              >
                {condition}
              </PillButton>
            ))}
          </div>
          {data.medicalConditions.includes("Other") && (
            <OtherInput
              value={data.otherMedicalConditions || ""}
              onChange={(e) => updateData({ otherMedicalConditions: e.target.value })}
              placeholder="Please specify other conditions (Seperate with comma)"
            />
          )}
        </div>

        <div>
          <Label>Are you currently taking any medications?</Label>
          <div className="mt-2 flex gap-2">
            <PillButton selected={data.medications === true} onClick={() => updateData({ medications: true })}>
              Yes
            </PillButton>
            <PillButton selected={data.medications === false} onClick={() => updateData({ medications: false })}>
              No
            </PillButton>
          </div>
        </div>

        {data.medications && (
          <div>
            <Label htmlFor="medicationList">Please list your medications</Label>
            <Textarea
              id="medicationList"
              value={data.medicationList}
              onChange={(e) => updateData({ medicationList: e.target.value })}
              placeholder="Enter your current medications"
              className="mt-1.5 border-purple-100 bg-purple-50/50 placeholder:text-purple-400
                       focus-visible:border-purple-200 focus-visible:ring-purple-100"
            />
          </div>
        )}
      </div>
    </div>
  )
}

