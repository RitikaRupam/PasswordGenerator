
import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const[password, setPassword]=useState()
  const[length,setLength]=useState('8')
  const[numAllowed, setNumAllowed]=useState(false)
  const[charAllowed, setCharAllowed]=useState(false)

  const passwordRef=useRef(null);

    const generatePassword=useCallback(()=>{
      let pass=" "
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

      if(numAllowed) str+="0123456789"
      if(charAllowed) str+="!@#$%^&*()~`?"

      for(let i=1;i<=length;i++){
        let char=Math.floor(Math.random()*str.length+1);
        pass+=str.charAt(char);
      }
      setPassword(pass)

    },[length,numAllowed,charAllowed,setPassword])

    const copyPassword=useCallback(()=>{
      window.navigator.clipboard.writeText(password);
      passwordRef.current?.select();
    },[password])
    useEffect(()=>{
      generatePassword()
    },[length,numAllowed,charAllowed,generatePassword])

    return (
    <>
      <div className='w-full h-screen bg-black'> 
        <div className='text-l bg-pink-700 w-10flex gap-2 fixed top-8 left-1/2 transform -translate-x-1/2 text-white p-4 rounded shadow-lg w-150 text-center rounded-xl'> Password Generator
        <br /> 
        <input type="text" placeholder='Password' value={password} className='text-black w-100 py-1 px-3 bg-white my-2'/>
        <button className='bg-blue-700 hover:bg-blue-900 text-white outline-none py-1 px-3'
        onClick={copyPassword}
        >Copy</button>
        <div className='gap-x-2 flex items-center justify-center'>
          <div className='flex items-center gap-x-4  my-2 text-center'>
            <input type="range" min={6} max={20} value={length} 
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label >Length:{length}</label>
            <input type="checkbox" 
            onChange={(e)=>{setNumAllowed((prev)=>!prev)}}
            />
            <label>Numbers</label>
            <input type="checkbox" 
            onChange={(e)=>{setCharAllowed((prev)=>!prev)}}
            />
            <label>Characters</label>
          </div>
        </div>
        </div>
        
      </div>

    </>
  )
}

export default App
