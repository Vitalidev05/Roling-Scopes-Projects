import classNames from 'classnames';
import { FeatureCollection } from 'geojson';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';

import styles from '@/components/MapCovid/MapCovid.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapBoxToken } from '@/constants';
import { useCovidMapService } from '@/services';
import convertCovidToMapCovids from '@/utils';

import ComponentLayout from '../layout';

mapboxgl.accessToken = mapBoxToken;

const MapCovid = (): JSX.Element => {
  const mapboxElRef = useRef(null);
  const [expandMap, setExpandMap] = useState(false);
  const handlerClickExpand = () => {
    setExpandMap(prev => !prev);
  };
  const dataBefore = useCovidMapService();
  useEffect(() => {
    if (dataBefore.status === 'loaded') {
      const data = convertCovidToMapCovids(dataBefore.data);
      // console.log('dataBefore.data', dataBefore.data);
      // console.log('data', data);
      const map = new mapboxgl.Map({
        container: mapboxElRef.current || 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [10, 40],
        zoom: 2,
      });
      map.addControl(new mapboxgl.NavigationControl(), 'top-left');

      map.once('load', () => {
        map.addSource('points', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: data,
          } as FeatureCollection,
        });

        map.addLayer({
          id: 'circles',
          source: 'points',
          type: 'circle',
          paint: {
            'circle-opacity': 0.75,
            'circle-stroke-width': ['interpolate', ['linear'], ['get', 'cases'], 1, 1, 10000, 1.75],
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['get', 'cases'],
              1,
              2,
              1000,
              4,
              2000,
              5,
              3000,
              6,
              4000,
              8,
              5000,
              10,
            ],
            'circle-color': [
              'interpolate',
              ['linear'],
              ['get', 'cases'],
              1,
              '#ffffb2',
              5000,
              '#fed976',
              10000,
              '#feb24c',
              25000,
              '#fd8d3c',
              50000,
              '#fc4e2a',
              75000,
              '#e31a1c',
              100000,
              '#b10026',
            ],
          },
        });

        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        });
        let lastId: number | undefined;
        map.on('mousemove', 'circles', e => {
          const id = Number(e.features![0].properties!.id);
          // console.log(id);
          if (id !== lastId) {
            lastId = id;
            // console.log(e.features![0]);
            const cases = Number(e.features![0].properties!.cases);
            const deaths = Number(e.features![0].properties!.deaths);
            const country = String(e.features![0].properties!.country);
            const province = String(e.features![0].properties!.province);
            const iso = String(e.features![0].properties!.iso);
            map.getCanvas().style.cursor = 'pointer';
            if (e.features![0].geometry.type === 'Point') {
              const coordinates = e.features![0].geometry.coordinates.slice();
              // console.log(coordinates);
              const provinceHTML = province !== 'null' ? `<p>Province: <b>${province}</b></p>` : '';
              const mortalityRate = ((deaths / cases) * 100).toFixed(2);
              const countryFlagHTML = `<img src="https://www.countryflags.io/${iso}/flat/64.png"></img>`;
              const HTML = `<p>Country: <b>${country}</b></p>
                  ${provinceHTML}
                  <p>Cases: <b>${cases}</b></p>
                  <p>Deaths: <b>${deaths}</b></p>
                  <p>Mortality Rate: <b>${mortalityRate}%</b></p>
                  ${countryFlagHTML}`;
              while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
              }
              popup
                .setLngLat(coordinates as LngLatLike)
                .setHTML(HTML)
                .addTo(map);
            }
          }
        });
        map.on('mouseleave', 'circles', () => {
          lastId = undefined;
          map.getCanvas().style.cursor = '';
          popup.remove();
        });
      });
    }
  }, [expandMap, dataBefore]);
  return (
    <ComponentLayout onclickExpend={handlerClickExpand}>
      <div className={classNames(styles['map-covid'])}>
        <div className={styles['mapBox']} ref={mapboxElRef} />
      </div>
    </ComponentLayout>
  );
};

export default MapCovid;
