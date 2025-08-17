import BottomNav from "../../components/bottomBar";
import Card from "../components/card";
import NavBar from "../../components/heading";

const Home = () => {
  const cards = [
    {
      image: "/images/detection.jpg",
      title: "Smart Plant Disease Detection",
      description:
        "Instantly diagnose plant diseases using AI-powered image and symptom analysis.",
      link: "/ai",
      buttonType: "detect",
    },
    {
      image: "/images/planting.jpg",
      title: "Seasonal Planting Suggestions",
      description:
        "Get personalized planting advice for every season and region.",
      link: "/planting-suggestions",
      buttonType: "detect",
    },
    {
      image: "/images/med.jpg",
      title: "Order Plant Medicine",
      description:
        "Find and order the best treatments and medicines for your crops.",
      link: "/crop-medicine",
      buttonType: "order",
    },
    {
      image: "/images/medicine.jpg",
      title: "Weather Forecast & Alerts",
      description:
        "Stay ahead with hyper-local weather forecasts and real-time alerts.",
      link: "/weather-alerts",
      buttonType: "weather",
    },
  ];

  return (
    <>
      <NavBar />
      <div className="theme flex flex-col items-center py-24 px-4">
        <h1 className="text-4xl font-extrabold text-green-700 mb-4 tracking-tight text-center drop-shadow-lg">
          Plant Pulse
        </h1>
        <p className="text-lg text-black mb-10 text-center max-w-2xl">
          Your all-in-one platform for smart plant care, disease detection, and
          crop management. Explore our features below!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group bg-gray-400/20 rounded-2xl shadow-xl  transition-all p-5 flex flex-col items-center hover:scale-[1.03] hover:shadow-2xl"
            >
              <div className="w-24 h-24 rounded-xl overflow-hidden shadow-lg mb-4 border-4 border-green-100 group-hover:border-green-300 transition">
                <img
                  src={card.image}
                  alt={card.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h2 className="text-xl font-semibold text-green-600 mb-2 text-center group-hover:text-green-600 transition">
                {card.title}
              </h2>
              <p className="text-black text-sm mb-4 text-center">
                {card.description}
              </p>
              <a
                href={card.link}
                className={`mt-auto px-5 py-2 rounded-lg font-semibold shadow bg-gradient-to-br ${
                  card.buttonType === "detect"
                    ? "from-green-500 to-green-700 text-white"
                    : card.buttonType === "order"
                    ? "from-blue-500 to-blue-700 text-white"
                    : "from-yellow-400 to-yellow-600 text-gray-900"
                } hover:opacity-90 transition`}
              >
                {card.buttonType === "detect"
                  ? "Detect Now"
                  : card.buttonType === "order"
                  ? "Order Now"
                  : "See Weather"}
              </a>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default Home;
