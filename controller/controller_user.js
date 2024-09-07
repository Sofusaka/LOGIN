import { JWT_SECRET } from "../config.js";
import jwt from "jsonwebtoken";
import { userModel } from "../model/user_model.js";

export class UserLogin{


  static async LogIn(req, res) {
    try {
      // Se obtienen el correo electrónico y la contraseña del cuerpo de la solicitud
      const { email, password } = req.body;
      console.log(req.body);
  
      // Se obtienen el correo electrónico y la contraseña almacenados en la base de datos
      const user_db = await userModel.getUserEmail(email);
      const password_db = await userModel.getPassword(email);
      const id_db = await userModel.getUserID(email)
      console.log(id_db.idUSUARIO);
      const idFinal = await id_db.idUSUARIO;
      // Se verifica si el correo electrónico y la contraseña coinciden con los de la base de datos
      if (
        email === user_db.email &&
        password===password_db.password
      ) {
        console.log("===================================================");
        console.log(
          `El usuario con correo ${email, idFinal} inició sesión correctamente`
        );
  
        // Verificar si existe una clave secreta para JWT
        if (JWT_SECRET !== "") {
          // Generar token JWT
          const token = jwt.sign({email, idFinal}, JWT_SECRET, {
            expiresIn: "5h",
          });
          // Devolver el token en la respuesta
          res.json({ token });
          console.log(`Token de inicio de sesión: ${token}`);
        } else {
          // Si no hay una clave secreta para JWT, enviar un mensaje de error
          res.status(500).json({ error: "No JWT_SECRET provided in ENV" });
        }
      } else {
        // Si las credenciales no coinciden, se devuelve un mensaje de error
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      // Manejar errores de manera adecuada
      console.error("Error during login:", error);
      res.status(500).json({ error: "An error occurred during login" });
    }
  }
  
}
