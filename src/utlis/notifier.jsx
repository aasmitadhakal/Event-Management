
import { toast } from 'react-toastify';

const notify=(type,message)=>{
    const notifyopts={
      position: "top-center",
      autoClose: 2000,
      pauseOnHover: false,
      closeOnClick: true,    
    }
  
    switch(type){
      case 'success':
        toast.success(message,notifyopts)
        break;
      case 'error':
        toast.error(message,notifyopts)
        break;
      case 'info':
        toast.info(message,notifyopts)
        break;
    }

  }

export default notify;