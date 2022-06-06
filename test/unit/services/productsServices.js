const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require ('../../../services/productsService');
const productsModel = require('../../../models/productsModel')

describe("Testando funções products da Camada de Service", () => {
  describe("Função getAll()", () => {
    
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
    const idReturn = {
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    };
      executeSpy = sinon.stub(productsModel, 'getAll').resolves(executeReturn);
      executeSpy2 = sinon.stub(productsModel, 'getId').resolves(idReturn);
    });
  
    afterEach(() => {
      productsModel.getAll.restore();
      productsModel.getId.restore();
    });
  
    it("Quando getAll() é acionada", async () => {
      const response = await productsService.getAll();
      expect(response).to.be.an('array');
      expect(response).to.be.not.empty;
      expect(response.length).to.be.equal(3);

      expect(executeSpy.callCount).to.be.equal(1);
    });

    it("Quando getAll() é acionada com id", async () => {
      const response = await productsService.getAll(2);
      expect(response).to.be.an('object');
      expect(response).to.be.not.empty;
      expect(response).to.have.property('id');
      expect(response).to.have.property('name');
      expect(response).to.have.property('quantity');

      expect(executeSpy.callCount).to.be.equal(0);
      expect(executeSpy2.callCount).to.be.equal(1);
    });
  });
  describe("Função postProduct() com produto já cadastrado", () => {
    
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
    const idReturn = {
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    };
      executeSpy = sinon.stub(productsModel, 'getAll').resolves(executeReturn);
      executeSpy2 = sinon.stub(productsModel, 'getId').resolves(idReturn);
    });
  
    afterEach(() => {
      productsModel.getAll.restore();
      productsModel.getId.restore();
    });
  
    it("Quando postProduct() é acionada", async () => {
      const objectExample = 
        {
          name: "Martelo de Thor",
          quantity: 10
        }
      const response = await productsService.postProduct(objectExample);
      expect(response).to.be.an('object');
      expect(response).to.be.not.empty;
      expect(response).to.have.property('resp');
      expect(response).to.have.property('status');
      expect(response.status).to.be.equal(409);

      expect(executeSpy.callCount).to.be.equal(1);
    });
  });

  describe("Função deleteProduct() com produto não existente", () => {
    
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
    const idReturn = {
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    };
      executeSpy = sinon.stub(productsModel, 'getAll').resolves(executeReturn);
      executeSpy2 = sinon.stub(productsModel, 'getId').resolves(idReturn);
    });
  
    afterEach(() => {
      productsModel.getAll.restore();
      productsModel.getId.restore();
    });
  
    it("Quando postProduct() é acionada", async () => {
      const idExample = 999;

      const response = await productsService.deleteProduct(idExample);
      expect(response).to.be.an('object');
      expect(response).to.be.not.empty;
      expect(response).to.have.property('resp');
      expect(response).to.have.property('status');
      expect(response.status).to.be.equal(404);

      expect(executeSpy.callCount).to.be.equal(1);
    });
  });
});