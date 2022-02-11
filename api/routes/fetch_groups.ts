import express from "express";
import { getRepository } from 'typeorm';
import { Group } from '../entities/Group';

const router = express.Router();

router.get("/api/groups", async (req, res) => {


  const groups = await getRepository(Group)
    .createQueryBuilder("group")
    .select("group")
    .leftJoinAndSelect("group.users", "users")
    .getMany();

  return res.json(groups);
});

export { router as fetchGroupsRouter };