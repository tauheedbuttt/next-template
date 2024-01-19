"use client"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ObjectSchema } from "yup";

import Fields, { InputProps } from "./field/Field";
import Button from "../button/Button";

export interface FormProps {
  fields?: InputProps[];
  onSubmit?: SubmitHandler<FieldValues>;
  isLoading?: boolean;
  submit?: string;
  values?: any;
  defaultValues?: any;
  validation?: ObjectSchema<FieldValues>;
}

const Form = ({
  fields,
  onSubmit,
  isLoading,
  values,
  defaultValues,
  validation,
  submit = "Submit",
}: FormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    values,
    defaultValues,
    resolver: !validation ? undefined : yupResolver(validation),
  });

  const generateFields = (fields?: InputProps[]) => {
    return fields?.map((field: any, idx: number) => {
      const items = field.section ? field.items : [field];
      return (
        <div key={idx} className="w-full flex flex-col gap-2">
          {field.section && (
            <h1 className="text-secondary text-lg font-bold">
              {field.section}
            </h1>
          )}
          {items?.map((item: InputProps, index: number) =>
            Array.isArray(item) ? (
              <div
                key={index}
                className="flex md:flex-row w-full flex-col gap-2"
              >
                {generateFields(item)}
              </div>
            ) : (
              <Fields
                key={index}
                item={item}
                register={register}
                watch={watch}
                setValue={setValue}
                errors={errors}
              />
            )
          )}
        </div>
      );
    });
  };

  return (
    <form
      onSubmit={!onSubmit ? undefined : handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
    >
      <div className="flex flex-col gap-5">{generateFields(fields)}</div>

      {onSubmit && (
        <Button isLoading={isLoading} variant="primary" type="submit">
          {submit}
        </Button>
      )}
    </form>
  );
};

export default Form;
