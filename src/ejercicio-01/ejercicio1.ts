
/**
 * Enum representing the different types of actions.
 */
export enum ActionTypes {
  InicioSesion,
  CambioRed,
  Exportado
}

/**
 * Type representing an action.
 */
export type accion = [string, ActionTypes, Date];

/**
 * Class representing a logger.
 */
export class Loger implements Iterable<accion> {
  private acciones: accion[];

  private static logerInstance: Loger;

  /**
   * Creates an instance of Loger.
   * @param acciones - The initial actions for the logger.
   */
  private constructor(acciones: accion[]) {
    this.acciones = acciones;
  }

  /**
   * Gets the singleton instance of Loger.
   * @param acciones - The initial actions for the logger.
   * @returns The singleton instance of Loger.
   */
  public static getLogerInstance(acciones: accion[]) {
    if (!Loger.logerInstance) {
      Loger.logerInstance = new Loger(acciones);
    }
    return Loger.logerInstance;
  }

  /**
   * Gets the actions performed by a specific user.
   * @param user - The user for which to retrieve the actions.
   * @returns The actions performed by the specified user.
   */
  getActionsOfUser(user: string) {
    return Loger.logerInstance.acciones.filter((accion) => accion[0] === user);
  }

  /**
   * Gets the actions of a specific type.
   * @param actionType - The type of actions to retrieve.
   * @returns The actions of the specified type.
   */
  getActionsByType(actionType: ActionTypes) {
    return Loger.logerInstance.acciones.filter((accion) => accion[1] === actionType);
  }

  /**
   * Gets the actions performed between two dates.
   * @param date1 - The start date.
   * @param date2 - The end date.
   * @returns The actions performed between the specified dates.
   */
  getActionsBetweenDates(date1: Date, date2: Date) {
    if (date1 > date2) {
      const aux = date1;
      date1 = date2;
      date2 = aux;
    }
    return Loger.logerInstance.acciones.filter((accion) => accion[2] >= date1 && accion[2] <= date2);
  }

  /**
   * Returns an iterator for the actions.
   * @returns An iterator for the actions.
   */
  [Symbol.iterator](): IterableIterator<accion> {
    return Loger.logerInstance.acciones.values();
  }
}