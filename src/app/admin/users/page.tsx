// pages/complaints/page.tsx

import db from "@/lib/db/db";


export default async function AdminDashboard() {
  const users = await db.users.findMany({
    include: {
      department: true, // Include related department information
    },
  });

  return (
    <div>
      <nav>
        <ul>
          <li><a href="#">Users</a></li>
          <li><a href="#">Users</a></li>
          <li><a href="#">Users</a></li>
          <li><a href="#">Users</a></li>
        </ul>
      </nav>
      <h1>Complaints</h1>

      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Password</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {users.map((complaint, index) => (
            <tr key={index}>
              <td>{complaint.username}</td>
              <td>{`${complaint.password.substring(0, 20)}...`}</td>
              <td>{complaint.department?.name || "N/A"}</td>
            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
}
