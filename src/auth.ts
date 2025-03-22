import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import dbConnect from "./lib/dbConnect";
import User from "./models/User";
import { compare } from "bcryptjs";
import Google from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [

    Credentials({
      name: 'Credentials',

      credentials:{
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"},
      },
      
      authorize: async (credentials) =>{
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;
        console.log(email);

        if(!email || !password){
          throw new CredentialsSignin('Please provide both email and password')
        }

        await dbConnect();

        const user = await User.findOne({email}).select('+password');
        console.log(user);
        if(!user){
          throw new CredentialsSignin('Invalid email or password')
          
        }
        if(!user.password){
          throw new Error("Invalid : password");

        }

        const isMatched = await compare(password,user.password)
        if(!isMatched){
          throw new Error("Invalid password");
        }
        const userData = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role:user.role,
          id: user.id,
        }
        return userData;
      }
    })
  ],
  pages:{
    signIn:"/login",
  },
}
);