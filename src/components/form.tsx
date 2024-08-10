"use client";
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectGroup } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { complainSubmit } from '@/lib/actions/complainSubmit';
import { getDepartments } from '@/lib/actions/actions';
import { useToast } from './ui/use-toast';
interface Errors {
    customerName?: string[];
    customerEmail?: string[];
    description?: string[];
    department?: string[];
    fileAttached?: string[];
    message?: string[];
}

function Form() {
    const { toast } = useToast()
    const [errors, setErrors] = useState<Errors>({});
    const [departments, setDepartments] = useState<{ id: number; name: string }[]>([]);

    const clientAction = async (formData: FormData, formElement: HTMLFormElement) => {
        const result = await complainSubmit(formData);
        if (result.error) {
            setErrors(result.error);
        } else {
            setErrors({});
            formElement.reset();
            toast({
                title: "Submitted successfully",
                description: "Thankyou for your submission",
              });
        }
    };

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

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                await clientAction(formData, e.target as HTMLFormElement);
            }}
            className='w-full flex flex-col gap-[0.83rem]'
        >            <div className='flex flex-col md:flex-row w-full gap-4'>
                <div className='grow'>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id='name'
                        type="text"
                        name="customerName"
                        placeholder="Abebe Kebede"
                        required
                    />
                    {errors.customerName && <p className="text-red-500">{errors.customerName[0]}</p>}
                </div>
                <div className='grow'>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                        id='email'
                        type="email"
                        name="customerEmail"
                        placeholder="abebe@gmail.com"
                        required
                    />
                    {errors.customerEmail && <p className="text-red-500">{errors.customerEmail[0]}</p>}
                </div>
            </div>
            <div>
                <Label htmlFor='desc'>Description</Label>
                <Textarea
                    id='desc'
                    name="description"
                    placeholder="Put your message here..."
                    required
                />
                {errors.description && <p className="text-red-500">{errors.description[0]}</p>}
            </div>
            <div>
                <SelectGroup>
                    <SelectLabel>Select Department</SelectLabel>
                    <Select name="department">
                        <SelectTrigger>
                            <SelectValue placeholder="Select the Department to mention" />
                        </SelectTrigger>
                        <SelectContent>
                            {departments.map((item) => (
                                <SelectItem value={item.name} key={item.id}>{item.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.department && <p className="text-red-500">{errors.department[0]}</p>}
                </SelectGroup>
            </div>
            <div>
                <Label htmlFor='file'>Choose file</Label>
                <Input
                    id='file'
                    type="file"
                    name="fileAttached"
                    placeholder="File Attached"
                />
                {errors.fileAttached && <p className="text-red-500">{errors.fileAttached[0]}</p>}
            </div>
            <Button type="submit" className='w-full'>Create Complaint</Button>
        </form>
    );
}

export default Form;
