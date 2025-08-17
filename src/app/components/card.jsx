import Link from "next/link";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaTemperatureEmpty } from 'react-icons/fa6';

const Card = ({ image, title, description, link, buttonType }) => {
  const getButtonContent = () => {
    switch (buttonType) {
      case "detect":
        return <FaCamera className="text-white" />;

      case "order":
        return <FaShoppingCart />;
      case "weather":
        return <FaTemperatureEmpty />;
      default:
        return <FaCamera />;
    }
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300 border border-green-700">
      {image && (
        <div className="relative w-full h-32 sm:h-40 md:h-48">
          <Image src={image} alt={title} layout="fill" objectFit="cover" />
        </div>
      )}
      <div className="p-4 sm:p-6 flex flex-col flex-1 justify-between bg-slate-200">
        <h2 className="text-green-800 text-base sm:text-lg md:text-xl font-bold mb-2">
          {title}
        </h2>
        {description && (
          <p className="mb-4 text-xs sm:text-sm md:text-base text-black flex-1">
            {description}
          </p>
        )}
        <div className="bg-green-800 w-full h-10 rounded-md flex justify-center items-center space-x-2 pointer-cursor">
          <button className="text-white font-medium pointer-cursor">Try it</button>
          <Link href={link} className="text-white text-lg">
            {getButtonContent()}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
