 // pages/StaffManagement.jsx
 'use client'
import React, { useState, useEffect } from 'react';
import { UserPlus, Search, Grid, Calendar } from 'lucide-react';
import ScheduleEditorModal from '../components/ScheduleEditor';
import { toast } from 'sonner';
import Link from 'next/link';

// Initial staff data
const initialStaffData = [
  {
    id: '1',
    name: 'Sarah Johnson',
    position: 'Waiter',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    joinDate: '2023-01-15',
    schedule: [
      {
        day: 'monday',
        shifts: [{ start: '09:00', end: '17:00' }]
      },
      {
        day: 'tuesday',
        shifts: [{ start: '09:00', end: '17:00' }]
      },
      {
        day: 'wednesday',
        shifts: [{ start: '09:00', end: '17:00' }]
      },
      {
        day: 'thursday',
        shifts: [{ start: '09:00', end: '17:00' }]
      },
      {
        day: 'friday',
        shifts: [{ start: '09:00', end: '17:00' }]
      }
    ]
  },
  {
    id: '2',
    name: 'Michael Chen',
    position: 'Cleaner',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    joinDate: '2023-03-20',
    schedule: [
      {
        day: 'monday',
        shifts: [{ start: '10:00', end: '18:00' }]
      },
      {
        day: 'wednesday',
        shifts: [{ start: '10:00', end: '18:00' }]
      },
      {
        day: 'thursday',
        shifts: [{ start: '10:00', end: '18:00' }]
      },
      {
        day: 'friday',
        shifts: [{ start: '10:00', end: '18:00' }]
      }
    ]
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    position: 'Receptionist',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    joinDate: '2023-06-10',
    schedule: [
      {
        day: 'monday',
        shifts: [{ start: '08:00', end: '16:00' }]
      },
      {
        day: 'tuesday',
        shifts: [{ start: '08:00', end: '16:00' }]
      },
      {
        day: 'wednesday',
        shifts: [{ start: '08:00', end: '16:00' }]
      },
      {
        day: 'thursday',
        shifts: [{ start: '08:00', end: '16:00' }]
      },
      {
        day: 'friday',
        shifts: [{ start: '08:00', end: '16:00' }]
      }
    ]
  }
];

const StaffCard = ({ staff, onEditSchedule }) => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const joinDate = new Date(staff.joinDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="border-gray-200 bg-white shadow-sm hover:shadow-md border rounded-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <img
              src={staff.avatar}
              alt={staff.name}
              className="border-2 border-gray-100 rounded-full w-16 h-16 object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{staff.name}</h3>
              <p className="text-gray-500 text-sm capitalize">{staff.position}</p>
              <p className="mt-1 text-gray-400 text-xs">Joined {joinDate}</p>
            </div>
          </div>
          <button
            onClick={() => onEditSchedule(staff)}
            className="bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg font-medium text-blue-600 text-sm hover:text-blue-700 transition-colors"
          >
            Edit Schedule
          </button>
        </div>

        <div className="mt-6">
          <h4 className="mb-3 font-medium text-gray-700 text-sm">Weekly Schedule</h4>
          <div className="gap-1.5 grid grid-cols-7">
            {days.map((day) => {
              const schedule = staff.schedule?.find(s => s.day === day);
              const hasShift = schedule?.shifts?.length > 0;
              
              return (
                <div
                  key={day}
                  className={`text-center p-2 rounded-lg ${
                    hasShift 
                      ? 'bg-blue-50 border border-blue-100' 
                      : 'bg-gray-50 border border-gray-100'
                  }`}
                >
                  <span className="block mb-1 font-medium text-xs capitalize">
                    {day.slice(0, 3)}
                  </span>
                  {hasShift && (
                    <div className="text-xs">
                      <span className="font-medium text-blue-600">
                        {schedule.shifts[0].start}
                      </span>
                      <span className="mx-1 text-gray-400">-</span>
                      <span className="font-medium text-blue-600">
                        {schedule.shifts[0].end}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-gray-100 mt-6 pt-6 border-t">
          <div className="flex justify-between items-center text-sm">
            <div className="text-gray-500">
              Working days: {staff.schedule?.length || 0}
            </div>
            <div className="text-gray-500">
              Total hours: {calculateTotalHours(staff.schedule)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate total working hours
const calculateTotalHours = (schedule) => {
  if (!schedule) return 0;
  
  return schedule.reduce((total, day) => {
    return total + day.shifts.reduce((dayTotal, shift) => {
      const start = new Date(`2000-01-01 ${shift.start}`);
      const end = new Date(`2000-01-01 ${shift.end}`);
      const hours = (end - start) / (1000 * 60 * 60);
      return dayTotal + hours;
    }, 0);
  }, 0);
};

const StaffManagement = () => {
  const [staffMembers, setStaffMembers] = useState(initialStaffData);
  const [loading, setLoading] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('grid');

  const handleEditSchedule = (staff) => {
    setSelectedStaff(staff);
    setIsScheduleModalOpen(true);
  };

  const handleSaveSchedule = async (newSchedule) => {
    try {
      // Simulate API call
      setStaffMembers(staffMembers.map(staff =>
        staff.id === selectedStaff.id
          ? { ...staff, schedule: newSchedule }
          : staff
      ));

      toast.success('Schedule updated successfully');
      setIsScheduleModalOpen(false);
    } catch (error) {
      toast.error('Failed to update schedule');
    }
  };

  const filteredStaff = staffMembers.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="top-0 z-10 sticky bg-white border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="font-bold text-2xl text-gray-900">
                Staff Management
              </h1>
              <p className="text-gray-500 text-sm">
                Manage staff schedules and information
              </p>
            </div>
            <Link href={'/signup'}>
            <button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-sm text-white transition-colors">
              <UserPlus className="mr-2 w-4 h-4" />
              Add Staff Member
            </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {/* Filters */}
        <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-auto">
            <Search className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-2 pr-4 pl-10 border focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
            />
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg transition-colors ${
                view === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`p-2 rounded-lg transition-colors ${
                view === 'calendar'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Calendar className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Staff Grid */}
        {loading ? (
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-gray-200 bg-white shadow-sm p-6 border rounded-xl">
                <div className="flex space-x-4 animate-pulse">
                  <div className="bg-gray-200 rounded-full w-16 h-16"></div>
                  <div className="flex-1 space-y-4 py-1">
                    <div className="bg-gray-200 rounded w-3/4 h-4"></div>
                    <div className="space-y-2">
                      <div className="bg-gray-200 rounded h-4"></div>
                      <div className="bg-gray-200 rounded w-5/6 h-4"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredStaff.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-gray-500">No staff members found matching your search.</p>
              </div>
            ) : (
              <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredStaff.map(staff => (
                  <StaffCard
                    key={staff.id}
                    staff={staff}
                    onEditSchedule={handleEditSchedule}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Schedule Editor Modal */}
      <ScheduleEditorModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        staff={selectedStaff}
        onSave={handleSaveSchedule}
      />
    </div>
  );
};

export default StaffManagement;