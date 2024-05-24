'use client';

import { useState, useEffect } from 'react';
import { createUser, getDepartments } from '@/lib/actions/actions';
import { redirect } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectGroup } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const CreateUser = () => {
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
    <div>
      <h1>Create User</h1>
      <form action={createUser}>
        <div>
          <Label htmlFor='username'>Username:</Label>
          <Input
            type="text"
            name="username"
            id='username'
            required
          />
        </div>
        <div>
          <Label htmlFor='password'>Password:</Label>
          <Input
            type="password"
            name="password"
            id='password'
            required
          />
        </div>
        <div>
          <SelectGroup>
            <SelectLabel>Select Department</SelectLabel>
            <Select
              name='dep'
            >
              <SelectTrigger>
                <SelectValue placeholder="Assign department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((item) => (
                  <SelectItem value={item.name} key={item.id}>{item.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SelectGroup>
        </div>
        <button type="submit" onClick={() => redirect("/admin/users")}>Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
