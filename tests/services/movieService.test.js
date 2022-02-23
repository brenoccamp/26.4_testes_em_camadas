const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');

const MoviesModel = require('../../models/movieModel');
const MoviesService = require('../../services/movieService');

describe('Insere um novo filme no BD', () => {
  describe('quando o payload informado não é válido', async () => {
    const payloadMovie = {};

    it('retorna um boolean', async () => {
      const response = await MoviesService.create(payloadMovie);

      expect(response).to.be.a('boolean');
    });

    it('o boolean contém "false"', async () => {
      const response = await MoviesService.create(payloadMovie);

      expect(response).to.be.equal(false);
    });

  });

  describe('quando é inserido com sucesso', async () => {
    const payloadMovie = {
      title: 'Example Movie',
      directedBy: 'Jane Dow',
      releaseYear: 1999,
    };

    before(() => {
      const ID_EXAMPLE = 1;

      sinon.stub(MoviesModel, 'create')
        .resolves({ id: ID_EXAMPLE });
    });

    after(() => {
      MoviesModel.create.restore();
    });

    it('retorna um objeto', async () => {
      const response = await MoviesService.create(payloadMovie);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const response = await MoviesService.create(payloadMovie);

      expect(response).to.have.a.property('id');
    });
  });
});

describe('Get a movie by "id"', () => {
  const id = '3';

  describe('when "id" is not found', () => {
    before(() => {
      const moviesModelResponse = {
        status: 200,
        data: {},
      };

      sinon.stub(MoviesModel, 'getById').resolves(moviesModelResponse);
    });

    after(() => {
      MoviesModel.getById.restore();
    });

    it('return an object with properties: "status" and "error_message"', async () => {
      const response = await MoviesService.getById(id);

      expect(response).to.be.an('object');
      expect(response).to.have.a.property('status');
      expect(response).to.have.a.property('error_message');
    });

    it('"status" property has value: 404', async () => {
      const { status } = await MoviesService.getById(id);

      expect(status).to.be.equal(404);
    });

    it('"error_message" property has value: "Movie not found"', async () => {
      const { error_message } = await MoviesService.getById(id);

      expect(error_message).to.be.equal('Movie not found');
    });
  });

  describe('when exists "id" on DB', () => {
    it('return an object with properties: "status" and "data"', async () => {
      const response = await MoviesService.getById(id);

      expect(response).to.be.an('object');
      expect(response).to.have.a.property('status');
      expect(response).to.have.a.property('data');
    });

    it ('"status" property has value: 200', async () => {
      const { status } = await MoviesService.getById(id);

      expect(status).to.be.equal(200);
    });

    it ("'data' property is an object and has movie's informations", async () => {
      const { data } = await MoviesService.getById(id);

      expect(data).to.be.an('object');
      expect(data).to.have.property('id');
      expect(data).to.have.property('title');
      expect(data).to.have.property('directed_by');
      expect(data).to.have.property('release_year');
    });
  });
})