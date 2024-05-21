'use client';

import { useState, FormEvent, useEffect } from 'react';
import { createUser, getDepartments } from '@/lib/actions/actions';
import { redirect } from 'next/navigation';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dep, setDep] = useState('');
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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    try {
      await createUser(formData);
      setUsername('');
      setPassword('');
      setDep('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            id='username'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='dep'>Department:</label>
          <select
            name='dep'
            id='dep'
            value={dep}
            onChange={(e) => setDep(e.target.value)}
            required
          >
            <option value="" disabled>Select a department</option>
            {departments.map((item) => (
              <option value={item.name} key={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" onClick={() => redirect("/admin/users")}>Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
