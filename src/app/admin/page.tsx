// pages/complaints/page.tsx

import db from "@/lib/db/db";


export default async function AdminDashboard() {
  const complaints = await db.complaint.findMany({
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
            <th>Customer Name</th>
            <th>Email</th>
            <th>Description</th>
            <th>File Attached</th>
            <th>Department</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint, index) => (
            <tr key={index}>
              <td>{complaint.customerName}</td>
              <td>{complaint.customerEmail}</td>
              <td>{complaint.description}</td>
              <td>{complaint.fileAttached}</td>
              <td>{complaint.department?.name || "N/A"}</td>
              <td> {new Date(complaint.date).toLocaleString()}</td>
              <td>{complaint.status}</td>
            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
}
