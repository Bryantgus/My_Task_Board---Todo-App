import type { Task } from "../App";

export const tasks: Task[] = [
  {
    id: 1,
    icon: 0,
    title: 'Design Task Board',
    description: 'Create the main layout with Tailwind CSS and React components.',
    status: 'y'
  },
  {
    id: 2,
    icon: 1,
    title: 'Team Meeting',
    description: 'Discuss the progress of the API integration with the backend team.',
    status: 'g'
  },
  {
    id: 3,
    icon: 2,
    title: 'Gym Session',
    description: 'Upper body workout focusing on shoulders and back.',
    status: 'r'
  },
  {
    id: 4,
    icon: 3,
    title: 'Read Documentation',
    description: 'Review the Sequelize documentation for advanced associations.',
    status: 'default'
  },
];