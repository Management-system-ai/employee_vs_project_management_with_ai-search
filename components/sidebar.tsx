'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname
import { FaUser, FaClipboardList } from 'react-icons/fa';
import Image from 'next/image';
import BackupIcon from '../resources/images/icons/clarity_backup-line.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname(); // Lấy path hiện tại

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { label: 'Dashboard', icon: <FaUser />, path: '/' },
    { label: 'Employee', icon: <FaUser />, path: '/employee' },
    { label: 'Project', icon: <FaClipboardList />, path: '/project' }
  ];

  return (
    <div
      className={`flex h-screen flex-col bg-[#F4F5FA] text-[#212F3F] ${
        isOpen ? 'w-64' : 'w-16'
      } transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          {isOpen && <span className="text-xl font-bold">HR Management</span>}
        </div>
        <button onClick={toggleSidebar}>
          <Image src={BackupIcon} alt="Backup Icon" width={30} height={30} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="pb-1 pt-1">
              <a
                href={item.path}
                className={`flex items-center space-x-2 rounded-br-full rounded-tr-full pb-3 pl-6 pt-3 ${
                  pathname === item.path
                    ? 'bg-red-600 text-white'
                    : 'hover:bg-red-600 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                {isOpen && <span>{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
