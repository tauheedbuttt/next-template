export function objectToFormData(
  obj: any,
  formData = new FormData(),
  parentKey = ""
) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullKey = parentKey ? `${parentKey}[${key}]` : key;

      if (
        typeof obj[key] === "object" &&
        !(obj[key] instanceof File || obj[key] instanceof FileList)
      ) {
        objectToFormData(obj[key], formData, fullKey);
      } else {
        if (obj[key] instanceof FileList) {
          for (let i = 0; i < obj[key].length; i++) {
            const file = obj[key].item(i);
            formData.append(fullKey, file, file.name);
          }
        } else if (obj[key] instanceof File) {
          formData.append(fullKey, obj[key], obj[key].name);
        } else {
          formData.append(fullKey, obj[key]);
        }
      }
    }
  }

  return formData;
}

export function formDataToObj(formData: FormData) {
  const data: any = {};
  for (const [key, value] of formData) {
    data[key] = value;
  }
  return data;
}
