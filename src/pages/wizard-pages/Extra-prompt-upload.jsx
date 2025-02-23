/* eslint-disable react/prop-types */
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { FileUp, FileText, X } from "lucide-react";
import { Textarea } from "../../components/ui/textarea";

export const ExtraPromptUpload = ({ data, updateData }) => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileUpload = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (selectedFiles.length > 0) {
      setFiles([...files, ...selectedFiles]);
    }
    updateData({ ...data, images: [...(data.files || []), ...selectedFiles] });
  };

  const handleTextInput = (e) => {
    setTextAreaValue(e.target.value);
    updateData({ ...data, extraInformation: e.target.value });
  };

  const handleRemoveFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-purple-900">
        Some Extra Information
      </h2>
      <div className="flex gap-8">
        <form
          onSubmit={e => e.preventDefault()}
          className={`flex flex-col gap-5 ${files.length > 0 ? 'w-2/3' : 'w-full'} items-center space-x-2`}
        >
          <Textarea
            type="text"
            placeholder="any aditional information Helix should know about?"
            className="flex-1 rounded-lg h-60 w-full"
            value={textAreaValue}
            onChange={handleTextInput}
          />
          <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
            <label className="cursor-pointer">
              <span>Upload Files</span>
              <span>
                <FileUp />
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                multiple
              />
            </label>
          </Button>
        </form>
        {files.length > 0 && (
          <div className="w-1/3 space-y-4">
            <h3 className="text-lg font-medium">Uploaded Files</h3>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};