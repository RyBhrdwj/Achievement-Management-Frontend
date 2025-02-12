import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreVertical, Filter, Trash2, Download, Calendar, Clock, User, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as XLSX from 'xlsx';

const getStatusStyles = (status: string) => {
  switch(status.toLowerCase()) {
    case 'pending':
      return {
        icon: <Clock className="h-4 w-4 mr-2 text-yellow-600" />,
        textClass: "bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-1 rounded-md inline-flex items-center",
      };
    case 'accepted':
      return {
        icon: <CheckCircle className="h-4 w-4 mr-2 text-green-600" />,
        textClass: "bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded-md inline-flex items-center",
      };
    case 'rejected':
      return {
        icon: <XCircle className="h-4 w-4 mr-2 text-red-600" />,
        textClass: "bg-red-50 text-red-700 border border-red-200 px-2 py-1 rounded-md inline-flex items-center",
      };
    default:
      return {
        icon: null,
        textClass: "px-2 py-1 rounded-md inline-flex items-center",
      };
  }
};

interface Achievement {
  id: number;
  name: string;
  date: string;
  type: string;
  mode: string;
  organizer: string;
  status: string;
  certificate: string;
}

const initialAchievements = [
  {
    id: 1,
    name: "Flipkart Grid",
    date: "05/10/2024 - 06/10/2024",
    type: "Hackathon",
    mode: "Online",
    organizer: "Unstop",
    status: "Pending",
    certificate: "Submitted"
  },
  {
    id: 2,
    name: "Bold text column",
    date: "Regular text column",
    type: "Regular text column",
    mode: "Regular text column",
    organizer: "Regular text column",
    status: "Accepted",
    certificate: "Active"
  },
  {
    id: 3,
    name: "Bold text column",
    date: "Regular text column",
    type: "Regular text column",
    mode: "Regular text column",
    organizer: "Regular text column",
    status: "Rejected",
    certificate: "Not Submitted"
  }
];

interface FilterState {
  name: string;
  type: string;
  mode: string;
  status: string;
  certificate: string;
}

export function RecentAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [filters, setFilters] = useState<FilterState>({
    name: '',
    type: '',
    mode: '',
    status: '',
    certificate: '',
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const uniqueTypes = Array.from(new Set(initialAchievements.map(a => a.type)));
  const uniqueModes = Array.from(new Set(initialAchievements.map(a => a.mode)));
  const uniqueStatuses = Array.from(new Set(initialAchievements.map(a => a.status)));
  const uniqueCertificates = Array.from(new Set(initialAchievements.map(a => a.certificate)));

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    let filtered = [...initialAchievements];

    if (filters.name) {
      filtered = filtered.filter(a => 
        a.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.type) {
      filtered = filtered.filter(a => a.type === filters.type);
    }
    if (filters.mode) {
      filtered = filtered.filter(a => a.mode === filters.mode);
    }
    if (filters.status) {
      filtered = filtered.filter(a => a.status === filters.status);
    }
    if (filters.certificate) {
      filtered = filtered.filter(a => a.certificate === filters.certificate);
    }

    setAchievements(filtered);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setFilters({
      name: '',
      type: '',
      mode: '',
      status: '',
      certificate: '',
    });
    setAchievements(initialAchievements);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(achievements.map(a => a.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, id]);
    } else {
      setSelectedItems(prev => prev.filter(itemId => itemId !== id));
    }
  };

  const handleDelete = () => {
    setAchievements(prev => prev.filter(a => !selectedItems.includes(a.id)));
    setSelectedItems([]);
  };

  const handleExport = () => {
    // Prepare data for export
    const exportData = achievements.map(({ id, ...achievement }) => ({
      'Achievement Name': achievement.name,
      'Date': achievement.date,
      'Type': achievement.type,
      'Mode': achievement.mode,
      'Organized by': achievement.organizer,
      'Certificate': achievement.certificate,
      'Status': achievement.status,
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Set column widths
    const colWidths = [
      { wch: 30 }, // Achievement Name
      { wch: 20 }, // Date
      { wch: 15 }, // Type
      { wch: 15 }, // Mode
      { wch: 20 }, // Organized by
      { wch: 15 }, // Certificate
      { wch: 15 }, // Status
    ];
    ws['!cols'] = colWidths;

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Achievements');

    // Generate Excel file
    XLSX.writeFile(wb, 'achievements.xlsx');
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="rounded-lg shadow-sm border bg-white dark:bg-gray-800">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold dark:text-gray-200 text-gray-900">Recent Achievements</h2>
            <p className="text-sm dark:text-gray-300 text-gray-500">A descriptive body text comes here</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="dark:text-gray-200 text-gray-600 dark:hover:bg-gray-900"
              onClick={handleDelete}
              disabled={selectedItems.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
            <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="dark:text-gray-200 text-gray-600 dark:hover:bg-gray-900">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Filter Achievements</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Achievement Name</Label>
                    <Input
                      id="name"
                      placeholder="Search by name..."
                      value={filters.name}
                      onChange={(e) => handleFilterChange('name', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Type</Label>
                    <Select
                      value={filters.type}
                      onValueChange={(value) => handleFilterChange('type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {uniqueTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Mode</Label>
                    <Select
                      value={filters.mode}
                      onValueChange={(value) => handleFilterChange('mode', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        {uniqueModes.map((mode) => (
                          <SelectItem key={mode} value={mode}>
                            {mode}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Status</Label>
                    <Select
                      value={filters.status}
                      onValueChange={(value) => handleFilterChange('status', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {uniqueStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Certificate</Label>
                    <Select
                      value={filters.certificate}
                      onValueChange={(value) => handleFilterChange('certificate', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select certificate status" />
                      </SelectTrigger>
                      <SelectContent>
                        {uniqueCertificates.map((cert) => (
                          <SelectItem key={cert} value={cert}>
                            {cert}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                  <Button onClick={applyFilters}>Apply Filters</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-gray-600 dark:text-gray-200 dark:hover:bg-gray-900"
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-900">
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedItems.length === achievements.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Achievement Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Organized by</TableHead>
                <TableHead>Certificate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {achievements.map((achievement) => (
                <TableRow key={achievement.id} className='dark:hover:bg-gray-900'>
                  <TableCell>
                    <Checkbox 
                      checked={selectedItems.includes(achievement.id)}
                      onCheckedChange={(checked) => handleSelectItem(achievement.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{achievement.name}</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">{achievement.date}</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">{achievement.type}</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">{achievement.mode}</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">{achievement.organizer}</TableCell>
                  <TableCell>
                  <Badge 
                      variant={achievement.certificate === "Inactive" ? "secondary" : 
                              achievement.certificate === "Submitted" ? "default" : "destructive"}
                      className={`font-normal ${achievement.certificate === "Active" ? "bg-green-500 text-white" : ""}`}
                    >
                      {achievement.certificate}
                    </Badge>

                  </TableCell>
                  <TableCell className="text-gray-600">
                    {(() => {
                      const { icon, textClass } = getStatusStyles(achievement.status);
                      return (
                        <span className={textClass}>
                          {icon}
                          {achievement.status}
                        </span>
                      );
                    })()}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost"  className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}