import React from 'react'
import { useAuth } from '../contexs/auth'
function List() {
  const { setAuth } = useAuth();
  return (
    <div>
      sessionStorage.getItem('token')
    </div>
  )

}

export default List