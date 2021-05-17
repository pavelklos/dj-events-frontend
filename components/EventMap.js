// _rfc
import Image from "next/image";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Geocode from "react-geocode";

const getGeocoding = async (address) => {
  const token = `${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`;
  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${token}&limit=1`
  );
  const data = await res.json();
  const { center } = data.features[0]; // center = [14.102903, 50.135393] = lng, lat
  const geocoding = { lat: center[1], lng: center[0] };
  return geocoding;
};

export default function EventMap(props) {
  const { event } = props;

  const [lat, setLat] = useState(null); // Latitude
  const [lng, setLng] = useState(null); // Longitude
  // const [lat, setLat] = useState(40.712772); // Latitude
  // const [lng, setLng] = useState(-73.935242); // Longitude
  // const [lat, setLat] = useState(50.135393); // Latitude
  // const [lng, setLng] = useState(14.102903); // Longitude
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState({
    // latitude: 37.7577,
    // longitude: -122.4376,
    // zoom: 8,
    latitude: 40.712772,
    longitude: -73.935242,
    width: "100%",
    height: "500px",
    zoom: 16, // 12
  });

  // // Google Maps Geocoding API
  // Geocode.setApiKey = `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;
  // Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

  // // Set response language. Defaults to english.
  // Geocode.setLanguage("en");

  // // Get latitude & longitude from address.
  // Geocode.fromAddress("Eiffel Tower").then(
  //   (response) => {
  //     const { lat, lng } = response.results[0].geometry.location;
  //     console.log(lat, lng);
  //   },
  //   (error) => {
  //     console.error(error);
  //   }
  // );

  // // Get latitude & longitude from address.
  // useEffect(() => {
  //   Geocode.fromAddress(event.address).then(
  //     (response) => {
  //       const { lat, lng } = response.results[0].geometry.location;
  //       setLat(lat);
  //       setLng(lng);
  //       setViewport({ ...viewport, latitude: lat, longitude: lng });
  //       setLoading(false);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }, []); // ON INITIAL RENDER

  // Get latitude & longitude from address.
  useEffect(() => {
    async function fetchGetGeocoding() {
      let geocoding = await getGeocoding(event.address);
      const { lat, lng } = geocoding;
      // console.log("fetchMyAPI", { lat, lng });
      setLat(lat);
      setLng(lng);
      setViewport({ ...viewport, latitude: lat, longitude: lng });
      setLoading(false);
    }
    fetchGetGeocoding();
  }, []); // ON INITIAL RENDER

  if (loading) return false;
  // console.log({ lat, lng });

  const size = 30; // Marker : size

  return (
    <div>
      <h3>Map:</h3>
      <h4>{event.address}</h4>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        onViewportChange={(viewport) => setViewport(viewport)}
        // https://docs.mapbox.com/api/</div>maps/styles/
        mapStyle='mapbox://styles/mapbox/streets-v11'
        // mapStyle='mapbox://styles/mapbox/outdoors-v11'
        // mapStyle='mapbox://styles/mapbox/light-v10'
        // mapStyle='mapbox://styles/mapbox/dark-v10'
        // mapStyle='mapbox://styles/mapbox/satellite-v9'
        // mapStyle='mapbox://styles/mapbox/satellite-streets-v11'
        // mapStyle='mapbox://styles/mapbox/navigation-day-v1'
        // mapStyle='mapbox://styles/mapbox/navigation-night-v1'
      >
        <Marker key={event.id} latitude={lat} longitude={lng}>
          {/* <Image src='/images/pin.svg' width={30} height={30} /> */}
          <div style={{ transform: `translate(${-size / 2}px,${-size}px)` }}>
            <Image src='/images/pin.svg' width={size} height={size} />
          </div>
        </Marker>
      </ReactMapGL>
      {/* <ReactMapGL
        {...viewport}
        width='100%'
        height='100%'
        onViewportChange={(viewport) => setViewport(viewport)}
      /> */}
    </div>
  );
}
