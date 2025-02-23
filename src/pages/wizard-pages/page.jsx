import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Sparkle } from "lucide-react"
// import BasicInformation from "@/pages/wizard-pages/basic-information"
import SymptomIdentification from "@/pages/wizard-pages/symptom-identification"
import SymptomContext from "@/pages/wizard-pages/symptom-context"
import AdditionalSymptoms from "@/pages/wizard-pages/additional-symptoms"
import PossibleTriggers from "@/pages/wizard-pages/possible-triggers"
import LifestyleFactors from "@/pages/wizard-pages/lifestyle-factors"
import UrgencyAssessment from "@/pages/wizard-pages/urgency-assessment"
import { ExtraPromptUpload } from "@/pages/wizard-pages/Extra-prompt-upload"
import { Loading, Report } from "notiflix"
import { Post } from "@/utils/http"
import { useNavigate } from "react-router-dom"

export default function SymptomForm() {
  const [step, setStep] = useState(1)
  const navigate = useNavigate();
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
    images: [],
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

  const handleSubmit = async () => {
    console.log(formData)
    if (formData.symptoms.length === 0 && formData.additionalSymptoms.length === 0) {
      Report.warning("Required Field", "Please select at least one symptom");
      return;
    }
    if (!formData.severity) {
      Report.warning("Required Field", "Please indicate symptom severity");
      return;
    }
    if (!formData.frequency) {
      Report.warning("Required Field", "Please indicate symptom frequency");
      return;
    }

    Loading.standard("Analyzing Please Wait....")
    const { images } = formData
    const prompt = { ...formData, images: undefined }
    const formDataToSend = new FormData()
    formDataToSend.append("prompt", JSON.stringify(prompt))
    images.forEach(image => {
      formDataToSend.append("file", image, image.name)
    })
    const { data, err } = await Post("/api/user/symptom-analysis", formDataToSend)
    if (!err) {
      Report.success("AI analysis complete")
      navigate("/diagnosis/" + data.data.id)
    } else {
      Report.failure("Error", err)
    }
    Loading.remove()
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
        return <ExtraPromptUpload data={formData} updateData={updateFormData} onSubmit={handleSubmit} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-4 md:p-8">
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
                onClick={() => {
                  step == totalSteps ? handleSubmit() : nextStep()
                }}
                className="rounded-full bg-purple-600 hover:bg-purple-700"
              >
                {step == totalSteps ? <>
                  Submit <Sparkle />
                </> : <>
                  Next <ChevronRight className="ml-2 h-4 w-4" /></>
                }

              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}