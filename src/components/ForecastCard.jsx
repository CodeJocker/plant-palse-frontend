import { WiDaySunny, WiRain, WiStrongWind } from "react-icons/wi";

function ForecastCard({ metadata, forecast_summary }) {
  // Map season or summary to weather icon
  const getWeatherIcon = () => {
    const season = metadata?.season_info?.season || "longDry";
    // You can extend this mapping
    switch (season) {
      case "longDry":
        return <WiDaySunny size={52} className="text-yellow-500" />;
      case "shortRainy":
      case "rainy":
        return <WiRain size={52} className="text-blue-500" />;
      case "windy":
        return <WiStrongWind size={52} className="text-gray-500" />;
      default:
        return <WiDaySunny size={52} className="text-yellow-500" />;
    }
  };

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentMonthName =
    monthNames[(metadata?.season_info?.currentMonth || 1) - 1];

  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row items-center gap-4">
      <h2 className="text-lg font-semibold text-green-800 mb-1">
        Forecast Summary
      </h2>
      <div>{getWeatherIcon()}</div>
      <div className="flex-1 gap-10 text-center">
        <div className="flex items-center flex-col gap-2 mb-4 text-black">
          <span className="font-bold text-4xl">{currentMonthName}</span>
          <span>{metadata?.season_info?.description}</span>
        </div>

        <p className="text-sm text-gray-700 mb-2">{forecast_summary}</p>
      </div>
    </div>
  );
}

export default ForecastCard;
