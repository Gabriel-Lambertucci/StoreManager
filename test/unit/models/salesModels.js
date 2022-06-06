const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../db/index');
const salesModel = require('../../../models/salesModel');

describe("Testando funções sales da Camada Model", () => {
  describe("Funções Get", () => {
    
    let executeSpy;

    beforeEach(() => {
      const executeReturn =[
        {
            "saleId": 1,
            "date": "2022-06-04T15:58:49.000Z",
            "productId": 1,
            "quantity": 5
        },
        {
            "saleId": 1,
            "date": "2022-06-04T15:58:49.000Z",
            "productId": 2,
            "quantity": 10
        },
        {
            "saleId": 2,
            "date": "2022-06-04T15:58:49.000Z",
            "productId": 1,
            "quantity": 6
        }
    ];
      executeSpy = sinon.stub(connection, 'execute').resolves(executeReturn);
    });
  
    afterEach(() => {
      connection.execute.restore();
    })
  
    it("Quando getAll() é acionada", async () => {
      const response = await salesModel.getAll();
      expect(response).to.be.an('array');
      expect(response).to.be.not.empty;
      expect(response.length).to.be.equal(3);

      //Verificando chamada ao execute
      expect(executeSpy.callCount).to.be.equal(1);
      const query = executeSpy.getCalls()[0].firstArg.toUpperCase().replaceAll(' ', '');
      expect(query).to.contain('SELECT');
      expect(query).to.contain('INNERJOIN');
    })

    it("Quando getId() é acionada", async () => {
      const response = await salesModel.getId(2);
      expect(response[1]).to.be.an('object');
      expect(response[1]).to.be.not.empty;
      expect(response[1]).to.have.property('saleId');

      //Verificando chamada ao execute
      expect(executeSpy.callCount).to.be.equal(1); // chamou apenas uma vez o execute
      const query = executeSpy.getCalls()[0].firstArg.toUpperCase().replaceAll(' ', '');
      expect(query).to.contain('SELECT');
      expect(query).to.contain('WHERE');
      const where = query.split("WHERE")[1];
      expect(where).to.contain('ID=2');
    })
  })
});