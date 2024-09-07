import jwt from 'jsonwebtoken';
import {productModel} from '../model/product_model.js'; 
import { JWT_SECRET } from '../config.js'; 
export class ControllerProducts {

  static async ListTotalProducts(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1]; 

      if (!token) {
        return res.status(401).json({ error: "No token provided" });
      }


      jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "Invalid token" });
        }else{

            const productos = await productModel.getProducts();
            console.log(productos);
            res.json(productos)

        }

        
      });
      
    } catch (error) {
      // Handle errors appropriately
      console.error("Error during product retrieval:", error);
      res.status(500).json({ error: "An error occurred while retrieving products" });
    }
  }


  static async getFavoritos(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del header
  
      if (!token) {
        return res.status(401).json({ error: "No token provided" });
      }
  
      // Verificar el token
      jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "Invalid token" });
        } else {
          // Obtener el ID del usuario del token decodificado
          const userId = decoded.idFinal; 
          console.log(userId);

          // Obtener los productos favoritos del usuario utilizando su ID
          const productos = await productModel.getFavoritos(userId);
          console.log(productos);


          let productList = [];

          
          for (let i = 0; i < productos.length; i++) {
            const productoId = productos[i].PRODUCTO_idPRODUCTO;
    
            // Obtener el producto de la base de datos
            const productData = await productModel.getProductsById(productoId);
    
           
            if (productData.length > 0) {
              productList.push(productData[0]); 
            } else {
              console.log(`Producto con ID ${productoId} no encontrado.`);
            }
          
        }

        res.json(productList);
      }});
  
    } catch (error) {
      
      console.error("Error during product retrieval:", error);
      res.status(500).json({ error: "An error occurred while retrieving products" });
    }
  }
  

  static async addFavorito(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del header

      if (!token) {
        return res.status(401).json({ error: "No token provided" });
      }

      
      jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "Invalid token" });
        } else {
          
          const userId = decoded.idFinal; 
          const { id_producto } = req.body;

          if (!id_producto) {
            return res.status(400).json({ error: "Product ID is required" });
          }

       
          await productModel.insertFavoritos(id_producto, userId);

          res.status(201).json({ message: "Product added to favorites successfully" });
        }
      });
    } catch (error) {
      console.error("Error during favorite insertion:", error);
      res.status(500).json({ error: "An error occurred while adding the product to favorites" });
    }
  }


  static async deleteFavorito(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del header

      if (!token) {
        return res.status(401).json({ error: "No token provided" });
      }

      jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "Invalid token" });
        } else {
          const userId = decoded.idFinal; 
          const { id_producto } = req.body;

          if (!id_producto) {
            return res.status(400).json({ error: "Product ID is required" });
          }

          await productModel.deleteFavoritos(id_producto, userId);

          res.json({ message: "Product removed from favorites successfully" });
        }
      });
    } catch (error) {
      console.error("Error during favorite deletion:", error);
      res.status(500).json({ error: "An error occurred while removing the product from favorites" });
    }
  }




  static async getSingleProducto(req, res) {
    
      try {
        const token = req.headers.authorization?.split(' ')[1]; 
  
        if (!token) {
          return res.status(401).json({ error: "No token provided" });
        }
  
  
        jwt.verify(token, JWT_SECRET, async (err, decoded) => {
          if (err) {
            return res.status(401).json({ error: "Invalid token" });
          }else{
                const userId = decoded.idFinal; 
                const { id } = req.params;
                console.log(id); //es el id del producto que trae x el link
    
                const productData = await productModel.getSingleProduct(id, userId);
    
                if (productData.length > 0) {
                  console.log(productData[0]);
                  res.json(productData[0]);
                } else {
                  res.json({ error:'no hay' });
                }
              }
  
          }
  
        );
    } catch (error) {
      console.error("Error during product retrieval:", error);
      res.status(500).json({ error: "An error occurred while retrieving product" });
    }
  }




}


 

