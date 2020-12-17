import classNames from 'classnames';
import React, { useState } from 'react';

import styles from '@/components/MapCovid/MapCovid.scss';

import MaximizeIcon from '../icons/MaximizeIcon';
import MinimizeIcon from '../icons/MinimizeIcon';

const MapCovid = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const handlerClickExpand = () => {
    setOpen(prev => !prev);
  };
  const expandIcon = open ? (
    <MinimizeIcon className={styles['expand-li-icon']} />
  ) : (
    <MaximizeIcon className={styles['expand-li-icon']} />
  );
  const classesMap = classNames(styles['map-covid'], open && styles['open-map-covid']);
  return (
    <div className={classesMap}>
      MapCovid
      <button className={styles['close']} type="button" onClick={() => handlerClickExpand()}>
        {expandIcon}
      </button>
    </div>
  );
};

export default MapCovid;
