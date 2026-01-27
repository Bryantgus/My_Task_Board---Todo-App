import { useState } from "react"
import api from "../config/api"

type Props = {
  show: () => void
}
export default function SignIn({ show }: Props) {

  const [userId, setUserId] = useState<string>('')
  const [handleErrorField, setHandleErrorField] = useState({
    show: false,
    message: '',
    cargando: false
  })


  const setUserIdOnLS = async () => {
    setHandleErrorField((prev) => ({ ...prev, show: false }))
    if (userId.length !== 4) {
      setHandleErrorField({ show: true, message: 'El codigo es de 4 digitos', cargando: false })
      return
    }

    try {
      console.log("Validando código...");

      setHandleErrorField((prev) => ({ ...prev, cargando: true }))
      const response = await api.get(`/${userId}`);
      const message = response.data.message
      if (!message) {
        console.log("Acceso concedido");
        localStorage.setItem('userId', userId)
        show()
      }
      setHandleErrorField({ show: true, message: 'No existe usuario con ese codigo', cargando: false })
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  }

  const createNewUser = async () => {
    setHandleErrorField((prev) => ({ ...prev, cargando: true }))

    try {
      const resUser = await api.get('/newUser');
      const newId = resUser.data.idGenerated;

      if (newId) {
        const firstTask = {
          title: "Mi Primera Task",
          description: "Presioname para editarme",
          icon: 1,
          status: "default"
        };

        const resTask = await api.post(`/${newId}`, firstTask);

        if (resTask.status === 200 || resTask.status === 201) {
          console.log('Usuario y tarea creados');
          localStorage.setItem('userId', newId.toString());

          show();
        }
      }
    } catch (error) {
      console.error("Error en el flujo de creación:", error);
      setHandleErrorField({ show: true, message: "Error del servidor, intente mas tarde", cargando: false })
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d*$/.test(value) && value.length <= 4) {
      setUserId(value);
    }
  };

  return (
    <div className='w-[90%] d:w-full  items-center flex flex-col gap-3 mt-4 ml-3'>
      <h2 className='text-2xl text-center'>Bienvenido a <p className="font-bold">My Task Board</p></h2>
      <p className='text-xl text-center'>Si tienes un codigo de usuario, ingresalo aqui debajo para acceder a tus Task</p>
      <div className='flex items-center justify-center gap-2'>
        <input value={userId} onChange={(e) => handleInputChange(e)} type="tel" className='w-[50%] text-xl font-bold d:w-[20%] text-center bg-gray-200 rounded-xl h-10 border border-gray-500' />
        <button onClick={setUserIdOnLS} className="cursor-pointer  bg-green-400 font-semibold rounded-xl p-2 border border-black">Acceder a mis Tasks</button>
      </div>
      {handleErrorField.show && <p className="text-red-500">{handleErrorField.message}</p>}
      {handleErrorField.cargando &&
        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>}
      <p className="text-gray-600">No tienes un codigo?</p>
      <button className="cursor-pointer bg-blue-200 font-semibold rounded-xl p-2 border border-black" onClick={createNewUser}>Crear Nuevo Codigo</button>
    </div>
  )
}
