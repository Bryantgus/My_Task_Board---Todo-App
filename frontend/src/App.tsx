import Tasks from './components/Tasks'
import logo from './assets/Logo.svg'
import edit from './assets/Edit_duotone.svg'
import SignIn from './components/SignIn'
import { useState } from 'react'

// localStorage.setItem('userId', '3424')
const userId = localStorage.getItem('userId')


export default function App() {

  const [show, setShow] = useState<boolean>(false)

  return (
    <div className='flex flex-col mt-5 justify-center items-center'>
      <div className='w-[90%] sm:w-[70%] lg:w-[50%] flex justify-start items-start'>
        <div className='grid grid-cols-[auto_auto_auto] gap-2 w-fit items-center'>
          <img src={logo} alt="logo" />
          <h1 className='text-[40px]'>My Task Board</h1>
          <img src={edit} alt="edit" />
          <p className='col-start-2 col-end-3 text-[20px] lg:text-[16px]'>Tasks to keep organised</p>
        </div>
      </div>

      {userId || show ?
        <Tasks />
        :
        <SignIn show={() => setShow(true)}/>
      }


    </div>
  )
}
