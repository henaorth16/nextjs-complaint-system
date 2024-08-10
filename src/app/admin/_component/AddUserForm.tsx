'use client';

import { useState, useEffect } from 'react';
import { getDepartments, updateUser } from '@/lib/actions/actions';
import { redirect } from 'next/navigation';
import { useFormState } from 'react-dom';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { SelectValue } from '@radix-ui/react-select';
import { Button } from '@/components/ui/button';

const AddUserForm = ({ name, userId }: { name: string | undefined, userId:any }) => {
  const [error, action] = useFormState( updateUser.bind(null, userId),{})
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
      <h1 className='text-muted-foreground'>Edit  {name}&apos;s account</h1>
      <form action={action}>
        <div>
          <Label htmlFor='username'>Username:</Label>
          <Input
            type="text"
            name="username"
            id='username'
            defaultValue={name}
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
              name="dep"
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select the Department to mention" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((item: any) => (
                  <SelectItem value={item.name} key={item.id}>{item.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SelectGroup>
          <br />
          <Label htmlFor="isadmin">he/she is admin?</Label>
          <Input type="checkbox" name="isAdmin" id="isadmin" />
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
};

export default AddUserForm;
