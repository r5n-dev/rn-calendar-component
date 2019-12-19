import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {
  ActionSheetProvider,
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet';

// @ts-ignore
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

const todayDate = new Date().toISOString().split('T')[0];
const currentMonth = todayDate.split(/-(?=[^-]+$)/)[0];
const singleDay = {
  [todayDate]: { selected: true },
};
const singleDayWithDifferentColors = {
  [todayDate]: { selected: true, backgroundColor: 'red', color: 'white' },
};

const week = {
  [`${currentMonth}-01`]: { selected: true },
  [`${currentMonth}-02`]: { selected: true },
  [`${currentMonth}-03`]: { selected: true },
  [`${currentMonth}-04`]: { selected: true },
  [`${currentMonth}-05`]: { selected: true },
  [`${currentMonth}-06`]: { selected: true },
  [`${currentMonth}-07`]: { selected: true },
};

const options = { singleDay, singleDayWithDifferentColors, week };

const App = () => {
  const { showActionSheetWithOptions } = useActionSheet();

  const [markedDates, setMarkedDates] = useState(singleDay);
  const [loaded, setLoaded] = useState<boolean>(true);
  const [firstDay, setFirstDay] = useState<0 | 1>(0);
  const [locale, setLocale] = useState<'en' | 'pl'>('en');

  const resetCalendar = () => {
    setLoaded(false);
    setMarkedDates(singleDay);
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  };

  const handleDayPress = (day: { dayString: string }) => {
    console.log(day);
    setMarkedDates(markedDates => ({
      ...markedDates,
      [day.dayString]: { selected: true },
    }));
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {loaded && (
          <Calendar
            endISODate="2020-12-31"
            firstDay={firstDay}
            locale={locale}
            markedDates={markedDates}
            onDayPress={handleDayPress}
            startISODate="2018-01-01"
          />
        )}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => setFirstDay(firstDay => (firstDay ? 0 : 1))}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Switch first day</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setLocale(locale => (locale === 'en' ? 'pl' : 'en'))}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Change locale</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              showActionSheetWithOptions(
                {
                  title: 'Marked Dates',
                  options: [...Object.keys(options), 'Done'],
                  cancelButtonIndex: Object.keys(options).length,
                },
                optionIndex => {
                  const optionsKeys = Object.keys(options);
                  const key = optionsKeys[optionIndex];
                  if (key) {
                    // @ts-ignore
                    setMarkedDates(options[key]);
                  }
                }
              )
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>Change markedDates</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={resetCalendar} style={styles.button}>
          <Text style={styles.buttonText}>Reset calendar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const ConnectedApp = connectActionSheet(App);

export default () => (
  <ActionSheetProvider>
    <ConnectedApp />
  </ActionSheetProvider>
);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    borderRadius: 10,
    backgroundColor: 'teal',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
