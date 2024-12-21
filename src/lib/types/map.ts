export interface Point {
  x: number;
  y: number;
}

export interface MapPath {
  color: string;
  width: number;
  points: Point[];
}

export interface Landmark {
  type: string;
  position: Point;
}

export interface MapDie {
  id: string;
  type: 'biome' | 'landmark' | 'bonus';
  value: number;
  position: Point;
}

export interface MapState {
  paths: MapPath[];
  landmarks: Landmark[];
  currentLocation: Point | null;
  dice: MapDie[];
}