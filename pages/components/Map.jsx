import { useEffect } from "react";
import tw from "tailwind-styled-components";
import mapboxGl from "mapbox-gl";

mapboxGl.accessToken = process.env.MAPBOX_TOKEN;

const Map = (props) => {
  useEffect(() => {
    // center of the map
    const center = props.pickupCoords
      ? [...props.pickupCoords]
      : [49.98095, 40.38525];
    // init map
    const map = new mapboxGl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: center, // [49.95395, 40.38525],
      zoom: 12,
    });

    // add lat and longtitude (exists for confirm page  )
    props.pickupCoords &&
      addMarker(props.pickupCoords[0], props.pickupCoords[1], map);
    props.dropoffCoords &&
      addMarker(props.dropoffCoords[0], props.dropoffCoords[1], map);

    // add auto zoom (exists for confirm page)
    props.pickupCoords &&
      props.dropoffCoords &&
      map.fitBounds([props.pickupCoords, props.dropoffCoords], { padding: 60 });
  }, [props]);

  const addMarker = (lat, long, map) => {
    const marker1 = new mapboxGl.Marker().setLngLat([lat, long]).addTo(map);
  };

  return <Wrapper id="map"></Wrapper>;
};

const Wrapper = tw.div`flex-1 `;

export default Map;