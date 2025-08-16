import Card from "../components/card";

const Home = () => {
  const cards = [
    {
      image: "/images/detection.jpg",
      title: "Smart Plant Disease Detection!",
      link: "/disease-detection",
      buttonType: "detect",
    },
    {
      image: "/images/planting.jpg",
      title: "Seasonal Planting Suggestions",
      link: "/planting-suggestions",
      buttonType: "detect",
    },
    {
      image: "/images/med.jpg",
      title: "Order Plants Medicine",
      link: "/crop-monitoring",
      buttonType: "order",
    },
    {
      image: "/images/medicine.jpg",
      title: "weather forecast & Alerts",
      link: "/crop-monitoring",
      buttonType: "weather",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8 md:p-16">
      <h1 className="text-green-800 text-3xl font-bold text-center mb-8">
        Plant Pulse
      </h1>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 bg-slate-100 shadow-xl rounded-lg p-3 sm:p-6 md:p-8">
        {cards.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
            link={card.link}
            buttonType={card.buttonType}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
