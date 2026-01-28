import { z } from "zod";

export const emailRule = z.email("Please enter a valid email address").trim();

export const LoginFormSchema = z.object({
  email: emailRule,
  password: z.string().min(1, { error: "Password is required" }).trim(),
});

export const RegisterFormSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: emailRule,
  password: z
    .string()
    .superRefine((val, ctx) => {
      const errors: string[] = [];

      if (val.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Not be empty",
        });
        return;
      }

      if (val.length < 8) {
        errors.push("Be at least 8 characters long");
      }
      if (!/[a-z]/.test(val)) {
        errors.push("Contain at least one lowercase letter");
      }
      if (!/[A-Z]/.test(val)) {
        errors.push("Contain at least one uppercase letter");
      }
      if (!/[0-9]/.test(val)) {
        errors.push("Contain at least one number");
      }
      if (!/[^a-zA-Z0-9]/.test(val)) {
        errors.push("Contain at least one special character");
      }

      if (errors.length > 0) {
        ctx.addIssue({
          code: "custom",
          message: JSON.stringify(errors),
        });
      }
    })
    .trim(),
});

export type LoginFormData = z.infer<typeof LoginFormSchema>;
export type RegisterFormData = z.infer<typeof RegisterFormSchema>;
