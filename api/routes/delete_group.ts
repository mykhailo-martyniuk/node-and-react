import express from "express";
import { getConnection} from "typeorm";
import { Group } from "../entities/Group";

const router = express.Router();

router.delete("/api/group/:id", async (req, res) => {
  try {

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Group)
      .where("id = :id", { id: parseInt(req.params.id) })
      .execute();

    return res.status(200).json("success");
  } catch (error) {
    console.log("created ERROR");
    console.log(error);

    return res.status(520).json("Error");
  }
});

export { router as deleteGroupRouter };