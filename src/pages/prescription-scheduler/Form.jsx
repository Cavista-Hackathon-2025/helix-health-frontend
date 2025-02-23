import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Upload, X, FileText } from "lucide-react"
import dayjs from "dayjs"
import PrescriptionEntry from "@/components/prescriptionEntry"
import { Loading, Report } from "notiflix"
import { Post } from "@/utils/http"
import { useNavigate } from "react-router-dom"

export default function PrescriptionScheduleForm() {
  const [prescriptions, setPrescriptions] = useState([])
  const [currentEntry, setCurrentEntry] = useState({
    drugName: "",
    duration: "",
    frequency: "",
    startDate: null,
  })
  const [image, setImage] = useState(null)
  const [imageDetails, setImageDetails] = useState(null)
  const navigate = useNavigate()

  const handleInputChange = (field, value) => {
    setCurrentEntry((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddPrescription = () => {
    if (currentEntry.drugName && currentEntry.duration && currentEntry.frequency && currentEntry.startDate) {
      setPrescriptions((prev) => [...prev, { ...currentEntry, id: Date.now() }])
      setCurrentEntry({
        drugName: "",
        duration: "",
        frequency: "",
        startDate: null,
      })
    }
  }

  const handleRemovePrescription = (id) => {
    setPrescriptions((prev) => prev.filter((p) => p.id !== id))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setImageDetails({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + ' KB'
      })
      setPrescriptions([])
    }
  }

  const clearImage = () => {
    setImage(null)
    setImageDetails(null)
  }

  const handleSubmit = async () => {
    // Handle form submission logic here
    console.log('Submitting prescriptions:', prescriptions)
    console.log('Submitting image:', image)
    const formData = new FormData()
    if (image) {
      formData.append('image', image)
    } else {
      formData.append("prescriptions", JSON.stringify(prescriptions))
    }

    Loading.standard("Analyzing Please Wait....")
    const { err } = await Post("/api/user/prescription-scheduling", formData)
    if (!err) {
      Report.success("Success", "Prescription Scheduled Successfully")
      navigate("/")
    } else {
      Report.failure("Error", err)
    }
    Loading.remove()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-4 md:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-4xl font-bold text-transparent">
            Prescription Details
          </h1>
          <p className="text-purple-600">Enter your prescription information or upload an image</p>
        </div>

        <Card className="backdrop-blur-sm">
          <div className="p-6">
            <div className="mb-8">
              <Label className="mb-2 block">Upload Prescription Image</Label>
              <div className="flex items-center gap-4">
                <label className="flex h-32 w-full cursor-pointer items-center justify-center rounded-3xl border-2 border-dashed border-purple-200 bg-purple-50/50 transition-colors hover:border-purple-300 hover:bg-purple-100/50">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  {image ? (
                    <div className="flex items-center gap-4">
                      <FileText className="h-8 w-8 text-purple-600" />
                      <div className="flex flex-col">
                        <span className="font-medium">{imageDetails.name}</span>
                        <span className="text-sm text-purple-600">{imageDetails.size}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault()
                          clearImage()
                        }}
                        className="ml-4 text-purple-600 hover:bg-purple-100"
                      >
                        Clear
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center text-purple-400">
                      <Upload className="mx-auto mb-2 h-6 w-6" />
                      <span>Upload prescription image</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {prescriptions.length > 0 && !image && (
              <div className="mb-6">
                <h3 className="mb-4 text-lg font-semibold text-purple-900">Added Prescriptions</h3>
                <div className="space-y-3">
                  {prescriptions.map((prescription) => (
                    <div
                      key={prescription.id}
                      className="flex items-center justify-between rounded-2xl border border-purple-100 bg-purple-50/50 p-4"
                    >
                      <div className="grid gap-1">
                        <div className="font-medium">{prescription.drugName}</div>
                        <div className="text-sm text-purple-600">
                          {prescription.frequency} for {prescription.duration}
                        </div>
                        <div className="text-sm text-purple-600">
                          Starting from {dayjs(prescription.startDate).format("MMMM D, YYYY")}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-purple-600 hover:bg-purple-100 hover:text-purple-700"
                        onClick={() => handleRemovePrescription(prescription.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!image && (
              <div className="mb-6">
                <h2 className="mb-4 text-lg font-semibold text-purple-900">Or Enter Details Manually</h2>
                <PrescriptionEntry currentEntry={currentEntry} handleInputChange={handleInputChange} />
                <Button onClick={handleAddPrescription} className="mt-6 rounded-full bg-purple-600 hover:bg-purple-700">
                  <Plus className="mr-2 h-4 w-4" /> Add Prescription
                </Button>
              </div>
            )}

            {(prescriptions.length > 0 || image) && (
              <Button
                onClick={handleSubmit}
                className="mt-6 w-full rounded-full bg-purple-600 hover:bg-purple-700"
              >
                Submit Prescription
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}