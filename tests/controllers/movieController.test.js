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

  describe('when "id" is valid but not found', () => {
    before(() => {
      request.body = {
        id: '0',
      };

      const serviceResponse = {
        status: 404,
        error_message: 'Movie not found'
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(MoviesService, 'getById').resolves(serviceResponse);
    });

    after(() => {
      MoviesService.getById.restore();
    });

    it('call response.status with 404 and response.json as: "{ error_message: "Movie not found" }"', async () => {
      await MoviesController.getById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({ error_message: 'Movie not found' })).to.be.equal(true);
    });
  });

  describe('when "id" is valid', () => {
    const serviceResponse = {
      status: 200,
      data: {
        id: 1,
        title: 'Movie Example',
        directed_by: 'brenoccamp',
        release_year: 2022,
      },
    };

    before(() => {
      request.body = {
        id: '3',
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(MoviesService, 'getById').resolves(serviceResponse);
    });

    after(() => {
      MoviesService.getById.restore();
    });

    it('call response.status with 200 and response.json with key data containing the movie informations', async () => {
      await MoviesController.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(serviceResponse.data)).to.be.equal(true);
    });
  });
})