import { Router } from "express";

import { UserLogin} from "../controller/controller_user.js";

import { ControllerProducts } from "../controller/controller_product.js";

//cambiar el nombre del endpoint

export const router = Router();

router.post("/login", UserLogin.LogIn)
router.get("/productos",  ControllerProducts.ListTotalProducts)
router.get("/favoritos", ControllerProducts.getFavoritos)
router.post("/addfavoritos", ControllerProducts.addFavorito)
router.delete("/deletefavoritos", ControllerProducts.deleteFavorito)
router.get("/favoritos/:id", ControllerProducts.getSingleProducto)

