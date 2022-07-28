import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function RocketDetails({ active, type, country, cost_per_launch, company }: RocketDetailsProps) {
  return (
    <View>
      <View style={styles.wrapper}>
        <View style={[styles.details]}>
          <Text style={[styles.detailItem]}>
            <Text style={{ fontWeight: 'bold' }}>Active: </Text>
            {active ? '✔️' : '❌'}
          </Text>
          <Text style={[styles.detailItem]}>
            <Text style={{ fontWeight: 'bold' }}>Type: </Text>
            {type.toUpperCase()}
          </Text>
        </View>
        <View style={[styles.details]}>
          <Text style={[styles.detailItem]}>
            <Text style={{ fontWeight: 'bold' }}>Launch Cost: </Text>
            {cost_per_launch} 💵
          </Text>
          <Text style={[styles.detailItem]}>
            <Text style={{ fontWeight: 'bold' }}>Company: </Text>
            {company}
          </Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.countryName}>
        <Text style={[styles.detailItem]}>{country.toUpperCase()}</Text>
      </View>
    </View>
  );
}

export default RocketDetails;

interface RocketDetailsProps {
  active?: boolean;
  type: string;
  country: string;
  cost_per_launch?: number;
  company: string;
}

const styles = StyleSheet.create({
  wrapper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 8 },
  details: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
  countryName: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  divider: {
    width: '70%',
    marginHorizontal: 48,
    borderBottomColor: 'dark-gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
