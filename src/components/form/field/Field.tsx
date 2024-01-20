import Image from "next/image";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { FaFile, FaTrash, FaUpload } from "react-icons/fa";

export interface OptionProps {
  value: string | number | readonly string[] | undefined;
  label: string;
}

export interface InputProps {
  name: string;
  type?:
  | "dropdown"
  | "checkbox"
  | "radio"
  | "file"
  | "textarea"
  | "date"
  | "file"
  | "number"
  | "password"
  | "email"
  | string;
  attributes?: any;
  label?: string;
  placeholder?: string;
  className?: string;
  container?: string;
  options?: OptionProps[];
  columns?: InputProps[];
}

export interface FieldProps {
  item: InputProps;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  errors: FieldErrors<FieldValues>;
  hideError?: boolean;
}

const Field = ({
  item,
  register,
  watch,
  setValue,
  errors,
  hideError,
}: FieldProps) => {
  function accessNestedField(obj: any, path: string) {
    const keys = path.match(/\w+/g); // Match words and ignore brackets
    let currentObj: any = obj;

    if (keys)
      for (const key of keys) {
        if (currentObj?.hasOwnProperty(key) || Array.isArray(currentObj)) {
          currentObj = currentObj[key];
        } else {
          return undefined;
        }
      }

    return currentObj;
  }

  const errorObject = accessNestedField(errors, item.name);
  const error = errorObject?.message?.toString();
  const border = error && hideError ? "border-red-300" : "border-border";

  const renderInput = () => {
    switch (item.type) {
      case "dropdown":
        const selectOption = { value: "", label: `` };
        return (
          <select
            id={item.name}
            className={`w-full bg-transparent px-2 py-[9px] rounded-sm border-[1px] ${border} text-[12px] ${item.className}`}
            {...register(item.name)}
            {...item.attributes}
          >
            {[selectOption, ...(item.options ? item.options : [])]?.map(
              (item, index) => (
                <option value={item?.value} key={index}>
                  {item?.label}
                </option>
              )
            )}
          </select>
        );
      case "checkbox":
      case "radio":
        return item?.options?.map((option, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type={item.type}
              id={item.name}
              value={option.value}
              {...register(item.name)}
              {...item.attributes}
              className={`accent-primary focus:accent-primary`}
            />
            <label htmlFor={item.name} className="mt-2">
              {option.label}
            </label>
          </div>
        ));
      case "file":
        const watched = watch(item.name);
        const files = !watched
          ? []
          : typeof watched == "string"
            ? [watched]
            : Array.from(watched).map((item) => item);
        const multiple = item.attributes?.multiple;
        return (
          <div className="w-full">
            <label
              htmlFor={item.name}
              className={`flex flex-col items-center ${!multiple && files?.length ? "p-5" : "py-10 px-5"
                } w-full  transition hover:bg-gray-200 border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none text-center`}
            >
              <div
                className="flex gap-2 "
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {multiple &&
                  files?.map((file, index) => (
                    <div
                      key={index}
                      className="relative border-[2px] mb-3 shadow-md border-gray-300 p-1"
                    >
                      <Image
                        key={index}
                        src={
                          file instanceof File
                            ? URL.createObjectURL(file)
                            : typeof file == "string"
                              ? file
                              : ""
                        }
                        alt={"file"}
                        className="w-14 h-14"
                      />
                      <FaTrash
                        onClick={() => {
                          setValue(
                            item.name,
                            files.filter((_i, idx) => idx !== index)
                          );
                        }}
                        className="absolute cursor-pointer top-0 right-0  text-red-400 p-1 bg-white "
                      />
                    </div>
                  ))}
              </div>
              <div className="flex justify-center w-full">
                {!multiple && files?.length ? (
                  /\.(jpg|jpeg|png|gif)$/i.test(files[0] as any) ? (
                    <Image
                      src={
                        files[0] instanceof File
                          ? URL.createObjectURL(files[0])
                          : typeof files[0] == "string"
                            ? files[0]
                            : ""
                      }
                      alt={"file"}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="flex gap-2 items-center">
                      <FaFile size={20} className="text-secondary" />
                      <span>{(files[0] as any)?.name}</span>
                    </div>
                  )
                ) : (
                  <span className="flex items-center space-x-2">
                    <FaUpload className="w-6 h-6 text-gray-600" />
                    <span className="font-medium text-gray-600">
                      Drop {item.label} to Attach, or
                      <span className="ml-1 text-blue-600 underline">
                        browse
                      </span>
                    </span>
                  </span>
                )}
                <input
                  type="file"
                  id={item.name}
                  {...register(item.name)}
                  {...item.attributes}
                  className={` hidden ${item.className}`}
                />
              </div>
            </label>
          </div>
        );
      case "textarea":
        return (
          <textarea
            id={item.name}
            rows="4"
            className="w-full px-0 text-sm text-gray-900 bg-white border-0 "
            placeholder="Write a comment..."
            {...register(item.name)}
            {...item?.attributes}
          ></textarea>
        );
      default:
        return (
          <input
            type={item.type}
            id={item.name}
            placeholder={item.placeholder}
            {...register(item.name)}
            {...item.attributes}
            className={`formInput ${item.className} bg-transparent`}
          />
        );
    }
  };

  return (
    <div className={item.container ? item.container : "w-full"}>
      {item.type !== "file" && item.label && (
        <label htmlFor={item.name} className="text-[13px]">
          {item.label}
        </label>
      )}
      <div
        className={
          item.type !== "file" && item.type !== "dropdown"
            ? `inputContainer ${border} mb-0`
            : ""
        }
      >
        {renderInput()}
      </div>
      {error && !hideError && <span className={`formError`}>{error}</span>}
    </div>
  );
};

export default Field;
