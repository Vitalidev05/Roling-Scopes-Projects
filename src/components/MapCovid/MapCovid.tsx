import classNames from 'classnames';
import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';

import styles from '@/components/MapCovid/MapCovid.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapBoxToken from '@/constants';

import ComponentLayout from '../layout';

mapboxgl.accessToken = mapBoxToken;

const MapCovid = (): JSX.Element => {
  const mapboxElRef = useRef(null);
  const [expandMap, setExpandMap] = useState(false);
  const handlerClickExpand = () => {
    setExpandMap(prev => !prev);
  };
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapboxElRef.current || 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [10, 40],
      zoom: 2,
    });
    map.addControl(new mapboxgl.NavigationControl());
  }, [expandMap]);
  return (
    <ComponentLayout onclickExpend={handlerClickExpand}>
      <div className={classNames(styles['map-covid'])}>
        <div className={styles['mapBox']} ref={mapboxElRef} />
      </div>
    </ComponentLayout>
  );
};

export default MapCovid;
