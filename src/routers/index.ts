import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { TimeController } from "../controllers/TimeController";
import { ensurePermission } from "../middlewares/ensurePermission";

const routes = Router();

// module users
routes.post("/v1/enrollment", UserController.enrollment)
routes.post("/v1/access", UserController.access)


// module times

routes.get("/v1/times", ensureAuthentication, ensurePermission(["PERMISSION_ADMIN","PERMISSION_USER"]), TimeController.all)
routes.post("/v1/times", ensureAuthentication, ensurePermission(["PERMISSION_ADMIN","PERMISSION_USER"]), TimeController.create)
routes.patch("/v1/times/:id", ensureAuthentication, ensurePermission(["PERMISSION_ADMIN","PERMISSION_USER"]), TimeController.update)
routes.delete("/v1/times/:id", ensureAuthentication, ensurePermission(["PERMISSION_ADMIN","PERMISSION_USER"]), TimeController.destroy)

export { routes };
