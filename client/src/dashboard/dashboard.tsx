import { VisitsGraph } from "./_components/TotalVisitsGraph";
import { Calendar } from "./_components/Calendar";
import { RecentAchievements } from "./_components/RecentAchievements";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-pink-100 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <VisitsGraph />
              </div>
              <div>
                <Calendar />
              </div>
              <div className="lg:col-span-3">
                <RecentAchievements />
              </div>
            </div>
          </div>
        </div>
      );
};

export default Dashboard;
