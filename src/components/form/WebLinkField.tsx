
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./types";

interface WebLinkFieldProps {
  form: UseFormReturn<FormValues>;
}

const WebLinkField = ({ form }: WebLinkFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="webLink"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Web Link</FormLabel>
          <FormDescription>
            If your instance of cBioPortal is publicly accessible, please provide a web (hypertext) link:
          </FormDescription>
          <FormControl>
            <Input {...field} placeholder="https://www.cbioportal.org" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default WebLinkField;
