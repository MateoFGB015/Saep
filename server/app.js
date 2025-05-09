const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const autenticacionRoutes = require('./routes/autenticacionRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const AgendamientoRoutes = require('./routes/AgendamientoRoutes')
const fichasRoutes = require('./routes/fichasRoutes');
const bitacoraRoutes = require('./routes/bitacoraRoutes');
const fichaAprendiz = require('./routes/FichaAprendizRoutes');
// const ObservacionRoutes = require('./routes/ObservacionRoutes');
// const DocumentosRoutes = require('./routes/DocumentosRoutes');



const app = express();

app.use(cors({
    origin: ['http://localhost:3001', 'http://localhost:3002'], 
    credentials: true
  }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use('/uploads', express.static('uploads'));

app.use('/inicio', autenticacionRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/fichas', fichasRoutes);
app.use('/agendamiento',AgendamientoRoutes);
app.use('/Bitacora', bitacoraRoutes );
app.use('/fichaAprendiz', fichaAprendiz);
// app.use('/observacion', ObservacionRoutes);
// app.use('/documentos', DocumentosRoutes);

module.exports = app;
