import React from 'react';

import Chart from '@/components/GraphCovid/Chart';
import styles from '@/components/GraphCovid/GraphCovid.scss';

import ComponentLayout from '../layout';

const GraphCovid = (): JSX.Element => (
  <div className={styles['graph-covid']}>
    <Chart />
  </div>
);

export default GraphCovid;
