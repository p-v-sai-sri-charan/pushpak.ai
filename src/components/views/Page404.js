import React from 'react'
import err from '../../assests/images/404.png'  

function Page404() {
  return (
    <div className='w-full flex justify-center items-center' style={{
      height: '100vh',
    }}>
      <img src={err}/>
    </div>
  )
}

export default Page404