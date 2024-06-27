import db from "@/lib/db/db";
import { DeleteFaq } from "../_component/userAction";
import { AddFaq } from "./add";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export default async function adminFaq() {
    const faqs = await db.fAQ.findMany({});
    return (
        <main>
            <h1 className="">FAQ</h1>
            <AddFaq />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>n<u>o</u></TableHead>
                        <TableHead>Question</TableHead>
                        <TableHead>Answer</TableHead>
                        <TableHead className="sr-only">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {faqs.map((faq,index) => (
                        <TableRow key={faq.id} className="">
                            <TableCell>{index+1}</TableCell>
                            <TableCell className="text-lg">
                                {faq.question.substring(0, 19)}{faq.question.length > 20 ? "..." : ""}
                            </TableCell>
                            <TableCell>
                                {faq.answer.substring(0, 19)}{faq.answer.length > 20 ? "..." : ""}
                            </TableCell>
                            <TableCell>
                                <DeleteFaq id={faq.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main >
    )
}

