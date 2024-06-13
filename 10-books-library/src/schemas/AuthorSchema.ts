import { z } from "zod";

// Validation Schema for an Author
export const authorSchema = z.object({
	name: z
		.string()
		.min(3, { message: "Name has to be at least 3 characters" })
		.max(20, { message: "Too long name, can be max 20 characters"}),

	date_of_birth: z
		.string({ message: "Author has to have a date of birth" }),

	/*
	date_of_birth: z
		.date()
		.refine(date => {
			const today = new Date();

			// Set the time to 0 to ignore the time part in the comparison
			today.setHours(0, 0, 0);

			return date <= today;
		}, { message: "Date cannot be in the future" }),
	*/
});

// Extract the type from the schema
export type AuthorSchema = z.infer<typeof authorSchema>;
