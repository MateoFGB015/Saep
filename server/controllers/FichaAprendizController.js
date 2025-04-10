const FichaAprendiz = require('../models/FichaAprendiz');
const Ficha = require('../models/fichas');
const Usuario = require('../models/usuario');

// Elimina la relación entre un aprendiz y una ficha
exports.eliminarAprendizDeFicha = async (req, res) => {
    const { id_ficha, id_usuario } = req.body;
  
    try {
      const eliminado = await FichaAprendiz.destroy({
        where: {
          id_ficha,
          id_usuario
        }
      });
  
      if (eliminado) {
        return res.status(200).json({ mensaje: "Aprendiz eliminado de la ficha correctamente" });
      } else {
        return res.status(404).json({ mensaje: "No se encontró la relación ficha-aprendiz" });
      }
    } catch (error) {
      console.error("❌ Error al eliminar aprendiz de ficha:", error);
      return res.status(500).json({ mensaje: "Error del servidor" });
    }
  };

  

  

