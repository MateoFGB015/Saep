import React, { useState } from "react";
import {
  Tabs,
  Tab,
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Zoom,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const BitacoraApp = () => {
  const [activeTab, setActiveTab] = useState("bitacora");
  const [openDialog, setOpenDialog] = useState(false);
  const [observacion, setObservacion] = useState("");
  const [observaciones, setObservaciones] = useState(Array(5).fill(null));
  const [selectedBitacora, setSelectedBitacora] = useState(null);
  const [showUploadButtons, setShowUploadButtons] = useState(false);

  const handleOpenDialog = (index) => {
    setSelectedBitacora(index);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBitacora(null);
    setObservacion("");
  };

  const handleGuardarObservacion = () => {
    if (selectedBitacora !== null && !observaciones[selectedBitacora]) {
      const nuevaObservacion = {
        fecha: new Date().toLocaleString(),
        texto: observacion,
      };
      const updatedObservaciones = [...observaciones];
      updatedObservaciones[selectedBitacora] = nuevaObservacion;
      setObservaciones(updatedObservaciones);
    }
    handleCloseDialog();
  };

  const toggleUploadButtons = () => {
    setShowUploadButtons(!showUploadButtons);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 5, p: 2 }}>
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        centered
        sx={{ "& .MuiTabs-indicator": { backgroundColor: "#673AB7" } }}
      >
        <Tab label="Bitácora" value="bitacora" sx={{ textTransform: "none" }} />
        <Tab
          label="Documento de certificación"
          value="documentos"
          sx={{ textTransform: "none" }}
        />
      </Tabs>

      <Box sx={{ marginTop: 3 }}>
        {activeTab === "bitacora" ? (
          <Box>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <Box
                key={index}
                sx={{
                  padding: 3,
                  marginBottom: 3,
                  borderBottom: "2px solid #000",
                  backgroundColor: "#f5f5f5",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "#673AB7" }}
                >
                  Bitácora #{index + 1}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", mt: 2 }}>
                  <Button variant="outlined" color="primary" sx={{ borderRadius: 2 }}>
                    Ver
                  </Button>
                  <Button variant="outlined" color="secondary" sx={{ borderRadius: 2 }}>
                    Modificar
                  </Button>
                  <Button
                    variant="outlined"
                    color="warning"
                    sx={{ borderRadius: 2 }}
                    onClick={() => handleOpenDialog(index)}
                  >
                    Observaciones
                  </Button>
                </Box>
                {observaciones[index] && (
                  <Box sx={{ marginTop: 2, color: "#616161" }}>
                    <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                      {observaciones[index].fecha}: {observaciones[index].texto}
                    </Typography>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ padding: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="body1">
              Aquí iría el contenido de documentos de certificación.
            </Typography>
          </Box>
        )}
      </Box>

      {/* Este es el apartado del menu para subir los documentos */}
      <Box sx={{ position: "fixed", bottom: 20, right: 20, display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-end" }}>
        <Zoom in={showUploadButtons} style={{ transitionDelay: showUploadButtons ? '100ms' : '0ms' }}>
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{
              bgcolor: "#8e24aa",
              color: "white",
              borderRadius: 4,
              textTransform: "none",
              '&:hover': {
                bgcolor: "#6a1b9a"
              }
            }}
          >
            Subir Bitácora
          </Button>
        </Zoom>
        
        <Zoom in={showUploadButtons} style={{ transitionDelay: showUploadButtons ? '200ms' : '0ms' }}>
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{
              bgcolor: "#8e24aa",
              color: "white",
              borderRadius: 4,
              textTransform: "none",
              '&:hover': {
                bgcolor: "#6a1b9a"
              }
            }}
          >
            Subir Documento
          </Button>
        </Zoom>
        
        <Zoom in={showUploadButtons} style={{ transitionDelay: showUploadButtons ? '300ms' : '0ms' }}>
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{
              bgcolor: "#8e24aa", 
              color: "white",
              borderRadius: 4,
              textTransform: "none",
              '&:hover': {
                bgcolor: "#6a1b9a"
              }
            }}
          >
            Subir Firma
          </Button>
        </Zoom>
        
        <Fab
          color="secondary"
          aria-label="add"
          onClick={toggleUploadButtons}
          sx={{ 
            bgcolor: "#8e24aa",
            '&:hover': {
              bgcolor: "#6a1b9a"
            }
          }}
        >
          <AddIcon />
        </Fab>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Agregar Observación</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
            placeholder="Escribe tu observación aquí..."
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={handleGuardarObservacion}
            color="primary"
            variant="contained"
            disabled={
              selectedBitacora !== null &&
              observaciones[selectedBitacora] !== null
            }
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BitacoraApp;