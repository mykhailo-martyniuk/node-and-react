import express from "express";
import { User } from "../entities/User";
import { getConnection, getRepository } from "typeorm";
import { Group } from "../entities/Group";
import { compareArraysByProperty } from "../utils";

const router = express.Router();

router.patch("/api/user/:id", async (req, res) => {
  const { userName, email, groups: groupsClient } = req.body;
  try {
    const groupsParsed = Array.isArray(groupsClient)
      ? groupsClient
      : JSON.parse(groupsClient);

    const user = await getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.groups", "group")
      .where("user.id = :id", { id: parseInt(req.params.id) })
      .getOne();
    if (user) {
      if (user.email !== email) {
        user.email = email;
        await user.save();
      }

      if (user.user_name !== userName) {
        user.user_name = userName;
        await user.save();
      }

      if (!compareArraysByProperty(groupsParsed, user.groups, "name")) {
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

        for (let groupName of groupsParsed) {
          const group = await getRepository(Group)
            .createQueryBuilder("group")
            .select("group")
            .where("name = :name", { name: groupName })
            .getOne();

          await getConnection()
            .createQueryBuilder()
            .relation(User, "groups")
            .of(user)
            .add(group);
        }
      }
    }

    return res.json(user);
  } catch (error) {
    console.log("update ERROR");
    console.log(error);

    return res.status(520).json("Error");
  }
});

export { router as updateUserRouter };
