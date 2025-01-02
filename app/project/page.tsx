export default function ProjectPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Project Management</h1>
      <table className="mt-6 min-w-full table-auto rounded-md bg-white shadow-md">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 text-left">Name</th>
            <th className="border-b px-4 py-2 text-left">Domain</th>
            <th className="border-b px-4 py-2 text-left">Type</th>
            <th className="border-b px-4 py-2 text-left">Description</th>
            <th className="border-b px-4 py-2 text-left">Members</th>
            <th className="border-b px-4 py-2 text-left">Start Day</th>
            <th className="border-b px-4 py-2 text-left">Due to Day</th>
            <th className="border-b px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-b px-4 py-2">Project A</td>
            <td className="border-b px-4 py-2">Software Development</td>
            <td className="border-b px-4 py-2">Agile</td>
            <td className="border-b px-4 py-2">
              A web application project for internal use.
            </td>
            <td className="border-b px-4 py-2">John, Sarah, Alex</td>
            <td className="border-b px-4 py-2">2024-01-01</td>
            <td className="border-b px-4 py-2">2024-06-01</td>
            <td className="border-b px-4 py-2 text-green-500">In Progress</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
