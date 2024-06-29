'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; 
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log("hello");
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <Card className=' p-8 w-full max-w-sm'>
        <h1 className='text-2xl mb-6 text-center'>MLITC Login</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='flex flex-col'>
            <label htmlFor='username' className='mb-2'>Username:</label>
            <Input
              type='text'
              name='username'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className='p-2 border rounded-lg'
            />
          </div>
          <div className='flex flex-col'>
            <Label htmlFor='password' className='mb-2'>Password:</Label>
            <Input
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='p-2 border rounded-lg'
            />
          </div>
          <Button type='submit' className='w-full p-2 bg-primary text-black  rounded-lg hover:bg-white'>
            Login
          </Button>
        </form>
        {message && <p className='text-red-500 mt-4 text-center'>{message}</p>}
      </Card>
    </div>
  );
};

export default LoginPage;
