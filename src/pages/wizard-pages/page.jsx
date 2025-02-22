import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import BasicInformation from "@/components/steps/basic-information"
import SymptomIdentification from "@/components/steps/symptom-identification"
import SymptomContext from "@/components/steps/symptom-context"
import AdditionalSymptoms from "@/components/steps/additional-symptoms"
import PossibleTriggers from "@/components/steps/possible-triggers"
import LifestyleFactors from "@/components/steps/lifestyle-factors"
import UrgencyAssessment from "@/components/steps/urgency-assessment"
// import Nav from "@/components/Nav"
import AuthenticatedNav from "@/components/AuthenticatedNav"
import { ExtraPromptUpload } from "@/components/steps/Extra-prompt-upload"

export default function SymptomForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
   // Symptom Identification
    symptoms: [],
    symptomDate: null,
    severity: "",
    progression: "",
    // Symptom Context
    frequency: "",
    relief: "",
    aggravation: "",
    previousExperience: false,
    // Additional Symptoms
    additionalSymptoms: [],
    medicalConditions: [],
    medications: false,
    medicationList: "",
    // Possible Triggers
    sickContact: false,
    recentTravel: false,
    travelLocation: "",
    environmentalFactors: false,
    // Lifestyle Factors
    smoking: false,
    alcohol: false,
    activityLevel: "",
    diet: "",
    // Urgency Assessment
    emergencySymptoms: [],
    //Extra Prompt data
    medicalImages: [],
    extraPrompts: "",

  })

  const totalSteps = 7

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }))
  }

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <SymptomIdentification data={formData} updateData={updateFormData} />
      case 2:
        return <SymptomContext data={formData} updateData={updateFormData} />
      case 3:
        return <AdditionalSymptoms data={formData} updateData={updateFormData} />
      case 4:
        return <PossibleTriggers data={formData} updateData={updateFormData} />
      case 5:
        return <LifestyleFactors data={formData} updateData={updateFormData} />
      case 6:
        return <UrgencyAssessment data={formData} updateData={updateFormData} />
      case 7:
        return <ExtraPromptUpload data={formData} updateData={updateFormData} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-4 md:p-8">
      {/* <Nav /> */}
      <AuthenticatedNav />
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          
          <h1 className="font-bold  text-purple-600 text-4xl">AI Symptom Analysis</h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="relative h-2 rounded-full bg-purple-100">
            <div
              className="absolute left-0 h-2 rounded-full bg-purple-600 transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-center text-sm text-purple-600">
            Step {step} of {totalSteps}
          </div>
        </div>

        <Card className="backdrop-blur-sm">
          <div className="p-6">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={prevStep} disabled={step === 1} className="rounded-full">
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button
                onClick={nextStep}
                disabled={step === totalSteps}
                className="rounded-full bg-purple-600 hover:bg-purple-700"
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

