import closed from '../assets/close_ring_duotone-1.svg'
import laptod from '../assets/computing.png'
import mns from '../assets/message.png'
import lift from '../assets/lifting.png'
import books from '../assets/books.png'
import clock from '../assets/clock.png'
import coffe from '../assets/coffee.png'
import { useState } from 'react'
import StatusItem from './StatusItem'
import trash from '../assets/Trash.svg'
import done1 from '../assets/Done_round.svg'

const icons = [laptod, mns, coffe, lift, books, clock]

type Props = {
  close: () => void
}

type OptionsSelected = {
  name: string
  description: string
  icon: number | undefined
  status: string | undefined
}

export default function ModalTaskDetails({ close }: Props) {
  //Options Selected
  const [os, setOs] = useState<OptionsSelected>({
    name: '',
    description: '',
    icon: undefined,
    status: undefined
  })

  const setStatus = (type: string) => {
    console.log(type);

    setOs((prev) => ({ ...prev, status: type }))
  }

  return (
    <div className="lg:w-120 md:w-120 w-85">

      <div className="flex items-center justify-between">
        <h2 className="font-semibold lg:text-[16px] text-[25px]">Task Details</h2>
        <img src={closed} alt="close" className='border border-[#E3E8EF] rounded-lg p-2' onClick={() => close()} />
      </div>

      <div className='flex gap-5 flex-col'>

        <div className='flex gap-1 flex-col'>
          <p className='text-[#97A3B6]'>Task name</p>
          <input
            type="text" value={os.name}
            className='border border-[#E3E8EF] pl-2 rounded-lg w-full h-10'
            placeholder='Enter a Task Name'
            onChange={(e) => setOs((prev) => ({ ...prev, name: e.target.value }))} />
        </div>

        <div className='flex gap-1 flex-col'>
          <p className='text-[#97A3B6]'>Description</p>
          <textarea
            value={os.description}
            placeholder='Enter a short description'
            className='border p-2 border-[#E3E8EF] rounded-lg w-full h-30 flex pl-2'
            onChange={(e) => setOs((prev) => ({ ...prev, description: e.target.value }))} />
        </div>

        <div className='flex gap-1 flex-col'>
          <p className='text-[#97A3B6]'>Icon</p>
          <div className='flex gap-5 flex-wrap'>
            {icons.map((it: string, index: number) => {

              return (
                <img
                  key={index}
                  src={it}
                  alt={it}
                  className='cursor-pointer w-12 md:w-14 md:h-14 h-12 lg:w-10 lg:h-10 object-contain p-2 rounded-xl row-start-1 row-end-2'
                  style={{ backgroundColor: os.icon === index ? '#f5d565' : '#e3e8ef' }}
                  onClick={() => setOs((prev) => ({ ...prev, icon: index }))}
                />
              )
            })}
          </div>
        </div>

        <div className='flex gap-1 flex-col'>
          <p className='text-[#97A3B6]'>Status</p>
          <div className='flex flex-wrap gap-2'>
            <StatusItem onSelect={setStatus} isSelect={os.status === 'y'} type='y' />
            <StatusItem onSelect={setStatus} isSelect={os.status === 'g'} type='g' />
            <StatusItem onSelect={setStatus} isSelect={os.status === 'r'} type='r' />
          </div>
        </div>
      </div>

      <div className=' flex justify-end gap-4'>
        <div className='cursor-pointer w-25 md:w-30 md:h-10 bg-[#97a3b6] flex gap-2  p-2  rounded-2xl mt-5 justify-center'>
          <p className='text-[#F8FAFC]'>Delete</p>
          <img
            src={trash}
            alt="trash"
          />
        </div>

        <div className='cursor-pointer w-25 md:w-30 md:h-10 bg-[#3662e3] flex gap-2 p-2 justify-center rounded-2xl mt-5'>
          <p className='text-[#F8FAFC]'>Save</p>
          <img
            src={done1}
            alt="done"
          />
        </div>
      </div>
    </div>
  )
}
