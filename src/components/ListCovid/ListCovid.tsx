import React from 'react';

import styles from '@/components/ListCovid/ListCovid.scss';

import ComponentLayout from '../layout';

const ListCovid = (): JSX.Element => (
  <ComponentLayout>
    <div className={styles['list-covid']}>ListCovid</div>
  </ComponentLayout>
);

export default ListCovid;
