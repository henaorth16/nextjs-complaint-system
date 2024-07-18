'use client'
// Use 'next/navigation' instead of 'next/router'
import { useFormState } from 'react-dom';
import loginAction from './lognAction';

const LoginPage = () => {
  const [error, formAction] = useFormState(loginAction, undefined);

  return (
    <div>
      <h1>Login</h1>
      <form action={formAction}>
        <div>
          <label htmlFor='username'>username:</label>
          <input
            type="text"
            name="username"
            id='username'
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type="password"
            name="password"
            id='password'
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
