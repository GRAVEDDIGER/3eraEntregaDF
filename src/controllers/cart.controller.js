import {CartDao} from "../services/CartDAO.js"
import ProductDao from "../services/ProductsDao.js"
import logger from "../helper/LoggerConfig.js"
async function getCart(req,res){
  let DAO =await CartDao()
  
    const DAOproduct =await ProductDao()
    const dataProduct =await DAOproduct.showProduct(req.params.id)
logger.debug.debug({level:"warn",session:req.session})
if ("cart" in req.session){
 const response= await DAO.addCart(req,dataProduct,req.session.cart)
  logger.debug.debug({level:"warn",message:"Cart exists",session:req.session});
  await req.session.save()
  res.redirect("/viewProducts")
}else {
  logger.debug.debug({level:"warn",message:"Cart DOESNT exists",session:req.session});
  console.log(DAO.addCart)
  const response =await DAO.addCart(req,dataProduct,null)
  res.redirect("/viewProducts")
}
}

export default router
