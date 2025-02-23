

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { PillButton } from "@/components/ui/pill-button"

function OtherInput({ value, onChange, placeholder }) {
  return (
    <Input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-1.5 border-blue-100 bg-blue-50/50 placeholder:text-blue-400
                     focus-visible:border-blue-200 focus-visible:ring-blue-100"
    />
  )
}

export default function BasicInformation({ data, updateData }) {
  const genderOptions = ["Male", "Female", "Other"]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-blue-900">Basic Information</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            type="number"
            id="age"
            value={data.age}
            onChange={(e) => updateData({ age: e.target.value })}
            placeholder="Enter your age"
            className="mt-1.5 border-blue-100 bg-blue-50/50 placeholder:text-blue-400
                     focus-visible:border-blue-200 focus-visible:ring-blue-100"
          />
        </div>

        <div>
          <Label>Gender</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {genderOptions.map((option) => (
              <PillButton key={option} selected={data.gender === option} onClick={() => updateData({ gender: option })}>
                {option}
              </PillButton>
            ))}
          </div>
          {data.gender === "Other" && (
            <OtherInput
              value={data.otherGender || ""}
              onChange={(e) => updateData({ otherGender: e.target.value })}
              placeholder="Please specify your gender"
            />
          )}
        </div>

        <div>
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            type="number"
            id="weight"
            value={data.weight}
            onChange={(e) => updateData({ weight: e.target.value })}
            placeholder="Enter your weight"
            className="mt-1.5 border-blue-100 bg-blue-50/50 placeholder:text-blue-400
                     focus-visible:border-blue-200 focus-visible:ring-blue-100"
          />
        </div>

        <div>
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            type="number"
            id="height"
            value={data.height}
            onChange={(e) => updateData({ height: e.target.value })}
            placeholder="Enter your height"
            className="mt-1.5 border-blue-100 bg-blue-50/50 placeholder:text-blue-400
                     focus-visible:border-blue-200 focus-visible:ring-blue-100"
          />
        </div>
      </div>
    </div>
  )
}

