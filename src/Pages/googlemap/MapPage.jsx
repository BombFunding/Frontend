import { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import { Map, View, Overlay } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Style, Circle, Fill, Stroke } from "ol/style";
import { fromLonLat, toLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { postData, getData, deleteData } from "@/Services/ApiClient/Services.js";
import useTokenStore from "@/stores/TokenStore";

const GoogleMap = () => {
  const mapRef = useRef(null);
  const tooltipRef = useRef(null);
  const [pins, setPins] = useState([]);
  const [isAddingPin, setIsAddingPin] = useState(false);
  const [userPin, setUserPin] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const isLoggedIn = () => {
    const { accessToken } = useTokenStore.getState();
    return !!accessToken;
  };

  const isStartupUser = () => {
    const { userType } = useTokenStore.getState();
    return userType === "startup";
  };

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await getData("map/pins/");
        setPins(response);
        const userPin = response.find((pin) => pin.is_user_pin);
        if (userPin) setUserPin(userPin);

        const userResponse = await getData("map/user/details/");
        setUserDetails(userResponse);
        console.log("map: ", userResponse);

      } catch (error) {
        console.error("Error fetching pins or user details:", error);
      }
    };
    fetchPins();
  }, []);

  useEffect(() => {
    const vectorSource = new VectorSource();
    const markersLayer = new VectorLayer({
      source: vectorSource,
    });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        markersLayer,
      ],
      view: new View({
        center: fromLonLat([53.6880, 32.4279]),
        zoom: 5,
      }),
    });

    const tooltip = new Overlay({
      element: tooltipRef.current,
      offset: [0, -15],
      positioning: "bottom-center",
    });
    map.addOverlay(tooltip);

    const addPinsToMap = () => {
      vectorSource.clear();

      if (userPin) {
        const marker = new Feature({
          geometry: new Point(fromLonLat([userPin.longitude, userPin.latitude])),
        });

        marker.setStyle(
          new Style({
            image: new Circle({
              radius: 6,
              fill: new Fill({ color: "#FF7517" }),
              stroke: new Stroke({ color: "#ffffff", width: 3 }),
            }),
          })
        );
        vectorSource.addFeature(marker);
      }

      pins.forEach((pin) => {
        const marker = new Feature({
          geometry: new Point(fromLonLat([pin.longitude, pin.latitude])),
        });

        if (isLoggedIn() && userDetails && pin.username === userDetails.username) {
  marker.setStyle(
    new Style({
      image: new Circle({
        radius: 7,
        fill: new Fill({ color: "#ff0000" }),
        stroke: new Stroke({ color: "#ffffff", width: 3 }),
      }),
    })
  );
}
 else {
          marker.setStyle(
            new Style({
              image: new Circle({
                radius: 7,
                fill: new Fill({ color: "#0C0C42" }),
                stroke: new Stroke({ color: "#ffffff", width: 3 }),
              }),
            })
          );
        }

        vectorSource.addFeature(marker);
      });
    };

    addPinsToMap();

    map.on("pointermove", (event) => {
      const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
      if (feature) {
        const coordinates = feature.getGeometry().getCoordinates();
        tooltip.setPosition(coordinates);

        const pin = pins.find(
          (p) =>
            fromLonLat([p.longitude, p.latitude]).join() === coordinates.join()
        );

        if (pin) {
          tooltipRef.current.innerHTML = `
            <div style="font-size: 14px; font-weight: bold; color: #0C0C42;">${pin.username}</div>
            <hr style="border: 1px solid #FF7517; margin: 5px 0;" />
            <div style="font-size: 12px; color: #0C0C42;">${pin.email}</div>
          `;
          tooltipRef.current.style.display = "block";
        }
      } else {
        tooltipRef.current.style.display = "none";
      }
    });

    map.on("click", async (event) => {
      if (isAddingPin && isLoggedIn()) {
        const [lon, lat] = toLonLat(event.coordinate);
        const newPin = {
          longitude: lon,
          latitude: lat,
          username: userDetails?.username || "Anonymous",
          email: userDetails?.email || "N/A",
        };

        try {
          await deleteData("map/pins/delete/");
        } catch (error) {
          console.error("Error deleting old pins:", error);
          alert("خطا در حذف نقاط قبلی!");
          return;
        }

        try {
          const response = await postData("map/pins/add/", newPin);
          setUserPin(response);
          setIsAddingPin(false);
        } catch (error) {
          console.error("Error adding pin:", error);
          alert("افزودن پین با خطا مواجه شد!");
        }
      } else if (isAddingPin && !isLoggedIn()) {
        alert("برای اضافه کردن پین، باید لاگین کنید!");
        setIsAddingPin(false);
      }
    });

    return () => map.setTarget(null);
  }, [pins, isAddingPin, userPin, userDetails]);

  const handleSaveChanges = () => {
    window.location.reload();
  };

  return (
    <>
      <div ref={mapRef} style={{ width: "100%", height: "80vh" }} />

      {isLoggedIn() && isStartupUser() && (
        <>
<button
  onClick={() => setIsAddingPin(!isAddingPin)}
  className="absolute top-[55px] left-[38px] px-5 py-2.5 bg-[#0C0C42] text-white border-none rounded cursor-pointer sm:top-[calc(140px-5vh)]"
>
  {isAddingPin ? "درحال تغییر موقعیت" : "تغییر موقعیت"}
</button>

<button
  onClick={handleSaveChanges}
  className="absolute top-[105px] left-[38px] px-5 py-2.5 bg-[#FF7517] text-white border-none rounded cursor-pointer sm:top-[calc(190px-5vh)]"
>
  ذخیره تغییرات
</button>

        </>
      )}

      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          backgroundColor: "#f0f0f0",
          padding: "10px",
          borderRadius: "8px",
          border: "2px solid #FF7517",
          display: "none",
          pointerEvents: "none",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
        }}
      />
    </>
  );
};

export default GoogleMap;
