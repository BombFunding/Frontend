import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View, Overlay } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Style, Circle, Fill, Stroke } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

const OpenLayersComponent = () => {
  const mapRef = useRef(null);
  const tooltipRef = useRef(null);

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
      positioning: 'bottom-center',
    });
    map.addOverlay(tooltip);

    
    map.on('click', (event) => {
      const coordinate = event.coordinate;

      const marker = new Feature({
        geometry: new Point(coordinate),
      });

      marker.setStyle(
        new Style({
          image: new Circle({
            radius: 6, 
            fill: new Fill({ color: '#FF7517' }), 
            stroke: new Stroke({ color: '#FFFFFF', width: 2 }), 
          }),
        })
      );

      vectorSource.addFeature(marker);
    });

    
    map.on('pointermove', (event) => {
      const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
      if (feature) {
        const coordinates = feature.getGeometry().getCoordinates();
        tooltip.setPosition(coordinates);
        tooltipRef.current.innerHTML = `
          <div style="font-size: 14px; font-weight: bold; color: #0C0C42;">سلام چطوری</div>
          <hr style="border: 1px solid #0C0C42; margin: 5px 0;" />
          <div style="font-size: 12px; color: #0C0C42;">مرسی</div>
        `;
        tooltipRef.current.style.display = 'block';
      } else {
        tooltipRef.current.style.display = 'none';
      }
    });

    return () => map.setTarget(null);
  }, []);

  return (
    <>
      <div ref={mapRef} style={{ width: '100%', height: '80vh' }} />
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          backgroundColor: '#e8e8e8',
          padding: '10px',
          borderRadius: '8px',
          border: '2px solid #0c0c42',
          display: 'none',
          pointerEvents: 'none',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
        }}
      />
    </>
  );
};

export default OpenLayersComponent;
