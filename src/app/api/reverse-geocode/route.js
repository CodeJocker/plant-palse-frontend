import axios from "axios";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return new Response(JSON.stringify({ error: "Missing lat/lon" }), {
      status: 400,
    });
  }

  try {
    const response = await axios.get(process.env.GEO_CODE_API, {
      params: {
        format: "json",
        lat,
        lon,
      },
      headers: {
        "User-Agent": process.env.USER_AGENT, // required by OSM
      },
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch location" }), {
      status: 500,
    });
  }
}
