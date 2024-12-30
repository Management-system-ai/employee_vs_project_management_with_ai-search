export default function ProjectPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Project Management</h1>      
      <table className="min-w-full table-auto bg-white shadow-md rounded-md mt-6">
      <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Name</th>
            <th className="px-4 py-2 border-b text-left">Domain</th>
            <th className="px-4 py-2 border-b text-left">Type</th>
            <th className="px-4 py-2 border-b text-left">Description</th>
            <th className="px-4 py-2 border-b text-left">Members</th>
            <th className="px-4 py-2 border-b text-left">Start Day</th>
            <th className="px-4 py-2 border-b text-left">Due to Day</th>
            <th className="px-4 py-2 border-b text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border-b">Project A</td>
            <td className="px-4 py-2 border-b">Software Development</td>
            <td className="px-4 py-2 border-b">Agile</td>
            <td className="px-4 py-2 border-b">A web application project for internal use.</td>
            <td className="px-4 py-2 border-b">John, Sarah, Alex</td>
            <td className="px-4 py-2 border-b">2024-01-01</td>
            <td className="px-4 py-2 border-b">2024-06-01</td>
            <td className="px-4 py-2 border-b text-green-500">In Progress</td>
          </tr>
          </tbody>
      </table>
    </div>
  );
}
