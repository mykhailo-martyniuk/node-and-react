import express from "express";
import { getRepository } from "typeorm";
import { Group } from '../entities/Group';

const router = express.Router();

router.patch("/api/group/:id", async (req, res) => {
  try {
    const { name, description } = req.body;

    const group = await getRepository(Group)
      .createQueryBuilder('group')
      .leftJoinAndSelect("group.users", "user")
      .where("group.id = :id", { id: parseInt(req.params.id) })
      .getOne()

    if(group && group?.users.length <=0) {
      if(group.name !== name) {
        group.name = name
        await group.save()
      }
      if(group.description !== description) {
        group.description = description
        await group.save()
      }
      return res.status(200).json("success");
    }
    return res.status(520).json("Error");
  } catch (error) {
    console.log("updated ERROR");
    console.log(error);

    return res.status(520).json("Error");
  }
});

export { router as updateGroupRouter };