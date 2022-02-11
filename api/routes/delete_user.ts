import express from "express";
import { User } from "../entities/User";
import { getConnection, getRepository } from "typeorm";
import { Group } from "../entities/Group";

const router = express.Router();

router.delete("/api/user/:id", async (req, res) => {
  try {

    const groups = await getRepository(Group)
      .createQueryBuilder("group")
      .select("group")
      .leftJoinAndSelect("group.users", "users")
      .getMany();

    await getConnection()
      .createQueryBuilder()
      .relation(User, "groups")
      .of(parseInt(req.params.id))
      .remove(groups);


    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id: parseInt(req.params.id) })
      .execute();

    return res.status(200).json("success");
  } catch (error) {
    console.log("created ERROR");
    console.log(error);

    return res.status(520).json("Error");
  }
});

export { router as deleteUserRouter };
