import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Rockets: undefined;
  CrewMembers: undefined;
  CrewMembersMain: undefined;
  CrewMember: undefined;
};

export type NavProps = NativeStackScreenProps<RootStackParamList>;
