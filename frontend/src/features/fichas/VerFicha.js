import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack
} from '@mui/material';

const FichaDetalle = () => {
  const { id } = useParams();
  const [fichas, setFicha] = useState(null);
  const [aprendices, setAprendices] = useState([]);

  useEffect(() => {
    const obtenerFicha = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/fichas/ver/${id}`);
        setFicha(response.data.ficha);
        setAprendices(response.data.aprendices);
      } catch (error) {
        console.error('Error al obtener la ficha:', error);
      }
    };

    obtenerFicha();
  }, [id]);

  if (!fichas) {
    return <Typography sx={{ mt: 4 }}>Cargando...</Typography>;
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: '20px',
        minHeight: 'calc(100vh - 64px)',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Información de la ficha */}
      <Box sx={{ width: '100%', maxWidth: 900, mb: 4 }}>
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
                <TableCell><Typography fontWeight="bold">Nombre del programa</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">N° Ficha</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Nivel</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{fichas.nombre_programa}</TableCell>
                <TableCell>{fichas.numero_ficha}</TableCell>
                <TableCell>{fichas.nivel || 'Tecnólogo'}</TableCell>
              </TableRow>
              <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                <TableCell><Typography fontWeight="bold">Fecha inicio</Typography></TableCell>
                <TableCell><Typography fontWeight="bold">Fecha fin</Typography></TableCell>
                <TableCell />
              </TableRow>
              <TableRow>
                <TableCell>{fichas.fecha_inicio || '01/06/2025'}</TableCell>
                <TableCell>{fichas.fecha_fin || '31/12/2025'}</TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Tabla de aprendices */}
      <Box sx={{ width: '100%', maxWidth: 900 }}>
        {aprendices.length > 0 ? (
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
                  <TableCell><Typography fontWeight="bold">Nombre</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Apellido</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">N° Documento</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Acciones</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {aprendices.map((aprendiz) => (
                  <TableRow key={aprendiz.id_usuario}>
                    <TableCell>{aprendiz.nombre}</TableCell>
                    <TableCell>{aprendiz.apellido}</TableCell>
                    <TableCell>{aprendiz.numero_documento}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button  sx={{ border: "1px solid #71277a", color: "#71277a", fontSize: "10px", borderRadius: "5px" }}>
                          Ver usuario
                        </Button>
                        <Button  sx={{
                         backgroundColor: "red",p: 1,fontSize: "30px",color: "white",borderRadius: "5px", }}>
                          <ContentCutIcon />
                          <i className="ri-scissors-fill" />
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>No hay aprendices registrados en esta ficha.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default FichaDetalle;  