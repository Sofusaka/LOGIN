import  pool  from "../db/database.js";



// En esta clase se encargaran de hacer la logica de negocio, también realizar conexión a la base de datos desde este *archivo* <-- !IMPORTANT
export class productModel {
  
  static async getProducts() {
    let products_db = await pool.query("SELECT * FROM   producto ");
    return products_db;
  }

  static async insertFavoritos(id_producto, id_usuario) {
    try {
      let products_db = await pool.query(
        "INSERT INTO favoritos_usuario (PRODUCTO_idPRODUCTO, USUARIO_idUSUARIO) VALUES (?, ?)",
        [id_producto, id_usuario]
      );
      return products_db;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        // Código de error específico para duplicados en MySQL
        return { error: "El producto ya está en la lista de favoritos" };
      } else {
        // Manejar otros errores
        throw error;
      }
    }
  }
  

static async getFavoritos(id_usuario) {
    let products_db = await pool.query("SELECT * FROM favoritos_usuario WHERE USUARIO_idUSUARIO = ?", [id_usuario]);
    return products_db;
  }

  static async getProductsById(id) {
    let products_db = await pool.query("SELECT * FROM producto WHERE idPRODUCTO = ?", [id]);
    return products_db;
  }

static async deleteFavoritos(id_producto, id_usuario) { 

    let products_db = await pool.query("DELETE FROM favoritos_usuario WHERE PRODUCTO_idPRODUCTO = ? AND USUARIO_idUSUARIO = ?", [id_producto, id_usuario]);
    return products_db;
  }

  static async getSingleProduct(id_producto, id_usuario) {
    try {
      let products_db = await pool.query(
        "SELECT * FROM favoritos_usuario WHERE PRODUCTO_idPRODUCTO = ? AND USUARIO_idUSUARIO = ?",
        [id_producto, id_usuario]
      );
  
      if (products_db.length === 0) {
        // Si no se encontraron resultados, devolver un mensaje
        return { message: "No se encontraron registros para este producto y usuario" };
      }
  
      return products_db; // Devolver los datos si existen
    } catch (error) {
      throw error; // Manejar el error
    }
  }
  













}