import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import './globals.css';
import { Providers } from './providers';
import ChatBot from '@/components/ui/ChatWidget';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            className="mr-14"
            transition={Slide}
          />
          <Providers>
            <div className="p-6">{children}</div>
          </Providers>
          <ChatBot />
        </div>
      </body>
    </html>
  );
}
