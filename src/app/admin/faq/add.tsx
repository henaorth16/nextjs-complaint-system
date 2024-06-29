"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addFaq } from "@/lib/actions/actions";
import { useFormStatus } from "react-dom";


export function AddFaq() {
    const { pending } = useFormStatus();
    return (
        <form className=" w-[86%] mx-auto p-10" action={addFaq}>
            <div>
                <label htmlFor="ques">Question</label>
                <Input type="text" id="ques" name="question" placeholder="where is microlink located?" required />
            </div>
            <div>
                <label htmlFor="ans">Answer</label>
                <Input type="text" id="ans" name="answer" placeholder="around piazza" required />
            </div>
            <Button type="submit" aria-disabled={pending} className="ml-auto justify-right my-5">Add</Button>
        </form>
    );
}