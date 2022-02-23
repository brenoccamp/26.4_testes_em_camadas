const sinon = require('sinon');
const { expect } = require('chai');

const MoviesService = require('../../services/movieService');
const MoviesController = require('../../controllers/movieController');

describe('Ao chamar o controller de create', () => {
  describe('quando o payload informado não é válido', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();

      sinon.stub(MoviesService, 'create')
        .resolves(false);
    });

    after(() => {
      MoviesService.create.restore();
    });

    it('é chamado o status com o código 400', async () => {
      await MoviesController.create(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('é chamado o send com a mensagem "Dados inválidos"', async () => {
      await MoviesController.create(request, response);

      expect(response.send.calledWith('Dados inválidos')).to.be.equal(true);
    });

  });

  describe('quando é inserido com sucesso', async () => {
    const response = {/* status: () => {}, send: () => {}*/};
    const request = {};

    before(() => {
      request.body = {
        title: 'Example Movie',
        directedBy: 'Jane Dow',
        releaseYear: 1999,
      };

      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();
      // sinon.stub(response, 'status').returns(response);
      // sinon.stub(response, 'send').returns();

      sinon.stub(MoviesService, 'create')
        .resolves(true);
    })

    after(() => {
      MoviesService.create.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await MoviesController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o send com a mensagem "Filme criado com sucesso!"', async () => {
      await MoviesController.create(request, response);

      expect(response.send.calledWith('Filme criado com sucesso!')).to.be.equal(true);
    });
  });
});

describe('When called getById Controller', () => {
  let request = {}, response = {};
  describe('with invalid "id"', () => {
    before(() => {
      request.body = {
        id: 'a',
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    it('call response.status with 422 and response.json as: "{ message: "Invalid id" }"', async () => {
      await MoviesController.getById(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
      expect(response.json.calledWith({ message: 'Invalid id' })).to.be.equal(true);
    });
  });
})