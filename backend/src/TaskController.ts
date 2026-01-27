import { Request, Response } from "express";
import { randomId } from "./utils/randomId";
import User from "./models/User";
import Tasks from "./models/Tasks";
import { where } from "sequelize";
export class TaskController {

  static newUserTask = async (req: Request, res: Response) => {
    let newId: number;
    let userExists: User | null;

    try {
      do {
        newId = randomId();

        userExists = await User.findOne({
          where: { userId: newId }
        });

      } while (userExists !== null);

      const newUser = await User.create({ userId: newId });

      return res.json({
        message: 'Id Creado Correctamente',
        idGenerated: newId
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Hubo un error al crear el usuario' });
    }
  }

  static getAll = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const userWithTasks = await User.findOne({
        where: { userId: id },
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        include: [{
          model: Tasks,
          attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] }
        }]
      });

      if (!userWithTasks) {
        return res.status(404).json({ message: 'El userId proporcionado no existe' });
      }

      return res.status(200).json(userWithTasks);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Hubo un error al obtener los tasks' });
    }
  }

  static create = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      const userExists = await User.findOne({ where: { userId } });

      if (!userExists) {
        return res.status(200).json({ message: 'El userId proporcionado no existe' });
      }

      const newTaskData = {
        ...req.body,
        userId
      };

      await Tasks.create(newTaskData);

      res.status(200).json({ message: 'Task Creada Correctamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Hubo un error al crear el task' });
    }
  }

  static updateTask = async (req: Request, res: Response) => {
    const { userId, taskId } = req.params;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'status', 'icon'];

    if (updates.length === 0) {
      return res.status(400).json({ error: "No se enviaron datos para actualizar" });
    }

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
      return res.status(400).json({ error: "Intento de actualizar campos no permitidos" });
    }

    try {
      const task = await Tasks.findOne({
        where: {
          id: taskId,
          userId: userId
        }
      });

      if (!task) {
        return res.status(404).json({ error: "No existe la tarea o no tienes permiso" });
      }

      await task.update(req.body);

      return res.status(200).json(task);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  }

  static delete = async (req: Request, res: Response) => {
    const { userId, taskId } = req.params;

    try {
      const task = await Tasks.findOne({
        where: {
          id: taskId,
          userId: userId
        }
      });

      if (!task) {
        return res.status(404).json({ error: "No existe la tarea o no tienes permiso" });
      }

      await Tasks.destroy({ where: { id: taskId } });

      return res.status(200).json({ message: "Tarea eliminada correctamente" });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  }

}