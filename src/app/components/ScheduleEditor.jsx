// components/ScheduleEditor/index.jsx
import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save, Clock, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const ScheduleEditorModal = ({ isOpen, onClose, staff, onSave }) => {
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  // Generate time options from 00:00 to 23:30 in 30-minute intervals
  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2).toString().padStart(2, '0');
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour}:${minute}`;
  });

  useEffect(() => {
    if (staff?.schedule) {
      setScheduleData(
        days.map(day => ({
          day,
          shifts: staff.schedule.find(s => s.day === day)?.shifts || []
        }))
      );
    }
  }, [staff]);

  const addShift = (dayIndex) => {
    const newSchedule = [...scheduleData];
    newSchedule[dayIndex].shifts.push({ start: '09:00', end: '17:00' });
    setScheduleData(newSchedule);
  };

  const removeShift = (dayIndex, shiftIndex) => {
    const newSchedule = [...scheduleData];
    newSchedule[dayIndex].shifts.splice(shiftIndex, 1);
    setScheduleData(newSchedule);
  };

  const updateShift = (dayIndex, shiftIndex, field, value) => {
    const newSchedule = [...scheduleData];
    newSchedule[dayIndex].shifts[shiftIndex][field] = value;
    setScheduleData(newSchedule);
  };

  const validateSchedule = (schedule) => {
    return schedule.every(day => 
      day.shifts.every(shift => {
        const start = new Date(`2000-01-01 ${shift.start}`);
        const end = new Date(`2000-01-01 ${shift.end}`);
        return end > start;
      })
    );
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!validateSchedule(scheduleData)) {
        throw new Error('Invalid shift times detected');
      }

      const cleanedSchedule = scheduleData.filter(day => day.shifts.length > 0);
      
      // Here you would typically make an API call
      // await api.updateSchedule(staff.id, cleanedSchedule);
      
      onSave(cleanedSchedule);
      toast.success('Schedule updated successfully');
      onClose();
    } catch (error) {
      setError(error.message);
      toast.error('Failed to update schedule');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center border-gray-200 p-6 border-b">
          <div>
            <h2 className="font-bold text-gray-900 text-xl">Edit Schedule</h2>
            <p className="mt-1 text-gray-500 text-sm">
              {staff?.name} - {staff?.position}
            </p>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
          {error && (
            <div className="flex items-center bg-red-50 mb-4 p-3 rounded-lg text-red-600">
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="space-y-6">
            {scheduleData.map((daySchedule, dayIndex) => (
              <div key={daySchedule.day} className="border-gray-200 p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-lg capitalize">{daySchedule.day}</h3>
                  <button
                    onClick={() => addShift(dayIndex)}
                    className="inline-flex items-center bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg font-medium text-blue-600 text-sm transition-colors"
                  >
                    <Plus className="mr-1 w-4 h-4" />
                    Add Shift
                  </button>
                </div>

                {daySchedule.shifts.length === 0 ? (
                  <p className="text-gray-500 text-sm italic">No shifts scheduled</p>
                ) : (
                  <div className="space-y-3">
                    {daySchedule.shifts.map((shift, shiftIndex) => (
                      <div
                        key={shiftIndex}
                        className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg"
                      >
                        <Clock className="w-5 h-5 text-gray-400" />
                        <div className="flex-1 gap-4 grid grid-cols-2">
                          <div>
                            <label className="block mb-1 font-medium text-gray-700 text-sm">
                              Start Time
                            </label>
                            <select
                              value={shift.start}
                              onChange={(e) => updateShift(dayIndex, shiftIndex, 'start', e.target.value)}
                              className="border-gray-200 focus:border-blue-500 rounded-lg focus:ring-1 focus:ring-blue-500 w-full text-sm"
                            >
                              {timeOptions.map(time => (
                                <option key={time} value={time}>{time}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block mb-1 font-medium text-gray-700 text-sm">
                              End Time
                            </label>
                            <select
                              value={shift.end}
                              onChange={(e) => updateShift(dayIndex, shiftIndex, 'end', e.target.value)}
                              className="border-gray-200 focus:border-blue-500 rounded-lg focus:ring-1 focus:ring-blue-500 w-full text-sm"
                            >
                              {timeOptions.map(time => (
                                <option key={time} value={time}>{time}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <button
                          onClick={() => removeShift(dayIndex, shiftIndex)}
                          className="hover:bg-gray-200 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-3 border-gray-200 bg-gray-50 p-6 border-t">
          <button
            onClick={onClose}
            className="border-gray-300 bg-white hover:bg-gray-50 px-4 py-2 border rounded-lg font-medium text-gray-700 text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2 rounded-lg font-medium text-sm text-white transition-colors"
          >
            {loading ? (
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            ) : (
              <Save className="mr-2 w-4 h-4" />
            )}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleEditorModal;