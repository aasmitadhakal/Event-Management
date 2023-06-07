import { data } from "./Data";
import { useEffect,useState } from "react";
import { BsFillCalendarDateFill } from 'react-icons/bs';
import {CiLocationOn} from 'react-icons/ci'
import { useInView } from "react-intersection-observer";
import {motion,useAnimation} from 'framer-motion';
import {AiOutlineShareAlt} from 'react-icons/ai'
function Card() {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const controls = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <div className="bg-gray-50 ">
      <div className="mb-8">
        <div><p className="text-purple-600 font-bold text-xl flex justify-center item-center    ">Event</p></div>
       <div><p className="text-4xl font-bold  text-gray-700 flex justify-center item-center ">POPULAR EVENT</p></div> 
        </div>
    <div 
    className="container mx-auto  px-8">
        <motion.div
         ref={ref}
         initial={{ opacity: 0, y: 100 }}
         animate={controls}
         transition={{ duration: 0.8 }}  
         className="mx-12 grid lg:grid-cols-3 gap-10">
       {data.map((card,index) =>(
   
   <div  key={index} className={`shadow-lg rounded-lg bg-white `}  >
    <img
     className={`rounded-t-lg h-52 ml-4 w-94${
      index === focusedIndex ? "transform scale-110" : ""
    }`}
      onMouseEnter={() => setFocusedIndex(index)}
      onMouseLeave={() => setFocusedIndex(-1)}
      onFocus={() => setFocusedIndex(index)}
      onBlur={() => setFocusedIndex(-1)}
      tabIndex={0} src={card.img} alt=""/>
    <div className="p-5">
      {/* for data and location */}
    <div className="flex justify-between">
      <div className="flex gap-2 text-sm "><BsFillCalendarDateFill className="text-purple-400 mt-1  " />{card.date}</div>
      <div className="flex gap-2 text-xs "><CiLocationOn className="text-purple-600 mt-1  " />{card.location}</div>
    </div>
    <h3 className="font-thin font-serif  text-slate-700 mb-3">{card.title}</h3>
    <p className="text-lg font-normal text-gray-600 ">{card.text}</p>
   
    <div className="flex justify-between">
      <div className="text-purple-600 underline font-semibold ">{card.book}</div>
      <div  className="text-purple-600 font-semibold text-xl"><AiOutlineShareAlt /></div>
    </div>
    </div>
   </div>
    
    ))}
    </motion.div>
    </div>
    </div>
  )
}

export default Card