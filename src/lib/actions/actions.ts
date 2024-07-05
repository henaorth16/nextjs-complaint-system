'use server';

import db from "@/lib/db/db";
import { hashPassword } from "../isValidPassword";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

interface userProp {
  username: string
  password: string
  dep: string
}
export async function createUser(FormData: FormData) {

  const formEntries = Object.fromEntries(FormData.entries());
  const { id, username, password, dep }: any = formEntries;
  if (!username) {
    throw new Error('Username is required');
  }
  if (!password) {
    throw new Error('Password is required');
  }


  try {
    revalidatePath("/admin/users")
    const hashedPassword = await hashPassword(password);
    // Fetch department by name to get its ID
    const department = await db.department.findFirst({
      where: { name: dep },
    });

    const user = await db.users.create({
      data: {
        username,
        password: hashedPassword,
        departmentId: department?.id, // Store departmentId if its selected
      },
    });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
  }
  redirect('/admin/users')
  revalidatePath("/admin/users")
}

export const getDepartments = async () => {
  try {
    const deps = await db.department.findMany();
    return deps;
  } catch (error) {
    console.error('Error fetching departments:', error);
  }
}
export const deleteUsers = async (id: number) => {
  try {
    const user = await db.users.delete({ where: { id } })

    if (user == null) return notFound()
  } catch (error) {
    console.log(error);

  }

  revalidatePath("/admin/users")
}

export const deleteCompliant = async (id: number) => {
  try {
    const user = await db.complaint.delete({ where: { id } })

    if (user == null) return notFound()
  } catch (error) {
    console.log(error);

  }

  revalidatePath("/admin/compliants")
}

export async function deletefaq(id: number) {
  try {
    const user = await db.fAQ.delete({ where: { id } })

    if (user == null) return notFound()
  } catch (error) {
    console.log(error);

  }
  revalidatePath("/admin/compliants")
}
export async function deleteDep(id: number) {
  try {
    const user = await db.department.delete({ where: { id } })

    if (user == null) return notFound()
  } catch (error) {
    console.log(error);

  }
  revalidatePath("/admin/compliants")
}
/////////////////////////////////////////////////
export async function updateUser(id: any,
  prevState: unknown,
  formData: FormData) {
  // Convert FormData to an object
  const formEntries = Object.fromEntries(formData.entries());
  const { username, password, dep, isAdmin } = formEntries;
  console.log(id);

  // Parse the id to an integer
  const userId = parseInt(id as string, 10);
  const user = await db.users.findUnique({ where: { id: userId } });

  try {
    if (user == null) {
      return notFound();
    }

    const hashedPassword = await hashPassword(password as string);

    // Fetch department by name to get its ID
    const department = await db.department.findFirst({
      where: { name: dep as string },
    });
    const adminVal = Boolean(isAdmin);

    await db.users.update({
      where: { id: userId },
      data: {
        username: username as string,
        password: hashedPassword,
        departmentId: department?.id || null, // Use null if no department is found
        isAdmin: adminVal, // Ensure isAdmin is a boolean
      },
    });

  } catch (error) {
    console.log(error);
  }
  revalidatePath('/admin/users');
  redirect('/admin/users');
}


export async function addFaq(FormData: FormData) {
  if (!FormData) {
    throw new Error("data is not");

  }
  const formEntries = Object.fromEntries(FormData.entries());
  const { question, answer } = formEntries;
  try {

    const faq = await db.fAQ.create({
      data: {
        question: question as string,
        answer: answer as string,
      }
    });
    revalidatePath('/admin/faq');
    return faq
  } catch (error) {
    return console.log(error);
  }
}

export async function addDep(FormData: FormData) {
  if (!FormData) {
    throw new Error("data is not");

  }
  const formEntries = Object.fromEntries(FormData.entries());
  const { name } = formEntries;
  try {

    const faq = await db.department.create({
      data: {
        name: name as string,
      }
    });
    revalidatePath('/admin/department');
    return faq
  } catch (error) {
    return console.log(error);
  }
}