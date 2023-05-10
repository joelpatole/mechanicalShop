import { Router,Request,Response,NextFunction } from "express";
import salesRequestService from "./sales-request.service";
import shopService from "../shop/shop.service";
import { ResponseHandler } from "../../utility/response.handler";
import { ISoldItem } from "./sales-request.types";
import { roles } from "../../utility/constant";
import { permit } from "../../utility/authorize";
import { SHOP_RESPONSE } from "../shop/shop.responses";
import { APPROVE_SALES_REQUEST_VALIDATOR, REGISTER_SALES_VALIDATOR } from "./sales-request.validations";

const router = Router();

router.post("/register-sales",permit([roles.OWNER]),REGISTER_SALES_VALIDATOR,async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { shop_id } = req.body;
      const { items } = req.body;
      const result = await salesRequestService.registerSales(shop_id, items);
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);
//this route will send the shop details to the FrontEnd
//afert which UI team will control the data that will go to register-sales route
router.get("/shop-inventory/:shop_id", async (req, res, next) => {
  try {
    const shop = await shopService.findById(Object(req.params.shop_id));
    if (shop !== null) {
      const result = await salesRequestService.getProductDetialsOfShop(shop);
      res.send(new ResponseHandler(result));
    } else {
      throw SHOP_RESPONSE.SHOP_NOT_FOUND;
    }
  } catch (err) {
    next(err);
  }
});

router.get("/show-sales-request",permit([roles.ADMIN]),async(req, res, next) => {
    try {
      const requestStatus = req.query["status"];
      const pageNumber = req.query["page"]
      if (requestStatus) {
        const result = await salesRequestService.getSalesRequest(String(requestStatus),Number(pageNumber));
        if (result) {
          res.send(new ResponseHandler(result));
        } else {
          throw SALES_REQUEST.COULD_NOT_FIND_DATA;
        }
      }
    } catch (err) {
      next(err);
    }
  }
);

router.patch("/approve-sales-request/:sales_request_id",permit([roles.ADMIN]),APPROVE_SALES_REQUEST_VALIDATOR,async (req:Request, res:Response, next:NextFunction) => {
    try {
      const sales_request_id = req.params.sales_request_id;
      const status = req.body.status;
      const result = await salesRequestService.updateSalesRequestStatus(sales_request_id,status);
      if (!result) throw SALES_REQUEST.SOMETHING_WENT_WRONG;
      res.send(new ResponseHandler(result));
    } catch (err) {
      next(err);
    }
  }
);

export default router;
