import closed from '../assets/close_ring_duotone-1.svg'
import laptod from '../assets/computing.png'
import mns from '../assets/message.png'
import lift from '../assets/lifting.png'
import books from '../assets/books.png'
import clock from '../assets/clock.png'
import coffe from '../assets/coffee.png'
import { useState } from 'react'
import StatusItem from './StatusItem'

const icons = [laptod, mns, coffe, lift, books, clock]

type Props = {
  close: () => void
}

type OptionsSelected = {
  name: string
  description: string
  icon: string
  status: string
}

export default function ModalTaskDetails({ close }: Props) {
  //Options Selected
  const [os, setOs] = useState<OptionsSelected>({
    name: '',
    description: '',
    icon: '',
    status: ''
  })
  return (
    <div className="h-160 lg:w-120 md:w-120 w-85">

      <div className="flex items-center justify-between">
        <h2 className="font-semibold lg:text-[16px] text-[25px]">Task Details</h2>
        <img src={closed} alt="close" className='border border-[#E3E8EF] rounded-lg p-2' onClick={() => close()} />
      </div>

      <div className='flex gap-5 flex-col'>

        <div className='flex gap-1 flex-col'>
          <p className='text-[#97A3B6]'>Task name</p>
          <input type="text" value={os.name} className='border border-[#E3E8EF] rounded-lg w-full h-10' />
        </div>

        <div className='flex gap-1 flex-col'>
          <p className='text-[#97A3B6]'>Description</p>
          <input type="text" value={os.description} className='border border-[#E3E8EF] rounded-lg w-full h-30' />
        </div>

        <div className='flex gap-1 flex-col'>
          <p className='text-[#97A3B6]'>Icon</p>
          <div className='flex gap-5 flex-wrap'>
            {icons.map((it: string) => {
              return (
                <img
                  src={it}
                  alt={'close'}
                  className='w-12 md:w-14 md:h-14 h-12 object-contain p-2 bg-[#f8fafc] rounded-xl row-start-1 row-end-2'
                />
              )
            })}
          </div>
        </div>

        <div className='flex gap-1 flex-col'>
          <p className='text-[#97A3B6]'>Status</p>
          <div>
            <StatusItem onSelect={() => console.log("hi")} isSelect={false} type='y' />
            <StatusItem onSelect={() => null} isSelect={false} type='g' />
            <StatusItem onSelect={() => null} isSelect={false} type='r' />
          </div>
        </div>
      </div>
    </div>
  )
}
