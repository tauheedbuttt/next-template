import Swal from "sweetalert2";
import { Id, toast } from "react-toastify";

let toastId: Id = "";

export const alert = (
  message: string = "An error occured",
  type: "success" | "warning" | "error" = "success"
) => {
  if (!toast.isActive(toastId)) toastId = toast(message, { type });
};

export const confirmation = (message = "delete data", buttonText = "Delete") =>
  Swal.fire({
    title: "Are you sure?",
    text: `You want to ${message}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#52B788",
    cancelButtonColor: "#10002B",
    confirmButtonText: buttonText,
  });
