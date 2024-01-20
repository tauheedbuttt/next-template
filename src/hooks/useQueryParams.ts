import { formDataToObj, objectToFormData } from "@/utils/formdata";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const queryToObject = (str: string) => {
    // key=value&key=value
    const keys = str.split("&").filter((item) => item);
    const obj: any = { page: "1", limit: "10", text: "" };
    keys.forEach((item) => {
      const key = item
        .split("=")[0]
        ?.replace(/%5B/g, "[")
        ?.replace(/%5D/g, "]");
      obj[key] = item.split("=")[1]?.replaceAll("+", " ");
    });
    return obj;
  };
  const objToQuery = (obj: any) => {
    return Object.keys(obj)
      .filter((item: string) => !!obj[item])
      .map((key) => `${key}=${obj[key]}`)
      .join("&");
  };
  const href = (data: any, reset = false) => {
    const formdata = formDataToObj(objectToFormData(data));
    return `${pathname}?${objToQuery(
      reset
        ? formdata
        : {
            ...query,
            ...(data ? formdata : {}),
          }
    )}`;
  };

  const query = queryToObject(useSearchParams().toString());
  const setQuery = (data: any, reset = false) => router.push(href(data, reset));

  return {
    pathname,
    query,
    queryToObject,
    objToQuery,
    setQuery,
    href,
  };
};

export default useQueryParams;
