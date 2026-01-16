import type { TaskType } from "../components/ItemTask";

export const tasks: TaskType[] = [
  {
    id: 1,
    icon: 'laptod',
    title: 'Design Task Board',
    description: 'Create the main layout with Tailwind CSS and React components.',
    status: 'y'
  },
  {
    id: 2,
    icon: 'mns',
    title: 'Team Meeting',
    description: 'Discuss the progress of the API integration with the backend team.',
    status: 'g'
  },
  {
    id: 3,
    icon: 'lift',
    title: 'Gym Session',
    description: 'Upper body workout focusing on shoulders and back.',
    status: 'r'
  },
  {
    id: 4,
    icon: 'books',
    title: 'Read Documentation',
    description: 'Review the Sequelize documentation for advanced associations.',
    status: 'default'
  },
];