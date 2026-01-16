import logo from './assets/Logo.svg'
import edit from './assets/Edit_duotone.svg'
import ItemTask, { type TaskType } from './components/ItemTask'
import { tasks } from './mockData/tasksData'

export default function App() {
  return (
    <div className=' cursor-pointer w-full flex flex-col mt-5 justify-center items-center '>

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
      </div>
    </div>
  )
}
