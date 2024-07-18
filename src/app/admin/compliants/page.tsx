import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/lib/db/db";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { DeleteComplient } from "../_component/userAction";
import { cookies } from "next/headers";
import * as jose from 'jose';

interface UserPayload {
  id: number;
  isAdmin: boolean;
  departmentId?: number;
}

function isUserPayload(payload: any): payload is UserPayload {
  return typeof payload.id === 'number' && 
         typeof payload.isAdmin === 'boolean' && 
         (typeof payload.departmentId === 'number' || payload.departmentId === undefined);
}

export default async function ComplainView() {
  // Get JWT from cookies and decode it to get user information
  const cookieStore = cookies();
  const token = cookieStore.get('Authorization')?.value;

  if (!token) {
    return (
      <div>
        <h1>Unauthorized</h1>
        <p>Please log in to view this page.</p>
      </div>
    );
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  let user: UserPayload | null = null;

  try {
    const { payload } = await jose.jwtVerify(token, secret, {
      algorithms: ['HS512'],
    });

    const payloadAsUnknown = payload as unknown;

    if (isUserPayload(payloadAsUnknown)) {
      user = payloadAsUnknown;
    } else {
      console.error('Invalid JWT payload structure');
      return (
        <div>
          <h1>Unauthorized</h1>
          <p>Please log in to view this page.</p>
        </div>
      );
    }
  } catch (error) {
    console.error('JWT verification failed:', error);
    return (
      <div>
        <h1>Unauthorized</h1>
        <p>Please log in to view this page.</p>
      </div>
    );
  }

  let complaints;

  if (user.isAdmin) {
    // Fetch all complaints if the user is an admin
    complaints = await db.complaint.findMany({
      include: {
        department: true,
      },
    });
  } else {
    // Fetch complaints related to the user's department if the user is not an admin
    complaints = await db.complaint.findMany({
      where: {
        departmentId: user.departmentId,
      },
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
            <TableRow className="text-primary-foregroung">
              <TableHead>order</TableHead>
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
                        <a download href={`/admin/comliants/${complaint.id}/download`}>
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
