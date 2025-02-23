/* eslint-disable react/prop-types */
import parse from "html-react-parser"
import { Card } from "@/components/ui/card"

const demoData = {
  result: "<div class='container mx-auto p-6 bg-white rounded-lg shadow-lg'><div class='mb-8 bg-blue-50 p-6 rounded-lg'><h1 class='text-3xl font-bold text-blue-800 mb-4'>Medical Assessment Report</h1><p class='text-red-600 font-semibold'>⚠️ Attention: Given your travel history and symptoms, immediate medical attention is recommended.</p></div><div class='grid grid-cols-1 md:grid-cols-2 gap-6'><div class='bg-gray-50 p-4 rounded-lg'><h2 class='text-xl font-semibold text-gray-800 mb-3'>Primary Symptoms Analysis</h2><ul class='list-disc pl-5'><li class='text-gray-700'>Fever onset: 2025-02-15</li><li class='text-gray-700'>Moderate severity with worsening progression</li><li class='text-gray-700'>Complicated by pre-existing asthma condition</li></ul></div><div class='bg-gray-50 p-4 rounded-lg'><h2 class='text-xl font-semibold text-gray-800 mb-3'>Risk Assessment</h2><ul class='list-disc pl-5'><li class='text-red-500'>Recent travel to Lagos, Nigeria</li><li class='text-red-500'>Contact with sick person</li><li class='text-yellow-600'>Environmental exposure to dust and pollution</li></ul></div></div><div class='mt-6 bg-green-50 p-4 rounded-lg'><h2 class='text-xl font-semibold text-green-800 mb-3'>Treatment Recommendations</h2><ol class='list-decimal pl-5'><li class='mb-2'>Continue prescribed Albuterol as directed for asthma</li><li class='mb-2'>Implement suggested dietary modifications</li><li class='mb-2'>Monitor temperature every 4 hours</li><li class='mb-2'>Rest for minimum 8 hours daily</li><li class='mb-2'>Avoid cold exposure</li></ol></div><div class='mt-6 bg-yellow-50 p-4 rounded-lg'><h2 class='text-xl font-semibold text-yellow-800 mb-3'>Warning Signs to Watch</h2><p class='text-red-600'>Seek immediate emergency care if you experience:</p><ul class='list-disc pl-5'><li>Severe difficulty breathing</li><li>Chest pain</li><li>High fever unresponsive to medication</li><li>Worsening asthma symptoms</li></ul></div><div class='mt-6 text-sm text-gray-600'><p>Follow-up recommended in 48-72 hours if symptoms persist or worsen.</p></div></div>",
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
    <div className="min-h-screen p-6 lg:px-[10%]">
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