import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className='bg-gray-300 w-screen h-[4rem] flex items-center justify-center'>

      <ul className="flex gap-4 w-[50%] mx-auto justify-between items-center">
      <Link to={"/"}><li>Home</li></Link>  
      <Link to={"/todo"}><li>Create</li></Link>  
      <Link to={"/edit"}><li>Update</li></Link>  
      </ul>
    </div>
  )
}

export default Header