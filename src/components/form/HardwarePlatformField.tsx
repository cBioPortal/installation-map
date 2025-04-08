
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/components/form/types";

interface HardwarePlatformFieldProps {
  form: UseFormReturn<FormValues>;
}

const HardwarePlatformField = ({ form }: HardwarePlatformFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="hardwarePlatform"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>What kind of hardware platform was the deployment to?</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              className="flex flex-col space-y-1"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="desktop" />
                </FormControl>
                <FormLabel className="font-normal">Mac/PC desktop/laptop computer</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="local_server" />
                </FormControl>
                <FormLabel className="font-normal">Local Unix/Linux server</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="cloud" />
                </FormControl>
                <FormLabel className="font-normal">Remote cloud instance</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="other" />
                </FormControl>
                <FormLabel className="font-normal">Other</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HardwarePlatformField;
