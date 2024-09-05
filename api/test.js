module.exports = (req, res) => {
  if (req.method === 'GET') {
    res.status(200).send('Все работает');
  } else {
    res.status(404).send('Страница не найдена');
  }
};
