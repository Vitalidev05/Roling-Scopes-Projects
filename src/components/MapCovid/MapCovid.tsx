import classNames from 'classnames';
import { FeatureCollection } from 'geojson';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';

import styles from '@/components/MapCovid/MapCovid.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapBoxToken, layers, categories } from '@/constants';
import { useCovidMapService } from '@/services';
import convertCovidToMapCovids from '@/utils';

import ComponentLayout from '../layout';

import MenuMap from './MenuMap';

mapboxgl.accessToken = mapBoxToken;

const MapCovid = (): JSX.Element => {
  const mapboxElRef = useRef(null);
  const [expandMap, setExpandMap] = useState(false);
  const [stateCategories, setStateCategories] = useState(categories);
  const handlerClickExpand = () => {
    setExpandMap(prev => !prev);
  };

  const dataBefore = useCovidMapService();

  useEffect(() => {
    if (dataBefore.status === 'loaded') {
      const map = new mapboxgl.Map({
        container: mapboxElRef.current || 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [10, 40],
        zoom: 2,
      });

      map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
      map.on('load', () => {
        stateCategories.forEach((item, index) => {
          map.addSource(item.id, {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: convertCovidToMapCovids(dataBefore.data, item.id),
            } as FeatureCollection,
          });

          map.addLayer({
            ...layers[index],
            layout: {
              visibility: item.checked ? 'visible' : 'none',
            },
          } as mapboxgl.AnyLayer);
          document.getElementById(`${item.id}`)!.addEventListener('change', () => {
            stateCategories.forEach(itemVisible => {
              map.setLayoutProperty(
                `${itemVisible.id}`,
                'visibility',
                item.id === itemVisible.id ? 'visible' : 'none'
              );
            });
          });

          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
          });
          let lastId: number | undefined;
          map.on('mousemove', `${item.id}`, e => {
            const id = Number(e.features![0].properties!.id);
            if (id !== lastId) {
              lastId = id;
              const cases = Number(e.features![0].properties!.cases);
              const deaths = Number(e.features![0].properties!.deaths);
              const country = String(e.features![0].properties!.country);
              const recovered = String(e.features![0].properties!.recovered);
              const iso = String(e.features![0].properties!.iso);

              map.getCanvas().style.cursor = 'pointer';
              if (
                e.features![0].geometry.type === 'Point'
                && stateCategories[0].id === e.features![0].layer.id
              ) {
                const coordinates = e.features![0].geometry.coordinates.slice();
                const mortalityRate = ((deaths / (cases + 1)) * 100).toFixed(2);
                const countryFlagHTML = `<img src="https://www.countryflags.io/${iso}/flat/64.png"></img>`;
                const HTML = `<p>Country: <b>${country}</b></p>
                    <p>Cases: <b>${cases}</b></p>
                    <p>Deaths: <b>${deaths}</b></p>
                    <p>Recovered: <b>${recovered}</b></p>
                    <p>Mortality Rate: <b>${mortalityRate}%</b></p>
                    ${countryFlagHTML}`;
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                popup
                  .setLngLat(coordinates as LngLatLike)
                  .setHTML(HTML)
                  .addTo(map);
              } else if (
                e.features![0].geometry.type === 'Point'
                && item.id === stateCategories[1].id
              ) {
                const coordinates = e.features![0].geometry.coordinates.slice();
                const mortalityRate = ((deaths / (cases + 1)) * 100).toFixed(2);
                const countryFlagHTML = `<img src="https://www.countryflags.io/${iso}/flat/64.png"></img>`;
                const HTML = `<p>Country: <b>${country}</b></p>
                    <p>Cases Today: <b>${cases}</b></p>
                    <p>Deaths Today: <b>${deaths}</b></p>
                    <p>Recovered Today: <b>${recovered}</b></p>
                    <p>Mortality Rate: <b>${mortalityRate}%</b></p>
                    ${countryFlagHTML}`;
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                popup
                  .setLngLat(coordinates as LngLatLike)
                  .setHTML(HTML)
                  .addTo(map);
              } else if (
                e.features![0].geometry.type === 'Point'
                && item.id === stateCategories[2].id
              ) {
                const coordinates = e.features![0].geometry.coordinates.slice();
                const mortalityRate = ((deaths / (cases + 1)) * 100).toFixed(2);
                const countryFlagHTML = `<img src="https://www.countryflags.io/${iso}/flat/64.png"></img>`;
                const HTML = `<p>Country: <b>${country}</b></p>
                    <p>Cases on 100.000: <b>${cases}</b></p>
                    <p>Deaths on 100.000: <b>${deaths}</b></p>
                    <p>Recovered on 100.000: <b>${recovered}</b></p>
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
          map.on('mouseleave', `${item.id}`, () => {
            lastId = undefined;
            map.getCanvas().style.cursor = '';
            popup.remove();
          });
        });
      });
    }
  }, [expandMap, dataBefore]);

  return (
    <ComponentLayout onclickExpend={handlerClickExpand}>
      <div className={classNames(styles['map-covid'])}>
        <div className={styles['mapBox']} ref={mapboxElRef} />
      </div>
      <MenuMap
        categories={stateCategories}
        onChange={e => {
          setStateCategories(
            stateCategories.map((item, index) => {
              if (index === +e.target.value) {
                return { ...item, checked: true };
              }
              return { ...item, checked: false };
            })
          );
        }}
      />
    </ComponentLayout>
  );
};

export default MapCovid;
