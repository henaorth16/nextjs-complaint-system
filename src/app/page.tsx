// pages/complaints/page.tsx
"use client"
import { FormEvent, useState, useEffect } from 'react';
import { getDepartments } from '@/lib/actions/actions';
import { complainSubmit } from '@/lib/actions/complainSubmit';


export default function AdminDashboard() {

  const [departments, setDepartments] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const deps = await getDepartments();
        if (deps) {
          setDepartments(deps);
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);


  ///////#### Department add ###///////
  // const handleDepartmentSubmit = async (e) => {
  //   e.preventDefault();
  //   await createDepartment(departmentName);
  //   // Optionally, refresh data or redirect
  // };

  return (
    <div>
      <h2>Create New Complaint</h2>
      <form action={complainSubmit}>
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          required
        />
        <input
          type="email"
          name="customerEmail"
          placeholder="Customer Email"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          required
        />
        <label htmlFor='dep'>Department:</label>

        <select
            id='dep'
            name="dep"
            required
          >
            <option value="" disabled>Select a department</option>
            {departments.map((item) => (
              <option value={item.name} key={item.id}>{item.name}</option>
            ))}
          </select>
        <input
          type="file"
          name="fileAttached"
          placeholder="File Attached"
          required
        />
        <button type="submit">Create Complaint</button>
      </form>
    </div>
    // ####Add department####///

    // {/* <h2>Create New Department</h2>
    //<form onSubmit={handleDepartmentSubmit}>
    // <input
    //  type="text"
    // value={departmentName}
    // onChange={(e) => setDepartmentName(e.target.value)}
    //placeholder="Department Name"
    //required
    ///>
    //<button type="submit">Create Department</button>
    //</form>
    //*/}
  );
}

// export async function getServerSideProps() {
//   const prisma = new PrismaClient();
//   const complaints = await prisma.complaint.findMany({
//     include: {
//       department: true,
//     },
//   });
//   const departments = await prisma.department.findMany();

//   return {
//     props: {
//       complaints: complaints.map((complaint) => ({
//         ...complaint,
//         date: complaint.date.toISOString(),
//       })),
//       departments,
//     },
//   };
// }
