import React from 'react'
import { Link } from 'react-router-dom';
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";

function Footer() {
  return (
    <div className='flex justify-between px-36 py-2 bg-black w-full'>
      <div>
        <span className='text-white'>Streamify  © copyright</span>
      </div>
      <div className='flex gap-3 text-2xl'>
        <Link to="https://github.com/rathore0123">
          <span className='text-white font-bold'>
            <FaGithub />
          </span>
        </Link>
        <Link to="https://www.linkedin.com/in/anujrathore23">
          <span className='text-white font-bold'>
            <FaLinkedinIn />
          </span>
        </Link>
        <Link to="https://www.instagram.com/ra_thor_23">
          <span className='text-white font-bold'>
            <FaInstagram />
          </span>
        </Link>
        <Link to="https://x.com/anujrathore009">
          <span className='text-[#ffffff] font-bold'>
            <RiTwitterXLine />
          </span>
        </Link>
      </div>
    </div>
  )
}

export default Footer