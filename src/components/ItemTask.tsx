import laptod from '../assets/computing.png'
import mns from '../assets/message.png'
import lift from '../assets/lifting.png'
import books from '../assets/books.png'
import clock from '../assets/clock.png'
import time from '../assets/Time_atack_duotone.svg'
import done from '../assets/Done_round_duotone.svg'
import close from '../assets/close_ring_duotone.svg'
import type { DataTask } from '../App'

export type TaskType = {
  id: number
  icon: 'laptod' | 'mns' | 'lift' | 'books' | 'clock'
  title: string,
  description: string,
  status?: 'y' | 'g' | 'r' | 'default'
  open: (id: number) => void
  data?: DataTask
}

const colors = {
  y: { bg: '#F5D565', icon: '#E9A23B' },
  g: { bg: '#A0ECB1', icon: '#32D657' },
  r: { bg: '#F7D4D3', icon: '#DD524C' },
  default: { bg: '#E3E8EF', icon: '#97A3B6' }
}

const icons: Record<TaskType['icon'], string> = {
  laptod,
  mns,
  lift,
  books,
  clock
}

export default function ItemTask({ icon, title, description, status = 'default', id, open }: TaskType) {
  const theme = colors[status] || colors.default;
  const iconSelected = icons[icon];
  const statusSelected = {
    'y': time,
    'r': close,
    'g': done
  }
  return (
    <div
      className='cursor-pointer w-full h-auto rounded-2xl grid grid-cols-[auto_1fr_auto] items-center p-5 gap-x-4 gap-y-1'
      style={{ backgroundColor: theme.bg }}
      onClick={() => open(id)}
    >
      <img
        src={iconSelected}
        alt={icon}
        className='w-12 h-12 object-contain p-2 bg-[#f8fafc] rounded-xl row-start-1 row-end-2'
      />

      <h3 className='font-bold text-[20px] leading-tight truncate'>{title}</h3>

      {status !== 'default' && (
        <div
          style={{ backgroundColor: theme.icon }}
          className='w-10 h-10 rounded-xl flex items-center justify-center ml-2'
        >
          <img src={statusSelected[status]} alt="status" className='w-6 h-6 invert brightness-0 opacity-70 row-start-3 row-end-4' />
        </div>
      )}

      <p className='col-start-2 wrap-break-word whitespace-normal lg:text-[16px] sm:text-[20px] text-gray-800/80 min-w-0'>
        {description}
      </p>
    </div>
  )
}