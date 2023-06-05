import { SemzoomContent } from "../types/content";
import { Animated } from "./components/animated";
import { Box } from "./components/box";
import { SimpleRenderable } from "./components/renderable";
import { ECSText } from "./components/text";
import { Entity } from "./entity";
import { AnimatorSystem } from "./systems/animator";
import { CanvasRenderingSystem } from "./systems/canvas";
import { System } from "./systems/system";
import { TextRendererSystem } from "./systems/text";
import { Dimensions, Vec2 } from "./types";

function intersect<T>(setA: Set<T>, setB: Set<T>, ...args: Set<T>[]): Set<T> {
  const intersection = new Set<T>([...setA].filter((i) => setB.has(i)));
  if (args.length === 0) return intersection;
  return intersect(intersection, args.shift() ?? new Set<T>(), ...args);
}

export class EntityComponentSystem {
  canvas!: HTMLCanvasElement;
  systems: Array<System> = [];
  entities: Array<Entity> = [];

  // temporary in-memory init configurations
  temp_init() {
    this.add_system(new CanvasRenderingSystem("crs", this.canvas));
    this.add_system(
      new AnimatorSystem(new Dimensions(this.canvas.width, this.canvas.height))
    );
    this.add_system(
      new TextRendererSystem(
        this.canvas.getContext("2d") as CanvasRenderingContext2D
      )
    );
    const entity1 = new Entity("box", [
      new SimpleRenderable(),
      new Box(),
      new Animated(0.5, 0.5),
    ]);
    const entity2 = new Entity("text1", [
      new SimpleRenderable(new Vec2(100, 100)),
      new ECSText("Hello, World!"),
    ]);
    this.add_entity(entity1);
    this.add_entity(entity2);
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
  init(canvas: HTMLCanvasElement, szcontent: SemzoomContent) {
    this.canvas = canvas;
  }
}
