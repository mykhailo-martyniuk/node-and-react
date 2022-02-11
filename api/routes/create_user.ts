import express from "express";
import { User } from "../entities/User";
import { getConnection, getRepository } from "typeorm";
import { Group } from "../entities/Group";

const router = express.Router();

router.post("/api/user", async (req, res) => {
  const { userName, email, groups: groupsClient } = req.body;

  try {

    const user = User.create({
      user_name: userName,
      email,
      created: new Date(Date.now()).toLocaleString("ua-UA"),
    });
    await user.save();

    const groupsParsed = Array.isArray(groupsClient)
      ? groupsClient
      : JSON.parse(groupsClient);

    for (let groupName of groupsParsed) {
      const group = await getRepository(Group)
        .createQueryBuilder("group")
        .select("group")
        // .leftJoinAndSelect("group.users", "users")
        .where("name = :name", { name: groupName })
        .getOne();

      await getConnection()
        .createQueryBuilder()
        .relation(User, "groups")
        .of(user)
        .add(group);
    }

    return res.json(user);
  } catch (error) {
    console.log("created ERROR");
    console.log(error);

    return res.status(520).json("Error");
  }
});

export { router as createUserRouter };
