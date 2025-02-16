import React, { useState } from 'react';
import { 
  Search, 
  Star, 
  Bookmark, 
  MoreVertical, 
  Download, 
  Filter
} from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Dummy data for mentees and requests
const menteeData = [
  { 
    id: 1, 
    name: 'Jatin Gera', 
    enrollment: '05120802722', 
    avatar: 'https://example.com/avatar1.jpg',
    achievements: 5
  },
  { 
    id: 2, 
    name: 'Nikhil Kumar', 
    enrollment: '03320802722', 
    avatar: 'https://example.com/avatar2.jpg',
    achievements: 3
  },
  // Add more mentee data
];

const requestsData = [
  {
    id: 1,
    name: 'Jatin Gera',
    achievement: 'Technical Symposium',
    date: '2024-02-15',
    type: 'Technical',
    enrollmentNo: '05120802722',
    certificateStatus: 'Submitted',
    result: 'Active'
  },
  // Add more request data
];

const MentorDashboard: React.FC = () => {
  const [selectedMentee, setSelectedMentee] = useState<number | null>(null);
  const [selectedRequests, setSelectedRequests] = useState<number[]>([]);

  // Performance Chart Data
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Achievements',
        data: [3, 5, 2, 6, 4, 7],
        backgroundColor: '#C7A4F5',
        borderRadius: 5,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Performance Chart'
      }
    }
  };

  const toggleRequestSelection = (id: number) => {
    setSelectedRequests(prev => 
      prev.includes(id)
        ? prev.filter(requestId => requestId !== id)
        : [...prev, id]
    );
  };

  const isAllRequestsSelected = selectedRequests.length === requestsData.length;

  const toggleAllRequests = () => {
    setSelectedRequests(
      isAllRequestsSelected 
        ? [] 
        : requestsData.map(request => request.id)
    );
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-50 border-r p-4 flex flex-col">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#C7A4F5]"
          />
        </div>

        {/* Mentee List */}
        <div className="flex-grow overflow-y-auto">
          <h3 className="font-semibold mb-4 text-gray-600">Mentees</h3>
          {menteeData.map(mentee => (
            <div 
              key={mentee.id}
              className={`flex items-center p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                selectedMentee === mentee.id 
                  ? 'bg-[#C7A4F5] text-white' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedMentee(mentee.id)}
            >
              <img 
                src={mentee.avatar} 
                alt={mentee.name} 
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{mentee.name}</p>
                <p className="text-xs">{mentee.enrollment}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mentor Info */}
        <div className="mt-6 bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center mb-4">
            <img 
              src="https://example.com/mentor-avatar.jpg" 
              alt="Mentor" 
              className="w-12 h-12 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold">Suman Mam</p>
              <span className="bg-[#C7A4F5] text-white text-xs px-2 py-1 rounded-full">
                Admin
              </span>
            </div>
          </div>
          <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
            Settings
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 bg-white">
        <div className="grid grid-cols-3 gap-6">
          {/* Requests Table */}
          <div className="col-span-2 bg-white shadow-lg rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-bold">Requests</h2>
                <p className="text-gray-500 text-sm">
                  Review and manage mentee achievement submissions
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Filter className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Download className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-gray-600">
                  <th className="p-3 text-left">
                    <input 
                      type="checkbox" 
                      checked={isAllRequestsSelected}
                      onChange={toggleAllRequests}
                      className="form-checkbox"
                    />
                  </th>
                  <th className="p-3 text-left">Achievement</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Student</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requestsData.map(request => (
                  <tr key={request.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <input 
                        type="checkbox" 
                        checked={selectedRequests.includes(request.id)}
                        onChange={() => toggleRequestSelection(request.id)}
                        className="form-checkbox"
                      />
                    </td>
                    <td className="p-3">{request.achievement}</td>
                    <td className="p-3">{request.date}</td>
                    <td className="p-3">{request.type}</td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <img 
                          src={`https://example.com/avatar-${request.enrollmentNo}.jpg`} 
                          alt={request.name} 
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        {request.name}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`
                        px-2 py-1 rounded-full text-xs
                        ${request.certificateStatus === 'Submitted' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                        }
                      `}>
                        {request.certificateStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <MoreVertical className="text-gray-500 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Top Performers & Performance Chart */}
          <div className="space-y-6">
            {/* Top Performers */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Top Performers</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Sort by</span>
                  <select className="text-sm bg-transparent">
                    <option>Achievements</option>
                    <option>Recent</option>
                  </select>
                </div>
              </div>

              {menteeData.map(mentee => (
                <div 
                  key={mentee.id}
                  className={`
                    flex items-center p-3 rounded-lg mb-2 
                    ${mentee.id === 1 ? 'bg-[#FFF5DB]' : 'hover:bg-gray-50'}
                  `}
                >
                  <img 
                    src={mentee.avatar} 
                    alt={mentee.name} 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div className="flex-grow">
                    <p className="font-semibold">{mentee.name}</p>
                    <p className="text-xs text-gray-500">{mentee.enrollment}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Star className="text-yellow-500 cursor-pointer" />
                    <Bookmark className="text-gray-500 cursor-pointer" />
                    <MoreVertical className="text-gray-500 cursor-pointer" />
                  </div>
                </div>
              ))}

              <div className="mt-4 text-center">
                <a 
                  href="#" 
                  className="text-[#C7A4F5] hover:underline"
                >
                  All mentees →
                </a>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
