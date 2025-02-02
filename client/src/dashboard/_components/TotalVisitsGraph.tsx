import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from 'lucide-react';

const data = [
  { name: 'Jan', visits: 4000 },
  { name: 'Feb', visits: 3000 },
  { name: 'Mar', visits: 2000 },
  { name: 'Apr', visits: 2780 },
  { name: 'May', visits: 1890 },
  { name: 'Jun', visits: 2390 },
];

export function VisitsGraph() {
  return (
    <Card className="bg-black backdrop-blur-lg border-slate-800/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-emerald-400" />
          <CardTitle className="text-slate-100">Total Visits</CardTitle>
        </div>
        <span className="text-emerald-400 text-sm font-medium">+12.5%</span>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="visitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#f1f5f9'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="visits" 
                stroke="#6366f1" 
                fill="url(#visitGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}