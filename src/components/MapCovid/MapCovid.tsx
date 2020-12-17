import classNames from 'classnames';
import React from 'react';

import styles from '@/components/MapCovid/MapCovid.scss';

import ComponentLayout from '../layout';

const MapCovid = (): JSX.Element => (
  <ComponentLayout>
    <div className={classNames(styles['map-covid'])}>Map</div>
  </ComponentLayout>
);

export default MapCovid;
