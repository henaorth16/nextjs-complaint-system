import { Button } from "@/components/ui/button"
import db from "@/lib/db/db"
import { DeleteDep } from "../_component/userAction"
import { AddDep } from "./add"
import Title from "../_component/Title"


export default async function DepartmentAdmin() {
  const deps = await db.department.findMany()
  return (
    <main>
     <Title title="Departments"/>
      <AddDep />
      {deps.length > 0 ? (
        <ul className="w-[80%] mx-auto flex flex-col gap-2">
          {deps.map((dep, ind) => (
            <li className="w-full flex justify-between p-2 hover:bg-muted" key={ind}>
              <span>{ind + 1},&nbsp; {dep.name}</span>
              <DeleteDep id={dep.id} />
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="text-center">No Departments Added Yet!</h2>
      )}

    </main>
  )
}

