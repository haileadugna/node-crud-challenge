
const express = require('express');
const app = express();
const cors = require('./src/middlewares/cors');
const errorHandler = require('./src/middlewares/errorHandler');
const personRoutes = require('./src/routes/personRoutes');

app.use(express.json());
app.use(cors);

app.use('/person', personRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;