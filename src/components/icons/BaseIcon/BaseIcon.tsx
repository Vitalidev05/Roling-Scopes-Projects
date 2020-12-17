import classNames from 'classnames';
import React from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';

import styles from '@/components/icons/BaseIcon/BaseIcon.scss';

const BaseIcon: FunctionComponent<HTMLAttributes<HTMLElement>> = ({
  className,
  children,
  ...restProps
}) => (
  <i
    className={classNames(
      styles['icon-body'],
      restProps.onClick && styles['icon-clickable'],
      className
    )}
    {...restProps}
  >
    {children}
  </i>
);

export default BaseIcon;
