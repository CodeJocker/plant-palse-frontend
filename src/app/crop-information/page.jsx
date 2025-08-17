"use client";
import { useState } from "react";
import axios from "axios";
import useGeolocation from "../../hooks/useGeolocation";
import Suggestions from "../suggestions/page";
import { HiArrowLeft } from "react-icons/hi";
import { useRouter } from "next/navigation"
import BottomNav from "../../components/bottomBar";

export default function CropInformation() {
  const router = useRouter()
  const [step, setStep] = useState("form"); // "form" or "results"
  const [formData, setFormData] = useState({
    crop: "",
    soilAcidity: "",
    growthStage: "",
    variety: "",
  });

  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const location = useGeolocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location.loaded || location.error) {
      setError("Could not fetch location");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:3001/api/advice", {
        crop: formData.crop,
        lat: location.coordinates.lat,
        lon: location.coordinates.lng,
        soilPh: parseFloat(formData.soilAcidity),
        variety: formData.variety,
        useAI: true,
      });

      if (res.data.success) {
        setApiData(res.data.data);
        setStep("results");
      } else {
        setError(res.data.message || "Failed to fetch advice");
      }
    } catch (err) {
      console.error("API error:", err);
      setError(
        err.response?.data?.message ||
          "Error fetching API: " + err.message
      );
    } finally {
      setLoading(false);
    }
  };

  if (step === "results" && apiData) {
    return (
      <Suggestions
        formData={formData}
        location={location}
        apiData={apiData}
        goBack={() => setStep("form")}
      />
    );
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen w-full flex items-center p-4">
        <div className="flex items-center gap-4 mb-6 fixed bg-white top-0 left-0 w-full py-4 shadow-xl px-4">
          <button onClick={() => router.back()} className="text-2xl">
            <HiArrowLeft />
          </button>
          <h1 className="text-xl font-bold text-green-800">
            Farming Suggestions
          </h1>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-green-800 mb-4 text-center">
            Crop Information
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Crop Type
              </label>
              <input
                type="text"
                name="crop"
                value={formData.crop}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-800"
                placeholder="e.g. Maize, Beans, Coffee"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Soil Acidity (pH)
              </label>
              <input
                type="number"
                step="0.1"
                name="soilAcidity"
                value={formData.soilAcidity}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-800"
                placeholder="e.g. 5.8"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Growth Stage
              </label>
              <select
                name="growthStage"
                value={formData.growthStage}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-800"
                required
              >
                <option value="">Select stage</option>
                <option value="germination">Germination</option>
                <option value="vegetative">Vegetative</option>
                <option value="flowering">Flowering</option>
                <option value="fruiting">Fruiting</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Variety Characteristics
              </label>
              <textarea
                name="variety"
                value={formData.variety}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-800"
                placeholder="e.g. Drought-resistant, High yield"
                required
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-green-800 text-white w-full py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </form>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
