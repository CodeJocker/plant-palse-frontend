"use client";
import { useEffect, useState } from "react";
import ForecastCard from "../../components/ForecastCard";
import { HiArrowLeft, HiExclamationCircle } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { api } from "../../utils/Axios";
import useGeolocation from "../../hooks/useGeolocation";

export default function Page() {
  const router = useRouter();
  const location = useGeolocation();
  const [apiData, setApiData] = useState({
    metadata: {},
    forecast_summary: "",
    warnings: [],
    productivity_tips: [],
    possible_diseases: [],
    resources_needed: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch apiData
  useEffect(() => {
    const fetchData = async () => {
      if (!location.loaded || location.error) {
        setError("Could not fetch location");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const res = await api.get("/api/forecast", {
          params: {
            lat: location.coordinates.lat,
            lon: location.coordinates.lng,
          },
        });
        setApiData({
          metadata: res.data.metadata || {},
          forecast_summary: res.data.forecast_summary || "",
          warnings: res.data.warnings || [],
          productivity_tips: res.data.productivity_tips || [],
          possible_diseases: res.data.possible_diseases || [],
          resources_needed: res.data.resources_needed || [],
        });
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch forecast data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  const goBack = () => {
    router.back();
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-100">
      <div className="flex items-center gap-4 mb-6 fixed bg-white top-0 left-0 w-full py-4 shadow-xl px-4">
        <button onClick={goBack} className="text-2xl">
          <HiArrowLeft />
        </button>
        <h1 className="text-xl font-bold text-green-800">
          Farming Suggestions
        </h1>
      </div>

      <div className="space-y-4 py-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-green-400/30 border-t-green-400 rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4 text-lg">Loading data...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <HiExclamationCircle className="w-8 h-8 text-red-400" />
            <p className="text-red-400 text-lg font-medium">{error}</p>
          </div>
        ) : (
          <>
            {/* Current Location */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-green-800 mb-2">
                Current Location
              </h2>
              {location.loaded && !location.error ? (
                <>
                  <span className="space-y-4">
                    <p className="font-bold">{location.placeName}</p>
                    <p className="text-sm text-gray-500">
                      (lat: {location.coordinates.lat}, lon:{" "}
                      {location.coordinates.lng})
                    </p>
                  </span>
                </>
              ) : (
                <p>{location.error || "Fetching location..."}</p>
              )}
            </div>

            {/* Forecast */}
            <ForecastCard
              metadata={apiData.metadata}
              forecast_summary={apiData.forecast_summary}
            />

            {/* Warnings */}
            {apiData.warnings?.length > 0 && (
              <div className="text-center bg-red-100/50 p-4 rounded-lg shadow flex flex-col gap-2">
                <div className="text-center flex items-center gap-2 mb-2">
                  <HiExclamationCircle className="text-red-600 text-xl" />
                  <h2 className="text-center text-lg font-semibold text-red-700">
                    Warnings
                  </h2>
                </div>
                <ul className="list-disc list-inside text-sm space-y-1 text-red-700">
                  {apiData.warnings.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Productivity Tips */}
            {apiData.productivity_tips?.length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold text-green-800 mb-2">
                  Productivity Tips
                </h2>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {apiData.productivity_tips.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Possible Diseases */}
            {apiData.possible_diseases?.length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold text-green-800 mb-2">
                  Possible Diseases
                </h2>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {apiData.possible_diseases.map((d, i) => (
                    <li key={i}>
                      <strong>{d.disease_name}:</strong> {d.symptoms} <br />
                      <span className="text-sm text-gray-500">
                        Prevention: {d.prevention}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Resources */}
            {apiData.resources_needed?.length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold text-green-800 mb-2">
                  Resources Needed
                </h2>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {apiData.resources_needed.map((r, i) => (
                    <li key={i}>
                      <strong>{r.resource}</strong> – {r.purpose} <br />
                      <span className="text-sm text-gray-500">
                        Qty: {r.quantity}, Cost: {r.cost_estimate}
                      </span>
                      <br />
                      <span className="text-sm text-gray-500">
                        Source: {r.where_to_get}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
