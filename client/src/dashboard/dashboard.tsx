import { VisitsGraph } from "./_components/TotalVisitsGraph";
import { Calendar } from "./_components/Calendar";
import { RecentAchievements } from "./_components/RecentAchievements";

const Dashboard = () => {
  return (
      <div className="min-h-screen bg-gray-200 p-8 ">          
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