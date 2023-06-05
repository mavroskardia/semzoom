import { Component } from "../components/component";
import { Entity } from "../entity";

export interface System {
  id: string;
  components: Component[];
  process(ticks: number, entities: Entity[]): void;
}
