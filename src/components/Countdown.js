import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';
import { spacing, fontSizes } from '../utils/sizes';

const minutesToMilliseconds = (min) => min * 1000 * 60;

const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);

  const [milliseconds, setMilliseconds] = useState(null);

  const countDown = () => {
    setMilliseconds((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      onProgress(timeLeft / minutesToMilliseconds(minutes));
      return timeLeft;
    });
  };

  useEffect(() => {
    setMilliseconds(minutesToMilliseconds(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minutesRemaining = Math.floor(milliseconds / 1000 / 60) % 60;
  const secondsRemaining = Math.floor(milliseconds / 1000) % 60;
  return (
    <Text style={styles.text}>
      {formatTime(minutesRemaining)}:{formatTime(secondsRemaining)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.XXXL,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.L,
    backgroundColor: 'rgba(42, 181, 172, 0.3)',
  },
});
