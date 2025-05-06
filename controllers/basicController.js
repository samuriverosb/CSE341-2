let basicController = {}

basicController.root = (req, res) => {
  res.send('Hello World!');
}

module.exports = basicController;