import React, { useState } from 'react';
import { 
  Search, 
  Star, 
  Bookmark, 
  MoreVertical, 
  Download, 
  Filter,
  Settings,
  ChevronLeft,
  Menu,
  X
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const menteeData = [
  { 
    id: 1, 
    name: 'Jatin Gera', 
    enrollment: '05120802722', 
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop',
    achievements: 5
  },
  { 
    id: 2, 
    name: 'Nikhil Kumar', 
    enrollment: '03320802722', 
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
    achievements: 3
  },
  { 
    id: 3, 
    name: 'Priya Sharma', 
    enrollment: '04420802722', 
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    achievements: 4
  }
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
  {
    id: 2,
    name: 'Nikhil Kumar',
    achievement: 'Research Paper',
    date: '2024-02-14',
    type: 'Academic',
    enrollmentNo: '03320802722',
    certificateStatus: 'Pending',
    result: 'Active'
  },
  {
    id: 3,
    name: 'Priya Sharma',
    achievement: 'Hackathon Winner',
    date: '2024-02-13',
    type: 'Technical',
    enrollmentNo: '04420802722',
    certificateStatus: 'Submitted',
    result: 'Active'
  }
];

function App() {
  const [selectedMentee, setSelectedMentee] = useState<number | null>(null);
  const [selectedRequests, setSelectedRequests] = useState<number[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Performance Chart',
        font: {
          size: 16,
          weight: 'bold',
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  } as const; // ✅ Fix: Use `as const` for full inference
  

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
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? (
          <X className="w-5 h-5 text-gray-700" />
        ) : (
          <Menu className="w-5 h-5 text-gray-700" />
        )}
      </button>

      {/* Desktop Sidebar Toggle Button */}
      <button
        className="hidden lg:flex fixed top-4 left-4 z-50 items-center justify-center w-10 h-10 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-all"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <ChevronLeft 
          className={`w-5 h-5 text-gray-700 transform transition-transform duration-300 ${
            !isSidebarOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static h-screen bg-white shadow-lg z-40
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'w-[300px]' : 'w-0 '}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className={`
          h-full flex flex-col p-6
          ${!isSidebarOpen ? 'items-center' : ''}
        `}>
          {/* Search Bar */}
          <div className={`
            relative mb-8
            ${!isSidebarOpen ? 'w-10' : 'w-full'}
          `}>
            {isSidebarOpen ? (
              <>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search mentees..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-purple-200 text-sm"
                />
              </>
            ) : (
              <button className="p-2.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>

          {/* Mentee List */}
          <div className="flex-grow overflow-y-auto">
            {isSidebarOpen && (
              <h3 className="font-semibold mb-4 text-gray-800">Mentees</h3>
            )}
            <div className="space-y-2">
              {menteeData.map(mentee => (
                <div 
                  key={mentee.id}
                  className={`
                    flex items-center rounded-lg cursor-pointer transition-all
                    ${selectedMentee === mentee.id 
                      ? 'bg-purple-100 border-purple-200 shadow-sm' 
                      : 'hover:bg-gray-50'
                    }
                    ${!isSidebarOpen ? 'p-2 justify-center' : 'p-3'}
                  `}
                  onClick={() => setSelectedMentee(mentee.id)}
                >
                  <img 
                    src={mentee.avatar} 
                    alt={mentee.name} 
                    className={`
                      rounded-full object-cover
                      ${!isSidebarOpen ? 'w-8 h-8' : 'w-10 h-10 mr-3'}
                    `}
                  />
                  {isSidebarOpen && (
                    <div>
                      <p className="font-medium text-gray-800">{mentee.name}</p>
                      <p className="text-xs text-gray-500">{mentee.enrollment}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mentor Profile */}
          <div className={`
            mt-6 bg-purple-50 rounded-xl
            ${!isSidebarOpen ? 'p-2' : 'p-4'}
          `}>
            {isSidebarOpen ? (
              <>
                <div className="flex items-center mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=400&h=400&fit=crop" 
                    alt="Mentor" 
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">Suman Mam</p>
                    <span className="inline-block bg-purple-200 text-purple-700 text-xs px-2 py-1 rounded-full">
                      Admin
                    </span>
                  </div>
                </div>
                <button className="w-full py-2 px-4 bg-white hover:bg-gray-50 rounded-lg text-gray-700 flex items-center justify-center gap-2 transition-colors">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <img 
                  src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=400&h=400&fit=crop" 
                  alt="Mentor" 
                  className="w-10 h-10 rounded-full object-cover mb-2"
                />
                <button className="p-2 hover:bg-white rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`
        flex-grow p-6 lg:p-8 transition-all duration-300
        ${isSidebarOpen ? '' : 'lg:ml-[20px]'}
      `}>
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Requests Table */}
          <div className="xl:col-span-3 bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Requests</h2>
                  <p className="text-gray-500 text-sm">
                    Review and manage mentee achievement submissions
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Filter className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-3 text-left">
                        <input 
                          type="checkbox" 
                          checked={isAllRequestsSelected}
                          onChange={toggleAllRequests}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                      </th>
                      <th className="p-3 text-left text-sm font-semibold text-gray-600">Achievement</th>
                      <th className="p-3 text-left text-sm font-semibold text-gray-600">Date</th>
                      <th className="p-3 text-left text-sm font-semibold text-gray-600">Type</th>
                      <th className="p-3 text-left text-sm font-semibold text-gray-600">Student</th>
                      <th className="p-3 text-left text-sm font-semibold text-gray-600">Status</th>
                      <th className="p-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestsData.map(request => (
                      <tr key={request.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-3">
                          <input 
                            type="checkbox" 
                            checked={selectedRequests.includes(request.id)}
                            onChange={() => toggleRequestSelection(request.id)}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                        </td>
                        <td className="p-3 text-sm">{request.achievement}</td>
                        <td className="p-3 text-sm text-gray-600">{request.date}</td>
                        <td className="p-3">
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">
                            {request.type}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <img 
                              src={menteeData.find(m => m.enrollment === request.enrollmentNo)?.avatar} 
                              alt={request.name} 
                              className="w-8 h-8 rounded-full object-cover mr-2"
                            />
                            <span className="text-sm">{request.name}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className={`
                            px-2 py-1 rounded-full text-xs
                            ${request.certificateStatus === 'Submitted' 
                              ? 'bg-green-50 text-green-700' 
                              : 'bg-yellow-50 text-yellow-700'
                            }
                          `}>
                            {request.certificateStatus}
                          </span>
                        </td>
                        <td className="p-3">
                          <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreVertical className="w-5 h-5 text-gray-500" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Top Performers */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">Top Performers</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sort by</span>
                  <select className="text-sm bg-transparent border-0 focus:ring-2 focus:ring-purple-200 rounded-lg">
                    <option>Achievements</option>
                    <option>Recent</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                {menteeData.map(mentee => (
                  <div 
                    key={mentee.id}
                    className={`
                      flex items-center p-3 rounded-lg transition-colors
                      ${mentee.id === 1 ? 'bg-yellow-50' : 'hover:bg-gray-50'}
                    `}
                  >
                    <img 
                      src={mentee.avatar} 
                      alt={mentee.name} 
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div className="flex-grow">
                      <p className="font-medium text-gray-800">{mentee.name}</p>
                      <p className="text-xs text-gray-500">{mentee.enrollment}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-white rounded-lg transition-colors">
                        <Star className="w-5 h-5 text-yellow-500" />
                      </button>
                      <button className="p-1 hover:bg-white rounded-lg transition-colors">
                        <Bookmark className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button 
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm hover:underline"
                >
                  View all mentees →
                </button>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <div className="h-[300px]">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;