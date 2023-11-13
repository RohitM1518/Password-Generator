import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
const [length, setLength] = useState(8);
const [numberAllowed, setNumberAllowed] = useState(false);
const[charAllowed, setCharAllowed] = useState(false);
const[password, setPassword] = useState('');

const passwordRef = useRef(null);
const passwordGenerator = useCallback(()=>{
  let pass="";
  let string="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(numberAllowed){
    string+="0123456789";
  }
  if(charAllowed){
    string+="!@#$%^&*()_+";
  }
for (let i = 1; i <= length; i++) {
  let char=Math.floor(Math.random()*string.length+1);
  pass=pass+string.charAt(char);
}
setPassword(pass);
},[length, numberAllowed, charAllowed, setPassword]);

const copyPasswordToClipBoard = useCallback(()=>{
  console.log(passwordRef);
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0, 99999);
  window.navigator.clipboard.writeText(password);
}, [password]);

useEffect(() => {
  passwordGenerator();
},[length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <>
    <div className='w-full max-w-lg h-72 mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 '>
      <h2 className='text-white opacity-50 text-center font-bold mt-4 text-[24px]'>Password Generator</h2>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        value={password}
        className='outline-none w-96 h-1 py-7 px-3 m-3 mr-0 rounded-sm'
        readOnly
        placeholder='Password'
        ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipBoard} 
        className='text-white bg-blue-900 rounded-r-full w-28 h-14 mt-[12px]'>Copy</button>
      </div>
      <div className='flex gap-x-2 text-sm'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={8}
          max={50}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>setLength(e.target.value)}
           />
           <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=> setNumberAllowed((pre) => !pre)}
           />
           <label>Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={charAllowed}
          id="numberInput"
          onChange={()=> setCharAllowed((pre) => !pre)}
           />
           <label>Special Character</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
