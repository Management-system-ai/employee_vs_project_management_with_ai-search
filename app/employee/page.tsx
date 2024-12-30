export default function EmployeePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Employee Management</h1>
      
      <table className="min-w-full table-auto bg-white shadow-md rounded-md">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Name</th>
            <th className="px-4 py-2 border-b text-left">Age</th>
            <th className="px-4 py-2 border-b text-left">Phone</th>
            <th className="px-4 py-2 border-b text-left">Email</th>
            <th className="px-4 py-2 border-b text-left">Role</th>
            <th className="px-4 py-2 border-b text-left">Skills</th>
            <th className="px-4 py-2 border-b text-left">Joining Date</th>
            <th className="px-4 py-2 border-b text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border-b">John Doe</td>
            <td className="px-4 py-2 border-b">29</td>
            <td className="px-4 py-2 border-b">123-456-7890</td>
            <td className="px-4 py-2 border-b">johndoe@example.com</td>
            <td className="px-4 py-2 border-b">Software Engineer</td>
            <td className="px-4 py-2 border-b">React, Node.js</td>
            <td className="px-4 py-2 border-b">2023-01-15</td>
            <td className="px-4 py-2 border-b text-green-500">Active</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
