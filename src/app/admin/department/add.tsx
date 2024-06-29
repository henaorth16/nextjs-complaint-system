"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addDep } from "@/lib/actions/actions";
import { useFormStatus } from "react-dom";


export function AddDep() {
    const { pending } = useFormStatus();
    return (
        <form className=" w-[86%] mx-auto p-10 flex gap-4 justify-center items-end" action={addDep}>
            <div className="grow">
                <label htmlFor="name">Department Name</label>
                <Input type="text" id="name" name="name" placeholder="Hardware and Networking" required />
            </div>
            <Button type="submit" aria-disabled={pending} >Add</Button>
        </form>
    );
}