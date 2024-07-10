
// pages/complaints/page.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/lib/db/db";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { MoreVertical } from "lucide-react";
import { DeleteComplient } from "../_component/userAction";

export default async function ComplainView() {

  const complaints = await db.complaint.findMany({
    include: {
      department: true, // Include related department information
    },
  });

  return (
    <div>
      <h1>Complaints</h1>
      {
        complaints.length == 0 ?(
          <h2 className="text-center">No Complaints Yet!</h2>

        ):(
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
              <TableCell>
                {complaint.fileAttached}
              </TableCell>
              <TableCell>{complaint.department?.name || "N/A"}</TableCell>
              <TableCell> {new Date(complaint.date).toLocaleString()}</TableCell>
              <TableCell>{complaint.status}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                    <span className="sr-only">Actions</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild >
                      <a download href={`/admin/comliants/${complaint.id}/download`}>
                        Download
                      </a>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem asChild>
                    <Link href={`/admin/compliants/${complaint.id}/edit`}>
                      Edit
                    </Link>
                  </DropdownMenuItem> */}
                    <DeleteComplient id={complaint.id} />
                      
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
             
            </TableRow>
          ))}

        </TableBody>
      </Table>
        )
      }

    </div>
  );
}
