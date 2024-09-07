import  pool  from "../db/database.js";



// En esta clase se encargaran de hacer la logica de negocio, también realizar conexión a la base de datos desde este *archivo* <-- !IMPORTANT
export class productModel {
  
  static async getProducts() {
    let products_db = await pool.query("SELECT * FROM   producto ");
    return products_db;
  }

   static async insertFavoritos(id_producto, id_usuario) {
    let products_db = await pool.query("INSERT INTO favoritos_usuario (PRODUCTO_idPRODUCTO, USUARIO_idUSUARIO) VALUES (?, ?)", [id_producto, id_usuario]);
    return products_db;
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

  static async getSingleProduct(id) {
    let products_db = await pool.query("SELECT * FROM favoritos_usuario WHERE PRODUCTO_idPRODUCTO = ?", [id]);
    return products_db;
  }
 
}