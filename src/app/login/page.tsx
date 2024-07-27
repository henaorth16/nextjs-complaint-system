
'use client'
import { useFormState } from 'react-dom';
import loginAction from './lognAction';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: "Log in",
//   description: "",
// };

const LoginPage = () => {
  const [error, formAction] = useFormState(loginAction, undefined);

  return (
    <div className='flex min-h-screen justify-center items-center'>
      <Card className=' p-8 w-full max-w-sm'>
        <h1 className='text-2xl mb-6 text-center'>MLITC Login</h1>
        <form action={formAction} className='space-y-4'>
          <div className='flex flex-col'>
            <label htmlFor='username' className='mb-2'>Username:</label>
            <Input
              type='text'
              name='username'
              id='username'
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
              required
              className='p-2 border rounded-lg'
            />
          </div>
          <Button type='submit' className='w-full p-2 bg-primary text-black  rounded-lg hover:bg-white'>
            Login
          </Button>
        </form>
        {error && <p>{error}</p>}
      </Card>
    </div>
  );
};

export default LoginPage;
