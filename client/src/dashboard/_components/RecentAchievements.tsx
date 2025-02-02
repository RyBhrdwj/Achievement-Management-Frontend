import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Star, Award } from 'lucide-react';

const achievements = [
  {
    id: 1,
    title: 'First Place in Hackathon',
    date: '2024-02-15',
    description: 'Won the annual developer competition.',
    icon: Trophy,
    color: 'text-amber-400',
    gradient: 'from-blue-900/30 to-blue-800/10'
  },
  {
    id: 2,
    title: 'Completed 100 Tasks',
    date: '2024-02-10',
    description: 'Reached milestone in project delivery.',
    icon: Star,
    color: 'text-indigo-400',
    gradient: 'from-indigo-900/30 to-indigo-800/10'
  },
  {
    id: 3,
    title: 'Perfect Week Streak',
    date: '2024-02-05',
    description: 'Maintained 100% productivity score.',
    icon: Award,
    color: 'text-teal-400',
    gradient: 'from-teal-900/30 to-teal-800/10'
  },
];

export function RecentAchievements() {
  return (
    <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/50 
      backdrop-blur-xl shadow-lg shadow-blue-900/30 rounded-2xl">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Trophy className="h-6 w-6 text-amber-400 drop-shadow-lg" />
          <CardTitle className="text-slate-100 text-lg font-semibold tracking-wide">
            Recent Achievements
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.id}
                className={`flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r ${achievement.gradient} 
                  border border-slate-700/50 hover:border-slate-500/50 transition-all duration-300 
                  hover:translate-x-1 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-900/40`}
              >
                <div className={`p-3 rounded-lg ${achievement.color} bg-slate-800/70 shadow-md shadow-black/40`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-100">{achievement.title}</h3>
                  <p className="text-sm text-slate-400">{achievement.description}</p>
                  <p className="text-xs text-slate-500 mt-1">{achievement.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
