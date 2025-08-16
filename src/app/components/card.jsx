import Link from "next/link";
import Image from "next/image";

const Card = ({ image, title, description, link }) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300 max-w-xs mx-auto border border-green-700">
      {image && (
        <div className="relative w-full h-48">
          <Image src={image} alt={title} layout="fill" objectFit="cover" />
        </div>
      )}
      <div className="p-6 flex flex-col justify-between flex-1 bg-slate-200">
        <h2 className="text-green-800 text-xl font-bold mb-2">{title}</h2>
        <p className="mb-4 text-sm md:text-base text-black">{description}</p>
       <div className="bg-green-800 w-full h-10 rounded-md flex justify-center items-center" >
        <button>Start detection</button>
       </div>
      </div>
    </div>
  );
};

export default Card;