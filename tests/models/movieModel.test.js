const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');
const MoviesModel = require('../../models/movieModel');

describe('Insere um novo filme no BD', () => {
  const payloadMovie = {
    title: 'Example Movie',
    directedBy: 'Jane Dow',
    releaseYear: 1999,
  }

  before(async () => {
    const execute = [{ insertId: 1 }];

    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(async () => {
    connection.execute.restore();
  })

  describe('quando é inserido com sucesso', async () => {

    it('retorna um objeto', async () => {
      const response = await MoviesModel.create(payloadMovie);

      expect(response).to.be.a('object')
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const response = await MoviesModel.create(payloadMovie);

      expect(response).to.have.a.property('id')
    });

  });
});

describe('Query movie by "id"', () => {
  const id = '1';

  before(() => {
    const movie = {
      id: 1,
      title: 'Example Movie',
      directed_by: 'Jane Dow',
      release_year: 1999,
    };

    const MoviesModelResponse = [{
      status: 200,
      data: movie,
    }];

    sinon.stub(connection, 'execute').resolves(MoviesModelResponse);
  });

  after(() => {
    connection.execute.restore();
  });

  describe('when informed "id" is found', () => {

    it('returns an object with properties: "status" and "data"', async () => {
      const response = await MoviesModel.getById(id);

      expect(response).to.be.an('object');
      expect(response).to.have.a.property('status');
      expect(response).to.have.a.property('data');
    });

    it('is property data equal an object', async () => {
      const response = await MoviesModel.getById(id);

      expect(response.data).to.be.an('object');
    });

    it('is property status equal "200"', async () => {
      const response = await MoviesModel.getById(id);

      expect(response.status).to.be.equal(200);
    });
  });

  describe('when informed "id" is not found', () => {
    it('property data is an empty object', async () => {
      const response = await MoviesModel.getById(id);

      expect(response.data).to.be.an('object');
      expect(response.data).to.be.empty;
    });
  });
});