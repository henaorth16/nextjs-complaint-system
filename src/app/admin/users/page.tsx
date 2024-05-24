// pages/complaints/page.tsx
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/lib/db/db";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { DeleteDropdownItem } from "../_component/userAction";


export default async function AdminDashboard() {
  const users = await db.users.findMany({
    include: {
      department: true, // Include related department information
    },
  });

  return (
    <div>
      <h1>Users</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Name</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="sr-only">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((complaint, index) => (
            <TableRow key={index}>
              <TableCell>{complaint.username}</TableCell>
              <TableCell>{`${complaint.password.substring(0, 20)}...`}</TableCell>
              <TableCell>{complaint.department?.name || "N/A"}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                    <span className="sr-only">Actions</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/users/${complaint.id}/edit`}>
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DeleteDropdownItem
                      id={complaint.id}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>

    </div>
  );
}
