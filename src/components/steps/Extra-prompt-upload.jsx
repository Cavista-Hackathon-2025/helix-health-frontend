import { Label } from "@radix-ui/react-label";
import { PillButton } from "../ui/pill-button";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import { FileUp } from "lucide-react";
import { Textarea } from "../ui/textarea";

export const ExtraPromptUpload = ({ data, updateData }) => {
  // const activityLevels = ["Sedentary", "Moderate", "Active"]
  // const dietTypes = ["Balanced", "Unhealthy", "High in Processed Foods", "Other"]
  // const fileInputRef = useRef()
  const [textAreaValue, setTextAreaValue] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name);
      setFiles(...file, file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData({ ...data, extraPrompt: textAreaValue, medicalImages: files });
  };
  const handleTextInput = (e) => {
    setTextAreaValue(e.target.value);
  };
  console.log(textAreaValue);
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-purple-900">
        Some Extra Information
      </h2>
      <div className="space-y-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full max-w-md items-center space-x-2"
        >
          <Textarea
            type="text"
            placeholder="Enter a prompt"
            className="flex-1 rounded-lg h-60"
            value={textAreaValue}
            onChange={handleTextInput}
          />
          <Button asChild className="w-full">
            <label className="cursor-pointer">
              <span>Upload Files</span>
              <span>
                <FileUp />
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                // ref={fileInputRef}
              />
            </label>
          </Button>
        </form>
      </div>
    </div>
  );
};
