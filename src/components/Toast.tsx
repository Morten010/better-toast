import { createContext, useReducer, useState, useId } from "react";
import {CiWarning} from "react-icons/ci"
import {BsCheckLg} from "react-icons/bs"
import {AiOutlineClose, AiOutlineExclamationCircle} from "react-icons/ai"

type ToastContext = {
    toasts: ToastProps[]
    changePosition: (x: PositionProps) => void
    toast: (x: ToastProps) => void 
}

export const ToastContext = createContext<ToastContext | null>({
    toasts: [],
    changePosition(x) {
        
    },
    toast(x) {
        
    },
})

type PositionProps = "tl" | "tr" | "bl" | "br";

type ToastProviderProps = {
    children: React.ReactNode
    position?: PositionProps
}


export type ToastProps = {
    id: number
    title: string
    description: string
    variant: ToastVariants
}

export type ToastVariants = "danger" | "success" | "default"

interface State {
    toasts: ToastProps[]
}

const actionTypes = {
    ADD_TOAST: "ADD_TOAST",
    DELETE_TOAST: "DELETE_TOAST",
} as const

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToastProps
    }

const ToastReducer = (state: State, action: Action) => {
    switch(action.type){
        case "ADD_TOAST":
            return {
                ...state,
                toasts: [...state.toasts, action.toast]
            }
        default:
            return state
    }
} 

type MemoryState = { 
    toasts: ToastProps[] 
}

const ToastProvider = ({ children, position = "tl"}: ToastProviderProps) => {
    const [state, dispatch] = useReducer(ToastReducer, {
        toasts: [{
            id: Date.now(),
            title: "Test toast",
            description: "Working :)",
            variant: "success"
        }]
    })
    const [pos, setPos] = useState<PositionProps | undefined>(undefined)

    const toast = (toast: ToastProps) => {
        dispatch({
                type: "ADD_TOAST",
                toast: toast
        })
    }

    const deleteToast = () => {
        dispatch({
            type: "DELETE_TOAST",
            toast: toast
    })
    }

    const changePosition = (newPos: PositionProps) => {
        setPos(newPos)
    }

    let p = ""
    switch(position) {
        case "tl":
            p = "top-2 left-2"
            break;
        case "tr":
            p = "top-2 right-2"
            break
        case "bl":
            p = "top-[100vh] translate-y-[calc(-100%-0.5rem)] left-2"
            break
        case "br":
            p = "top-[100vh] translate-y-[calc(-100%-0.5rem)] right-2"
            break
        default:
            p = "top-2 right-2"
    }

    let newP = ""
    switch(pos) {
        case "tl":
            newP = "top-2 left-2"
            break;
        case "tr":
            newP = "top-2 right-2"
            break
        case "bl":
            newP = "top-[100vh] translate-y-[calc(-100%-0.5rem)] left-2"
            break
        case "br":
            newP = "top-[100vh] translate-y-[calc(-100%-0.5rem)] right-2"
            break
        default:
            newP = "top-2 right-2"
    }
    

    return(
        <ToastContext.Provider 
        value={{...state, toast, changePosition}}
        
        >
            {children}
            <div
            className={`fixed flex flex-col gap-2 ${pos ? newP : p}`}
            >
                {state.toasts.map((toast, index) => (
                    <Toast 
                    id={toast.id}
                    key={index + toast.title}
                    title={toast.title} 
                    description={toast.description}
                    variant={toast.variant}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    )
}

const Toast = ({title, description, variant} : ToastProps) => {
    let card = ""
    let icon = ""
    let logo;
    
    switch(variant){
        case "danger": 
            card = "border-red-600/30 bg-red-200"
            icon = "bg-red-600"
            logo = <CiWarning className="text-3xl" />
            break
        case "success": 
            card = "border-green-600/30 bg-green-200"
            icon = "bg-green-600"
            logo = <BsCheckLg className="text-3xl" />
            break
        case "default":
            card = "border-blue-600/30 bg-blue-200"
            icon = "bg-blue-600"
            logo = <AiOutlineExclamationCircle className="text-3xl" />

            break
        default: 
            card = "border-blue-600/30 bg-blue-200"
            icon = "bg-blue-600"
            logo = <AiOutlineExclamationCircle className="text-3xl" />
    }
    
    return (
        <div
        className={`flex rounded relative overflow-hidden border  min-w-[250px] max-w-[400px] w-full ${card}`}
        >
            <div
            className={`p-2 aspect-square flex flex-col justify-center text-white ${icon}`}
            >
                {logo}
            </div>
            <div
            className="p-4 text-ellipsis"
            >
                <h3
                className="font-semibold"
                >
                    {title}
                </h3>
                <p>
                    {description}
                </p>
                <AiOutlineClose 
                onClick={() => {}}
                className="absolute right-2 top-2"
                />
            </div>
        </div>
    )
}


export {
    type PositionProps,
    ToastProvider,
    Toast,
}