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
  const id = '0';

  before(() => {
    const MoviesModelResponse = [{
      status: 200,
      message: 'Movie not found'
    }];

    sinon.stub(connection, 'execute').resolves(MoviesModelResponse);
  });

  describe('when informed "id" is not valid', () => {

    it('returns an object with properties "status" and "message"', async () => {
      const response = await MoviesModel.getById(id);

      expect(response).to.be.an('object');
    });

    it('returns property message: "Movie not found"', async () => {
      const response = await MoviesModel.getById(id);

      expect(response.message).to.be.equal('Movie not found');
    });

    it('returns property status: "404"', async () => {
      const response = await MoviesModel.getById(id);

      expect(response.status).to.be.equal(200);
    });

  })
});