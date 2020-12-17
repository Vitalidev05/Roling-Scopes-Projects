import React from 'react';

import styles from '@/components/TableCovid/TableCovid.scss';

import ComponentLayout from '../layout';

const TableCovid = (): JSX.Element => (
  <ComponentLayout>
    <div className={styles['table-covid']}>TableCovid</div>
  </ComponentLayout>
);

export default TableCovid;
