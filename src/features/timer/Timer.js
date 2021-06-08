import React, { useState } from 'react';
import { Text, View, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';

const DEFAULT_TIME = 1;
const DEFAULT_PROGRESS = 1;

export const Timer = ({ focusSubject, onTimerEnd, clearTask }) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(1);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const onEnd = () => {
    vibrate();
    setMinutes(1);
    setProgress(DEFAULT_PROGRESS);
    setIsStarted(false);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(DEFAULT_PROGRESS);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>

      <View style={{ paddingTop: spacing.XXXL }}>
        <Text style={styles.title}>Focusing on: </Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: spacing.S }}>
        <ProgressBar
          progress={progress}
          color="#40c2b9"
          style={{ height: 10 }}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearTask}>
      <RoundedButton title="-" size={50} onPress={() => clearTask()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearTask: {
    paddingBottom: 25,
    paddingLeft: 25,
  }
});
