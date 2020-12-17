import classNames from 'classnames';
import React, { useState } from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';

import styles from '@/components/layout/ComponentLayout.scss';

import MaximizeIcon from '../icons/MaximizeIcon';
import MinimizeIcon from '../icons/MinimizeIcon';

interface PropsCL extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const ComponentLayout: FunctionComponent<PropsCL> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const handlerClickExpand = () => {
    setOpen(prev => !prev);
  };
  const expandIcon = open ? (
    <MinimizeIcon className={styles['expand-li-icon']} />
  ) : (
    <MaximizeIcon className={styles['expand-li-icon']} />
  );
  const classesMap = classNames(styles['covid'], open && styles['open-covid']);
  return (
    <div className={classesMap}>
      {children}
      <button className={styles['close']} type="button" onClick={() => handlerClickExpand()}>
        {expandIcon}
      </button>
    </div>
  );
};

export default ComponentLayout;
