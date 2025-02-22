/* eslint-disable react/prop-types */

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import dayjs from "dayjs"

export default function PrescriptionEntry({ currentEntry, handleInputChange }) {
  return (
    <div className="grid gap-4">
      <div>
        <Label htmlFor="drugName">Drug Name</Label>
        <Input
          id="drugName"
          value={currentEntry.drugName}
          onChange={(e) => handleInputChange("drugName", e.target.value)}
          placeholder="Enter drug name"
          className="mt-1.5 border-purple-100 bg-purple-50/50 placeholder:text-purple-400
                   focus-visible:border-purple-200 focus-visible:ring-purple-100"
        />
      </div>

      <div>
        <Label htmlFor="duration">Duration</Label>
        <Input
          id="duration"
          value={currentEntry.duration}
          onChange={(e) => handleInputChange("duration", e.target.value)}
          placeholder="e.g., 7 days, 2 weeks"
          className="mt-1.5 border-purple-100 bg-purple-50/50 placeholder:text-purple-400
                   focus-visible:border-purple-200 focus-visible:ring-purple-100"
        />
      </div>

      <div>
        <Label htmlFor="frequency">Frequency</Label>
        <Input
          id="frequency"
          value={currentEntry.frequency}
          onChange={(e) => handleInputChange("frequency", e.target.value)}
          placeholder="e.g., Twice daily, Every 8 hours"
          className="mt-1.5 border-purple-100 bg-purple-50/50 placeholder:text-purple-400
                   focus-visible:border-purple-200 focus-visible:ring-purple-100"
        />
      </div>

      <div>
        <Label>Start Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "mt-1.5 w-full justify-start border-purple-100 bg-purple-50/50 text-left font-normal hover:bg-purple-100/50",
                !currentEntry.startDate && "text-purple-400",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {currentEntry.startDate ? dayjs(currentEntry.startDate).format("MMMM D, YYYY") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={currentEntry.startDate}
              onSelect={(date) => handleInputChange("startDate", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
