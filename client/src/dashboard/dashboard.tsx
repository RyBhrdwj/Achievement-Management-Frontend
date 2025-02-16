import { VisitsGraph } from "./_components/TotalVisitsGraph";
import { Calendar } from "./_components/Calendar";
import { RecentAchievements } from "./_components/RecentAchievements";
import { Link } from "react-router-dom";


const Dashboard = () => {
  return (
      <div className="min-h-screen bg-gray-200 dark:bg-gray-950 p-8 ">    
      <div className="mb-4">
        <Link 
          to="/mentor/dashboard" 
          className="bg-[#C7A4F5] text-white px-4 py-2 rounded hover:bg-purple-600 transition"
        >
          Go to Mentor Dashboard
        </Link>
      </div>      
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