const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../db/index');
const productsModel = require('../../../models/productsModel');

describe("Testando funções products da Camada Model", () => {
  describe("Função getAll", () => {
    
    let executeSpy;

    beforeEach(() => {
      const executeReturn = [
        {
            "id": 1,
            "name": "Martelo de Thor",
            "quantity": 10
        },
        {
            "id": 2,
            "name": "Traje de encolhimento",
            "quantity": 20
        },
        {
            "id": 3,
            "name": "Escudo do Capitão América",
            "quantity": 30
        }
    ];
      executeSpy = sinon.stub(connection, 'execute').resolves(executeReturn);
    });
  
    afterEach(() => {
      connection.execute.restore();
    })
  
    it("Quando getAll() é acionada", async () => {
      const response = await productsModel.getAll();
      expect(response).to.be.an('object');
      expect(response).to.be.not.empty;

      //Verificando chamada ao execute
      expect(executeSpy.callCount).to.be.equal(1); // chamou apenas uma vez o execute
      const query = executeSpy.getCalls()[0].firstArg.toUpperCase().replaceAll(' ', '');
      expect(query).to.contain('SELECT'); // se a query é um SELECT
      expect(query).to.contain('FROM'); // se a query tem FROM
    })
  })
  describe("Funçao getId", () => {
    
    let executeSpy;

    beforeEach(() => {
      const executeReturn = [ { id: 2, name: 'Traje de encolhimento', quantity: 20 } ];
      executeSpy = sinon.stub(connection, 'execute').resolves(executeReturn);
    });
  
    afterEach(() => {
      connection.execute.restore();
    })

    it("Quando getId() é acionada", async () => {
      const response = await productsModel.getId(2);
      expect(response[0]).to.be.an('object');
      expect(response[0]).to.be.not.empty;
      expect(response[0]).to.have.property('id');

      //Verificando chamada ao execute
      expect(executeSpy.callCount).to.be.equal(1); // chamou apenas uma vez o execute
      const query = executeSpy.getCalls()[0].firstArg.toUpperCase().replaceAll(' ', '');
      expect(query).to.contain('SELECT');
      expect(query).to.contain('WHERE');
      const where = query.split("WHERE")[1];
      expect(where).to.contain('ID=2');
    })
  })
})