import { HomeHeader } from '@/components/ui/text-generate-effect';
import Form from '@/components/form';




export default function UserForm() {

  

  return (
    <div className='w-[94%] md:w-[60%] min-h-screen mx-auto mt-6 mb-14 flex  items-center justify-center flex-col'>
      <HomeHeader/>
      <Form/>
    </div>

  );
}


