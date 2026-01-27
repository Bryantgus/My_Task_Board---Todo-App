
import ItemTask from './/ItemTask'
import add from '../assets/Add_round_duotone.svg'
import { useEffect, useState } from 'react'
import Modal from './Modal'
import TaskDetails from './TaskDetails'
import api from '../config/api'


export type Task = {
  id: number
  icon: number
  title: string
  description?: string
  status?: 'y' | 'g' | 'r' | 'default'
}

export default function Tasks() {

  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tasks, setTasks] = useState<Task[] | null>()
  const openTask = (id: number) => {
    const task = tasks?.find(it => it.id === id)
    if (!task) return
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    const getAllTasks = async () => {
      const response = await api.get(`${userId}`)
      if (response.data) {
        setTasks(response.data.tasks)
      }

    }

    getAllTasks()
  }, [])


  return (
    <div className='w-full flex items-center justify-center'>

      {isModalOpen && (
        <Modal onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null)
        }}>
          <TaskDetails data={selectedTask}
            close={() => {
              setSelectedTask(null)
              setIsModalOpen(false)
            }} />
        </Modal>
      )}

      <div className='mb-10 w-[90%] sm:w-[70%] lg:w-[50%] flex flex-col mt-5 gap-5'>
        {tasks?.map((it: Task) => (
          <ItemTask
            open={openTask}
            key={it.id}
            id={it.id}
            icon={it.icon}
            title={it.title}
            description={it.description ? it.description : ''}
            status={it.status}
          />
        ))}
        <div className='w-full h-22 flex flex-row cursor-pointer bg-[#f5e8d5] p-5 items-center gap-3 rounded-2xl '
          onClick={() => setIsModalOpen(true)}>
          <img
            src={add}
            alt={'add'}
            className='w-12 h-12 object-contain p-2 bg-[#e9a23b] rounded-xl'
          />
          <p className='text-[20px]'>Add new task</p>
        </div>
      </div>
    </div>
  )
}
