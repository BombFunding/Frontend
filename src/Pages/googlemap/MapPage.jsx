import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Style, Icon } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';

const OpenLayersComponent = () => {
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const vectorSource = useRef(new VectorSource()).current;

  const markersLayer = new VectorLayer({
    source: vectorSource,
  });

  // تابع برای افزودن مارکر
  const addMarker = (event) => {
    const coordinate = event.coordinate;

    // ایجاد ویژگی جدید (مارکر)
    const markerFeature = new Feature({
      geometry: new Point(coordinate),
    });

    // اعمال استایل به مارکر (آیکون)
    markerFeature.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: '/pin.svg', // مسیر آیکون پین شما
          scale: 0.1, // اندازه آیکون
        }),
      })
    );

    // افزودن ویژگی به منبع داده‌ها
    vectorSource.addFeature(markerFeature);

    // ذخیره مارکر جدید در state
    setMarkers((prevMarkers) => [...prevMarkers, markerFeature]);
  };

  // تابع برای حذف آخرین مارکر
  const removeLastMarker = () => {
    if (markers.length > 0) {
      const lastMarker = markers[markers.length - 1];
      vectorSource.removeFeature(lastMarker);
      setMarkers(markers.slice(0, -1)); // حذف آخرین مارکر از state
    }
  };

  useEffect(() => {
    // ایجاد نقشه
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        markersLayer, // اضافه کردن لایه مارکرها به نقشه
      ],
      view: new View({
        center: fromLonLat([53.6880, 32.4279]), // مرکز نقشه بر روی ایران
        zoom: 5, // زوم پیش‌فرض
      }),
    });

    // افزودن رویداد کلیک برای افزودن مارکر
    map.on('click', addMarker);

    return () => map.setTarget(null); // پاک کردن ارجاع به نقشه هنگام حذف کامپوننت
  }, [markers]);

  return (
    <div>
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '80vh',
        }}
      />
      <button onClick={removeLastMarker}>حذف آخرین مارکر</button>
    </div>
  );
};

export default OpenLayersComponent;
