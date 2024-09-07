import  pool  from "../db/database.js";
// En esta clase se encargaran de hacer la logica de negocio, también realizar conexión a la base de datos desde este *archivo* <-- !IMPORTANT
export class userModel {
  
  static async getUserEmail(email) {
    console.log(email)
    let email_db = await pool.query("SELECT email FROM  usuario WHERE email=?", [
      email,
    ]);
    return email_db[0];
  }

  static async getPassword(email) {
    let password_db = await pool.query(
      "SELECT password FROM  usuario WHERE email=?",
      [email]
    );
    return password_db[0];
  }

  static async getUserID(email) {
    let id = await pool.query("SELECT idUSUARIO FROM usuario WHERE email=?", [email]);
    return id[0];
  }

}