"use client"

import { Label } from "@/components/ui/label"
import { PillButton } from "@/components/ui/pill-button"
import { Input } from "@/components/ui/input"

export default function PossibleTriggers({ data, updateData }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-blue-900">Possible Triggers & Exposure</h2>
      <div className="space-y-4">
        <div>
          <Label>Have you been in contact with someone who was sick recently?</Label>
          <div className="mt-2 flex gap-2">
            <PillButton selected={data.sickContact === true} onClick={() => updateData({ sickContact: true })}>
              Yes
            </PillButton>
            <PillButton selected={data.sickContact === false} onClick={() => updateData({ sickContact: false })}>
              No
            </PillButton>
          </div>
        </div>

        <div>
          <Label>Have you traveled recently?</Label>
          <div className="mt-2 flex gap-2">
            <PillButton selected={data.recentTravel === true} onClick={() => updateData({ recentTravel: true })}>
              Yes
            </PillButton>
            <PillButton selected={data.recentTravel === false} onClick={() => updateData({ recentTravel: false })}>
              No
            </PillButton>
          </div>
        </div>

        {data.recentTravel && (
          <div>
            <Label htmlFor="travelLocation">Where did you travel?</Label>
            <Input
              id="travelLocation"
              value={data.travelLocation}
              onChange={(e) => updateData({ travelLocation: e.target.value })}
              placeholder="Enter travel location"
              className="mt-1"
            />
          </div>
        )}

        <div>
          <Label>Have you been exposed to allergens, chemicals, or environmental factors?</Label>
          <div className="mt-2 flex gap-2">
            <PillButton
              selected={data.environmentalFactors === true}
              onClick={() => updateData({ environmentalFactors: true })}
            >
              Yes
            </PillButton>
            <PillButton
              selected={data.environmentalFactors === false}
              onClick={() => updateData({ environmentalFactors: false })}
            >
              No
            </PillButton>
          </div>
        </div>
      </div>
    </div>
  )
}

