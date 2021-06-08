import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, paddingSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

export const Task = ({ addTask }) => {
  const [tempStorage, setTempStorage] = useState(null);
  
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on? </Text>
        <View style={styles.inputTask}>
          <TextInput
            placeholder="What do you want to focus on?"
            style={{ flex: 1, marginRight: spacing.M }}
            onSubmitEditing={({ nativeEvent }) => {
              setTempStorage(nativeEvent.text);
            }}
          />
          <RoundedButton
            title="+"
            size={spacing.XXL}
            onPress={() => addTask(tempStorage)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.5,
    padding: paddingSizes.M,
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.L,
  },
  inputTask: {
    paddingTop: paddingSizes.M,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
