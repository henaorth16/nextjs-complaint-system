'use client';

import { useState, FormEvent } from 'react';
import { authenticateUser } from '@/lib/actions/actions'; // Adjust the path to your actual file location
import { useRouter } from 'next/router'; // Use 'next/navigation' instead of 'next/router'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    console.log(formData);
    
    try {
      const user = await authenticateUser(formData);
      document.cookie = `user=${JSON.stringify(user)}; path=/`; // Set a cookie
      router.push('/admin'); // Redirect to a protected page
    } catch (error) {
      setMessage('Invalid username or password');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>username:</label>
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
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
