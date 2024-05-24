"use client"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { deleteUsers, deleteCompliant } from "@/lib/actions/actions"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

export function DeleteDropdownItem({
  id,
}: {
  id: number
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteUsers(id)
          router.refresh()
        })
      }}
    >
      Delete
    </DropdownMenuItem>
  )
}


export function DeleteComplient({
  id,
}: {
  id: number
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteCompliant(id)
          router.refresh()
        })
      }}
    >
      Delete
    </DropdownMenuItem>
  )
}
