import { Controller, Control, FieldValues, Path } from "react-hook-form";

import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

/*
🏗️ Why do we need Controller?
Because react-hook-form can automatically handle simple <input /> elements using register():
<input {...register("email")} />
But for custom components like:

A custom Input component

Third-party UI components (like Material-UI, shadcn, Radix, etc.)

...you can’t use register() directly. You must use Controller. */

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
}

/*
The field object looks like this:
{
  name: string,           // the field name, e.g. "email"
  value: any,             // current value of the field
  onChange: (value) => {},// function to update value
  onBlur: () => {},       // function to mark as "touched"
  ref: React.Ref          // used for focusing/validation
}
So when you write:
<Input {...field} />
You’re basically passing all of these in:
 */

const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: FormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="label">{label}</FormLabel>
          <FormControl>
            <Input
              className="input"
              type={type}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormField;
