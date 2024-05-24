import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button';
import db from '@/lib/db/db'



const faq = async () => {
    const data = await db.fAQ.findMany();

    return (
        <div className='w-[70%] my-14 mx-auto'>
            <header><h1 className='text-4xl'>FAQ</h1></header>
            <Accordion type="single" collapsible className="w-full">
                {data.map((item, index) => (
                    <AccordionItem key={item.id} value={`Item-${index + 1}`} className='hover:bg-secondary'>
                        <AccordionTrigger >
                            <div>
                            <span className='text-lg text-muted-foreground mr-2 hover:no-underline focus:no-underline'>{index + 1}.</span>
                            {item.question}?
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className='pt-1 pl-7'>
                            {item.answer}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}

            </Accordion>
            <div className='w-full p-2'><Button  className='float-right' variant={'outline'}><a  href='/'>Back to Form</a></Button></div>
        </div>
    )
}

export default faq
