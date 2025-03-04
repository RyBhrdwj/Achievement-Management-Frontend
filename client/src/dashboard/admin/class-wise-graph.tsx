import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const batchData = {
  "2022": [
    { name: "CSE A", accepted: 200, rejected: 100, pending: 50 },
    { name: "CSE B", accepted: 250, rejected: 80, pending: 40 },
    { name: "CSE C", accepted: 180, rejected: 90, pending: 60 },
    { name: "IT A", accepted: 270, rejected: 100, pending: 30 },
    { name: "IT B", accepted: 230, rejected: 110, pending: 50 },
    { name: "IT C", accepted: 190, rejected: 95, pending: 40 },
    { name: "ECE A", accepted: 210, rejected: 105, pending: 35 },
    { name: "ECE B", accepted: 200, rejected: 120, pending: 50 },
    { name: "EEE", accepted: 180, rejected: 85, pending: 40 },
    { name: "AIDS", accepted: 220, rejected: 90, pending: 55 },
  ],
  "2023": [
    { name: "CSE A", accepted: 210, rejected: 95, pending: 45 },
    { name: "CSE B", accepted: 260, rejected: 85, pending: 35 },
    { name: "CSE C", accepted: 190, rejected: 100, pending: 50 },
    { name: "IT A", accepted: 280, rejected: 110, pending: 25 },
    { name: "IT B", accepted: 240, rejected: 105, pending: 55 },
    { name: "IT C", accepted: 200, rejected: 100, pending: 35 },
    { name: "ECE A", accepted: 220, rejected: 120, pending: 40 },
    { name: "ECE B", accepted: 210, rejected: 130, pending: 55 },
    { name: "EEE", accepted: 190, rejected: 95, pending: 45 },
    { name: "AIDS", accepted: 230, rejected: 100, pending: 60 },
  ],
};


export function ClassWiseGraph() {
  const [selectedBatch, setSelectedBatch] = useState("2022");

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2 ml-10">
          <Trophy className="h-5 w-5 text-emerald-400" />
          <CardTitle className="text-slate-800 dark:text-gray-200 lg:text-xl text-sm">
            Class wise Achievements
          </CardTitle>
        </div>
        <Select onValueChange={setSelectedBatch} defaultValue="2022">
          <SelectTrigger className="w-32 text-sm bg-gray-100 dark:bg-gray-700">
            <SelectValue placeholder="Select Batch" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(batchData).map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] lg:h-[350px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={batchData[selectedBatch]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="name"
                stroke="#94a3b8"
                className="text-xs sm:text-sm"
              />
              <YAxis stroke="#94a3b8" className="text-xs sm:text-sm" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  borderRadius: "8px",
                  color: "#f1f5f9",
                }}
                cursor={{fill: 'transparent'}}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                wrapperStyle={{
                  fontSize: "14px",
                  marginTop: "12px",
                }}
              />
              <Bar
                dataKey="accepted"
                stackId="a"
                fill="#7C3AED"
                style={{ transition: "all 0.3s ease-in-out" }}
              />
              <Bar
                dataKey="rejected"
                stackId="a"
                fill="#A855F7"
                style={{ transition: "all 0.3s ease-in-out" }}
              />
              <Bar
                dataKey="pending"
                stackId="a"
                fill="#38BDF8"
                radius={[4, 4, 0, 0]}
                style={{ transition: "all 0.3s ease-in-out" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
