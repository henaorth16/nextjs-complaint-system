// pages/complaints/page.tsx
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/lib/db/db";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { DeleteDropdownItem } from "../_component/userAction";
import { Button } from "@/components/ui/button";


export default async function AdminDashboard() {
  const users = await db.users.findMany({
    include: {
      department: true,
    },
  });

  return (
    <div>
      <h1>Users</h1>
      <div className="w-full flex justify-end p-4">
        <a href="/admin/users/create">
          <Button>Create New</Button>
        </a>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N<u>o</u></TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="sr-only">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((complaint, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
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
