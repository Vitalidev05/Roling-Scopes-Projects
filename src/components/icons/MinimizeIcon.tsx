import React from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';

import Icon from '@/assets/svg/Minimize.svg';
import BaseIcon from '@/components/icons/BaseIcon';

const MinimizeIcon: FunctionComponent<HTMLAttributes<HTMLElement>> = ({ ...restProps }) => (
  <BaseIcon {...restProps}>
    <Icon />
  </BaseIcon>
);

export default MinimizeIcon;
