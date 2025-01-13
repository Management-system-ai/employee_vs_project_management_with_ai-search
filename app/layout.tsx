import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'HR Management',
  description: 'Dashboard layout for the application'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex bg-gray-100 text-[#212F3F]">
        {/* Sidebar */}
        <div className="w-64">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col">
          <Header />
          <Providers>
            <div className="p-6">{children}</div>
          </Providers>
        </div>
      </body>
    </html>
  );
}
