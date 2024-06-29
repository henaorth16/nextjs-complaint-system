"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { deleteUsers, deleteCompliant, deletefaq, deleteDep } from "@/lib/actions/actions"
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



export function DeleteFaq({
  id,
}: {
  id: number
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  return (
    <Button
      variant="destructive"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await deletefaq(id)
          router.refresh()
        })
      }}
    >
      Delete
    </Button>
  )
}



export function DeleteDep({
  id,
}: {
  id: number
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  return (
    <Button
      variant="destructive"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteDep(id)
          router.refresh()
        })
      }}
    >
      Delete
    </Button>
  )
}
