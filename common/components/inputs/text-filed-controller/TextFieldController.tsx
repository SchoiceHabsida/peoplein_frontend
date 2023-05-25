import { FC } from "react";
import { Controller } from "react-hook-form";
import { Control } from "react-hook-form/dist/types/form";

export type TextFieldControllerProps = {
  control: Control<any>;
  name: string;
  label?: string,
  placeholder?: string,
  type?: string
};

export const TextFieldController: FC<TextFieldControllerProps> = ({
  control,
  name,
  label,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ...fieldProps }}) => (
        <input {...{ ...props, ...fieldProps }}
          className="input border-none outline-none border-r-4 py-2 px-4"
        />
      )}
    />
  );
};
