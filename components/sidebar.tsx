'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaUser, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import { PanelLeft } from 'lucide-react';
import { signOut } from '@/utils/actions';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const isMobile =
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = async () => {
    await signOut();
    router.push('/auth');
  };

  const menuItems = [
    { label: 'Dashboard', icon: <FaUser size={23} />, path: '/' },
    { label: 'Employee', icon: <FaUser size={23} />, path: '/employee' },
    { label: 'Project', icon: <FaClipboardList size={23} />, path: '/project' }
  ];

  return (
    <div className="flex">
      <div
        className={`flex h-screen flex-shrink-0 flex-col bg-[#F4F5FA] text-[#212F3F] transition-all duration-300 ease-in-out ${
          isOpen ? 'w-64' : 'w-16'
        } ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}`}
      >
        {/* Header */}
        <div
          className={`flex ${!isOpen ? 'justify-center' : 'justify-between'} p-2`}
        >
          <div className="flex items-center space-x-2 overflow-hidden">
            {isOpen && (
              <span className="whitespace-nowrap text-2xl font-bold">
                HR Management
              </span>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="rounded-full hover:bg-gray-200"
          >
            <PanelLeft className="h-8 w-8" />
          </button>
        </div>

        {/* Menu */}

        <nav
          className={`flex-1 overflow-y-auto ${!isOpen ? 'flex justify-center' : ''}`}
        >
          <ul className={`${!isOpen ? 'w-full space-y-6' : 'space-y-1'}`}>
            {menuItems.map((item, index) => (
              <li key={index} className="px-2">
                <Link
                  href={item.path}
                  className={`flex items-center ${!isOpen ? 'justify-center rounded-lg' : 'space-x-2 rounded-br-full rounded-tr-full'} px-4 py-3 transition-colors duration-200 ${
                    pathname === item.path
                      ? 'bg-red-600 text-white'
                      : 'hover:bg-red-100 hover:text-red-600'
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {isOpen && (
                    <span className="whitespace-nowrap">{item.label}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-2">
          <button
            onClick={handleLogout}
            className={`group flex w-full items-center justify-center space-x-2 rounded-br-full rounded-tr-full bg-red-600 bg-gradient-to-r px-4 py-3 text-white transition-all duration-300 hover:bg-pink-600 hover:shadow-lg ${
              isOpen ? 'text-base' : 'h-12 w-12'
            }`}
          >
            <FaSignOutAlt className={`${isOpen ? 'text-2xl' : 'text-xl'}`} />
            {isOpen && (
              <span className="whitespace-nowrap font-semibold">Logout</span>
            )}
            <span
              className={`absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 ${isOpen ? 'hidden' : 'block'}`}
            >
              Logout
            </span>
          </button>
        </div>
      </div>
      {isMobile && (
        <div
          className={`fixed inset-0 z-20 bg-black transition-opacity duration-300 ${
            isOpen ? 'opacity-50' : 'pointer-events-none opacity-0'
          }`}
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
