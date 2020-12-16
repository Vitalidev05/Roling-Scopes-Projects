import React from 'react';

import styles from '@/components/App/App.scss';
import Footer from '@/components/Footer';
import GraphCovid from '@/components/GraphCovid';
import ListCovid from '@/components/ListCovid';
import MapCovid from '@/components/MapCovid';
import TableCovid from '@/components/TableCovid';

const App = (): JSX.Element => (
  <React.Fragment>
    <div className={styles['covid']}>
      <div className={styles['list-container']}>
        <ListCovid />
      </div>
      <div className={styles['map-container']}>
        <MapCovid />
      </div>
      <div className={styles['table-container']}>
        <TableCovid />
        <GraphCovid />
      </div>
    </div>
    <Footer />
  </React.Fragment>
);

export default App;
