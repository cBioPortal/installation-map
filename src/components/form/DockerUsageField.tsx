
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/components/form/types";

interface DockerUsageFieldProps {
  form: UseFormReturn<FormValues>;
}

const DockerUsageField = ({ form }: DockerUsageFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="usedDocker"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>How did you install cBioPortal?</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              className="flex flex-col space-y-1"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="docker" />
                </FormControl>
                <FormLabel className="font-normal">Docker</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="native" />
                </FormControl>
                <FormLabel className="font-normal">Native installation</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="not_sure" />
                </FormControl>
                <FormLabel className="font-normal">Not sure</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DockerUsageField;
