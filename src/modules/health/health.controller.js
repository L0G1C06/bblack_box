exports.health = async (req, res) => {
  try {
    res.status(200).json({ message: "I'm alive!"})
  } catch (error) {
    res.status(400).json({ error: 'Erro ao acessar a API!', details: error.message });
  }
};