import React from 'react'
import { download } from '../assets'
import { downloadPhoto } from '../utils'

const Card = ({_id, name, prompt, photo}) => {

  const token = localStorage.getItem("token")
  const userString = localStorage.getItem("user")
  const user = JSON.parse(userString)

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://${window.location.hostname}:8080/api/v1`,
        {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`},
          body: JSON.stringify({postId: _id}),
        }
      )
      if(response.ok){
        location.reload()
      }

      console.log("res",response)
    } catch (error) {
      console.log("delete error ",error)
    }
  }
  return (
    
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img className="w-full h-auto object-cover rounded-xl" src={photo} alt={prompt} />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
      <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>
      <div className="mt-5 flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {name[0]}
          </div>
          <p className="text-white text-sm">{name}</p>

        </div>
        {/* {console.log(user.name)} */}
        {(user?.name === name) && (
        <button onClick={handleDelete} className='w-1/12 flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-500 bg-white hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          Delete
        </button>)}
        <button type="button" onClick={()=>downloadPhoto(_id,photo)} className="outline-none bg-transparent border-none">
          <img src={download} alt="download" className='w-6 h-6 object-contain invert'/>
        </button>
      </div>

      </div>
    </div>
  )
}

export default Card