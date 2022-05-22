import { toast } from "react-hot-toast";

export const makeToast = (message: string) => {
  toast(message, {
    style: {
      padding: "12px",
      color: "#FFFFFF",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      background: "#0EA5E9",
    },
  });
};
