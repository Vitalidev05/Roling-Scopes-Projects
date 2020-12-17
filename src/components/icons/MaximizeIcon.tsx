import React from 'react';
import type { FunctionComponent, HTMLAttributes } from 'react';

import Icon from '@/assets/svg/Maximize.svg';
import BaseIcon from '@/components/icons/BaseIcon';

const MaximizeIcon: FunctionComponent<HTMLAttributes<HTMLElement>> = ({ ...restProps }) => (
  <BaseIcon {...restProps}>
    <Icon />
  </BaseIcon>
);

export default MaximizeIcon;
