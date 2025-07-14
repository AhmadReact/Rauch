"use client"
import React from 'react'
import networkpic from '../assets/Group 315.png';
import mnetworkpic from '../assets/map.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const NetworkMap = ({technicalSpecRef}) => {

  const router = useRouter()

  const handleDownload = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = `/Netlink_new_-2.pdf`; // Replace 'your-pdf-file.pdf' with the actual path to your PDF file
    downloadLink.download = "Netlink_new_-2.pdf";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleView = () => {
    window.open('/Netlink_DataSheet.pdf', '_blank'); // Open the PDF file in a new tab
  };
  return (
    <div className='bg-[#F0F0F0]  py-[20px] md:py-[60px] px-4 md:px-[calc(10vw)]' ref={technicalSpecRef}>
    <Image src={mnetworkpic} className='md:hidden'  alt="networkmobile" />
    <Image src={networkpic} className='max-md:hidden md:block' alt="network" />
    <div className='text-center'>
    <button className="max-md:text-msButton py-[3px] px-[8px] md:p-2 md:px-5 border-2 rounded-[30px] mt-[22px] md:mt-[80px]  font-bold  bg-[#333333] text-dfyellow" onClick={handleView}>Technical Specs</button>
    </div>
    </div>
  )
}

export default NetworkMap