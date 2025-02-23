import { Card } from "@/components/ui/card"

export default function DiagnosisHistory() {
  const historyData = [
    {
      date: "2025-02-15",
      diagnosis: "Respiratory Infection with Asthma Complications",
      symptoms: ["Fever", "Difficulty Breathing", "Cough"],
      status: "Completed",
      severity: "Moderate"
    },
    {
      date: "2025-01-10",
      diagnosis: "Seasonal Allergies",
      symptoms: ["Sneezing", "Runny Nose", "Itchy Eyes"],
      status: "Completed",
      severity: "Mild"
    }
  ]

  return (
    <div className="min-h-screen p-6 lg:px-[10%] bg-gray-50">
      <div className="space-y-8">
        <h1 className="text-center text-4xl font-bold text-[#A855F7] mb-12">Diagnosis History</h1>

        {historyData.map((record, index) => (
          <Card
            key={index}
            className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border-l-4 border-l-purple-500"
          >
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-[#A855F7]">{record.diagnosis}</h2>
                <span className="text-purple-600 bg-purple-100 px-3 py-1 rounded-full text-sm">{record.date}</span>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex gap-2">
                  {record.symptoms.map((symptom, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{symptom}</span>
                  ))}
                </div>
                <span className={`ml-auto px-3 py-1 rounded-full text-sm ${record.severity === "Mild" ? "bg-green-100 text-green-700" :
                    record.severity === "Moderate" ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                  }`}>
                  {record.severity}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}