// pages/complaints/page.tsx
"use client"
import { useState, useEffect } from 'react';
import { getDepartments } from '@/lib/actions/actions';
import { complainSubmit } from '@/lib/actions/complainSubmit';
import { Input } from '@/components/ui/input';
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectGroup } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"
import { HomeHeader } from '@/components/ui/text-generate-effect';

export default function UserForm() {
  const router = useRouter();
  const { toast } = useToast();

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

  return (
    <div className='w-[94%] md:w-[60%] min-h-screen mx-auto mt-6 mb-14 flex items-center justify-center flex-col'>
      <HomeHeader/>
      <form action={complainSubmit} className='w-full flex flex-col gap-[0.83rem]'>
        <div className='flex flex-col md:flex-row w-full gap-4'>
          <div className='grow'>
            <Label htmlFor="name">Name</Label>
            <Input
              id='name'
              type="text"
              name="customerName"
              placeholder="Abebe Kebede"
              required
            />
          </div>
          <div className='grow'>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id='email'
              type="email"
              name="customerEmail"
              placeholder="abebe@gmail.com"
              required
            />
          </div>
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
          <SelectGroup>
            <SelectLabel>Select Department</SelectLabel>
            <Select
              name="department"
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select the Department to mention" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((item) => (
                  <SelectItem value={item.name} key={item.id}>{item.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SelectGroup>
        </div>
        <div></div>
        <Label htmlFor='file'>Choose file</Label>
        <Input
          id='file'
          type="file"
          name="fileAttached"
          placeholder="File Attached"
        />
        <Button
          type="submit"
          onClick={() => {
            toast({
              title: "Your message has been sent.",
              description: "Thank you!",
            });
          }}
          className='w-full'
        >
          Create Complaint
        </Button>
      </form>
    </div>
  );
}