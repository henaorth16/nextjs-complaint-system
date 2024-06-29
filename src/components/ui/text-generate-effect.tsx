"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import TooltipComp from "../Tooltip";


export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 1,
        delay: stagger(0.2),
      }
    );
  }, [animate]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="dark:text-white text-black opacity-0"
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className=" text-border font-light text-sm leading-snug">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};


export function HomeHeader() {
  const animatedWord = "Your voice matters to us! If you have any complaints, concerns, or suggestions, please share them with us using the form below. We are committed to addressing your issues promptly and improving our services based on your feedback. Rest assured, your submission is confidential, and we are here to help you without any judgment or fear."
  return (
    <div className='w-full flex md:flex-row flex-col md:justify-between  md:items-end'>
      <div className='py-6'>
        <h1 className='text-2xl my-2 font-semibold text-primary'>Create New Complaint</h1>
        <div className='text-border font-light text-sm md:w-[80%] text-justify'>
          <TextGenerateEffect words={animatedWord} />
        </div>
      </div>
      <TooltipProvider>
        <Tooltip>
          <a href="/faq">
            <TooltipTrigger>
                FAQ
            </TooltipTrigger>
          </a>
          <TooltipComp text="other clients asked many questions " />
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}