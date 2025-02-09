import { VisitsGraph } from "./_components/TotalVisitsGraph";
import { Calendar } from "./_components/Calendar";
import { RecentAchievements } from "./_components/RecentAchievements";

const Dashboard = () => {
  return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-black-100 to-purple-300 backdrop-blur-lg shadow-1xl rounded-2xl p-8 border border-purple-100/50">
        
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent mb-4">
            Dashboard
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <VisitsGraph />
            </div>
            <div>
              <Calendar />
            </div>
            <div className="lg:col-span-3">
            <RecentAchievements  />;
          
            </div>
          </div>
        </div>
      
  );
};

export default Dashboard;