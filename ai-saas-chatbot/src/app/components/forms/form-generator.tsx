import { FieldValues, UseFormRegister } from "react-hook-form";

type FormGeneratorProps = {
  register: UseFormRegister<FieldValues>;
  fields: { name: string; label: string; type: string }[];
  errors: Record<string, any>;
};

const FormGenerator = ({ register, fields, errors }: FormGeneratorProps) => {
  return (
    <div className="flex flex-col gap-2">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium">{field.label}</label>
          <input
            {...register(field.name)}
            type={field.type}
            className="border p-2 rounded w-full"
          />
          {errors[field.name] && (
            <p className="text-red-500 text-xs">{errors[field.name].message}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormGenerator;
