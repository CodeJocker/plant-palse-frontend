import Image from "next/image";
import Link from "next/link";
const Home = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/bg1.jpg" 
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      
      <div className="relative z-10 bg-white/10 backdrop-blur-xl rounded-3xl p-12 max-w-6xl w-[90%] flex flex-col md:flex-row items-center justify-between">
    
        <div className="text-white max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold leading-snug">
            🌿 Worried about your plants' health? <br />
          </h1>
          <p className="mt-4 text-gray-200">
            We help you detect plant diseases early using smart image analysis.
            Snap a photo, get instant insights, and keep your greenery thriving.
            Explore our tools and protect your plants with confidence!
          </p>
          

<button className="mt-6 px-6 py-3 rounded-full bg-white text-gray-800 font-semibold hover:bg-gray-200 transition">
  <Link href="/signup">
    Get Started
  </Link>
</button>

        </div>

        
        <div className="relative w-90 h-90 mt-12 md:mt-0 md:ml-12">
          <Image
            src="/images/download.png" 
            alt="Plant Detection"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
