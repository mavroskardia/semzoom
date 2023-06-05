import { Component } from "./components/component";

export class Entity {
  id: string;
  components: Array<Component> = [];

  constructor(id: string, components: Array<Component>) {
    this.id = id;
    this.components = components;
  }
}
