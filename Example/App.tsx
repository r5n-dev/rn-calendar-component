import React, { useState } from 'react';
import { SafeAreaView, Button, StatusBar } from 'react-native';

import { Calendar, Locales } from 'rn-calendar';

Locales.en = Locales.default;
Locales.pl = {
  monthNames: [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
  ],
  monthNamesShort: [
    'sty',
    'lut',
    'mar',
    'kwi',
    'maj',
    'cze',
    'lip',
    'sie',
    'wrz',
    'paź',
    'lis',
    'gru',
  ],
  dayNames: [
    'Niedziela',
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
  ],
  dayNamesShort: ['ndz', 'pon', 'wt', 'śr', 'czw', 'pt', 'sob'],
};

const App = () => {
  const [firstDay, setFirstDay] = useState<0 | 1>(0);
  const [locale, setLocale] = useState<'en' | 'pl'>('en');

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Calendar
          locale={locale}
          firstDay={firstDay}
          startISODate="2018-01-01"
          endISODate="2020-12-31"
        />

        <Button
          title="Switch first day"
          onPress={() => setFirstDay(firstDay => (firstDay ? 0 : 1))}
        />
        <Button
          title="Change Locale"
          onPress={() => setLocale(locale => (locale === 'en' ? 'pl' : 'en'))}
        />
      </SafeAreaView>
    </>
  );
};

export default App;
