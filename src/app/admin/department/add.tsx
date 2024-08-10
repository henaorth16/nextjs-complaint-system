"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addDep } from "@/lib/actions/actions";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";


export function AddDep() {
    const { pending } = useFormStatus();
    return (
        <form className=" w-[85%] mx-auto p-10 flex gap-4 justify-center items-end" action={addDep}>
            <div className="grow">
                <label htmlFor="name">Add new Department</label>
                <Input type="text" id="name" name="name" placeholder="Hardware and Networking" required />
            </div>
            <Button type="submit" aria-disabled={pending} >{pending?<Loader/>: "Add"}</Button>
        </form>
    );
}