
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./types";

interface VersionFieldProps {
  form: UseFormReturn<FormValues>;
}

const VersionField = ({ form }: VersionFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="cbioportalVersion"
      render={({ field }) => (
        <FormItem>
          <FormLabel>What version of cBioPortal have you installed?</FormLabel>
          <FormDescription>
            The version can be found in the footer of your local instance of cBioPortal.
          </FormDescription>
          <FormControl>
            <Input {...field} placeholder="e.g., v6.1.0" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default VersionField;
