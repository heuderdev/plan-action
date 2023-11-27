import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { TimeController } from "../controllers/TimeController";
import { ensurePermission } from "../middlewares/ensurePermission";
import { SectorController } from "../controllers/SectorController";
import { PublicationController } from "../controllers/PublicationController";

const routes = Router();

// module users
routes.post("/v1/enrollment", UserController.enrollment)
routes.post("/v1/access", UserController.access)


// module times
routes.get("/v1/times", TimeController.all)
routes.get("/v1/times/:id", TimeController.getById)
routes.post("/v1/times", ensureAuthentication, ensurePermission(["PERMISSION_ADMIN", "PERMISSION_USER"]), TimeController.create)
routes.patch("/v1/times/:id", ensureAuthentication, ensurePermission(["PERMISSION_ADMIN", "PERMISSION_USER"]), TimeController.update)
routes.delete("/v1/times/:id", ensureAuthentication, ensurePermission(["PERMISSION_ADMIN"]), TimeController.destroy)


// module sectors
routes.get("/v1/sectors", SectorController.all)
routes.get("/v1/sectors/:id", SectorController.getById)
routes.post("/v1/sectors", ensureAuthentication, ensurePermission(["PERMISSION_ADMIN", "PERMISSION_USER"]), SectorController.create)
routes.patch("/v1/sectors/:id", ensureAuthentication, ensurePermission(["PERMISSION_ADMIN", "PERMISSION_USER"]), SectorController.update)


// module publications
routes.get("/v1/publications", PublicationController.all)
routes.get("/v1/publications/:id", PublicationController.getById)
routes.post("/v1/publications", ensureAuthentication, ensurePermission(["PERMISSION_ADMIN", "PERMISSION_USER"]), PublicationController.create)
routes.patch("/v1/publications/:_id", ensureAuthentication, ensurePermission(["PERMISSION_ADMIN", "PERMISSION_USER"]), PublicationController.update)

export { routes };
