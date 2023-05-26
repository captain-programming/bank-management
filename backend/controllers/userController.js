exports.getAllUsers = async (req, res) => {
  const { token } = req.headers;
  try {

    const users = 
    res.json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};