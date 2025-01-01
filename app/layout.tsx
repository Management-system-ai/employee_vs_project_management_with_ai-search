import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import './globals.css';
export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard layout for the application'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex bg-gray-100">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <div className="p-6">{children}</div>
        </div>
      </body>
    </html>
  );
}
