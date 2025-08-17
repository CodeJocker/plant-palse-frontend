import Image from "next/image";
import FeaturesButton from "../components/FeaturesButton";
import bg from "../assets/images/bg8.jpg";

const Index = () => {
  return (
    <div className="w-full min-h-screen px-4 md:px-12 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between h-full w-full max-w-6xl mx-auto gap-14">
        {/* Left Side */}
        <div className="flex-1 flex flex-col gap-y-8">
          <header>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs font-semibold shadow-sm">
                Empowering Sustainability
              </span>
            </div>
            <h1 className="font-extrabold text-5xl md:text-6xl leading-tight mb-2 tracking-tight">
              <span className="text-green-600 drop-shadow-lg">Plant</span>
<<<<<<< HEAD
              <span className="text-gray-500">Pulse</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-mono text-black mb-4">
              Welcome to the <span className="text-green-800">PlantPulse</span>{" "}
=======
              <span className="text-gray-200">Palse</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-mono text-gray-200 mb-4">
              Welcome to the <span className="text-green-600">PlantPalse</span>{" "}
>>>>>>> ede975ecf689e3ac432eb1e9564e5d0ade3235c1
              Foundation
            </h2>
          </header>
          <p className="text-lg text-black leading-relaxed max-w-xl mb-6">
            We are committed to empowering communities through sustainable
            innovation and green technology. Join us in making a positive impact
            on the environment and future generations.
          </p>
          <FeaturesButton />
        </div>
        {/* Right Side */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-green-200 relative group max-w-[500px] w-full aspect-square">
            <Image
              src={bg.src}
              width={500}
              height={500}
              alt="PlantPulse Foundation"
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-700/40 via-transparent to-transparent pointer-events-none rounded-3xl" />
            <div className="absolute bottom-4 left-4 bg-white/80 text-green-800 px-4 py-1 rounded-full text-xs font-semibold shadow">
              Green Future Starts Here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
