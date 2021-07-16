import * as VideoController from "./videos.controller";
import { Router } from "express";
const router = Router();

router.get('/videos', VideoController.getVideos);

router.get('/videos/id/:id', VideoController.getVideo);

router.post('/videos', VideoController.createVideo);

router.delete('/videos/id/:id', VideoController.deleteVideo);

router.put('/videos/id/:id', VideoController.updateVideo);

export default router;