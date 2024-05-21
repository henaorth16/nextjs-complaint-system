"use server"
import db from "../db/db";
import { z } from "zod"
import fs from "fs/promises"
import { revalidatePath } from "next/cache";

            
const fileSchema = z
    .instanceof(File, { message: "Invalid file type" })
    .optional()
    .refine(file => {
        if (!file) return true; 
        if (file !== undefined) {   //if the file found
            const fileSizeInMB = file.size / (1024 * 1024);
            return fileSizeInMB < 5;
        }
    }, { message: "File size should be between 10KB and 5MB" })
    .refine(file => {
        if (!file) return true; 
        if (file.name) { // Ensure file.name is defined
            const extension = file.name.split('.').pop()?.toLowerCase();
            return extension !== 'pdf';
        }
        return true;
    }, { message: "PDF files are not allowed" });

const addSchema = z.object({
    customerName: z.string().optional(),
    customerEmail: z.string().optional(),
    description: z.string().min(1, { message: "Description is required" }),
    department: z.string().min(1, { message: "Department is required" }),
    fileAttached: fileSchema,
});

export async function complainSubmit(formData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()));

    if (result.success === false) {
        console.error("Validation failed:", result.error.formErrors.fieldErrors);
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;

    try {
        await fs.mkdir("public/uploads", { recursive: true });
        const filePath = data.fileAttached ? `/uploads/${crypto.randomUUID()}-${data.fileAttached.name}` : "undefined";
        if (data.fileAttached) {
            await fs.writeFile(`public${filePath}`,Buffer.from(await data.fileAttached.arrayBuffer()))
        }

        const department = await db.department.findFirst({
            where: { name: data.department },
        });
        if (department == null) {
            throw new Error("department required")
        }

        await db.complaint.create({
            data: {
                description: data.description,
                customerName: data.customerName,
                customerEmail: data.customerEmail,
                fileAttached: filePath || null,
                departmentId: department.id,
            },
        });

        console.log("Data successfully stored in the database");

        revalidatePath("/");
    } catch (error) {
        console.error("Error during database operation:", error);
    }
}
