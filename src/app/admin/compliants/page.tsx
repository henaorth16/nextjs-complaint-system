import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/lib/db/db";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { DeleteComplient } from "../_component/userAction";
import { cookies } from "next/headers";
import * as jose from 'jose';
import { any } from "zod";

export default async function ComplainView() {
  // Get JWT from cookies and decode it to get user information
  const cookieStore = cookies();
  const token = cookieStore.get('Authorization')?.value;

  if (!token) {
    return (
      <div>
        <h1>Unauthorized</h1>
      </div>
    );
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  let username = null;
  let departmentId: any;
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    username = payload.username;
    const uniUser = await db.users.findFirst({
      where:{
        username: username as string
      }
    })
    console.log(uniUser);
    departmentId = uniUser?.departmentId
  } catch (error) {
    console.error('Error decoding token:', error);
    return (
      <div>
        <h1>Invalid token</h1>
      </div>
    );
  }
  console.log("payload");

  // Fetch complaints based on user role
 const complaints = await db.complaint.findMany({
      where: {
        departmentId: departmentId, // Assuming username is the customer's email
      },
      include: {
        department: true,
      },
    });

  return (
    <div>
      <h1>Complaints</h1>
      {complaints.length === 0 ? (
        <h2 className="text-center">No Complaints Yet!</h2>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="text-primary-foregroung">
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
