import React from 'react';
import Image, { StaticImageData } from 'next/image';

// Define TypeScript Props
interface ButtonProps {
  image?: StaticImageData; // Optional image prop
  text: string;
  type?: 'submit' | 'button';
  func?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean; //
}

const Button: React.FC<ButtonProps> = ({ text, image, type, func = () => {},disabled }) => {
  return (
    <button
      onClick={func} // Now it correctly receives event
      type={type}
      disabled={disabled} // Optional disabled prop
      className='flex items-center gap-2 font-medium px-2 py-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000] 
      
      hover:shadow-[7px_7px_0px_#000000] transition-shadow duration-500 cursor-pointer'
    >
      {text}
      {image && <Image src={image} alt={text} width={16} height={16} />}
    </button>
  );
};

export default Button;
