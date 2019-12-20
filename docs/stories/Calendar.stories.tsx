import React from 'react';

import { Calendar } from '../../src';
import { Day, DayNames, Week, MonthTitle } from '../../src/components';

export const A = {
  title: 'Calendar',
  component: () => (
    <Calendar endISODate="2019-12-31" startISODate="2019-01-01" />
  ),
  subcomponents: { Day, DayNames, Week, MonthTitle },
};
