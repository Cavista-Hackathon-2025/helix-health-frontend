import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PillButton } from "@/components/ui/pill-button";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function Onboarding() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    bloodPressure: "",
    medications: "",
    medicalConditions: "",
    allergies: [String]
  });
  const [data, setData] = useState("");
  const genderOptions = ["Male", "Female"];
  const handleClick = () => {
    const allergies = data.split(",");
    setFormData({ allergies });
  };

  return (
    <div className="min-h-[100vh] bg-gray-800/70 p-4 md:p-8 fixed w-screen h-screen z-20 top-0 left-0 backdrop-blur-sm overflow-y-auto">
      {/* <Nav /> */}
      {/* <AuthenticatedNav /> */}
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
        </div>

        <Card className="backdrop-blur-sm">
          <div className="p-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-blue-900">
                Basic Information
              </h2>
              <p>Complete your Registration Process</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ name: e.target.value })}
                    placeholder="Enter your name"
                    className="mt-1.5 border-blue-100 bg-blue-50/50 placeholder:text-blue-400
                     focus-visible:border-blue-200 focus-visible:ring-blue-100"
                  />
                </div>

                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    type="number"
                    id="age"
                    value={formData.age}
                    onChange={(e) => setFormData({ age: e.target.value })}
                    placeholder="Enter your age"
                    className="mt-1.5 border-blue-100 bg-blue-50/50 placeholder:text-blue-400
                     focus-visible:border-blue-200 focus-visible:ring-blue-100"
                  />
                </div>

                <div>
                  <Label>Gender</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {genderOptions.map((option) => (
                      <PillButton
                        key={option}
                        selected={formData.gender === option}
                        onClick={() => setFormData({ gender: option })}
                      >
                        {option}
                      </PillButton>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    type="number"
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => setFormData({ weight: e.target.value })}
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
                    value={formData.height}
                    onChange={(e) => setFormData({ height: e.target.value })}
                    placeholder="Enter your height"
                    className="mt-1.5 border-blue-100 bg-blue-50/50 placeholder:text-blue-400
                     focus-visible:border-blue-200 focus-visible:ring-blue-100"
                  />
                </div>

                <div>
                  <Label htmlFor="bloodPressure">Blood Pressure (systolic/diastolic)</Label>
                  <Input
                    type="text"
                    id="bloodPressure"
                    value={formData.bloodPressure}
                    onChange={(e) => setFormData({ bloodPressure: e.target.value })}
                    placeholder="e.g., 120/80"
                    className="mt-1.5 border-blue-100 bg-blue-50/50 placeholder:text-blue-400
                     focus-visible:border-blue-200 focus-visible:ring-blue-100"
                  />
                </div>

                <div>
                  <Label htmlFor="medications">Current Medications</Label>
                  <Input
                    type="text"
                    id="medications"
                    value={formData.medications}
                    onChange={(e) => setFormData({ medications: e.target.value })}
                    placeholder="List any current medications..."
                    className="mt-1.5 border-blue-100 bg-blue-50/50 placeholder:text-blue-400
                     focus-visible:border-blue-200 focus-visible:ring-blue-100"
                  />
                </div>

                <div>
                  <Label htmlFor="medicalConditions">Existing Medical Conditions</Label>
                  <Input
                    type="text"
                    id="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={(e) => setFormData({ medicalConditions: e.target.value })}
                    placeholder="List any existing medical conditions..."
                    className="mt-1.5 border-blue-100 bg-blue-50/50 placeholder:text-blue-400
                     focus-visible:border-blue-200 focus-visible:ring-blue-100"
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  <Textarea
                    type="text"
                    id="allergies"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    placeholder="Enter Allergies Separated by comma..."
                    className="mt-1.5 border-blue-100 bg-blue-50/50 placeholder:text-blue-400
                     focus-visible:border-blue-200 focus-visible:ring-blue-100"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-center items-center">
              <Button
                onClick={handleClick}
                className="rounded-lg w-2/4  bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}