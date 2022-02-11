import express from "express";
import {  getRepository } from "typeorm";
import { User } from "../entities/User";

const router = express.Router();

router.get("/api/users", async (req, res) => {

  const users = await getRepository(User)
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.groups", "group")
    .getMany();

  return res.json(users);
});

export { router as fetchUsersRouter };
