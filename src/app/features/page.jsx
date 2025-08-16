import Card from "../components/card";

const Home = () => {
  const cards = [
    {
      image: "/images/detection.jpg",
      title: "Smart Plant Disease Detection!",
      description:
        "Detect plant diseases early with AI and protect your crops from damage. Our system analyzes plant health instantly.",
      link: "/disease-detection",
    },
       {
      image: "/images/planting.jpg",
      title: "Seasonal Planting Suggestions",
      description:
        "Make the most of each season with AI-powered planting guides based on weather and soil conditions.",
      link: "/planting-suggestions",
    },
    {
      image: "/images/med.jpg",
      title: "Order medicine",
      description:
        "Keep track of your crops' health using AI-powered insights and take timely action to prevent losses.",
      link: "/crop-monitoring",
    },
 
 
  ];

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-green-800 text-3xl font-bold text-center mb-8">Farm vision AI</h1>
      <div className="grid gap-4 p-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-slate-100 shadow-xl rounded-lg">
        {cards.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
            link={card.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;