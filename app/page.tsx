

import Form from '@/components/Form'
import Image from 'next/image'
import { ToastContainer, } from 'react-toastify';



export default function Home() {


  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-300 px-4">
      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
       />

        <div className="flex flex-col md:flex-row items-center md:items-start bg-white rounded-3xl shadow-md overflow-hidden max-w-6xl w-full">
          
          {/* Colonne image */}
          <div className="w-full md:w-1/2 relative ml-6">
            <Image
              src="/Env.png"
              alt="Image d'enveloppe"
              width={500}
              height={400}
              className="object-cover"
            />
          </div>
          
          {/* Colonne formulaire */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h1 className="text-2xl md:text-4xl font-bold text-black">Abonne-toi</h1>
            <p className="my-4 text-sm">Recevez des courriels en un seul clic afin de rester toujours connecté au monde</p>
            <Form />
          </div>
          
        </div>
      </div>
    </>
  );
}