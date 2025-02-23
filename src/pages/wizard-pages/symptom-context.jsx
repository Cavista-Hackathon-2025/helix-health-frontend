"use client"

import { Label } from "@/components/ui/label"
import { PillButton } from "@/components/ui/pill-button"
import { MultiSelectHint } from "@/components/ui/multi-select-hint"
import { OtherInput } from "@/components/ui/other-input"

export default function SymptomContext({ data, updateData }) {
  const frequencyOptions = ["Continuously", "Occasionally", "Only at Certain Times", "Other"]
  const reliefOptions = ["Rest", "Medication", "Nothing", "Other"]
  const worseningOptions = ["Movement", "Eating", "Stress", "Nothing", "Other"]

  const handleOptionSelect = (field, value) => {
    if (value === "Other") {
      if (data[field] !== "Other") {
        updateData({
          [field]: "Other",
          [`other${field.charAt(0).toUpperCase() + field.slice(1)}`]:
            data[`other${field.charAt(0).toUpperCase() + field.slice(1)}`] || "",
        })
      } else {
        updateData({
          [field]: "",
          [`other${field.charAt(0).toUpperCase() + field.slice(1)}`]: "",
        })
      }
      return
    }
    updateData({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-purple-900">Symptom Context</h2>
      <div className="space-y-4">
        <div>
          <Label>How often do symptoms occur?</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {frequencyOptions.map((option) => (
              <PillButton
                key={option}
                selected={data.frequency === option}
                onClick={() => handleOptionSelect("frequency", option)}
              >
                {option}
              </PillButton>
            ))}
          </div>
          {data.frequency === "Other" && (
            <OtherInput
              value={data.otherFrequency || ""}
              onChange={(e) => updateData({ otherFrequency: e.target.value })}
              placeholder="Please specify frequency"
            />
          )}
        </div>

        <div>
          <Label>What makes the symptoms better?</Label>
          <MultiSelectHint />
          <div className="mt-2 flex flex-wrap gap-2">
            {reliefOptions.map((option) => (
              <PillButton
                key={option}
                selected={data.relief === option}
                onClick={() => handleOptionSelect("relief", option)}
              >
                {option}
              </PillButton>
            ))}
          </div>
          {data.relief === "Other" && (
            <OtherInput
              value={data.otherRelief || ""}
              onChange={(e) => updateData({ otherRelief: e.target.value })}
              placeholder="Please specify what helps"
            />
          )}
        </div>

        <div>
          <Label>What makes the symptoms worse?</Label>
          <MultiSelectHint />
          <div className="mt-2 flex flex-wrap gap-2">
            {worseningOptions.map((option) => (
              <PillButton
                key={option}
                selected={data.aggravation === option}
                onClick={() => handleOptionSelect("aggravation", option)}
              >
                {option}
              </PillButton>
            ))}
          </div>
          {data.aggravation === "Other" && (
            <OtherInput
              value={data.otherAggravation || ""}
              onChange={(e) => updateData({ otherAggravation: e.target.value })}
              placeholder="Please specify what makes it worse"
            />
          )}
        </div>

        <div>
          <Label>Have you experienced this before?</Label>
          <div className="mt-2 flex gap-2">
            <PillButton
              selected={data.previousExperience === true}
              onClick={() => updateData({ previousExperience: true })}
            >
              Yes
            </PillButton>
            <PillButton
              selected={data.previousExperience === false}
              onClick={() => updateData({ previousExperience: false })}
            >
              No
            </PillButton>
          </div>
        </div>
      </div>
    </div>
  )
}

