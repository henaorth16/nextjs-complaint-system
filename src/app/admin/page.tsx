// pages/complaints/page.tsx

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/lib/db/db";
import Image from "next/image";

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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>File Attached</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="sr-only">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {complaints.map((complaint, index) => (
            <TableRow key={index}>
              <TableCell>{complaint.customerName}</TableCell>
              <TableCell>{complaint.customerEmail}</TableCell>
              <TableCell>{complaint.description}</TableCell>
              <TableCell>
                {complaint.fileAttached}
              </TableCell>
              <TableCell>{complaint.department?.name || "N/A"}</TableCell>
              <TableCell> {new Date(complaint.date).toLocaleString()}</TableCell>
              <TableCell>{complaint.status}</TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>

    </div>
  );
}
