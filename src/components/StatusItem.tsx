import time from '../assets/Time_atack_duotone.svg'
import done from '../assets/Done_round.svg'
import dont from '../assets/close_ring_duotone.svg'

type Props = {
  onSelect: () => void
  isSelect: boolean
  type: 'y' | 'g' | 'r'
}

export default function StatusItem({ onSelect, isSelect, type }: Props) {
  const img = type === 'y' ? time :
    type === 'g' ? done :
      dont

  return (

    <div className=""
    onClick={onSelect}>
      <img
        src={img}
        alt={'close'}
        className='w-12 md:w-14 md:h-14 h-12 object-contain p-2 bg-[#f8fafc] rounded-xl row-start-1 row-end-2'
      />
    </div>
  )
}
