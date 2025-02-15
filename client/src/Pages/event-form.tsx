import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon, UploadIcon, AlertCircleIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";

type EventType = 
  | 'technical' 
  | 'cultural' 
  | 'debate' 
  | 'speech' 
  | 'volunteer' 
  | 'meetup' 
  | 'other';

type ResultType = 'won' | 'runner-up' | 'participated';


const EventForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isOffline, setIsOffline] = useState(true);
  const [eventType, setEventType] = useState<EventType>('technical');
  const [customEventType, setCustomEventType] = useState('');
  const [result, setResult] = useState<ResultType | null>(null);
  const [runnerUpPosition, setRunnerUpPosition] = useState('');
  const [organizedBy, setOrganizedBy] = useState('');
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

    switch(currentStep) {
      case 1:
        if (!eventName.trim()) newErrors.eventName = "Event Name is required";
        if (!date) newErrors.date = "Event Date is required";
        if (!organizedBy.trim()) newErrors.organizedBy = "Organized By is required";
        break;
      case 2:
        if (eventType === 'other' && !customEventType.trim()) 
          newErrors.customEventType = "Custom Event Type is required";
        if (!result) 
          newErrors.result = "Result is required";
        if (result === 'runner-up' && !runnerUpPosition.trim()) 
          newErrors.runnerUpPosition = "Runner Up Position is required";
        break;
      case 3:
        if (certificateFiles.length === 0) 
          newErrors.certificateFiles = "At least one certificate file is required";
        if (eventImageFiles.length === 0) 
          newErrors.eventImageFiles = "At least one event image is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      if (currentStep < 3) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Final submission
        console.log("Form Data:", {
          eventName,
          date,
          isOffline,
          eventType: eventType === 'other' ? customEventType : eventType,
          organizedBy,
          result,
          runnerUpPosition,
          certificateFiles,
          eventImageFiles
        });
        toast({
          title: "Success",
          description: "Event added successfully!",
          variant: "default"
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
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            {/* Event Name */}
            <div className="flex flex-col">
              <Label className="mb-2 text-[#333333]">Event Name</Label>
              <Input 
                placeholder="Enter event name" 
                className={`w-full px-3 py-2 border rounded-md text-[#333333] placeholder-[#B0B0B0] 
                  ${errors.eventName ? 'border-red-500' : ''}`}
                value={eventName}
                onChange={(e) => {
                  setEventName(e.target.value);
                  setErrors(prev => ({ ...prev, eventName: undefined }));
                }}
              />
              <ErrorMessage message={errors.eventName} />
            </div>

            {/* Event Date */}
            <div className="flex flex-col">
              <Label className="mb-2 text-[#333333]">Event Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={`w-full justify-between text-[#333333] border-gray-300 
                      ${errors.date ? 'border-red-500' : ''}`}
                  >
                    {date ? format(date, "PPP") : "Select Date"}
                    <CalendarIcon className="h-5 w-5 text-[#B0B0B0]" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar 
                    mode="single" 
                    selected={date} 
                    onSelect={(selectedDate) => {
                      setDate(selectedDate);
                      setErrors(prev => ({ ...prev, date: undefined }));
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <ErrorMessage message={errors.date} />
            </div>

            {/* Organized By */}
            <div className="flex flex-col">
              <Label className="mb-2 text-[#333333]">Organized By</Label>
              <Input 
                placeholder="Enter organization name" 
                className={`w-full px-3 py-2 border rounded-md text-[#333333] placeholder-[#B0B0B0]
                  ${errors.organizedBy ? 'border-red-500' : ''}`}
                value={organizedBy}
                onChange={(e) => {
                  setOrganizedBy(e.target.value);
                  setErrors(prev => ({ ...prev, organizedBy: undefined }));
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
              <Label className="mb-2 text-[#333333]">Event Type</Label>
              <Select 
                value={eventType}
                onValueChange={(value: EventType) => {
                  setEventType(value);
                  setCustomEventType('');
                  setErrors(prev => ({ ...prev, customEventType: undefined }));
                }}
              >
                <SelectTrigger className="w-full text-[#333333]">
                  <SelectValue placeholder="Select Event Type" />
                </SelectTrigger>
                <SelectContent>
                  {(['technical', 'cultural', 'debate', 'speech', 'volunteer', 'meetup', 'other'] as EventType[]).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Custom Event Type --grey text field abhi ke liye*/}
            {eventType === 'other' && (
              <div className="flex flex-col">
                <Label className="mb-2 text-[#333333]">Custom Event Type</Label>
                <Input 
                  placeholder="Enter your custom event type" 
                  className={`w-full px-3 py-2 border rounded-md 
                    bg-[#F0F0F0] text-[#555555] cursor-not-allowed
                    ${errors.customEventType ? 'border-red-500' : ''}`}
                  value={customEventType}
                  onChange={(e) => {
                    setCustomEventType(e.target.value);
                    setErrors(prev => ({ ...prev, customEventType: undefined }));
                  }}
                  disabled={eventType !== 'other'}
                />
                <ErrorMessage message={errors.customEventType} />
              </div>
            )}

            {/* Event Mode -greenblack swithc*/}
            <div className="flex flex-col">
              <Label className="mb-2 text-[#333333]">Event Mode</Label>
              <div className="flex items-center space-x-4">
                <span className={!isOffline ? "text-green-600 font-bold" : ""}>Online</span>
                <Switch 
                  checked={isOffline} 
                  onCheckedChange={setIsOffline} 
                  className={isOffline ? "bg-blue-500" : "bg-green-500"}
                />
                <span className={isOffline ? "text-green-600 font-bold" : ""}>Offline</span>
              </div>
            </div>

            {/* Result */}
            <div className="flex flex-col">
              <Label className="mb-2 text-[#333333]">Result</Label>
              <Select 
                value={result || ''}
                onValueChange={(value: ResultType) => {
                  setResult(value);
                  setErrors(prev => ({ ...prev, result: undefined }));
                }}
              >
                <SelectTrigger 
                  className={`w-full text-[#333333] 
                    ${errors.result ? 'border-red-500' : ''}`}
                >
                  <SelectValue placeholder="Select Result" />
                </SelectTrigger>
                <SelectContent>
                  {(['won', 'runner-up', 'participated'] as ResultType[]).map((resultType) => (
                    <SelectItem key={resultType} value={resultType}>
                      {resultType.charAt(0).toUpperCase() + resultType.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ErrorMessage message={errors.result} />
            </div>

            {/* Runner Up Position */}
            {result === 'runner-up' && (
              <div className="flex flex-col">
                <Label className="mb-2 text-[#333333]">Runner Up Position</Label>
                <Input 
                  placeholder="Enter your position" 
                  className={`w-full px-3 py-2 border rounded-md text-[#333333] placeholder-[#B0B0B0]
                    ${errors.runnerUpPosition ? 'border-red-500' : ''}`}
                  value={runnerUpPosition}
                  onChange={(e) => {
                    setRunnerUpPosition(e.target.value);
                    setErrors(prev => ({ ...prev, runnerUpPosition: undefined }));
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
            <div className="flex flex-col">
              <Label className="mb-2 text-[#333333]">Upload Certificates</Label>
              <div 
                className={`border-2 border-dashed rounded-lg p-3 text-center
                  ${errors.certificateFiles ? 'border-red-500' : 'border-[#A0A0A0]'}`}
                onDragOver={handleDragOver}
                onDrop={(e) => {
                  handleDrop(e, setCertificateFiles, 5);
                  setErrors(prev => ({ ...prev, certificateFiles: undefined }));
                }}
              >
                <UploadIcon className="mx-auto mb-2 text-[#A0A0A0] w-10 h-10" />
                <p className="text-[#A0A0A0] mb-2 text-xs">
                  Drag & Drop or Click to Upload
                </p>
                <p className="text-xs text-[#A0A0A0] mb-2">
                  Accepted formats: PDF, JPEG, PNG, WebP (Max 5 files)
                </p>
                <input 
                  type="file" 
                  accept=".pdf,.jpg,.jpeg,.png,.webp"
                  multiple
                  className="hidden"
                  id="certificateUpload"
                  onChange={(e) => {
                    handleFileUpload(e.target.files, setCertificateFiles, 5);
                    setErrors(prev => ({ ...prev, certificateFiles: undefined }));
                  }}
                />
                <label 
                  htmlFor="certificateUpload" 
                  className="cursor-pointer bg-white border border-[#A0A0A0] rounded-md px-2 py-1 inline-block text-xs"
                >
                  Choose Files
                </label>
                {certificateFiles.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs">
                      {certificateFiles.length} file(s) selected
                    </p>
                  </div>
                )}
                <ErrorMessage message={errors.certificateFiles} />
              </div>
            </div>

            {/* Event Images Upload */}
            <div className="flex flex-col">
              <Label className="mb-2 text-[#333333]">Upload Event Images</Label>
              <div 
                className={`border-2 border-dashed rounded-lg p-3 text-center
                  ${errors.eventImageFiles ? 'border-red-500' : 'border-[#A0A0A0]'}`}
                onDragOver={handleDragOver}
                onDrop={(e) => {
                  handleDrop(e, setEventImageFiles, 5);
                  setErrors(prev => ({ ...prev, eventImageFiles: undefined }));
                }}
              >
                <UploadIcon className="mx-auto mb-2 text-[#A0A0A0] w-10 h-10" />
                <p className="text-[#A0A0A0] mb-2 text-xs">
                  Drag & Drop or Click to Upload
                </p>
                <p className="text-xs text-[#A0A0A0] mb-2">
                  Accepted formats: JPEG, PNG, WebP (Max 5 files)
                </p>
                <input 
                  type="file" 
                  accept=".jpg,.jpeg,.png,.webp"
                  multiple
                  className="hidden"
                  id="eventImageUpload"
                  onChange={(e) => {
                    handleFileUpload(e.target.files, setEventImageFiles, 5);
                    setErrors(prev => ({ ...prev, eventImageFiles: undefined }));
                  }}
                />
                <label 
                  htmlFor="eventImageUpload" 
                  className="cursor-pointer bg-white border border-[#A0A0A0] rounded-md px-2 py-1 inline-block text-xs"
                >
                  Choose Files
                </label>
                {eventImageFiles.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs">
                      {eventImageFiles.length} file(s) selected
                    </p>
                  </div>
                )}
                <ErrorMessage message={errors.eventImageFiles} />
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  
  const handleFileUpload = (
    files: FileList | null, 
    setFiles: React.Dispatch<React.SetStateAction<File[]>>, 
    maxFiles: number
  ) => {
    if (files) {
      const fileArray = Array.from(files).slice(0, maxFiles);
      setFiles(fileArray);
    }
  };

  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>, 
    setFiles: React.Dispatch<React.SetStateAction<File[]>>, 
    maxFiles: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    handleFileUpload(files, setFiles, maxFiles);
  };

  
  const StepIndicator = () => {
    const stepTitles = ["Event Details", "Event Type", "Profile Data"];
    return (
      <div className="text-center mb-8">
        <div className="flex justify-between items-center mb-2">
          {[1, 2, 3].map((step) => (
            <div 
              key={step} 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2
                ${currentStep === step 
                  ? 'bg-[#C7A4F5] text-white border-[#C7A4F5]' 
                  : 'bg-[#D3D3D3] text-gray-600 border-[#D3D3D3]'
                }`}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-gray-600">
          {stepTitles.map((title, index) => (
            <span key={index} className="text-sm">{title}</span>
          ))}
        </div>
      </div>
    );
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#EAEAEA] flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Step Indicator */}
        <StepIndicator />

        
        <div className="mb-6">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            className="bg-[#D3D3D3] text-gray-700 hover:bg-[#C0C0C0]"
            onClick={handlePreviousStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <Button 
            className="bg-[#C7A4F5] text-white hover:bg-[#B085D4]"
            onClick={handleNextStep}
          >
            {currentStep === 3 ? 'Submit' : 'Next'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default EventForm;
