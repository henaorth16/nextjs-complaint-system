'use client';

import { useState, useEffect, useTransition, FormEvent } from 'react';
import { createUser, getDepartments } from '@/lib/actions/actions';
import { Label } from '@/components/ui/label';
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectGroup } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const CreateUser = () => {
  const [departments, setDepartments] = useState<{ id: number; name: string }[]>([]);
  const [isPending, startTransition] = useTransition();

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

  const handleSubmit = (event:FormEvent<HTMLFormElement> | any) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    startTransition(async () => {
      try {
        await createUser(formData);
      } catch (error) {
        console.error('Error creating user:', error);
      }
    });
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
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
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create User'}
        </Button>
      </form>
    </div>
  );
};

export default CreateUser;
