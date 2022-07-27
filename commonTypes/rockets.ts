export interface RocketType {
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: Date;
  country: string;
  company: string;
  wikipedia: string;
  description: string;
  height?: {
    meters: number;
    feet: number;
  };
  mass: {
    kg: number;
    lb: number;
  };
}
