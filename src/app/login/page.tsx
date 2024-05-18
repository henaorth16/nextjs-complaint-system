'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { authenticateUserMiddleware } from '@/lib/actions/actions'; // Adjust path as necessary

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const user = await authenticateUserMiddleware(username, password);

      if (user) {
        document.cookie = `user=${JSON.stringify(user)}; path=/`; // Set a cookie
        router.push('/admin/dashboard'); // Redirect to a protected page
      } else {
        setMessage('Invalid username or password');
      }
    } catch (error) {
      setMessage('An error occurred during login');
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
