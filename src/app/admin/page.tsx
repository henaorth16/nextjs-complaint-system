import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import db from '@/lib/db/db';
import { Blocks, BookOpenText, MessageCircleQuestion, UserCircle } from 'lucide-react';

const AdminDashboard = async () => {
  const complaints = await db.complaint.findMany({
    include: {
      department: true,
    },
  });
  const users = await db.users.findMany({});
  const faq = await db.fAQ.findMany({});
  const department = await db.department.findMany({});


  const lists = [
    {
      icon: UserCircle,
      title: "Users",
      numData: users.length,
      path:"admin/users",
    },
    {
      icon: BookOpenText,
      title: "Complaints",
      numData: complaints.length,
      path:"admin/compliants",
    },
    {
      icon: MessageCircleQuestion,
      title: "FAQ",
      numData: faq.length,
      path:"admin/faq",
    },
    {
      icon: Blocks,
      title: "Department",
      numData: department.length,
      path:"admin/department",
    },
  ];

  return (
    <div className='grid md:grid-cols-4 grid-cols-1 gap-4 md:px-32 py-10'>
      {lists.map((list, index) => (
        <a className='group' href={list.path} key={index}>
          <Card>
            <CardTitle>
              <CardHeader className='text-2xl mx-auto w-fit text-card-foreground opacity-70'>
                <list.icon className='text-4xl' size={50} strokeWidth={1.5} />
              </CardHeader>
            </CardTitle>
            <CardContent className='flex flex-col items-center justify-start gap-4'>
              <h2 className="text-primary text-3xl">{list.numData}</h2>
              <h4>{list.title}</h4>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
};

export default AdminDashboard;
