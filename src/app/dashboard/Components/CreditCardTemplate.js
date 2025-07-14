import React from 'react'
import bg from "../../assets/creditcard.jpg";
const CreditCardTemplate = ({type,lastDigit}) => {
  return (
    <div     style={{ backgroundImage: `url(${bg.src})` }} className=' bg-contain bg-no-repeat h-[100px] min-w-[117px] relative'>
    
    <h2 className="text-white absolute text-[11px]  font-bold bottom-[30px] right-[20px] ">{type} </h2>

      <h2 className='text-white text-[7px] absolute bottom-[45px] left-[25px]'>**** **** {lastDigit}</h2>
    </div>
  )
}

export default CreditCardTemplate