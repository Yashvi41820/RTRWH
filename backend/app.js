const express = require('express');
const cors = require('cors');
const sizingRoutes = require('./src/routes/sizingRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Mount sizing API route
app.use('/api/v1/sizing', sizingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});