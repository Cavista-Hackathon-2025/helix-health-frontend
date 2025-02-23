"use client"

import { Label } from "@/components/ui/label"
import { PillButton } from "@/components/ui/pill-button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export default function UrgencyAssessment({ data, updateData }) {
  const emergencySymptoms = ["Chest pain", "Difficulty breathing", "Loss of consciousness", "Severe bleeding"]

  const toggleEmergencySymptom = (symptom) => {
    const newSymptoms = data.emergencySymptoms.includes(symptom)
      ? data.emergencySymptoms.filter((s) => s !== symptom)
      : [...data.emergencySymptoms, symptom]
    updateData({ emergencySymptoms: newSymptoms })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-blue-900">Urgency Assessment</h2>

      {data.emergencySymptoms.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Emergency Medical Attention Required</AlertTitle>
          <AlertDescription>
            Based on your symptoms, you should seek immediate medical attention or call emergency services.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div>
          <Label>Are you experiencing any of these emergency symptoms?</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {emergencySymptoms.map((symptom) => (
              <PillButton
                key={symptom}
                selected={data.emergencySymptoms.includes(symptom)}
                onClick={() => toggleEmergencySymptom(symptom)}
              >
                {symptom}
              </PillButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

