import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { LayoutDashboard, Pill, FileEdit, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Overview from './Overview';
import MedicinesManager from './MedicinesManager';
import ContentEditor from './ContentEditor';

type Section = 'overview' | 'medicines' | 'content';

const navItems = [
  { id: 'overview' as Section, label: 'Overview', icon: LayoutDashboard },
  { id: 'medicines' as Section, label: 'Medicines', icon: Pill },
  { id: 'content' as Section, label: 'Content Editor', icon: FileEdit },
];

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: '/admin' });
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return <Overview />;
      case 'medicines': return <MedicinesManager />;
      case 'content': return <ContentEditor />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-medical-dark text-white flex flex-col transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-medical-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">✚</span>
            </div>
            <div>
              <p className="font-extrabold text-sm leading-tight">SAMPARC</p>
              <p className="text-gold text-xs font-bold tracking-widest">MEDICAL</p>
            </div>
          </div>
          <p className="text-teal-300 text-xs mt-2">Admin Dashboard</p>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeSection === item.id
                  ? 'bg-medical-primary text-white shadow-sm'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
              {activeSection === item.id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="font-bold text-gray-900 text-lg">
                {navItems.find(n => n.id === activeSection)?.label}
              </h1>
              <p className="text-xs text-gray-500">SAMPARC MEDICAL Admin</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="hidden sm:flex items-center gap-2 text-sm text-red-500 hover:text-red-700 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all"
          >
            <LogOut size={16} /> Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
