import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import {
  ActionSheetProvider,
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet';

// @ts-ignore
import { Calendar, Locales } from '@versum/rn-calendar';

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

const singleDayWithDot = {
  [todayDate]: { dots: { someKey: { color: 'red' } } },
};

const singleSelectedDayWithDot = {
  [todayDate]: {
    selected: true,
    dots: { someKey: { selectedColor: 'black' } },
  },
};

const singleSelectedDayWithMultipleDots = {
  [todayDate]: {
    selected: true,
    dots: { someKey: { color: 'red' }, anotherKey: { color: 'green' } },
  },
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

const options = {
  singleDay,
  singleDayWithDifferentColors,
  singleDayWithDot,
  singleSelectedDayWithDot,
  singleSelectedDayWithMultipleDots,
  week,
};

const App = () => {
  const { showActionSheetWithOptions } = useActionSheet();

  const [markedDates, setMarkedDates] = useState(singleDay);
  const [loaded, setLoaded] = useState<boolean>(true);
  const [firstDay, setFirstDay] = useState<0 | 1>(0);
  const [locale, setLocale] = useState<'en' | 'pl'>('en');
  const [hideExtraDays, setHideExtraDays] = useState<boolean>(true);
  const [horizontal, setHorizontal] = useState<boolean>(false);

  const resetCalendar = () => {
    setLoaded(false);
    setMarkedDates(singleDay);
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  };

  const handleDayPress = (day: { dayString: string }) => {
    setMarkedDates((markedDates) => ({
      ...markedDates,
      [day.dayString]: { selected: true },
    }));
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.calendarWrapper}>
          {loaded && (
            <Calendar
              currentDay={todayDate}
              endISODate="2020-12-31"
              firstDay={firstDay}
              hideArrows={false}
              hideExtraDays={hideExtraDays}
              horizontal={horizontal}
              locale={locale}
              markedDates={markedDates}
              onDayPress={handleDayPress}
              startISODate="2020-01-01"
            />
          )}
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => setFirstDay((firstDay) => (firstDay ? 0 : 1))}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Switch first day</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setLocale((locale) => (locale === 'en' ? 'pl' : 'en'))
            }
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
                (optionIndex: number) => {
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

          <TouchableOpacity
            onPress={() => setHideExtraDays((hideExtraDays) => !hideExtraDays)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Show extra dates</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setHorizontal((horizontal) => !horizontal)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Toggle direction</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={resetCalendar} style={styles.button}>
          <Text style={styles.buttonText}>Reset calendar</Text>
        </TouchableOpacity>

        <ScrollView style={styles.calendarInfoContainer}>
          <Text>firstDay: {firstDay}</Text>
          <Text>locale: {locale}</Text>
          <Text>hideExtraDays: {`${hideExtraDays}`}</Text>
          <Text>markedDates: {JSON.stringify(markedDates)}</Text>
        </ScrollView>
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
  calendarWrapper: { width: 300 },
  container: { alignItems: 'center', flex: 1, justifyContent: 'center' },
});
