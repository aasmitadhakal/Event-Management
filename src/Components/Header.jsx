import { motion } from "framer-motion"
import img from '../assets/img7.png'
function Header() {
  return (
    <>
    <div className="  z-0  ">
    <div className=' grid md:grid-cols-2 grid-cols-1 '>
      {/* for description part */}
      <motion.div 
        initial={{x:'-100vw'}}
        animate={{x:0}}
       transition={{duration:4.5}}
      className="my-44 m-12 z-[-1]  ">
        <p 
        className="text-4xl font-bold mb-2  ">Unleash the <span className=" text-purple-400 "> power of music</span></p>
        <p className="text-xl text-gray-500">Te abe and emotional power 
          of music and positions the event management company as a facilitator of that experience.</p>
          <div className="">
            <button className=" outline outline-1 outline-indigo-200 bg-gradient-to-r from-blue-300 to-purple-600  px-10 rounded mt-4 py-2 mr-4 text-white">View Details</button>
            <button className=" border-2 border-indigo-300 bg-gradient-to-r from-blue-300 to-purple-600  px-10 rounded mt-4 py-2 text-white"> Book Now</button>
          </div>
      </motion.div>
      {/* for image part */}
    <div>
     <img className="md:h-120"
     src={img} alt=""></img>
   </div>
    </div>
    </div>
    </>
  )
}

export default Header