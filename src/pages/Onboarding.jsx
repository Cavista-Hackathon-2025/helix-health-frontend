import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PillButton } from "@/components/ui/pill-button";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Onboarding() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    allergies: [String]
  });
  const [data, setData] = useState("");
  const genderOptions = ["Male", "Female"];
  const handleClick = () => {
    const allergies = data.split(",");
    setFormData({ allergies });
  };

  return (
    <div className="min-h-[100vh] bg-gray-800/70 p-4 md:p-8">
      {/* <Nav /> */}
      {/* <AuthenticatedNav /> */}
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
        </div>


        <Card className="backdrop-blur-sm">
          <div className="p-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-purple-900">
                Basic Information
              </h2>
              <p>Complete your Registration Process</p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    type="number"
                    id="age"
                    value={formData.age}
                    onChange={(e) => setFormData({ age: e.target.value })}
                    placeholder="Enter your age"
                    className="mt-1.5 border-purple-100 bg-purple-50/50 placeholder:text-purple-400
                     focus-visible:border-purple-200 focus-visible:ring-purple-100"
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
                    className="mt-1.5 border-purple-100 bg-purple-50/50 placeholder:text-purple-400
                     focus-visible:border-purple-200 focus-visible:ring-purple-100"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="allergies">Allergies</Label>
                <Input
                  type="text"
                  id="allergies"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  placeholder="Enter Allergies Separated by comma..."
                  className="mt-1.5 border-purple-100 bg-purple-50/50 placeholder:text-purple-400
                     focus-visible:border-purple-200 focus-visible:ring-purple-100"
                />
              </div>
            </div>
            <div className="mt-8 flex justify-center items-center">
              <Button
                onClick={handleClick}
                className="rounded-lg w-2/4  bg-purple-600 hover:bg-purple-700"
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
