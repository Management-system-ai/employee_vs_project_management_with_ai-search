import { AddEmployeeDialog } from '@/components/CreatePopUpEmployee';

export default function EmployeePage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Employee Management</h1>

      <table className="min-w-full table-auto rounded-md bg-white shadow-md">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 text-left">Name</th>
            <th className="border-b px-4 py-2 text-left">Age</th>
            <th className="border-b px-4 py-2 text-left">Phone</th>
            <th className="border-b px-4 py-2 text-left">Email</th>
            <th className="border-b px-4 py-2 text-left">Role</th>
            <th className="border-b px-4 py-2 text-left">Skills</th>
            <th className="border-b px-4 py-2 text-left">Joining Date</th>
            <th className="border-b px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-b px-4 py-2">John Doe</td>
            <td className="border-b px-4 py-2">29</td>
            <td className="border-b px-4 py-2">123-456-7890</td>
            <td className="border-b px-4 py-2">johndoe@example.com</td>
            <td className="border-b px-4 py-2">Software Engineer</td>
            <td className="border-b px-4 py-2">React, Node.js</td>
            <td className="border-b px-4 py-2">2023-01-15</td>
            <td className="border-b px-4 py-2 text-green-500">
              {' '}
              <AddEmployeeDialog />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
