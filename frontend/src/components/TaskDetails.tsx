import { useState } from 'react'
import closed from '../assets/close_ring_duotone-1.svg'
import laptod from '../assets/computing.png'
import mns from '../assets/message.png'
import lift from '../assets/lifting.png'
import books from '../assets/books.png'
import clock from '../assets/clock.png'
import coffe from '../assets/coffee.png'
import StatusItem from './StatusItem'
import trash from '../assets/Trash.svg'
import done1 from '../assets/Done_round.svg'
import type { Task } from './Tasks'
import api from '../config/api'

type Props = {
  data: Task | null
  close: () => void
  onSave?: (task: Task) => void
}

const icons = [laptod, mns, coffe, lift, books, clock]

export default function ModalTaskDetails({ close, data }: Props) {
  const [task, setTask] = useState<Task>(data ? data : {
    id: -1,
    title: '',
    description: '',
    status: 'default',
    icon: -1
  })

  const [errors, setErrors] = useState({
    title: false,
    icon: false
  })

  const changeTask = (taskField: keyof Task, value: string | number) => {
    setTask((prev) => ({
      ...prev,
      [taskField]: value
    }))


    if (errors.title || errors.icon) {
      setErrors({
        title: taskField === 'title' ? false : errors.title,
        icon: taskField === 'icon' ? false : errors.icon,
      })
    }
  }

  const handleSave = async () => {
    const titleInvalid = task.title.trim() === ''
    const iconInvalid = task.icon === -1

    const { id, ...taskSinId } = task
    

    if (titleInvalid || iconInvalid) {
      setErrors({ title: titleInvalid, icon: iconInvalid })
      return
    }

    try {
      const userId = localStorage.getItem('userId')
      if (task.id === -1) {
        await api.post(`${userId}`, taskSinId)
      } else {

        await api.patch(`${userId}/${id}`, taskSinId)
      }
      close()
    } catch (error) {
      console.error("Error al guardar:", error)
    }
  }

  const handleDelete = async () => {
    if (task.id === -1) {
      close()
      return
    }

    try {
      const userId = localStorage.getItem('userId')
      await api.delete(`${userId}/${task.id}`)
      close()
    } catch (error) {
      console.error("Error al eliminar:", error)
    }
  }

  return (
    <div className="lg:w-120 md:w-120 w-85">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold lg:text-[16px] text-[25px]">Task Details</h2>
        <img
          src={closed}
          alt="close"
          className='border border-[#E3E8EF] rounded-lg p-2 cursor-pointer'
          onClick={close}
        />
      </div>

      <div className='flex gap-5 flex-col mt-4'>
        <div className='flex gap-1 flex-col'>
          <p className='text-[#97A3B6]'>Task name</p>
          <input
            type="text"
            value={task.title}
            onChange={(e) => changeTask('title', e.target.value)}
            className={`border ${errors.title ? 'border-red-500' : 'border-[#E3E8EF]'} pl-2 rounded-lg w-full h-10`}
            placeholder='Enter a Task Name'
          />
          {errors.title && <p className='text-red-600 text-[13px] font-bold'>El título es obligatorio</p>}
        </div>

        <div className='flex gap-1 flex-col'>
          <p className='text-[#97A3B6]'>Description</p>
          <textarea
            value={task.description}
            onChange={(e) => changeTask('description', e.target.value)}
            placeholder='Enter a short description'
            className='border p-2 border-[#E3E8EF] rounded-lg w-full h-30 flex pl-2'
          />
        </div>

        <div className='flex gap-1 flex-col'>
          <p className='text-[#97A3B6]'>Icon</p>
          <div className='flex gap-5 flex-wrap'>
            {icons.map((it, index) => (
              <img
                key={index}
                src={it}
                alt={`icon-${index}`}
                className='cursor-pointer w-12 md:w-14 h-12 md:h-14 lg:w-10 lg:h-10 object-contain p-2 rounded-xl'
                style={{ backgroundColor: task.icon === index ? '#f5d565' : '#e3e8ef' }}
                onClick={() => changeTask('icon', index)}
              />
            ))}
          </div>
          {errors.icon && <p className='text-red-600 text-[13px] font-bold'>Debes seleccionar un icono</p>}
        </div>

        <div className='flex gap-1 flex-col'>
          <p className='text-[#97A3B6]'>Status</p>
          <div className='flex flex-wrap gap-2'>
            <StatusItem onSelect={() => changeTask('status', 'y')} isSelect={task.status === 'y'} type='y' />
            <StatusItem onSelect={() => changeTask('status', 'g')} isSelect={task.status === 'g'} type='g' />
            <StatusItem onSelect={() => changeTask('status', 'r')} isSelect={task.status === 'r'} type='r' />
          </div>
        </div>
      </div>

      <div className='flex justify-end gap-4'>
        <button
          onClick={handleDelete}
          className='cursor-pointer w-25 md:w-30 md:h-10 bg-[#97a3b6] flex gap-2 p-2 rounded-2xl mt-5 justify-center items-center'>
          <p className='text-[#F8FAFC]'>Delete</p>
          <img src={trash} alt="trash" />
        </button>

        <button
          onClick={handleSave}
          className='cursor-pointer w-25 md:w-30 md:h-10 bg-[#3662e3] flex gap-2 p-2 justify-center items-center rounded-2xl mt-5'>
          <p className='text-[#F8FAFC]'>Save</p>
          <img src={done1} alt="done" />
        </button>
      </div>
    </div>
  )
}