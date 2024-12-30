import Sidebar from "@/components/sidebar";

export default function ProjectPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="mt-4">Here you can manage projects.</p>
        {/* Add your project management logic here */}
      </div>
    </div>
  );
}
