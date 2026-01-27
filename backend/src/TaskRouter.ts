import { Router } from 'express'
import { TaskController } from './TaskController'
import { param } from 'express-validator'
import { NotEmpty } from 'sequelize-typescript'
import { handleInputsErrors } from './middleware/handleInputsErrors'

const router = Router()

router.get('/newUser', TaskController.newUserTask)
router.get('/:id',
  // param('id')
  //   .notEmpty()
  //   .isLength({ min: 4, max: 4 })
  //   .withMessage("id no proporcionado"),
  // handleInputsErrors,
  TaskController.getAll
)

router.post('/:userId',
  param('userId')
    .notEmpty()
    .isLength({ min: 4, max: 4 })
    .withMessage("id no proporcionado"),
  handleInputsErrors,
  TaskController.create
)

router.patch('/:userId/:taskId',
  param('userId')
    .notEmpty()
    .isLength({ min: 4, max: 4 })
    .withMessage("userId no proporcionado"),
  param('taskId')
    .notEmpty()
    .withMessage("taskId no proporcionado"),
  handleInputsErrors,

  TaskController.updateTask
)

router.delete('/:userId/:taskId',
  param('userId')
    .notEmpty()
    .isLength({ min: 4, max: 4 })
    .withMessage("userId no proporcionado"),
  param('taskId')
    .notEmpty()
    .withMessage("taskId no proporcionado"),
  handleInputsErrors,
  TaskController.delete
)

export default router