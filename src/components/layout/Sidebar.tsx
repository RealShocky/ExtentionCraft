import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Code2, TestTube2, Upload, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0">
      <div className="p-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Code2 className="w-6 h-6" />
          ExtensionCraft
        </h1>
      </div>
      
      <nav className="mt-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 hover:bg-gray-800 ${
              isActive ? 'bg-gray-800' : ''
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>
        
        <NavLink
          to="/editor"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 hover:bg-gray-800 ${
              isActive ? 'bg-gray-800' : ''
            }`
          }
        >
          <Code2 className="w-5 h-5" />
          Editor
        </NavLink>
        
        <NavLink
          to="/testing"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 hover:bg-gray-800 ${
              isActive ? 'bg-gray-800' : ''
            }`
          }
        >
          <TestTube2 className="w-5 h-5" />
          Testing
        </NavLink>
        
        <NavLink
          to="/deploy"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 hover:bg-gray-800 ${
              isActive ? 'bg-gray-800' : ''
            }`
          }
        >
          <Upload className="w-5 h-5" />
          Deploy
        </NavLink>
        
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 hover:bg-gray-800 ${
              isActive ? 'bg-gray-800' : ''
            }`
          }
        >
          <Settings className="w-5 h-5" />
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;