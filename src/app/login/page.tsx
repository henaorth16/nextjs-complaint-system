'use client';
import { useFormState } from 'react-dom';
import loginAction from './lognAction';
import { Card, CardTitle, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';

const LoginPage = () => {
  const { toast } = useToast();
  const [error, formAction] = useFormState(loginAction, undefined);

  // Use useEffect to show toast when there's an error
  useEffect(() => {
    if (error) {
      toast({
        title: error,
        description: "Sorry!",
      });
    }
  }, [error, toast]);

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Card className='p-5'>
        <CardTitle>
          <CardHeader className='text-center'>Login</CardHeader>
        </CardTitle>
        <form className='w-[20rem] flex flex-col flex-grow' action={formAction}>
          <div>
            <Label htmlFor='username'>Username:</Label>
            <Input
              type='text'
              name='username'
              id='username'
              required
            />
          </div>
          <div>
            <Label htmlFor='password'>Password:</Label>
            <Input
              type='password'
              name='password'
              id='password'
              required
            />
          </div>
          <Button className='text-center my-3 w-full' type='submit'>Login</Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
