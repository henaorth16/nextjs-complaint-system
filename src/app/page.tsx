// pages/complaints/page.tsx
"use client"
import { useState, useEffect } from 'react';
import { getDepartments } from '@/lib/actions/actions';
import { complainSubmit } from '@/lib/actions/complainSubmit';
import { Input } from '@/components/ui/input';
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
// import { Form } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';


export default function UserForm() {

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
    <div className='w-[80%] mx-auto mt-32 flex items-center justify-center flex-col'>
      <h1 className='text-4xl font-semibold mb-7'>Create New Complaint</h1>
        <form action={complainSubmit} className='w-full flex flex-col gap-4'>
          <div>

        <Label htmlFor="name" >Name</Label>
          <Input
          id='name'
          type="text"
          name="customerName"
          placeholder="Abebe Kebede"
          required
          />
          </div>
          <div>

          <Label htmlFor="email" >E-mail</Label>
          <Input
          id='email'
          type="email"
          name="customerEmail"
          placeholder="abebe@gmail.com"
          required
          />
          </div>
          <div>
          <Label htmlFor='desc'>Description</Label>
          <Textarea
          id='desc'
          name="description"
          placeholder="Put your message here..."
          required
          />
          </div>
          <div>
          <Select
            name="department"
            required
            >
            <SelectTrigger>
              <SelectValue placeholder="Select a verified email to display" asChild/>
            </SelectTrigger>
            <SelectContent>
              {departments.map((item) => (
                <SelectItem value={item.name} key={item.id}>{item.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          </div>
          <div>
          </div>
          <Label htmlFor='file'>Chooose file</Label>
          <Input
          id='file'
            type="file"
            name="fileAttached"
            placeholder="File Attached"
            />
            
          <Button type="submit" className='w-full'>Create Complaint</Button>
        </form>
    </div>
    // ####Add department####///

    // {/* <h2>Create New Department</h2>
    //<form onSubmit={handleDepartmentSubmit}>
    // <Input
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
