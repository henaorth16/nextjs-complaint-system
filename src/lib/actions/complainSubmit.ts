"use server"
import db from "../db/db";
import { z } from "zod"
import fs from "fs/promises"


const fileSchema = z
  .instanceof(File, { message: "Invalid file type" })
  .optional()
  .refine(file => {
    if (!file) return true; // If file is not provided, it's valid
    const fileSizeInMB = file.size / (1024 * 1024);
    return fileSizeInMB < 5;
  }, { message: "File size should be below 5MB" })
  .refine(file => {
    if (!file) return true; // If file is not provided, it's valid
    const extension = file.name.split('.').pop().toLowerCase();
    return extension !== 'pdf';
  }, { message: "PDF files are not allowed" });

const addSchema = z.object({
  customerName: z.string().optional(),
  customerEmail: z.string().optional(),
  description: z.string().min(1, { message: "Description is required" }),
  dep: z.string().min(1, { message: "Department is required" }),
  fileAttached: fileSchema,
});

// Example usage
const exampleFile = new File(["content"], "example.txt", { type: "text/plain" });


export async function complainSubmit(FormData: FormData){
    const result = addSchema.safeParse(Object.fromEntries(FormData.entries()))
    // try {
    //     if(result.success){
    //     console.log("your data is valid");
    // }
    // } catch (error) {
    //     console.log(`${error}you cant submit data sijemer`);
        
    // }
    
  }
  