import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import './globals.css';
import { Providers } from './providers';
import ChatBot from '@/components/ui/ChatWidget';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUser } from '@/utils/user';
export const metadata = {
  title: 'HR Management',
  description: 'Dashboard layout for the application', 
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <html lang="en">
       <head>
        <link rel="icon"  type="image/png" sizes="16x16"href="/hr-logo.png" /> 
      </head>
      <body className="flex bg-gray-100 text-[#212F3F]">
        {/* Sidebar */}
        {/* <div className="w-64">
          <Sidebar />
        </div> */}
        <Sidebar />

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
          <ChatBot hidden={user === null} />
        </div>
      </body>
    </html>
  );
}
