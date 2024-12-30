import Sidebar from "@/components/sidebar";

export default function DashboardPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
        <p className="mt-4">Select a section from the sidebar to get started.</p>
      </div>
    </div>
  );
}
