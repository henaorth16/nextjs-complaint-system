// pages/complaints/page.tsx

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Name</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>Department</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((complaint, index) => (
            <TableRow key={index}>
              <TableCell>{complaint.username}</TableCell>
              <TableCell>{`${complaint.password.substring(0, 20)}...`}</TableCell>
              <TableCell>{complaint.department?.name || "N/A"}</TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>

    </div>
  );
}
