const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userrolerouter = require('./routes/rolesRoutes');
const fishrouter = require('./routes/fishRoutes');
const fishpackrouter = require('./routes/fishPackRoutes');
const customerrouter = require('./routes/customerRoutes');
const orderStatusrouter = require('./routes/orderStatusRoutes');
const paymentStatusrouter = require('./routes/paymentStatusRoutes');
const ordersrouter = require('./routes/orderRoutes');
const fishCutRouter = require('./routes/fishCutRoutes');
const orderItemRouter = require('./routes/orderstockItemRoutes');
const paymentMethodRouter = require('./routes/paymentMethodRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const ratesrouter = require('./routes/rateListRoutes');
const ratesstockrouter = require('./routes/rateListFishStockRoutes');
const settingsrouter = require('./routes/settingsRoutes');
const paymentmodeRouter = require('./routes/paymentmodeRoutes');
const app = express();
require('dotenv').config();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api', userrolerouter);
app.use('/api', fishrouter);
app.use('/api', fishpackrouter);
app.use('/api', customerrouter);
app.use('/api', orderStatusrouter);
app.use('/api', paymentStatusrouter);
app.use('/api', ordersrouter);
app.use('/api', fishCutRouter);
app.use('/api', paymentMethodRouter);
app.use('/api', orderItemRouter);
app.use('/api', paymentmodeRouter);
app.use('/api', paymentRouter);
app.use('/api', ratesrouter);
app.use('/api', ratesstockrouter);
app.use('/api', settingsrouter);


const port = process.env.PORT || 1800;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
