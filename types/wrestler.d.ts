export interface SeasonRecord {
  wins: string;
  losses: string;
}

export interface PlacementData {
  tournament: string;
  customTournament?: string;
  year: string;
  place: string;
}

export interface WrestlerData {
  name: string;
  grade: number;
  seasonRecords: SeasonRecord[];
  placements: PlacementData[];
}