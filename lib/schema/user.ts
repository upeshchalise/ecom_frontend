
import { z } from "zod";

export const SignupSchema = z.object({
    first_name: z.string().nonempty("first name is required").min(3, "First name is required"),
    last_name: z.string().nonempty("last name is required").min(3, "Last name is required"),
    email: z.string().nonempty("email is required").email("Invalid email address"),
    password: z.string().nonempty("password is required").min(8, "Password must be at least 8 characters long"),
    phone: z.string().nonempty("contact is required").length(10, "Contact must be of 10 characters long"),
    address: z.string().nonempty("address is required").min(5, "Address must be at least 5 characters long"),
    image: z.string().optional(),
});

export const SigninSchema = z.object({
    email: z.string().nonempty("email is required").email("Invalid email address"),
    password: z.string().nonempty("password is required"),
});

export const ProfileSchema = z.object({
  first_name: z.string().min(3, "First name is required"),
  last_name: z.string().min(3, "Last name is required"),
  email: z.string().email(),
  phone: z.string().length(10, "Contact must be of 10 characters long"),
  address: z.string().min(5, "Address is required"),
  image: z.string().url().optional(),
});
