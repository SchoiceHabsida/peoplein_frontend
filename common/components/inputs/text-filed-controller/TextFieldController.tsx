import { FC, Fragment } from "react";
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
      render={({ field: { ...fieldProps }, fieldState: {error} }) => {
        return <div className="relative">
          <div>
            {label && <label className="font-medium  inline-block" style={{marginBottom: '6px'}}>{label}</label>}
            <input {...{ ...props, ...fieldProps }}
              className="border-none outline-none border-r-4 py-2 px-4"
            />
          </div>
          <small className="absolute left-0" style={{color: '#BB251A'}}>{error?.message ? error?.message : null}</small>
        </div>
      }
      }
    />
  );
};
