/* eslint-disable react/prop-types */
import parse from "html-react-parser"
import { Card } from "@/components/ui/card"
import { Get } from "@/utils/http"
import { useParams } from "react-router-dom"
import { Loading, Report } from "notiflix"
import { useEffect, useState } from "react"

export default function DiagnosisResult() {
  const [diagnosis, setDiagnosis] = useState(null)
  const params = useParams()

  async function getData() {
    Loading.standard()
    const { data, err } = await Get("/api/user/diagnosis/" + params.id)
    if (!err) {
      setDiagnosis(data.diagnosis)
    } else {
      Report.failure("Error", err.message)
    }
    Loading.remove()
  }

  useEffect(() => {
    getData()
  }, [])

  if (!diagnosis) return null

  return (
    <div className="min-h-screen p-6 lg:px-[10%]">
      <div className="space-y-8">
        <h1 className="text-center text-4xl font-bold text-[#A855F7]">{diagnosis.title}</h1>

        {/* Result Section */}
        <div className="prose prose-purple max-w-none">{parse(diagnosis.response)}</div>

        {/* Diets Section */}
        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-[#A855F7]">Recommended Diet</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {diagnosis.diets.map((diet, index) => (
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
            {diagnosis.advice.map((item, index) => (
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