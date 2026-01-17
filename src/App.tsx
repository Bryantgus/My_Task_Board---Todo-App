import logo from './assets/Logo.svg'
import edit from './assets/Edit_duotone.svg'
import ItemTask, { type TaskType } from './components/ItemTask'
import { tasks } from './mockData/tasksData'
import add from './assets/Add_round_duotone.svg'
import { useState } from 'react'
import Modal from './components/Modal'
import TaskDetails from './components/TaskDetails'

export default function App() {

  const [toggleModal, setToggleModal] = useState<boolean>(true)

  return (
    <div className='flex flex-col mt-5 justify-center items-center'>

      {toggleModal && (
        <Modal onClose={() => setToggleModal(false)}>
          <TaskDetails close={() => setToggleModal(false)} />
        </Modal>
      )}


      <div className='w-[90%] sm:w-[70%] lg:w-[50%] flex justify-start items-start'>
        <div className='grid grid-cols-[auto_auto_auto] gap-2 w-fit items-center'>
          <img src={logo} alt="logo" />
          <h1 className='text-[40px]'>My Task Board</h1>
          <img src={edit} alt="edit" />
          <p className='col-start-2 col-end-3 text-[20px] lg:text-[16px]'>Tasks to keep organised</p>
        </div>
      </div>

      <div className='mb-10 w-[90%] sm:w-[70%] lg:w-[50%] flex flex-col mt-5 gap-5'>
        {tasks.map((it: TaskType) => (
          <ItemTask
            key={it.id}
            id={it.id}
            icon={it.icon}
            title={it.title}
            description={it.description}
            status={it.status}
          />
        ))}
        <div className='w-full h-22 flex flex-row cursor-pointer bg-[#f5e8d5] p-5 items-center gap-3 rounded-2xl '
          onClick={() => setToggleModal(true)}>
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
