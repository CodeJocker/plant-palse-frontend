"use client";

import { useState } from "react";
import { Leaf, AlertTriangle, CheckCircle } from "lucide-react";
import NavBar from "../../components/heading";
import BottomNav from "../../components/bottomBar";

const suggestionsData = [
  {
    id: 1,
    disease: "Powdery Mildew",
    plant: "Tomato",
    medicines: [
      "Neem oil spray (organic)",
      "Sulfur-based fungicide",
      "Baking soda solution (1 tsp in 1L water)",
    ],
    prevention: [
      "Ensure proper air circulation",
      "Avoid overhead watering",
      "Remove affected leaves early",
    ],
  },
  {
    id: 2,
    disease: "Bacterial Leaf Spot",
    plant: "Pepper",
    medicines: [
      "Copper-based fungicide",
      "Streptomycin (under professional guidance)",
    ],
    prevention: [
      "Use disease-free seeds",
      "Rotate crops every 2 years",
      "Avoid working with wet plants",
    ],
  },
  {
    id: 3,
    disease: "Early Blight",
    plant: "Potato",
    medicines: ["Chlorothalonil spray", "Copper oxychloride"],
    prevention: [
      "Use resistant potato varieties",
      "Mulch to prevent soil splash",
      "Prune lower leaves",
    ],
  },
];

export default function SuggestionsPage() {
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("medicines");
  const [search, setSearch] = useState("");

  const filteredData = suggestionsData.filter(
    (item) =>
      item.plant.toLowerCase().includes(search.toLowerCase()) ||
      item.disease.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-white px-8 py-24">
        <h1 className="text-3xl font-bold text-green-700 mb-6 flex items-center gap-2">
          <Leaf className="text-green-600 text-4xl" /> Plant Disease Treatment
          Suggestions
        </h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by plant or disease..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 rounded-lg text-black border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        {/* Disease Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className="bg-white rounded-xl shadow-lg border border-green-200 p-6 cursor-pointer hover:shadow-2xl transition relative group"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {item.disease}
                <span className="text-sm text-gray-500"> ({item.plant})</span>
              </h2>
              <p className="text-gray-600 mt-2">
                Click to view recommended treatments and prevention strategies.
              </p>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition text-green-500">
                <Leaf className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>

        {/* Selected Suggestion Detail */}
        {selected && (
          <div className="mt-10 p-8 bg-white rounded-2xl shadow-2xl border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-yellow-500 w-6 h-6" />
              <h2 className="text-2xl font-bold text-green-700">
                {selected.disease} on {selected.plant}
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-300 mb-4">
              <button
                onClick={() => setActiveTab("medicines")}
                className={`py-2 px-4 font-semibold rounded-t-lg ${
                  activeTab === "medicines"
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:bg-gray-100 transition"
                }`}
              >
                Medicines
              </button>
              <button
                onClick={() => setActiveTab("prevention")}
                className={`py-2 px-4 font-semibold rounded-t-lg ${
                  activeTab === "prevention"
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:bg-gray-100 transition"
                }`}
              >
                Prevention
              </button>
            </div>

            {/* Tab Content */}
            <div className="mt-4">
              {activeTab === "medicines" ? (
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  {selected.medicines.map((med, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="text-green-500 w-5 h-5" /> {med}
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  {selected.prevention.map((prev, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="text-blue-500 w-5 h-5" /> {prev}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
            >
              Close
            </button>
          </div>
        )}
      </div>
      <BottomNav />
    </>
  );
}
