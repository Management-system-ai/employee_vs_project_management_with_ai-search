import Sidebar from "@/components/sidebar";

export default function EmployeePage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Employees</h1>
        <p className="mt-4">Here you can manage employees.</p>
        {/* Add your employee management logic here */}
      </div>
    </div>
  );
}
