'use client'
import React, { useState } from 'react';
import { 
  Menu as MenuIcon,
  Home,
  Calendar,
  Coffee,
  ClipboardList,
  Users,
  LogOut,
  Settings
} from 'lucide-react';

export default function Hero() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="bg-gray-800 px-3 py-4 h-full overflow-y-auto">
          <div className="flex items-center mb-5 px-2">
            <h1 className="font-bold text-white text-xl">Restaurant Manager</h1>
          </div>
          <nav className="space-y-2">
            <a href="/" className="flex items-center hover:bg-gray-700 p-2 rounded-lg text-white">
              <Home className="mr-3 w-5 h-5" />
              <span>Dashboard</span>
            </a>
            <a href="/reservations" className="flex items-center hover:bg-gray-700 p-2 rounded-lg text-white">
              <Calendar className="mr-3 w-5 h-5" />
              <span>Reservations</span>
            </a>
            <a href="/menu" className="flex items-center hover:bg-gray-700 p-2 rounded-lg text-white">
              <Coffee className="mr-3 w-5 h-5" />
              <span>Menu</span>
            </a>
            <a href="/orders" className="flex items-center hover:bg-gray-700 p-2 rounded-lg text-white">
              <ClipboardList className="mr-3 w-5 h-5" />
              <span>Orders</span>
            </a>
            <a href="/staff" className="flex items-center hover:bg-gray-700 p-2 rounded-lg text-white">
              <Users className="mr-3 w-5 h-5" />
              <span>Staff</span>
            </a>
            <a href="/settings" className="flex items-center hover:bg-gray-700 p-2 rounded-lg text-white">
              <Settings className="mr-3 w-5 h-5" />
              <span>Settings</span>
            </a>
            <button className="flex items-center hover:bg-gray-700 p-2 rounded-lg w-full text-white">
              <LogOut className="mr-3 w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-4 py-3">
            <button
              className="lg:hidden hover:bg-gray-100 p-2 rounded-lg"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <span className="text-gray-700 text-sm">Welcome, User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4"> 
        </main>
      </div>
    </div>
  );
};
 