
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Pagination ,Autoplay} from "swiper";
import img from '../assets/img8.png'
import img1 from '../assets/img6.png'
import img2 from '../assets/img7.png'
import img3 from '../assets/img5.png'

function Slider() {
  return (
    <>
    <div className="z-[-1]">
    <div className=" mb-12">
    <div className="mb-8">
        <div><p className="text-purple-600 font-bold text-xl flex justify-center item-center    ">Event</p></div>
       <div><p className="text-4xl font-bold  text-gray-700 flex justify-center item-center ">POPULAR EVENT</p></div> 
        </div>
    </div>
    <div className="mb-8">
     <Swiper

        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination,Autoplay]}
        className="mySwiper ,z-[-1]"
      >
        <SwiperSlide><img src={img} alt="" className='z-[-1]'></img></SwiperSlide>
       
      </Swiper>
      </div>
      <div className="mt-12"></div>
      </div>
    </>
  )
}

export default Slider