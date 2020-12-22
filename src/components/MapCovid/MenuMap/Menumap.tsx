import React from 'react';

import styles from '@/components/MapCovid/MenuMap/MenuMap.scss';
import { ICategory } from '@/types/Covid';

export interface IRadioGroup {
  categories: ICategory[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MenuMap: React.FC<IRadioGroup> = ({ categories, onChange }): JSX.Element => (
  <div className={styles['filter-group']}>
    {categories.map((item, index) => (
      <div key={item.id}>
        <input
          id={`${item.id}`}
          type="radio"
          name="group"
          value={index}
          checked={item.checked}
          onChange={e => onChange(e)}
        />
        <label htmlFor={`${item.id}`}>{item.name}</label>
      </div>
    ))}
  </div>
);
export default MenuMap;