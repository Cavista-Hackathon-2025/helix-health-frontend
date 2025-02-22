/* eslint-disable react/prop-types */
import parse from "html-react-parser"
import { Card } from "@/components/ui/card"

const demoData = {
  result: "<div>Demo response</div>",
  diets: [
    {
      name: "Increase Fluid Intake",
      reason: "Staying hydrated helps thin mucus and supports immune function",
    },
    {
      name: "Vitamin C Rich Foods",
      reason: "Citrus fruits and berries can help boost your immune system",
    },
  ],
  advice: [
    {
      name: "Rest",
      reason: "Getting adequate rest helps your body fight the infection",
    },
    {
      name: "Monitor Symptoms",
      reason: "If symptoms worsen or persist beyond 7 days, consult a healthcare provider",
    },
  ],
}

export default function DiagnosisResult({
  result = demoData.result,
  diets = demoData.diets,
  advice = demoData.advice,
}) {
  return (
    <div className="min-h-screen p-6 px-[10%]">
      <div className="space-y-8">
        <h1 className="text-center text-4xl font-bold text-[#A855F7]">AI Diagnosis Results</h1>

        {/* Result Section */}
        <div className="prose prose-purple max-w-none">{parse(result)}</div>


        {/* Diets Section */}
        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-[#A855F7]">Recommended Diet</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {diets.map((diet, index) => (
              <div key={index} className="rounded-lg border border-purple-100 bg-purple-50 p-4">
                <h3 className="font-medium text-purple-900">{diet.name}</h3>
                <p className="mt-1 text-sm text-purple-700">{diet.reason}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Advice Section */}
        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-[#A855F7]">Medical Advice</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {advice.map((item, index) => (
              <div key={index} className="rounded-lg border border-purple-100 bg-purple-50 p-4">
                <h3 className="font-medium text-purple-900">{item.name}</h3>
                <p className="mt-1 text-sm text-purple-700">{item.reason}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex justify-end">
          <button className="rounded-full bg-[#A855F7] px-8 py-2 text-white hover:bg-purple-600 transition-colors">
            Download Report
          </button>
        </div>
      </div>
    </div>
  )
}