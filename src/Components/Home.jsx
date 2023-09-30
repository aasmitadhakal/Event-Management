// import Slider from './Slider';
import {Navbar,Header} from '.'
import Card2 from './Card2';
import { motion } from 'framer-motion';
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
        {/* <Slider /> */}
        <Card2 />
        </motion.div>
        
        </>
    )
}
export default Home;