import './App.css'
import { PositionProps, Toast, ToastVariants } from './components/Toast'
import {useState} from "react"
import useToast from './hooks/useToast'

function App() {
  const [position, setPosition] = useState<PositionProps>("bl")
  const [variant, setVariant] = useState<ToastVariants>("danger")
  const [desc, setDesc] = useState("Be carefull")
  const [title, setTitle] = useState("Danger")

  const {changePosition, toast} = useToast()


  return (
    <main className='px-2 py-5'>
      <h1
      className='text-xl font-semibold my-2'
      >
        Better-Toast
      </h1>
      <p>
        The best toast library in town😉
      </p>

      {/* positions */}
      <h2
      className='text-xl font-semibold mt-2'
      >
        Position
      </h2>
      <div
      className='grid grid-cols-2 gap-2 mt-4'
      >
        <button
        className={`border border-black py-1 px-4 ${position === "tl" ? "bg-black text-white" : ""}`}
        onClick={() => {
          changePosition('tl')
          setPosition("tl")
        }}
        >
          Top Left
        </button>
        <button
        className={`border border-black py-1 px-4 ${position === "tr" ? "bg-black text-white" : ""}`}
        onClick={() => {
          changePosition("tr")
          setPosition("tr")
        }}
        >
          Top Right
        </button>
        <button
        className={`border border-black py-1 px-4 ${position === "bl" ? "bg-black text-white" : ""}`}
        onClick={() => {
          changePosition("bl")
          setPosition("bl")
        }}
        >
          Bottom Left
        </button>
        <button
        className={`border border-black py-1 px-4 ${position === "br" ? "bg-black text-white" : ""}`}
        onClick={() => {
          changePosition("br")
          setPosition("br")
        }}
        >
          Bottom Right
        </button>
      </div>

      <div
      className='flex flex-col py-4 gap-2'
      >
        <h2
        className='text-xl font-semibold mt-2'
        >
          Variants
        </h2>
        <label
        className='font-semibold'
        >
          title
        </label>
        <input 
        type="text" 
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        placeholder='title'
        className='border p-2'
        />
        <label
        className='font-semibold'
        >
          Description
        </label>
        <input 
        className='border p-2'
        type="text" 
        value={desc}
        onChange={(e) => setDesc(e.currentTarget.value)}
        placeholder='description'
        />
        <button
        className='bg-blue-600 p-2 font-semibold text-white'
        onClick={() => setVariant("default")}
        >
          Defualt
        </button>
        <button
        className='bg-red-600 p-2 font-semibold text-white'
        onClick={() => setVariant("danger")}
        >
          Danger
        </button>
        <button
        className='bg-green-600 p-2 font-semibold text-white'
        onClick={() => setVariant("success")}
        >
          Success
        </button>
      </div>

     <div
     className='p-2'
     >
      <Toast 
        toast={{
          id: 1,
          title: title,
          description: desc,
          variant: variant
        }}
      />
     </div>

      {/* add notification */}
      <button
      className='bg-blue-600 capitalize font-semibold text-white py-1 px-4 ml-2'
      onClick={() => toast({
        id: Date.now(),
        title: title,
        description: desc,
        variant: variant
      })}
      >
        add toast
      </button>
    </main>
  )
}

export default App
