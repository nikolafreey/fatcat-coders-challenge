import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function RocketDetails({ active, type, country, cost_per_launch }: RocketDetailsProps) {
  return (
    <View style={[styles.details]}>
      <Text style={[styles.detailItem]}>{active ? '✔️' : '❌'}</Text>
      <Text style={[styles.detailItem]}>{type.toUpperCase()}</Text>
      <Text style={[styles.detailItem]}>{country.toUpperCase()}</Text>
      <Text style={[styles.detailItem]}>{cost_per_launch?.toString()}</Text>
    </View>
  );
}

export default RocketDetails;

interface RocketDetailsProps {
  active?: boolean;
  type: string;
  country: string;
  cost_per_launch?: number;
}

const styles = StyleSheet.create({
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});
