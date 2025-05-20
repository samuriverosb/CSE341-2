let basicController = {}

basicController.root = (req, res) => {
  res.send('root of the project. Try /games for more data.');
}

module.exports = basicController;