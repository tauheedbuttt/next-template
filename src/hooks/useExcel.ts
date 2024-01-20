import * as XLSX from "xlsx";

const useExcel = () => {
  const generateWorkbook = (data: any) => {
    const workbook = XLSX.utils.book_new();

    Object.entries(data).forEach(([sheetName, sheetData]: any) => {
      const worksheet = XLSX.utils.json_to_sheet(sheetData);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    });

    return workbook;
  };

  const addDropdownSheet = (workbook: any, sheetNames: any) => {
    const dropdownSheet = XLSX.utils.aoa_to_sheet([sheetNames]);
    XLSX.utils.book_append_sheet(workbook, dropdownSheet, "BULK");
  };

  const downloadExcel = (workbook: any, filename: any) => {
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  const generateAndDownloadExcel = (data: any, name: any, fields: any) => {
    const workbook = generateWorkbook(data);
    addDropdownSheet(workbook, fields);
    downloadExcel(workbook, name);
  };

  const dataToExcel = (data: any, name: any) => {
    const workbook = generateWorkbook({});
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Calculate maximum width for each column based on headings for all values
    const columnWidths: any = [];
    const headings = Object.keys(data[0]); // Assuming the first row contains column headings

    headings.forEach((col, index) => {
      const contentWidths = data.map((row: any) => {
        const cellValue = row[col];
        if (typeof cellValue === "number" && !isNaN(cellValue)) {
          // If the value is a number, convert it to a string representation
          return cellValue.toString();
        } else if (
          cellValue !== null &&
          cellValue !== undefined &&
          cellValue !== ""
        ) {
          // If the value is not null, undefined, or empty, convert it to a string representation
          return cellValue.toString();
        } else {
          // If the value is null, undefined, or empty, use an empty string
          return "";
        }
      });

      const maxWidth = Math.max(
        col.toString().length,
        ...contentWidths.map((w: any) => w.length)
      );
      columnWidths[index] = maxWidth;
    });

    // Set column widths in the worksheet
    worksheet["!cols"] = columnWidths.map((width: any) => ({
      width: width + 1,
    })); // Add some extra width for padding

    XLSX.utils.book_append_sheet(workbook, worksheet, name);
    downloadExcel(workbook, name);
  };

  return {
    generateAndDownloadExcel,
    dataToExcel,
  };
};

export default useExcel;
