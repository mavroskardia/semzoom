import { SemzoomContent } from "../types/content";
import { Entity } from "./entity";
import { System } from "./systems/system";

export class EntityComponentSystem {
  canvas!: HTMLCanvasElement;
  systems: Array<System> = [];
  entities: Array<Entity> = [];

  // temporary in-memory init configurations
  temp_init() {
    const ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  add_entity(entity: Entity) {
    this.entities.push(entity);
  }

  add_system(system: System) {
    this.systems.push(system);
  }

  /**
   *
   * The main processing loop for the ECS. Ensures each system added to the
   * ECS has the opportunity to run its process.
   *
   * @param ticks Interval of time that has passed since last call to loop()
   */
  loop(ticks: number) {
    this.systems.forEach((system) => {
      const entities = this.is_component_match(system, this.entities);
      system.process(ticks, entities);
    });
    requestAnimationFrame(this.loop.bind(this));
  }

  /**
   * Only returns those entities that have match this systems desired
   * component set.
   *
   * For example, an entity might have components C1, C2, and C3 and the
   * system might process only those entities with C1 and C3. The entity would
   * match in this case.
   *
   * However, if an entity has C1 and C2 but the system is seeking C2 and C3,
   * that entity would not match.
   *
   * @param system The system to match against
   * @param entities The entities to match against
   */
  is_component_match(system: System, entities: Entity[]): Entity[] {
    const matchingentities = entities.filter((e) => {
      const matchingcomponents = e.components.filter((c) =>
        system.components.find(
          (sc) => sc.constructor.name == c.constructor.name
        )
      );
      return matchingcomponents.length == system.components.length; // hacky, but will do for the moment
    });
    return matchingentities;
  }

  /**
   * Initialize the Entity Component System prior to starting main loop.
   *
   * @param canvas For systems that require an outlet for renderables
   * @param szcontent The current scene's data
   */
  init(canvas: HTMLElement, szcontent: SemzoomContent) {
    debugger;
  }
}
