import React from 'react'
import bg from "../assets/setbackup.png";
import group1 from "../assets/group1.png";
import group2 from "../assets/group2.png";
import group3 from "../assets/group3.png";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const SetUpBackup = () => {

  const router = useRouter()
  return (
    <div  style={{ backgroundImage: `url(${bg.src})` }} className='grays text-white flex flex-col items-center justify-center py-[40px] md:py-[60px]'>

        <div className='md:leading-none'> 
        <h2 className='text-mHeadingMedium md:text-dFontSize text-center'>Set Up Your</h2>
        <h2 className='text-mHeadingLarge md:text-dFontSize font-bold'>Backup in 1-2-3!</h2>
        </div>
        <div className='mt-10'>
          <div className='flex flex-col md:flex-row md:gap-x-[150px] max-md:gap-y-[30px]'>
          <div>          <Image src={group1} alt="back1"   className=' w-[74px] md:w-[180px]' />
          </div>

          <div>     
          <Image src={group2} alt="back2"  className=' w-[74px] md:w-[180px]'/>
          </div>
          <div>
          <Image src={group3} alt="back3"  className=' w-[74px] md:w-[180px]'/>
          </div>
        </div>
        </div>
        <button className="max-md:text-msButton mt-[40px] md:mt-[80px] max-md:py-[4px] max-md:px-[15px] bg-dfyellow text-[#fff]  rounded-[25px] font-bold md:w-[160px] md:h-[43px] " onClick={()=>router.push('/plans')}>Select your plan</button>
    </div>
  )
}

export default SetUpBackup