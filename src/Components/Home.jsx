// import Slider from './Slider';
import {Navbar,Header} from '.'
import UpcomingEvent from '../Event/UpcomingEvent';
import { motion } from 'framer-motion';
import Card2 from './Card2'
function Home (){
    return(
        <>
         <motion.div
    initial={{opacity :0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{duration:0.5}}
    >
        <Navbar />
        <Header />
        {/* <Card2/> */}
        {/* <Slider /> */}
        <UpcomingEvent/>
        </motion.div>
        
        </>
    )
}
export default Home;