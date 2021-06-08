import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import { spacing, fontSizes } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  return <Text key={index} style={styles.histortItem(item.status)}>{item.subject}</Text>;
};

export const TaskHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we've focused on</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title="Clear"
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  histortItem: (status) => ({
    color: status > 1 ? '#4a3287' : '#334fa3',
    fontSize: fontSizes.L,
  }),
  title: {
    color: colors.white,
    fontSize: fontSizes.L,
    alignItems: 'center',
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.M,
  },
});
