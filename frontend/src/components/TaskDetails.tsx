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
import { useEffect, useState } from 'react'
import type { Task } from '../App'

type Props = {
  data: Task | null
  close: () => void
  onSave?: (task: Task) => void
}
const icons = [laptod, mns, coffe, lift, books, clock]

export default function ModalTaskDetails({ close, data }: Props) {
  //Options Selected  
  const [task, setTask] = useState(data ? data :
    {
      id: -1,
      title: '',
      description: '',
      status: 'default',
      icon: -1
    })

  const [fieldsEmpty, setFieldsEmpty] = useState({
    title: false,
    icon: false
  })

  useEffect(() => {
    if (task.title !== '') {
      console.log('aqui');

      setFieldsEmpty((prev) => ({
        ...prev,
        title: false
      }))
    }

    if (task.icon !== -1) {
      setFieldsEmpty((prev) => ({
        ...prev,
        icon: false
      }))
    }
  }, [task.title, task.icon])

  const changeTask = (taskField: keyof typeof task, value: any) => {
    setTask((prev) => ({
      ...prev,
      [taskField]: value
    }))
  }

  const saveOrDelete = (action: string) => {
    let returnForEmptyFields = false
    if (action === 'save') {
      if (task.title === '') {
        setFieldsEmpty((prev) => ({
          ...prev,
          title: true
        }))
        returnForEmptyFields = true
      }
      if (task.icon === -1) {

        setFieldsEmpty((prev) => ({
          ...prev,
          icon: true
        }))
        returnForEmptyFields = true
      }

      if (returnForEmptyFields) {
        return
      }

      if (task.id === -1) {
        //crear nueva tarea
      } else {
        //actualizar tarea
      }

    } else if (action === 'delete') {
      if (task.id === -1) {
        close()
      } else {
        //eliminar tarea
      }

    }
  }
  console.log(task);


  return (
    <div className="lg:w-120 md:w-120 w-85">

      <div className="flex items-center justify-between">
        <h2 className="font-semibold lg:text-[16px] text-[25px]">Task Details</h2>
        <img src={closed} alt="close" className='border border-[#E3E8EF] rounded-lg p-2 cursor-pointer' onClick={() => close()} />
      </div>

      <div className='flex gap-5 flex-col'>

        <div className='flex gap-1 flex-col'>
          <p className='text-[#97A3B6]'>Task name</p>
          <input
            type="text"
            value={task?.title}
            onChange={(e) => changeTask('title', e.target.value)}
            className='border border-[#E3E8EF] pl-2 rounded-lg w-full h-10'
            placeholder='Enter a Task Name'
          />
          {fieldsEmpty.title &&
            <p className='text-red-900 text-[13px] font-bold'>Debe agregar un titulo para guardar el Task</p>
          }
        </div>

        <div className='flex gap-1 flex-col'>
          <p className='text-[#97A3B6]'>Description</p>
          <textarea
            value={task?.description}
            onChange={(e) => changeTask('description', e.target.value)}
            placeholder='Enter a short description'
            className='border p-2 border-[#E3E8EF] rounded-lg w-full h-30 flex pl-2'
          />
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
                  style={{ backgroundColor: task?.icon === index ? '#f5d565' : '#e3e8ef' }}
                  onClick={() => changeTask('icon', index)}
                />
              )
            })}
            {fieldsEmpty.icon &&
              <p className='text-red-900 text-[13px] font-bold'>Debe seleccionar un icon para guardar el Task</p>
            }
          </div>
        </div>

        <div className='flex gap-1 flex-col'>
          <p className='text-[#97A3B6]'>Status</p>
          <div className='flex flex-wrap gap-2'>
            <StatusItem onSelect={() => changeTask('status', 'y')} isSelect={task?.status === 'y'} type='y' />
            <StatusItem onSelect={() => changeTask('status', 'g')} isSelect={task?.status === 'g'} type='g' />
            <StatusItem onSelect={() => changeTask('status', 'r')} isSelect={task?.status === 'r'} type='r' />
          </div>
        </div>
      </div>

      <div className=' flex justify-end gap-4'>
        <div onClick={() => saveOrDelete('delete')}
          className='cursor-pointer w-25 md:w-30 md:h-10 bg-[#97a3b6] flex gap-2  p-2  rounded-2xl mt-5 justify-center'>
          <p className='text-[#F8FAFC]'>Delete</p>
          <img
            src={trash}
            alt="trash"
          />
        </div>

        <div onClick={() => saveOrDelete('save')}
          className='cursor-pointer w-25 md:w-30 md:h-10 bg-[#3662e3] flex gap-2 p-2 justify-center rounded-2xl mt-5'>
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
