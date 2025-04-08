
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./types";

interface InstitutionFieldsProps {
  form: UseFormReturn<FormValues>;
}

const InstitutionFields = ({ form }: InstitutionFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="institutionName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Institution or Company Name <span className="text-destructive">*</span></FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="contactNameOrGroup"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contact Name / Group or Lab <span className="text-destructive">*</span></FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default InstitutionFields;
