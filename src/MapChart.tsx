import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
  Point,
} from "react-simple-maps";

interface column {
  institution: string;
  category: string;
  lab: string;
  address: string;
  coordinates: Point | number[];
}

interface setters
  extends Array<
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<column>>
  > {
  0: React.Dispatch<React.SetStateAction<string>>;
  1: React.Dispatch<React.SetStateAction<column>>;
}

// World map
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = (props: { functions: setters }): JSX.Element => {
  const [setTooltipContent, setColumnContent] = props.functions;

  // Promise to get markers for served build
  const [markers, setMarkers] = React.useState([]);
  useEffect(() => {
    const fetchMarkers = async () => {
      const response = await fetch("/static/waypoints.json");
      const markers = await response.json();
      setMarkers(markers);
    };
    fetchMarkers();
  }, []);

  // Map default zoom
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  // For zoom in/out buttons
  function handleZoomIn(): void {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut(): void {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(): void {
    setPosition(position);
  }

  // Display city names next to markers based on zoom level
  function isVisible(): boolean {
    return position.zoom >= 1.5;
  }

  function toPoint(coordinates: number[]): Point {
    return [coordinates[0], coordinates[1]];
  }

  return (
    <div className="mapchart">
      <div className="controls-wrapper">
        <text>Zoom: {position.zoom}, </text>
        <text>isVisible(): {isVisible().toString()}</text>
        <div className="controls">
          <button onClick={handleZoomIn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <button onClick={handleZoomOut}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup
          zoom={position.zoom}
          center={toPoint(position.coordinates)}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                />
              ))
            }
          </Geographies>
          {markers.map(
            ({ institution, category, lab, address, coordinates }: column) => (
              <Marker
                onClick={() => {
                  setColumnContent({
                    institution,
                    category,
                    lab,
                    address,
                    coordinates,
                  });
                }}
                key={institution}
                coordinates={toPoint(coordinates)}
                onMouseEnter={() => {
                  setTooltipContent(`${institution}`);
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
              >
                <g
                  fill="#3786c2"
                  stroke="#3786c2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="translate(-12, -24)"
                >
                  <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                </g>
                {isVisible() && (
                  <text
                    textAnchor="middle"
                    y={-12}
                    style={{
                      fontFamily: "system-ui",
                      fill: "#5D5A6D",
                      fontSize: 10,
                    }}
                  >
                    {institution}
                  </text>
                )}
              </Marker>
            )
          )}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapChart;