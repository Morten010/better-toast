import { useContext } from "react";
import { ToastContext } from "../components/Toast";

export default function useToast() {
    const context = useContext(ToastContext)
    
    if(context === undefined || context === null){
        throw new Error("UseToast must be used inside a ToastProvider")
    }

    return context
}
