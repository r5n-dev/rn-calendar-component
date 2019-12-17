import React, { useState } from 'react';
import { SafeAreaView, Button, StatusBar } from 'react-native';

import { Calendar } from 'rn-calendar';

const App = () => {
  const [firstDay, setFirstDay] = useState<0 | 1>(0);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Calendar
          calendarHeight={380}
          firstDay={firstDay}
          startISODate="2014-01-01"
          endISODate="2019-12-31"
        />

        <Button
          title="Switch first day"
          onPress={() => setFirstDay(firstDay => (firstDay ? 0 : 1))}
        />
        <Button
          title="Change Locale"
          onPress={() => setFirstDay(firstDay => (firstDay ? 0 : 1))}
        />
      </SafeAreaView>
    </>
  );
};

export default App;
