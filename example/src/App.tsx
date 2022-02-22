import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// @ts-expect-error
import { Calendar, Locales } from 'rn-calendar-component';

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
  dayNames: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
  dayNamesShort: ['ndz', 'pon', 'wt', 'śr', 'czw', 'pt', 'sob'],
};

const todayDate = new Date().toISOString().split('T')[0];
const singleDay = {
  [todayDate]: { selected: true },
};

const App = () => {
  const [markedDates, setMarkedDates] = useState(singleDay);
  const [loaded, setLoaded] = useState<boolean>(true);
  const [firstDay, setFirstDay] = useState<0 | 1>(0);
  const [locale, setLocale] = useState<'en' | 'pl'>('en');
  const [showExtraDays, setShowExtraDays] = useState<boolean>(true);
  const [horizontal, setHorizontal] = useState<boolean>(false);

  const resetCalendar = () => {
    setLoaded(false);
    setMarkedDates(singleDay);
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  };

  const handleDayPress = useCallback((day: { dayString: string }) => {
    setMarkedDates((markedDates) => ({
      ...markedDates,
      [day.dayString]: markedDates[day.dayString] ? undefined : { selected: true, inSeries: true },
    }));
  }, []);

  const handleToggleFirstDay = useCallback(() => setFirstDay((firstDay) => (firstDay ? 0 : 1)), []);

  const handleToggleLocale = useCallback(
    () => setLocale((locale) => (locale === 'en' ? 'pl' : 'en')),
    [],
  );

  const handleToggleShowExtraDays = useCallback(
    () => setShowExtraDays((showExtraDays) => !showExtraDays),
    [],
  );

  const handleToggleHorizontal = useCallback(() => setHorizontal((horizontal) => !horizontal), []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {loaded && (
          <Calendar
            currentDay={todayDate}
            endISODate={
              new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                .toISOString()
                .split('T')[0]
            }
            firstDay={firstDay}
            showArrows={true}
            showExtraDays={showExtraDays}
            horizontal={horizontal}
            locale={locale}
            markedDates={markedDates}
            onDayPress={handleDayPress}
            startISODate={new Date(new Date().setDate(0)).toISOString().split('T')[0]}
          />
        )}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleToggleFirstDay} style={styles.button}>
            <Text style={styles.buttonText}>Switch first day</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleToggleLocale} style={styles.button}>
            <Text style={styles.buttonText}>Change locale</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleToggleShowExtraDays} style={styles.button}>
            <Text style={styles.buttonText}>Show extra dates</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleToggleHorizontal} style={styles.button}>
            <Text style={styles.buttonText}>Toggle direction</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={resetCalendar} style={styles.button}>
          <Text style={styles.buttonText}>Reset calendar</Text>
        </TouchableOpacity>

        {/*
          <ScrollView style={styles.calendarInfoContainer}>
            <Text>firstDay: {firstDay}</Text>
            <Text>locale: {locale}</Text>
            <Text>showExtraDays: {`${showExtraDays}`}</Text>
            <Text>markedDates: {JSON.stringify(markedDates)}</Text>
          </ScrollView>
        */}
      </SafeAreaView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'teal',
    borderRadius: 10,
    justifyContent: 'center',
    margin: 2,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  calendarInfoContainer: {
    maxHeight: 100,
  },
  container: { alignItems: 'center', flex: 1, justifyContent: 'center' },
});
