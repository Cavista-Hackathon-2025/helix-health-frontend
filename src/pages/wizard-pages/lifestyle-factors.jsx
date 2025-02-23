
import { Label } from "@/components/ui/label"
import { PillButton } from "@/components/ui/pill-button"

export default function LifestyleFactors({ data, updateData }) {
  const activityLevels = ["Sedentary", "Moderate", "Active"]
  const dietTypes = ["Balanced", "Unhealthy", "High in Processed Foods", "Other"]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-blue-900">Lifestyle & Risk Factors</h2>
      <div className="space-y-4">
        <div>
          <Label>Do you smoke or use tobacco?</Label>
          <div className="mt-2 flex gap-2">
            <PillButton selected={data.smoking === true} onClick={() => updateData({ smoking: true })}>
              Yes
            </PillButton>
            <PillButton selected={data.smoking === false} onClick={() => updateData({ smoking: false })}>
              No
            </PillButton>
          </div>
        </div>

        <div>
          <Label>Do you consume alcohol?</Label>
          <div className="mt-2 flex gap-2">
            <PillButton selected={data.alcohol === true} onClick={() => updateData({ alcohol: true })}>
              Yes
            </PillButton>
            <PillButton selected={data.alcohol === false} onClick={() => updateData({ alcohol: false })}>
              No
            </PillButton>
          </div>
        </div>

        <div>
          <Label>Physical Activity Level</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {activityLevels.map((level) => (
              <PillButton
                key={level}
                selected={data.activityLevel === level}
                onClick={() => updateData({ activityLevel: level })}
              >
                {level}
              </PillButton>
            ))}
          </div>
        </div>

        <div>
          <Label>Diet Type</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {dietTypes.map((type) => (
              <PillButton key={type} selected={data.diet === type} onClick={() => updateData({ diet: type })}>
                {type}
              </PillButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

