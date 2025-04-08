
import { z } from "zod";

// Define the form schema with zod
export const formSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Please enter a valid email"),
  institutionName: z.string().min(1, "Required"),
  contactNameOrGroup: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
  cbioportalVersion: z.string().optional(),
  webLink: z.string().optional(),
  usedDocker: z.enum(["docker", "native", "not_sure"]).optional(),
  hardwarePlatform: z.enum(["desktop", "local_server", "cloud", "other"]).optional(),
});

export type FormValues = z.infer<typeof formSchema>;
