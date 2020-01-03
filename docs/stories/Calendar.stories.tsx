import React from 'react';

import { Calendar } from '../../src';
import { Day, DayNames, Week, MonthTitle } from '../../src/components';

export default {
  title: 'Calendar|Examples',
  subcomponents: { Day, DayNames, Week, MonthTitle },
};

export const DefaultCalendar = () => (
  <Calendar endISODate="2020-12-31" startISODate="2020-01-01" />
);
