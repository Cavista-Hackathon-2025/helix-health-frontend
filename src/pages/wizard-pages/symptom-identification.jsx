/* eslint-disable react/prop-types */
"use client"

import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { PopoverContent, PopoverTrigger, Popover } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { PillButton } from "@/components/ui/pill-button"
import { MultiSelectHint } from "@/components/ui/multi-select-hint"
import { OtherInput } from "@/components/ui/other-input"

export default function SymptomIdentification({ data, updateData }) {
  const symptoms = ["Fever", "Cough", "Headache", "Fatigue", "Nausea", "Body Ache", "Other"]
  const severityLevels = ["Mild", "Moderate", "Severe"]
  const progressionStates = ["Better", "Worse", "No Change"]

  const toggleSymptom = (symptom) => {
    if (symptom === "Other") {
      if (!data.symptoms.includes("Other")) {
        updateData({
          symptoms: [...data.symptoms, "Other"],
          otherSymptoms: data.otherSymptoms || "",
        })
      } else {
        const newSymptoms = data.symptoms.filter((s) => s !== "Other")
        updateData({
          symptoms: newSymptoms,
          otherSymptoms: "",
        })
      }
      return
    }

    const newSymptoms = data.symptoms.includes(symptom)
      ? data.symptoms.filter((s) => s !== symptom)
      : [...data.symptoms, symptom]
    updateData({ symptoms: newSymptoms })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-blue-900">Symptom Identification</h2>
      <div className="space-y-4">
        <div>
          <Label>Symptoms</Label>
          <MultiSelectHint />
          <div className="mt-2 flex flex-wrap gap-2">
            {symptoms.map((symptom) => (
              <PillButton
                key={symptom}
                selected={data.symptoms.includes(symptom)}
                onClick={() => toggleSymptom(symptom)}
              >
                {symptom}
              </PillButton>
            ))}
          </div>
          {data.symptoms.includes("Other") && (
            <OtherInput
              value={data.otherSymptoms || ""}
              onChange={(e) => updateData({ otherSymptoms: e.target.value })}
              placeholder="Please specify other symptoms (Seperate with comma)"
            />
          )}
        </div>

        <div>
          <Label>When did symptoms start?</Label>
          <div className="mt-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !data.symptomDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data.symptomDate ? format(data.symptomDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={data.symptomDate}
                  onSelect={(date) => updateData({ symptomDate: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div>
          <Label>Symptom Severity</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {severityLevels.map((level) => (
              <PillButton
                key={level}
                selected={data.severity === level}
                onClick={() => updateData({ severity: level })}
              >
                {level}
              </PillButton>
            ))}
          </div>
        </div>

        <div>
          <Label>Symptom Progression</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {progressionStates.map((state) => (
              <PillButton
                key={state}
                selected={data.progression === state}
                onClick={() => updateData({ progression: state })}
              >
                {state}
              </PillButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

