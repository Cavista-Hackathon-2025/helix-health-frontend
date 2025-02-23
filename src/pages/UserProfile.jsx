/* eslint-disable react/prop-types */
"use client"

import { Card } from "@/components/ui/card"
import { Patch } from "@/utils/http"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Weight,
  Ruler,
  Heart,
  AlertCircle,
  History,
} from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loading, Report } from "notiflix"
import { setUser } from "@/redux/userReducer"

export default function UserProfile() {
  const user = useSelector(state => state.user.user)
  const [isOpen, setIsOpen] = useState(false)
  const [isMedicalOpen, setIsMedicalOpen] = useState(false)
  const [medicalHistory, setMedicalHistory] = useState(user.medicalInfos[0].history || [])
  const dispatch = useDispatch()

  async function handleSubmit(event) {
    event.preventDefault()
    Loading.standard()
    const formData = new FormData(event.target)
    const { err, data } = await Patch("/api/user", formData)
    if (!err) {
      setIsOpen(false)
      dispatch(setUser(data.user))
    } else {
      Report.error("Error", err)
    }
    Loading.remove()
  }

  async function handleMedicalSubmit(event) {
    event.preventDefault()
    Loading.standard()
    const formData = new FormData(event.target)
    formData.set('history', JSON.stringify(medicalHistory))
    const { err, data } = await Patch("/api/user/medicals", formData)
    if (!err) {
      setIsMedicalOpen(false)
      dispatch(setUser(data.user))
      Loading.remove()
    } else {
      Loading.remove()
      Report.error("Error", err)
    }
  }

  const addHistoryItem = () => {
    setMedicalHistory([...medicalHistory, ''])
  }

  const updateHistoryItem = (index, value) => {
    const newHistory = [...medicalHistory]
    newHistory[index] = value
    setMedicalHistory(newHistory)
  }

  const removeHistoryItem = (index) => {
    const newHistory = medicalHistory.filter((_, i) => i !== index)
    setMedicalHistory(newHistory)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-4xl font-bold text-transparent">
            User Profile
          </h1>
          <p className="text-purple-600">Your health information at a glance</p>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 mr-2" variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input id="name" name="name" defaultValue={user.name} />
                </div>
                <div>
                  <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                  <Input id="phone" name="phone" defaultValue={user.phone} />
                </div>
                <div>
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <Input id="password" name="password" type="password" />
                </div>
                <div>
                  <label htmlFor="country" className="text-sm font-medium">Country</label>
                  <Input id="country" name="country" defaultValue={user.country} />
                </div>
                <div>
                  <label htmlFor="image" className="text-sm font-medium">Profile Image</label>
                  <Input id="image" name="image" type="file" accept="image/*" />
                </div>
                <Button type="submit">Save Changes</Button>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog open={isMedicalOpen} onOpenChange={setIsMedicalOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4" variant="outline">Edit Medical Info</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Medical Information</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleMedicalSubmit} className="space-y-4">
                <div>
                  <label htmlFor="weight" className="text-sm font-medium">Weight (kg)</label>
                  <Input id="weight" name="weight" type="number" defaultValue={user.medicalInfos[0].weight} />
                </div>
                <div>
                  <label htmlFor="height" className="text-sm font-medium">Height (cm)</label>
                  <Input id="height" name="height" type="number" defaultValue={user.medicalInfos[0].height} />
                </div>
                <div>
                  <label htmlFor="blood_pressure" className="text-sm font-medium">Blood Pressure</label>
                  <Input id="blood_pressure" name="blood_pressure" defaultValue={user.medicalInfos[0].blood_pressure} />
                </div>
                <div>
                  <label htmlFor="allergies" className="text-sm font-medium">Allergies (comma separated)</label>
                  <Input id="allergies" name="allergies" defaultValue={user.medicalInfos[0].alergies?.join(", ")} />
                </div>
                <div>
                  <label className="text-sm font-medium">Medical History</label>
                  <div className="space-y-2">
                    {medicalHistory.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={item}
                          onChange={(e) => updateHistoryItem(index, e.target.value)}
                          placeholder="Enter medical history item"
                        />
                        <Button type="button" variant="outline" onClick={() => removeHistoryItem(index)}>Remove</Button>
                      </div>
                    ))}
                    <Button type="button" onClick={addHistoryItem}>Add History Item</Button>
                  </div>
                </div>
                <Button type="submit">Save Medical Info</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {/* Basic Information */}
          <Card className="overflow-hidden backdrop-blur-sm">
            <div className="border-b border-purple-100 bg-purple-50/30 p-4">
              <h2 className="text-xl font-semibold text-purple-900">Basic Information</h2>
            </div>
            <div className="p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <InfoItem icon={<User />} label="Name" value={user.name} />
                <InfoItem icon={<Mail />} label="Email" value={user.email} />
                <InfoItem icon={<Phone />} label="Phone" value={user.phone} />
                <InfoItem icon={<MapPin />} label="Country" value={user.country} />
                <InfoItem icon={<User />} label="Age" value={user.age ? `${user.age} years` : "Not Set"} />
              </div>
            </div>
          </Card>

          {/* Medical Information */}
          <Card className="overflow-hidden backdrop-blur-sm">
            <div className="border-b border-purple-100 bg-purple-50/30 p-4">
              <h2 className="text-xl font-semibold text-purple-900">Medical Information</h2>
            </div>
            <div className="p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <InfoItem icon={<Weight />} label="Weight" value={user.medicalInfos[0].weight ? `${user.medicalInfos[0].weight} kg` : "Not Set"} />
                <InfoItem icon={<Ruler />} label="Height" value={user.medicalInfos[0].height ? `${user.medicalInfos[0].height} cm` : "Not Set"} />
                <InfoItem icon={<Heart />} label="Blood Pressure" value={user.medicalInfos[0].blood_pressure} />
                <InfoItem
                  icon={<AlertCircle />}
                  label="Allergies"
                  value={user.medicalInfos[0]?.alergies?.join(", ")}
                />
                <InfoItem
                  icon={<History />}
                  label="Medical History"
                  value={user.medicalInfos[0].history.map((item, index) => (
                    <div key={index} className="p-2 rounded-md border my-2">{item}</div>
                  ))}
                  className="md:col-span-2"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function InfoItem({ icon, label, value, className }) {
  return (
    <div className={`flex items-start gap-3 rounded-2xl border border-purple-100 bg-purple-50/50 p-4 ${className}`}>
      <div className="mt-0.5 text-purple-600">{icon}</div>
      <div>
        <div className="text-sm text-purple-600">{label}</div>
        <div className="font-medium text-purple-900">{value}</div>
      </div>
    </div>
  )
}