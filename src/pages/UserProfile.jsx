/* eslint-disable react/prop-types */
"use client"

import { Card } from "@/components/ui/card"
import { format } from "date-fns"
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
  Pill,
  FileText,
} from "lucide-react"

// Mock data based on the schema
const userData = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  country: "United States",
  dob: new Date("1990-01-01"),
  age: 33,
  medicalInfos: [
    {
      weight: 70,
      height: 175,
      blood_pressure: "120/80",
      alergies: ["Peanuts", "Penicillin"],
      history: ["Asthma", "Seasonal Allergies"],
    },
  ],
  prescriptions: [
    {
      drugName: "Ventolin",
      dates: [new Date()],
      frequency: "As needed",
      ics: "inhaler",
    },
  ],
  symptomAnalysis: [
    {
      title: "Seasonal Allergies",
      advice: { recommendations: ["Avoid triggers", "Take antihistamines"] },
      response: "Mild allergic reaction",
      diets: { suggestions: ["Increase vitamin C intake"] },
    },
  ],
}

export default function UserProfile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-4xl font-bold text-transparent">
            User Profile
          </h1>
          <p className="text-purple-600">Your health information at a glance</p>
        </div>

        <div className="grid gap-6">
          {/* Basic Information */}
          <Card className="overflow-hidden backdrop-blur-sm">
            <div className="border-b border-purple-100 bg-purple-50/30 p-4">
              <h2 className="text-xl font-semibold text-purple-900">Basic Information</h2>
            </div>
            <div className="p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <InfoItem icon={<User />} label="Name" value={userData.name} />
                <InfoItem icon={<Mail />} label="Email" value={userData.email} />
                <InfoItem icon={<Phone />} label="Phone" value={userData.phone} />
                <InfoItem icon={<MapPin />} label="Country" value={userData.country} />
                <InfoItem icon={<Calendar />} label="Date of Birth" value={format(userData.dob, "PPP")} />
                <InfoItem icon={<User />} label="Age" value={`${userData.age} years`} />
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
                <InfoItem icon={<Weight />} label="Weight" value={`${userData.medicalInfos[0].weight} kg`} />
                <InfoItem icon={<Ruler />} label="Height" value={`${userData.medicalInfos[0].height} cm`} />
                <InfoItem icon={<Heart />} label="Blood Pressure" value={userData.medicalInfos[0].blood_pressure} />
                <InfoItem
                  icon={<AlertCircle />}
                  label="Allergies"
                  value={userData.medicalInfos[0].alergies.join(", ")}
                />
                <InfoItem
                  icon={<History />}
                  label="Medical History"
                  value={userData.medicalInfos[0].history.join(", ")}
                  className="md:col-span-2"
                />
              </div>
            </div>
          </Card>

          {/* Prescriptions */}
          <Card className="overflow-hidden backdrop-blur-sm">
            <div className="border-b border-purple-100 bg-purple-50/30 p-4">
              <h2 className="text-xl font-semibold text-purple-900">Current Prescriptions</h2>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {userData.prescriptions.map((prescription, index) => (
                  <div key={index} className="rounded-2xl border border-purple-100 bg-purple-50/50 p-4">
                    <div className="flex items-center gap-2 text-purple-900">
                      <Pill className="h-5 w-5" />
                      <span className="font-semibold">{prescription.drugName}</span>
                    </div>
                    <div className="mt-2 grid gap-1 text-sm text-purple-600">
                      <div>Frequency: {prescription.frequency}</div>
                      <div>Type: {prescription.ics}</div>
                      <div>Last Updated: {format(prescription.dates[0], "PPP")}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Symptom Analysis History */}
          <Card className="overflow-hidden backdrop-blur-sm">
            <div className="border-b border-purple-100 bg-purple-50/30 p-4">
              <h2 className="text-xl font-semibold text-purple-900">Recent Health Analysis</h2>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {userData.symptomAnalysis.map((analysis, index) => (
                  <div key={index} className="rounded-2xl border border-purple-100 bg-purple-50/50 p-4">
                    <div className="flex items-center gap-2 text-purple-900">
                      <FileText className="h-5 w-5" />
                      <span className="font-semibold">{analysis.title}</span>
                    </div>
                    <div className="mt-2 grid gap-2 text-sm text-purple-600">
                      <div>Response: {analysis.response}</div>
                      <div>
                        <div className="font-medium">Recommendations:</div>
                        <ul className="ml-5 list-disc">
                          {analysis.advice.recommendations.map((rec, i) => (
                            <li key={i}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="font-medium">Dietary Suggestions:</div>
                        <ul className="ml-5 list-disc">
                          {analysis.diets.suggestions.map((sug, i) => (
                            <li key={i}>{sug}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
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

