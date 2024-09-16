"use server";

import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";
import { redirect } from "next/dist/client/components/redirect";


const register = async (formData: FormData) => {


    const firstName = formData.get('firstname');
    const lastName = formData.get('lastname');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmpassword');
    console.log(firstName)
    console.log(lastName)
    console.log(email)
    console.log(password)
    console.log(confirmPassword)
    await dbConnect();
    //searching for existing user
    const existingUser = await User.findOne({email})
    if(existingUser) throw new Error("User already Exists");
    await User.create({firstname: firstName, lastname: lastName, email, password})
    console.log("user created successfully");
    redirect('/login');
};
export {register};