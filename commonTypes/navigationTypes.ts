import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { CrewMemberType } from './crewMember';

export type RootStackParamList = {
  Rockets: undefined;
  CrewMembers: undefined;
  CrewMembersMain: undefined;
  CrewMember: CrewMemberType | undefined;
};

export type NavProps = NativeStackScreenProps<RootStackParamList>; // used to typecheck navigation props imported in screens/components

export type DefaultNavigationProp = NativeStackNavigationProp<RootStackParamList>; // used to typecheck useNavigation hook
