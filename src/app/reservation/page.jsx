'use client'
import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  Table,
  ChevronLeft,
  ChevronRight,
  Info,
  Check
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { localUrl } from '../components/Url';

const TimeSlot = ({ time, selected, available, onClick }) => (
  <button
    onClick={() => available && onClick(time)}
    disabled={!available}
    className={`
      px-4 py-2 rounded-lg text-sm font-medium transition-all
      ${selected ? 'bg-blue-600 text-white' : available ? 'bg-white hover:bg-blue-50' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
      ${available ? 'border-2 border-gray-200' : 'border-2 border-gray-100'}
    `}
  >
    {time}
  </button>
);

const TableSelection = ({ tableNumber, selected, available, seats, onClick }) => (
  <button
    onClick={() => available && onClick(tableNumber)}
    disabled={!available}
    className={`
      relative p-4 rounded-xl transition-all
      ${selected ? 'bg-blue-600 text-white' : available ? 'bg-white hover:bg-blue-50' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
      ${available ? 'border-2 border-gray-200' : 'border-2 border-gray-100'}
    `}
  >
    <div className="flex flex-col items-center space-y-2">
      <Table className="w-8 h-8" />
      <span className="font-medium">Table {tableNumber}</span>
      <span className="text-sm">{seats} seats</span>
    </div>
  </button>
);

const ReservationSteps = ({ currentStep }) => {
  const steps = ['Date & Time', 'Table Selection', 'Guest Details', 'Confirmation'];

  return (
    <div className="hidden md:flex justify-center items-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span className={`ml-2 text-sm font-medium ${index <= currentStep ? 'text-gray-900' : 'text-gray-500'
              }`}>
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-24 h-0.5 mx-2 ${index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default function ReservationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [guestCount, setGuestCount] = useState(2);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    specialRequests: ''
  });

  // Mock data for available times
  const timeSlots = [
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
    "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"
  ];

  // Mock data for tables
  const tables = [
    { number: 1, seats: 2, available: true },
    { number: 2, seats: 4, available: true },
    { number: 3, seats: 4, available: false },
    { number: 4, seats: 6, available: true },
    { number: 5, seats: 2, available: true },
    { number: 6, seats: 8, available: true },
  ];

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle reservation submission
    console.log({
      date: selectedDate,
      time: selectedTime,
      tableNumber: selectedTable,
      guests: guestCount,
      ...formData
    });
    try {
      // Simulate API call
      const response = await fetch(`${localUrl}/api/reservation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}` // Replace with your authentication token
        },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedTime,
          tableNumber: selectedTable,
          guests: guestCount,
          ...formData
        })
      });
      const req = await response.json()
      if (response.ok) {
        alert('Reservation successful!');
        setCurrentStep(0);
      } else {
        alert('Reservation error: ' + req.message);
        console.log('Reservation error: ' + req.message)
      }

    } catch (err) { }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-between items-center h-16">
            <h1 className="font-bold text-gray-900 text-2xl">Make a Reservation</h1>
            <div className="flex items-center space-x-2 text-gray-600">
              <Info className="w-5 h-5" />
              <span className="text-sm">Need help? Call (123) 456-7890</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <ReservationSteps currentStep={currentStep} />

        <div className="bg-white shadow-sm p-6 rounded-xl">
          {currentStep === 0 && (
            <div className="space-y-6">
              <h2 className="font-bold text-xl">Select Date & Time</h2>
              <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    Select Date
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={selectedDate}
                      onChange={date => setSelectedDate(date)}
                      minDate={new Date()}
                      className="px-4 py-2 border-2 border-gray-200 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                      placeholderText="Select a date"
                    />
                    <Calendar className="top-2.5 right-3 absolute w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    Number of Guests
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setGuestCount(prev => Math.max(1, prev - 1))}
                      className="hover:bg-gray-50 p-2 border-2 border-gray-200 rounded-lg"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="w-16 font-medium text-lg text-center">{guestCount}</span>
                    <button
                      onClick={() => setGuestCount(prev => Math.min(8, prev + 1))}
                      className="hover:bg-gray-50 p-2 border-2 border-gray-200 rounded-lg"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700 text-sm">
                  Available Time Slots
                </label>
                <div className="gap-3 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
                  {timeSlots.map((time) => (
                    <TimeSlot
                      key={time}
                      time={time}
                      selected={selectedTime === time}
                      available={true}
                      onClick={setSelectedTime}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="font-bold text-xl">Select a Table</h2>
              <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                {tables.map((table) => (
                  <TableSelection
                    key={table.number}
                    tableNumber={table.number}
                    selected={selectedTable === table.number}
                    available={table.available}
                    seats={table.seats}
                    onClick={setSelectedTable}
                  />
                ))}
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Info className="mt-0.5 w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-blue-900">Table Information</h4>
                    <p className="text-blue-700 text-sm">
                      Tables are assigned based on party size and availability.
                      We'll do our best to accommodate your preferred seating.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="font-bold text-xl">Guest Details</h2>
              <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="px-4 py-2 border-2 border-gray-200 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="px-4 py-2 border-2 border-gray-200 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                    placeholder="john@example.com"
                  />
                </div>
                <div className='flex flex-col gap-6'>
                  <section>
                    <label className="block mb-2 font-medium text-gray-700 text-sm">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="px-4 py-2 border-2 border-gray-200 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                      placeholder="(123) 456-7890"
                    />
                  </section>
                  <section>
                    <label htmlFor="role" className="block mb-2 font-medium text-gray-700 text-sm">
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="px-4 py-2 border-2 border-gray-200 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                    >
                      <option value="">Select role</option>
                      <option value="Customer">Customer</option>
                      <option value="Staff">Staff</option>
                      <option value="Owner">Owner</option>
                    </select>
                  </section>
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    Special Requests
                  </label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="px-4 py-2 border-2 border-gray-200 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                    placeholder="Any special requests or dietary requirements?"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="font-bold text-xl">Confirm Reservation</h2>
              <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium text-gray-700">Reservation Details</h3>
                    <div className="space-y-2 mt-2">
                      <p className="text-gray-600 text-sm">
                        <Calendar className="inline-block mr-2 w-4 h-4" />
                        {selectedDate?.toLocaleDateString()}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <Clock className="inline-block mr-2 w-4 h-4" />
                        {selectedTime}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <Users className="inline-block mr-2 w-4 h-4" />
                        {guestCount} guests
                      </p>
                      <p className="text-gray-600 text-sm">
                        <Table className="inline-block mr-2 w-4 h-4" />
                        Table {selectedTable}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Guest Information</h3>
                    <div className="space-y-2 mt-2">
                      <p className="text-gray-600 text-sm">
                        <strong>Name:</strong> {formData.name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <strong>Email:</strong> {formData.email}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <strong>Phone:</strong> {formData.phone}
                      </p>
                    </div>
                  </div>
                </div>
                {formData.specialRequests && (
                  <div>
                    <h3 className="font-medium text-gray-700">Special Requests</h3>
                    <p className="mt-2 text-gray-600 text-sm">{formData.specialRequests}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <button
                onClick={handlePrevStep}
                className="hover:bg-gray-50 px-6 py-2 border-2 border-gray-200 rounded-lg font-medium"
              >
                Back
              </button>
            )}
            <button
              onClick={currentStep === 3 ? handleSubmit : handleNextStep}
              className="bg-blue-600 hover:bg-blue-700 ml-auto px-6 py-2 rounded-lg font-medium text-white"
            >
              {currentStep === 3 ? 'Confirm Reservation' : 'Continue'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}