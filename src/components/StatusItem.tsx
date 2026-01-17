import time from '../assets/Time_atack_duotone.svg'
import done from '../assets/Done_round.svg'
import dont from '../assets/close_ring_duotone.svg'
import done1 from '../assets/Done_round.svg'
type Props = {
  onSelect: (type: string) => void
  isSelect: boolean
  type: 'y' | 'g' | 'r'
}

export default function StatusItem({ onSelect, isSelect, type }: Props) {
  const img = type === 'y' ? time :
    type === 'g' ? done :
      dont
  const label = type === 'y' ? 'In Progress' :
    type === 'g' ? 'Completed' :
      `Wo'nt do`
  const color = type === 'y' ? '#e9a23b' :
    type === 'g' ? '#32d657' :
      `#dd524c`
  return (

    <div
      className="bg-[#f8fafc] flex items-center gap-1 border-[1.5px] rounded-2xl pr-3 p-1 w-41 md:w-59 cursor-pointer"
      onClick={() => onSelect(type)}
      style={{ borderColor: isSelect ? '#3662e3' : '#97A3B6' }}>
      <img
        src={img}
        alt={'close'}
        className='w-8 h-8 md:w-12 md:h-12 lg:w-10 lg:h-10 object-contain p-2 rounded-xl row-start-1 row-end-2'
        style={{backgroundColor: color}}
      />
      <p className='text-[14px] md:text-[16px]'>{label}</p>
      {isSelect && 
      <img src={done1} className='bg-[#3662e3] rounded-full ml-auto' alt='done'/>}
    </div>
  )
}
