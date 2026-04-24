// lib/actions/auth.ts

"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function loginAction(values: any) {
  try {
    await signIn("credentials", {
      identifier: values.identifier,
      password: values.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    // PENTING: Jika error adalah AuthError, kita kembalikan pesan
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Username/Email atau Password salah!" };
        default:
          return { error: "Terjadi kesalahan sistem." };
      }
    }
 
    throw error; 
  }
}