export interface RocketType {
  id: number;
  name: string;
  type: string;
  active?: boolean;
  stages?: number;
  boosters?: number;
  cost_per_launch?: number;
  success_rate_pct?: number;
  first_flight?: Date;
  country?: string;
  company?: string;
  wikipedia?: string;
  description?: string;
  flickr_image: string;
  height?: {
    meters: number;
    feet: number;
  };
  mass?: {
    kg: number;
    lb: number;
  };
}

export interface FuncNoReturnNoParams {
  function: () => void;
}
