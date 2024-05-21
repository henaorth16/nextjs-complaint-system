'use server';

import db from "@/lib/db/db";
import { hashPassword } from "../isValidPassword";
import { revalidatePath } from "next/cache";


export async function createUser(data: FormData) {
  const username = data.get('username') as string;
  const password = data.get('password') as string;
  const departmentName = data.get('dep') as string;

  if (!username) {
    throw new Error('Username is required');
  }
  if (!password) {
    throw new Error('Password is required');
  }


  try {
    const hashedPassword = await hashPassword(password);

    // Fetch department by name to get its ID
    const department = await db.department.findFirst({
      where: { name: departmentName },
    });


    const user = await db.users.create({
      data: {
        username,
        password: hashedPassword,
        departmentId: department?.id, // Store departmentId
      },
    });

    console.log(data);
    return user;
    revalidatePath("/admin/create")
    revalidatePath("/admin/users")
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export const getDepartments = async () => {
  try {
    const deps = await db.department.findMany();
    return deps;
  } catch (error) {
    console.error('Error fetching departments:', error);
  }
};


export async function authenticateUser(data: FormData) {

  const username = data.get('username') as string;
  const password = data.get('password') as string;

  if (!username || !password) {
    throw new Error('username and password are required');
  }

  try {
    const user = await db.users.findUnique({
      where: { username },
    });

    if (!user) {
      throw new Error('Invalid username or password');
    }

    const hashedPassword = await hashPassword(password);

    if (user.password !== hashedPassword) {
      throw new Error('Invalid username or password');
    }

    return { id: user.id, username: user.username };
  } catch (error) {
    console.error('Authentication error:', error);
    throw new Error('Unable to authenticate user');
  }
}



export async function authenticateUserMiddleware(username: string, password: string) {
  if (!username || !password) {
    throw new Error('Username and password are required');
  }

  try {
    const user = await db.users.findUnique({
      where: { username },
    });

    if (!user) {
      throw new Error('Invalid username or password');
    }

    const hashedPassword = await hashPassword(password);

    if (user.password !== hashedPassword) {
      throw new Error('Invalid username or password');
    }

    return { id: user.id, username: user.username };
  } catch (error) {
    console.error('Authentication error:', error);
  }
}