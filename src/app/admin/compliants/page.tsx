import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/lib/db/db";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { DeleteComplient } from "../_component/userAction";
import { cookies } from "next/headers";
import * as jose from 'jose';
import getData from "../getData";

export default async function ComplainView() {
  // Get JWT from cookies and decode it to get user information
  const cookieStore = cookies();
  const token = cookieStore.get('Authorization')?.value;

  if (!token) {
    throw new Error("invalid token");

  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  let authUser = null;
  let departmentId: any;
  try {
    authUser = await getData();
    departmentId = authUser.departmentId;
    console.log(authUser);

  } catch (error: any) {
    console.error(error);
  }

  console.log("Payload decoded successfully");
  let complaints;
  // Fetch complaints based on user's department
  if (!authUser) {
    return <h1>you are not authorized please <a className="text-link" href="/login">Login</a></h1>
  }
  if (!authUser.isAdmin) {
    complaints = await db.complaint.findMany({
      where: {
        departmentId: departmentId,
      },
      include: {
        department: true,
      },
    });
  } else {
    complaints = await db.complaint.findMany({
      include: {
        department: true,
      },
    });
  }

  return (
    <div>
      <h1>Complaints</h1>
      {complaints.length === 0 ? (
        <h2 className="text-center">No Complaints Yet!</h2>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="text-primary-foreground">
              <TableHead>Order</TableHead>
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
              <TableRow key={index} className={`${index % 2 !== 0 ? "bg-muted" : ''}`}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{complaint.customerName}</TableCell>
                <TableCell>{complaint.customerEmail}</TableCell>
                <TableCell>{complaint.description}</TableCell>
                <TableCell>{complaint.fileAttached}</TableCell>
                <TableCell>{complaint.department?.name || "N/A"}</TableCell>
                <TableCell>{new Date(complaint.date).toLocaleString()}</TableCell>
                <TableCell>{complaint.status}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical />
                      <span className="sr-only">Actions</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <a download href={`/admin/complaints/${complaint.id}/download`}>
                          Download
                        </a>
                      </DropdownMenuItem>
                      <DeleteComplient id={complaint.id} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}