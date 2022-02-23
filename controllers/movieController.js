const MoviesService = require('../services/movieService');

const create = async (req, res) => {
  const { title, directedBy, releaseYear } = req.body;

  const movie = await MoviesService
    .create({ title, directedBy, releaseYear });

  if (!movie) {
    return res
      .status(400)
      .send('Dados inválidos');
  }

  res
    .status(201)
    .send('Filme criado com sucesso!');
};

const getById = (req, res, _next) => {
  const { id } = req.body;

  if (isNaN(id)) return res.status(422).json({ message: 'Invalid id' });
}

module.exports = {
  create,
  getById,
};