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
const singleDay = {
  [todayDate]: { selected: true },
};
const singleDayWithDifferentColors = {
  [todayDate]: { selected: true, backgroundColor: 'red', color: 'white' },
};

const options = { singleDay, singleDayWithDifferentColors };

const App = () => {
  const { showActionSheetWithOptions } = useActionSheet();

  const [markedDates, setMarkedDates] = useState(singleDay);
  const [loaded, setLoaded] = useState<boolean>(true);
  const [firstDay, setFirstDay] = useState<0 | 1>(0);
  const [locale, setLocale] = useState<'en' | 'pl'>('en');

  const handleDayPress = day => {
    console.log(day);
    setMarkedDates({ [day.dayString]: { selected: true } });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {loaded && (
          <Calendar
            onDayPress={handleDayPress}
            locale={locale}
            firstDay={firstDay}
            startISODate="2018-01-01"
            endISODate="2020-12-31"
            markedDates={markedDates}
          />
        )}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setFirstDay(firstDay => (firstDay ? 0 : 1))}
          >
            <Text style={styles.buttonText}>Switch first day</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setLocale(locale => (locale === 'en' ? 'pl' : 'en'))}
          >
            <Text style={styles.buttonText}>Change locale</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
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
          >
            <Text style={styles.buttonText}>Change markedDates</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setLoaded(false);
            setTimeout(() => {
              setLoaded(true);
            }, 1000);
          }}
        >
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
