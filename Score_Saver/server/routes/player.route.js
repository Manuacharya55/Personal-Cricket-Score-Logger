import { Router } from "express";
import {
  getBattingAndBowlingStat,
  addBattingDetails,
  editBattingDetails,
  deleteBattingDetails,
  getBowlingAndBattingAnalytics,
} from "../controllers/batting.controller.js";

import {
  getBowlingDetails,
  addBowlingDetails,
  editBowlingDetails,
  deleteBowlingDetails,
} from "../controllers/bowling.controller.js";
import { protectUserRoute } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/batting").post(protectUserRoute, addBattingDetails);
router
  .route("/batting/:id")
  .patch(protectUserRoute,editBattingDetails)
  .delete(protectUserRoute,deleteBattingDetails);
router.route("/analytics").get(protectUserRoute, getBowlingAndBattingAnalytics);

router
  .route("/bowling")
  .get(getBowlingDetails)
  .post(protectUserRoute, addBowlingDetails);
router
  .route("/bowling/:id")
  .patch(editBowlingDetails)
  .delete(deleteBowlingDetails);

router.route("/stat").get(protectUserRoute, getBattingAndBowlingStat);
export default router;
