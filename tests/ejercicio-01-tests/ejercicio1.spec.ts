import "mocha";
import { expect } from "chai";
import { Loger, ActionTypes, accion } from "../../src/ejercicio-01/ejercicio1";


describe('Tests for Loger class', () => {

  const fecha1 = new Date(2023, 5, 18);
  const fecha2 = new Date(2025, 8, 19);

  const fecha3 = new Date(2024, 8, 19);
  const fecha4 = new Date(2024, 5, 4);
  const fecha5 = new Date(2024, 9, 17)

  const acciones: accion[] = [['pepe', ActionTypes.InicioSesion, fecha3],
                              ['juan', ActionTypes.CambioRed, fecha4],
                              ['pepe', ActionTypes.Exportado, fecha5]]

  const loger = Loger.getLogerInstance(acciones);
  
  it('Correctly filters by user', () => {
    expect(loger.getActionsOfUser('pepe')).to.be.deep.equal([['pepe', ActionTypes.InicioSesion, fecha3],
                                                             ['pepe', ActionTypes.Exportado, fecha5]]);
  });

  it('Correctly filters by type', () => {
    expect(loger.getActionsByType(ActionTypes.InicioSesion)).to.be.deep.equal([['pepe', ActionTypes.InicioSesion, fecha3]]);
  });

  it('Correctly filters between two dates', () => {
    expect(loger.getActionsBetweenDates(fecha1, fecha2)).to.be.deep.equal([['pepe', ActionTypes.InicioSesion, fecha3],
                                                                           ['juan', ActionTypes.CambioRed, fecha4],
                                                                           ['pepe', ActionTypes.Exportado, fecha5]])
  });

  it('Correctly iterates', () => {
    const iterationNames: string[] = [];
    for (const accion of loger) {
      iterationNames.push(accion[0]);
    }
    expect(iterationNames).to.be.deep.equal(['pepe', 'juan', 'pepe']);
  });

});
