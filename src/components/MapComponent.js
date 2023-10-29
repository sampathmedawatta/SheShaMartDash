import React, { useEffect, useState, useContext } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import Popup from "ol-ext/overlay/Popup";
import Select from "ol/interaction/Select";
import { click } from "ol/events/condition";
import { Style, Icon } from "ol/style";
import { Context } from "../context/context";
import { useNavigate } from "react-router-dom";

const MapComponent = () => {
  const { sensorLocationList } = useContext(Context);
  const { sensorList, setSensorList } = useContext(Context);
  const navigate = useNavigate();

  console.log("Location Data:  " + sensorLocationList);

  useEffect(() => {
    const initialCenter = fromLonLat([0, 0]); // Specify the initial center (longitude, latitude)

    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: initialCenter,
        zoom: 2,
      }),
    });

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    map.addLayer(vectorLayer);

    const locations = {};

    sensorLocationList.forEach((location) => {
      const lat = parseFloat(location.lat.value);
      const long = parseFloat(location.long.value);
      const sensor = location.sensor.value;
      const measures = location.measures.value;

      if (!isNaN(lat) && !isNaN(long)) {
        const coordinates = fromLonLat([long, lat]);

        if (!locations[coordinates]) {
          locations[coordinates] = {
            cluster: new Feature({
              geometry: new Point(coordinates),
              sensors: [],
            }),
          };
        }

        locations[coordinates].cluster.get("sensors").push({
          sensor,
          measures,
        });
      }
    });

    for (const key in locations) {
      if (locations.hasOwnProperty(key)) {
        const cluster = locations[key].cluster;
        const sensors = cluster.get("sensors");
        const sensorCount = sensors.length;

        cluster.setStyle(
          new Style({
            image: new Icon({
              src:
                "data:image/svg+xml," +
                encodeURIComponent(
                  '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" viewBox="0 0 32 48"><path fill="#de2e2e" d="M16 0c-8.837 0-16 7.163-16 16 0 17.063 16 32 16 32s16-14.937 16-32c0-8.837-7.163-16-16-16zm0 24c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"/></svg>'
                ),
              anchor: [0.5, 1],
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

    selectClick.on("select", (e) => {
      const selectedFeatures = e.target.getFeatures();

      if (selectedFeatures.getLength() > 0) {
        const cluster = selectedFeatures.item(0);
        const sensors = cluster.get("sensors");
        const sensorCount = cluster.get("sensorCount");

        displayLocationInfo(
          sensors,
          sensorCount,
          popup,
          cluster.getGeometry().getCoordinates()
        );
      }
    });

    const handleIntegrate = (selectdSensor) => {
      console.log("Integrate button clicked : " + selectdSensor);

      setSensorList([
        ...sensorList,
        {
          amount: 0,
          sensorName: selectdSensor.sensor,
          sensorHash: "",
          brokerHash: "",
        },
      ]);

      navigate("/integrate");
    };

    const displayLocationInfo = (sensors, sensorCount, popup, coordinates) => {
      console.log(sensors);
      let sensorInfo = sensors
        .map(
          (sensor, index) =>
            `<div>
            <strong>Sensor Name: </strong> ${sensor.sensor}<br>
            <strong>Measures: </strong>${sensor.measures}<br>
          </div>
         <button id="integrateSensor" class="map-button integrateSensor">Integrate</button>`
        )
        .join("<br/>");

      if (sensorCount > 1) {
        sensorInfo = `<div><strong>Total Sensors: ${sensorCount}</strong></div><br>${sensorInfo}`;
      }

      const popupContent = `
        <div class="map-popup">
          ${sensorInfo}
          <button id="close-popup" class="closeButton">X</button>
        </div>
      `;

      popup.show(coordinates, popupContent);

      // Attach a click event handler to the integrate Sensor button
      const integrateSensorButtons =
        document.querySelectorAll(".integrateSensor");
      integrateSensorButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
          handleIntegrate(sensors[index]); // Pass the sensor data to the handler
        });
      });

      // Attach a click event handler to the close button
      const closeButton = document.getElementById("close-popup");
      closeButton.addEventListener("click", () => {
        popup.hide();
      });
    };

    // Calculate the extent of all features and zoom to it with some padding
    const extent = vectorSource.getExtent();
    const padding = 0.2; // Adjust this factor for the amount of padding you want
    const deltaX = (extent[2] - extent[0]) * padding;
    const deltaY = (extent[3] - extent[1]) * padding;
    extent[0] -= deltaX;
    extent[1] -= deltaY;
    extent[2] += deltaX;
    extent[3] += deltaY;
    map.getView().fit(extent, map.getSize());
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="title-heders"> Available Sensors on Map View</div>
        </div>
      </div>

      <div className="col-12 mapcont">
        <div
          id="map"
          style={{
            width: "90%",
            height: "80vh",
          }}
        ></div>
      </div>
    </div>
  );
};

export default MapComponent;
