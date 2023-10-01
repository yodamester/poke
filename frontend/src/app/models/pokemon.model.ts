export interface Pokemon {
    id: number;
    name: string;
    img: string;
    abilities: [Ability];
    weight: number;
    height: number;
    stats: [Stat]
  }

  export interface Ability {
    name: string;
  }

  export interface Stat {
    name: string;
    value: number;
  }