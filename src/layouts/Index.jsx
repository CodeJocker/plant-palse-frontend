import Image from "next/image";
import FeaturesButton from "../components/FeaturesButton";
import bg from "../assets/images/bg8.jpg";

const Index = () => {
  return (
    <div className="w-full min-h-screen px-10 py-5">
      <div className="flex flex-col h-full w-full">
        <div className="head">
          <h1 className="font-bold text-4xl">
            <span className="text-green-600">Smart</span>Green
          </h1>
        </div>
        <div className="other w-full flex flex-col gap-y-5 gap-x-5 items-center justify-center h-full py-10">
          {/* left side data */}
          <div className="left flex flex-col gap-y-5">
            <div className="title">
              <h1 className="text-xl">
                Welcome to the{" "}
                <span className="text-4xl font-mono">
                  <span className="text-green-600">SmartGreen</span> Foundation
                </span>
              </h1>
            </div>
            <div className="desc">
              <p className="leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
                suscipit enim eum mollitia sed, accusantium adipisci voluptatem
                iure ea deleniti ad, numquam vero dolorum nulla eligendi tempore
                nihil ab! Pariatur!
              </p>
            </div>
            <div className="features">
              <FeaturesButton />
            </div>
          </div>
          <div className="right">
            <div
              className=" bg-cover h-[400px] w-[400px] rounded-xl  "
              style={{ backgroundImage: `url(${bg.src})` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
