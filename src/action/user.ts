"use server";

import dbConnect from "@/lib/dbConnect";

import { redirect } from "next/dist/client/components/redirect";
import {hash} from "bcryptjs";
import User from "@/models/User";

const register = async (formData: FormData) => {


    const firstName = formData.get('firstname') as string;
    const lastName = formData.get('lastname') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmpassword') as string;
    console.log(firstName)
    console.log(lastName)
    console.log(email)
    console.log(password)
    console.log(confirmPassword)
    await dbConnect();
    //searching for existing user
    const existingUser = await User.findOne({email})
    if(existingUser) throw new Error("User already Exists");

    const hashedPassword = await hash(password, 12)
    await User.create({firstname: firstName, lastname: lastName, email, password: hashedPassword})
    console.log("user created successfully");
    redirect('/login');
};
export {register};