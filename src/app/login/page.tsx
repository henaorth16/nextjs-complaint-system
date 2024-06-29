'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; 

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
      <div className=' p-8 rounded-lg shadow-md w-full max-w-sm'>
        <h1 className='text-2xl mb-6 text-center'>MLITC Login</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='flex flex-col'>
            <label htmlFor='username' className='mb-2'>Username:</label>
            <input
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
            <label htmlFor='password' className='mb-2'>Password:</label>
            <input
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='p-2 border rounded-lg'
            />
          </div>
          <button type='submit' className='w-full p-2 bg-primary text-black  rounded-lg hover:bg-white'>
            Login
          </button>
        </form>
        {message && <p className='text-red-500 mt-4 text-center'>{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
