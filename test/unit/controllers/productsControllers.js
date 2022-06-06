const { expect } = require('chai');
const sinon = require('sinon');
const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');

describe("Testando funções products da Camada de Controller", () => {
  describe("getFunction: Quando existem produtos", () => {

    const req = {};
    const res = {};
    
    before(() => {

      const noIdReturn = [
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

      sinon.stub(productsService, 'getAll').resolves(noIdReturn);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

    });
  
    after(() => {
      productsService.getAll.restore();
    })
  
    it('é chamado o método "status" passando o código 200', async () => {
      await productsController.getFunction(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await productsController.getFunction(req, res);

      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe("getFunctionId", () => {

    const req = {};
    const res = {};
    
    before(() => {

      const IdReturn = [ [ { id: 1, name: 'Martelo de Thor', quantity: 10 } ] ];

      sinon.stub(productsService, 'getAll').resolves(IdReturn);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.params = { id: 1 };

    });
  
    after(() => {
      productsService.getAll.restore();
    })
  
    it('é chamado o método "status" passando o código 200', async () => {
      await productsController.getIdFunction(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await productsController.getIdFunction(req, res);

      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  describe("Post: produto que já existe", () => {

    const req = {};
    const res = {};
    
    before(() => {

      const productExist = { status: 409, resp: { message: 'Product already exists' } };

      sinon.stub(productsService, 'postProduct').resolves(productExist);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

    });
  
    after(() => {
      productsService.postProduct.restore();
    })
  
    it('é chamado o método "status" passando o código 409', async () => {
      await productsController.postFunction(req, res);

      expect(res.status.calledWith(409)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await productsController.postFunction(req, res);

      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  describe("Put: produto que não existe", () => {

    const req = {};
    const res = {};
    
    before(() => {

      const productNotFound = { status: 404, resp: { message: 'Product not found' } };

      sinon.stub(productsService, 'putProduct').resolves(productNotFound);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.params = { id: 999 };
      req.body = { name: 'name', quantity: 100 };

    });
  
    after(() => {
      productsService.putProduct.restore();
    })
  
    it('é chamado o método "status" passando o código 404', async () => {
      await productsController.putFunction(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await productsController.putFunction(req, res);

      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  describe("Delete", () => {

    const req = {};
    const res = {};
    
    before(() => {

      sinon.stub(productsService, 'deleteProduct').resolves(null);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.params = { id: 1 };

    });
  
    after(() => {
      productsService.deleteProduct.restore();
    })
  
    it('é chamado o método "status" passando o código 204', async () => {
      await productsController.deleteFunction(req, res);

      expect(res.status.calledWith(204)).to.be.equal(true);
    });

    it('é chamado o método "json" passando objeto', async () => {
      await productsController.putFunction(req, res);

      expect(res.json.calledWith(sinon.match.object)).to.be.equal(false);
    });
  });
})


