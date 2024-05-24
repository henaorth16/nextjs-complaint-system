import React from 'react'

import db from "@/lib/db/db"
import AddUserForm from '@/app/admin/_component/AddUserForm'

export type usersType = {
  id: number;
  username: string;
  password: string;
  dep: number | null;
  isAdmin: boolean;
  createdAt: Date;
}
export default async function EditProductPage({
  params: { id },
}: {
  params: { id:number }
}) {
  const userId:number = parseInt(id as unknown as string, 10);
  const user = await db.users.findUnique({ where: { id:userId } })

  return (
    <div>
      <h1>Edit user</h1>
      <AddUserForm name={user?.username} userId={userId} />
    </div> 
  )
}