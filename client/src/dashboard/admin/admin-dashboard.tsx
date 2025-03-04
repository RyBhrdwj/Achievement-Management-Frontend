import { RecentAchievements } from "../_components/RecentAchievements";
import { ClassWiseGraph } from "./class-wise-graph";
import { AchievementDistributionGraph } from "./achievement-distribution-graph";
import Announcement from "./announcement";



const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Announcement />
        <div className="lg:col-span-2">
          <ClassWiseGraph />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2">
          <RecentAchievements />
        </div>
        <div className="md:col-span-1">
          <AchievementDistributionGraph />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
