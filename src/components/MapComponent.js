import React, { useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import Popup from 'ol-ext/overlay/Popup';
import Select from 'ol/interaction/Select';

import { click } from 'ol/events/condition';

// Import the necessary symbols from OpenLayers
import { Style, Circle, Fill, Stroke } from 'ol/style';

import locationsData from './maps'; // Import the JSON data

const MapComponent = () => {
  useEffect(() => {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    map.addLayer(vectorLayer);

    const locations = {};

    locationsData.values.forEach(location => {
      const lat = parseFloat(location.lat.value);
      const long = parseFloat(location.long.value);
      const sensor = location.sensor.value;
      const datatype = location.measures.datatype.value;

      if (!isNaN(lat) && !isNaN(long)) {
        const coordinates = fromLonLat([long, lat]);

        // Check if a cluster exists at these coordinates
        if (!locations[coordinates]) {
          locations[coordinates] = {
            cluster: new Feature({
              geometry: new Point(coordinates),
              sensors: [],
            }),
          };
        }

        // Add sensor to the cluster
        locations[coordinates].cluster.get('sensors').push({
          sensor,
          datatype,
        });
      }
    });

    for (const key in locations) {
      if (locations.hasOwnProperty(key)) {
        const cluster = locations[key].cluster;
        const sensors = cluster.get('sensors');
        const sensorCount = sensors.length;

        cluster.setStyle(
          new Style({
            image: new Circle({
              radius: 6,
              fill: new Fill({ color: 'red' }),
              stroke: new Stroke({ color: 'black', width: 4 }),
            }),
          })
        );

        // Display sensor info when clicking a cluster
        cluster.setProperties({ sensors, sensorCount });
        vectorSource.addFeature(cluster);
      }
    }

    const selectClick = new Select({
      condition: click,
    });

    map.addInteraction(selectClick);

    const popup = new Popup();

    map.addOverlay(popup);

    selectClick.on('select', e => {
      const selectedFeatures = e.target.getFeatures();

      if (selectedFeatures.getLength() > 0) {
        const cluster = selectedFeatures.item(0);
        const sensors = cluster.get('sensors');
        const sensorCount = cluster.get('sensorCount');

        displayLocationInfo(sensors, sensorCount, popup, cluster.getGeometry().getCoordinates());
      }
    });

    const displayLocationInfo = (sensors, sensorCount, popup, coordinates) => {
      let sensorInfo = sensors
        .map(
          (sensor) =>
            `<div className="popup"> <a href="${sensor.datatype}">${sensor.sensor}</a>: ${sensor.datatype} </div>`
        )
        .join("<br>");

      if (sensorCount > 1) {
        sensorInfo = `<strong>Total Sensors: ${sensorCount}</strong><br>${sensorInfo}`;
      }

      popup.show(coordinates, sensorInfo);
    };
  }, []);

  return (
    <div>
      <div
        id="map"
        style={{
          width: '100%',
          height: '100vh',
        }}
      ></div>
    </div>
  );
};

export default MapComponent;
