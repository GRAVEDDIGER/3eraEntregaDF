import { Router } from "express";
const router =Router()
router.get('/', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
    res.redirect("/login")
  });
export default router