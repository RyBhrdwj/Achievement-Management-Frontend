import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon, AlertCircleIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { useTheme } from "@/context/ThemeProvider";
import { cn } from "@/lib/utils";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";

const Logger = (isEnabled: boolean = true) => {
  let enable = isEnabled;

  return {
    log: (...args: any[]) => {
      if (enable) console.log(...args);
    },
    enable: () => {
      enable = true;
    },
    disable: () => {
      enable = false;
    },
  };
};
const logger = Logger();

type EventType =
  | "technical"
  | "cultural"
  | "debate"
  | "speech"
  | "volunteer"
  | "meetup"
  | "other";

type ResultType = "won" | "runner-up" | "participated";

const EventForm = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isOffline, setIsOffline] = useState(true);
  const [eventType, setEventType] = useState<EventType>("technical");
  const [customEventType, setCustomEventType] = useState("");
  const [result, setResult] = useState<ResultType | null>(null);
  const [runnerUpPosition, setRunnerUpPosition] = useState("");
  const [organizedBy, setOrganizedBy] = useState("");
  const [certificateFiles, setCertificateFiles] = useState<File[]>([]);
  const [eventImageFiles, setEventImageFiles] = useState<File[]>([]);

  const [errors, setErrors] = useState<{
    eventName?: string;
    date?: string;
    organizedBy?: string;
    customEventType?: string;
    result?: string;
    runnerUpPosition?: string;
    certificateFiles?: string;
    eventImageFiles?: string;
  }>({});

  const validateStep = () => {
    const newErrors: typeof errors = {};

    switch (currentStep) {
      case 1:
        if (!eventName.trim()) newErrors.eventName = "Event Name is required";
        if (!date) newErrors.date = "Event Date is required";
        if (!organizedBy.trim())
          newErrors.organizedBy = "Organized By is required";
        break;
      case 2:
        if (eventType === "other" && !customEventType.trim())
          newErrors.customEventType = "Custom Event Type is required";
        if (!result) newErrors.result = "Result is required";
        if (result === "runner-up" && !runnerUpPosition.trim())
          newErrors.runnerUpPosition = "Runner Up Position is required";
        break;
      case 3:
        if (certificateFiles.length === 0)
          newErrors.certificateFiles =
            "At least one certificate file is required";
        if (eventImageFiles.length === 0)
          newErrors.eventImageFiles = "At least one event image is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    logger.log("Current Step:", currentStep);
    if (validateStep()) {
      if (currentStep < 3) {
        setCurrentStep((prev) => prev + 1);
      } else {
        handleSubmit();
      }
    } else {
      logger.log("Validation failed:", errors);

      if (currentStep == 3) {
        logger.log("certificateFiles", certificateFiles);
        logger.log("eventImageFiles", eventImageFiles);
      }
    }
  };

  const handleSubmit = async () => {

    if (validateStep()) {
      const formData = {
        eventName,
        date,
        isOffline,
        eventType: eventType === "other" ? customEventType : eventType,
        organizedBy,
        result,
        runnerUpPosition,
        certificateFiles,
        eventImageFiles,
      };

      try {
        const response = await api.addAchievement(formData);

        if (response.status !== 200) {
          throw new Error(`API responded with status: ${response.status}`);
        }

        toast({
          title: "Success",
          description: "Event added successfully!",
          variant: "default",
        });

        navigate("/");
      } catch (error) {
        logger.log("Error submitting form:", error);

        toast({
          title: "Error",
          description: "Failed to add the event. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null;
    return (
      <div className="flex items-center text-red-500 text-xs mt-1">
        <AlertCircleIcon className="w-4 h-4 mr-1" />
        {message}
      </div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            {/* Event Name */}
            <div className="flex flex-col">
              <Label
                className={cn(
                  "mb-2",
                  theme === "dark" ? "text-white" : "text-[#333333]"
                )}
              >
                Event Name
              </Label>
              <Input
                placeholder="Enter event name"
                className={cn(
                  "w-full px-3 py-2 border rounded-md",
                  theme === "dark"
                    ? "text-white bg-gray-900 placeholder-[#AAAAAA]"
                    : "text-[#333333] bg-white placeholder-[#B0B0B0]",
                  errors.eventName ? "border-red-500" : ""
                )}
                value={eventName}
                onChange={(e) => {
                  setEventName(e.target.value);
                  setErrors((prev) => ({ ...prev, eventName: undefined }));
                }}
              />
              <ErrorMessage message={errors.eventName} />
            </div>

            {/* Event Date */}
            <div className="flex flex-col">
              <Label
                className={cn(
                  "mb-2",
                  theme === "dark" ? "text-white" : "text-[#333333]"
                )}
              >
                Event Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-between",
                      theme === "dark"
                        ? "text-white hover:bg-gray-800 border-gray-600"
                        : "text-[#333333] border-gray-300",
                      errors.date ? "border-red-500" : ""
                    )}
                  >
                    {date ? format(date, "PPP") : "Select Date"}
                    <CalendarIcon
                      className={cn(
                        "h-5 w-5",
                        theme === "dark" ? "text-[#AAAAAA]" : "text-[#B0B0B0]"
                      )}
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 dark:bg-gray-900">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      setDate(selectedDate);
                      setErrors((prev) => ({ ...prev, date: undefined }));
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <ErrorMessage message={errors.date} />
            </div>

            {/* Organized By */}
            <div className="flex flex-col">
              <Label
                className={cn(
                  "mb-2",
                  theme === "dark" ? "text-white" : "text-[#333333]"
                )}
              >
                Organized By
              </Label>
              <Input
                placeholder="Enter organization name"
                className={cn(
                  "w-full px-3 py-2 border rounded-md",
                  theme === "dark"
                    ? "text-white bg-gray-900 placeholder-[#AAAAAA]"
                    : "text-[#333333] bg-white placeholder-[#B0B0B0]",
                  errors.organizedBy ? "border-red-500" : ""
                )}
                value={organizedBy}
                onChange={(e) => {
                  setOrganizedBy(e.target.value);
                  setErrors((prev) => ({ ...prev, organizedBy: undefined }));
                }}
              />
              <ErrorMessage message={errors.organizedBy} />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            {/* Event Type */}
            <div className="flex flex-col">
              <Label
                className={cn(
                  "mb-2",
                  theme === "dark" ? "text-white" : "text-[#333333]"
                )}
              >
                Event Type
              </Label>
              <Select
                value={eventType}
                onValueChange={(value: EventType) => {
                  setEventType(value);
                  setCustomEventType("");
                  setErrors((prev) => ({
                    ...prev,
                    customEventType: undefined,
                  }));
                }}
              >
                <SelectTrigger
                  className={cn(
                    "w-full",
                    theme === "dark" ? "text-white" : "text-[#333333]"
                  )}
                >
                  <SelectValue placeholder="Select Event Type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800">
                  {(
                    [
                      "technical",
                      "cultural",
                      "debate",
                      "speech",
                      "volunteer",
                      "meetup",
                      "other",
                    ] as EventType[]
                  ).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Custom Event Type --grey text field abhi ke liye*/}
            {eventType === "other" && (
              <div className="flex flex-col">
                <Label
                  className={cn(
                    "mb-2",
                    theme === "dark" ? "text-white" : "text-[#333333]"
                  )}
                >
                  Custom Event Type
                </Label>
                <Input
                  placeholder="Enter your custom event type"
                  className={cn(
                    "w-full px-3 py-2 border rounded-md",
                    theme === "dark"
                      ? "text-white bg-gray-900 placeholder-[#AAAAAA]"
                      : "text-[#333333] bg-white placeholder-[#B0B0B0]",
                    errors.customEventType ? "border-red-500" : ""
                  )}
                  value={customEventType}
                  onChange={(e) => {
                    setCustomEventType(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      customEventType: undefined,
                    }));
                  }}
                  disabled={eventType !== "other"}
                />
                <ErrorMessage message={errors.customEventType} />
              </div>
            )}

            {/* Event Mode -greenblack swithc*/}
            <div className="flex flex-col">
              <Label
                className={cn(
                  "mb-2",
                  theme === "dark" ? "text-white" : "text-[#333333]"
                )}
              >
                Event Mode
              </Label>
              <div className="flex items-center space-x-4">
                <span
                  className={cn(
                    !isOffline ? "text-green-600 font-bold" : "",
                    theme === "dark" ? "text-[#AAAAAA]" : ""
                  )}
                >
                  Online
                </span>
                <Switch
                  checked={isOffline}
                  onCheckedChange={setIsOffline}
                  className={cn(
                    isOffline
                      ? theme === "dark"
                        ? "bg-[#6A11CB]"
                        : "bg-blue-500"
                      : theme === "dark"
                      ? "bg-[#3C3C3C]"
                      : "bg-green-500"
                  )}
                />
                <span
                  className={cn(
                    isOffline ? "text-green-600 font-bold" : "",
                    theme === "dark" ? "text-[#AAAAAA]" : ""
                  )}
                >
                  Offline
                </span>
              </div>
            </div>

            {/* Result */}
            <div className="flex flex-col">
              <Label
                className={cn(
                  "mb-2",
                  theme === "dark" ? "text-white" : "text-[#333333]"
                )}
              >
                Result
              </Label>
              <Select
                value={result || ""}
                onValueChange={(value: ResultType) => {
                  setResult(value);
                  setErrors((prev) => ({ ...prev, result: undefined }));
                }}
              >
                <SelectTrigger
                  className={cn(
                    "w-full",
                    theme === "dark"
                      ? "text-white border-gray-600"
                      : "text-[#333333] border-gray-300",
                    errors.result ? "border-red-500" : ""
                  )}
                >
                  <SelectValue placeholder="Select Result" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900">
                  {(["won", "runner-up", "participated"] as ResultType[]).map(
                    (resultType) => (
                      <SelectItem key={resultType} value={resultType}>
                        {resultType.charAt(0).toUpperCase() +
                          resultType.slice(1)}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <ErrorMessage message={errors.result} />
            </div>

            {/* Runner Up Position */}
            {result === "runner-up" && (
              <div className="flex flex-col">
                <Label
                  className={cn(
                    "mb-2",
                    theme === "dark" ? "text-white" : "text-[#333333]"
                  )}
                >
                  Runner Up Position
                </Label>
                <Input
                  placeholder="Enter your position"
                  className={cn(
                    "w-full px-3 py-2 border rounded-md",
                    theme === "dark"
                      ? "text-white bg-gray-900 placeholder-[#AAAAAA]"
                      : "text-[#333333] bg-white placeholder-[#B0B0B0]",
                    errors.runnerUpPosition ? "border-red-500" : ""
                  )}
                  value={runnerUpPosition}
                  onChange={(e) => {
                    setRunnerUpPosition(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      runnerUpPosition: undefined,
                    }));
                  }}
                />
                <ErrorMessage message={errors.runnerUpPosition} />
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            {/* Certificates Upload */}
            <div>
              <Label
                className={cn(
                  "mb-4",
                  theme === "dark" ? "text-white" : "text-[#333333]"
                )}
              >
                Upload Certificates
              </Label>
              <FileUploadSection
                files={certificateFiles}
                onFileChange={(newFiles: File[]) => {
                  const limitedFiles = newFiles.slice(
                    0,
                    5 - certificateFiles.length
                  );
                  setCertificateFiles((prev) => [...prev, ...limitedFiles]);
                }}
                onFileRemove={(index: number) => {
                  const updatedFiles = [...certificateFiles];
                  updatedFiles.splice(index, 1);
                  setCertificateFiles(updatedFiles);
                }}
                label="Click to upload certificates (PDF, JPG, PNG, max 5 files)"
                accept=".jpg,.jpeg,.png,.pdf"
                maxFiles={5}
              />
            </div>

            {/* Event Images Upload */}
            <div>
              <Label
                className={cn(
                  "mb-4",
                  theme === "dark" ? "text-white" : "text-[#333333]"
                )}
              >
                Upload Event Images
              </Label>
              <FileUploadSection
                files={eventImageFiles}
                onFileChange={(newFiles: File[]) => {
                  const limitedFiles = newFiles.slice(
                    0,
                    5 - certificateFiles.length
                  );
                  setCertificateFiles((prev) => [...prev, ...limitedFiles]);
                }}
                onFileRemove={(index: number) => {
                  const updatedFiles = [...eventImageFiles];
                  updatedFiles.splice(index, 1);
                  setEventImageFiles(updatedFiles);
                }}
                label="Click to upload event images (JPG, PNG, max 5 files)"
                accept=".jpg,.jpeg,.png"
                maxFiles={5}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const FileUploadSection = ({
    files,
    onFileChange,
    onFileRemove,
    accept = ".jpg,.jpeg,.png,.pdf",
    multiple = true,
    label = "Upload Files",
  }: {
    files: File[];
    onFileChange: (newFiles: File[]) => void;
    onFileRemove: (index: number) => void;
    accept?: string;
    multiple?: boolean;
    label?: string;
    maxFiles?: number;
  }) => {
    const { theme } = useTheme();

    return (
      <div className="space-y-4">
        <label
          htmlFor="file-upload"
          className={cn(
            "block w-full p-6 text-center cursor-pointer rounded-lg transition-colors group",
            theme === "dark"
              ? "bg-gray-800 hover:bg-gray-950"
              : "bg-gray-100 hover:bg-gray-200"
          )}
        >
          <input
            type="file"
            id="file-upload"
            multiple={multiple}
            accept={accept}
            className="hidden"
            onChange={(e) => {
              const uploadedFiles = e.target.files
                ? Array.from(e.target.files)
                : [];
              onFileChange(uploadedFiles);
            }}
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                "w-12 h-12 mb-2 transition-colors",
                theme === "dark"
                  ? "text-gray-400 group-hover:text-gray-300"
                  : "text-gray-500 group-hover:text-gray-600"
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p
              className={cn(
                "text-sm transition-colors",
                theme === "dark"
                  ? "text-gray-300 group-hover:text-white"
                  : "text-gray-600 group-hover:text-black"
              )}
            >
              {label}
            </p>
          </div>
        </label>

        {/* Uploaded Files Preview */}
        {files.length > 0 && (
          <div
            className={cn(
              "grid grid-cols-3 gap-4",
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            )}
          >
            {files.map((file, index) => (
              <div
                key={index}
                className={cn(
                  "relative p-3 rounded-lg flex items-center justify-between",
                  theme === "dark" ? "bg-[#2C2C2C]" : "bg-gray-100"
                )}
              >
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={cn(
                      "w-6 h-6",
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0013.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm truncate max-w-[150px]">
                    {file.name}
                  </span>
                </div>
                <button
                  onClick={() => onFileRemove(index)}
                  className={cn(
                    "p-1 rounded-full transition-colors",
                    theme === "dark"
                      ? "hover:bg-gray-700 text-gray-400 hover:text-white"
                      : "hover:bg-gray-200 text-gray-500 hover:text-black"
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const StepIndicator = () => {
    const stepTitles = ["Event Details", "Event Type", "Profile Data"];
    return (
      <div className={"text-center mb-8 "}>
        <div className="flex justify-between items-center mb-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold border-2",
                currentStep === step
                  ? "bg-purple-600 text-white"
                  : "bg-gray-300 text-gray-600 border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-800"
              )}
            >
              {step}
            </div>
          ))}
        </div>
        <div className={"flex justify-between text-gray-500"}>
          {stepTitles.map((title, index) => (
            <span key={index} className="text-sm">
              {title}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div
      className={
        "min-h-screen flex items-center justify-center p-4 bg-gray-200 dark:bg-gray-950"
      }
    >
      <motion.div
        className={
          "w-full max-w-md shadow-lg rounded-xl p-6 bg-white dark:bg-gray-900"
        }
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-center text-xl font-bold text-purple-500 dark:text-white pb-10">
          Add Achievement
        </h1>
        {/* Step Indicator */}
        <StepIndicator />

        <div className="mb-6">{renderStep()}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              className={
                "w-[45%] bg-white dark:bg-gray-800 dark:text-white dark:hover:bg-gray-900 "
              }
            >
              Previous
            </Button>
          )}
          <Button
            onClick={handleNextStep}
            className={cn(
              "w-[45%]",
              theme === "dark"
                ? "bg-[#6A11CB] text-white hover:bg-[#5A10BB]"
                : "bg-[#C7A4F5] text-white hover:bg-[#B794F4]"
            )}
          >
            {currentStep < 3 ? "Next" : "Submit"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default EventForm;
