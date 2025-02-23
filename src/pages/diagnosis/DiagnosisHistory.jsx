/* eslint-disable react/prop-types */
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Brain, ChevronLeft, ChevronRight } from "lucide-react"
import { Get } from "@/utils/http"
import { Report } from "notiflix"
import { useEffect, useState } from "react"

function DiagnosisCard({ record }) {
  return (
    <Link to={`/diagnosis/${record.id}`}>
      <Card
        className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border-l-4 border-l-purple-500 mb-4"
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-[#A855F7]">{record.title}</h2>
            <span className="text-purple-600 bg-purple-100 px-3 py-1 rounded-full text-sm">
              {new Date(record.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 flex-wrap">
              {record.symptoms.map((symptom, i) => (
                <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{symptom}</span>
              ))}
            </div>
            {record.severity && (
              <span className={`ml-auto px-3 py-1 rounded-full text-sm ${record.severity === 1 ? "bg-green-100 text-green-700" :
                record.severity === 2 ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-700"
                }`}>
                {record.severity === 1 ? "Mild" : record.severity === 2 ? "Moderate" : "Severe"}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default function DiagnosisHistory() {
  const [historyData, setHistoryData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState(null)

  async function getData(page) {
    const { data, err } = await Get(`/api/user/diagnosis?page=${page}`)
    if (!err) {
      setHistoryData(data.diagnosisHistory)
      setPagination(data.pagination)
    } else {
      Report.failure("Error", err)
    }
  }

  useEffect(() => {
    getData(currentPage)
  }, [currentPage])

  return (
    <div className="min-h-screen p-6 lg:px-[10%] bg-gray-50">
      <div className="space-y-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold text-[#A855F7]">Diagnosis History</h1>
          <Button asChild className="bg-[#A855F7] hover:bg-purple-700">
            <Link to="/diagnosis/new" className="flex items-center gap-2">
              <Brain size={20} />
              New Diagnosis
            </Link>
          </Button>
        </div>

        {historyData.map((record) => (
          <DiagnosisCard key={record.id} record={record} />
        ))}

        {pagination && (
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={!pagination.hasMore}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}