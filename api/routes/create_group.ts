import express from "express";
import { Group } from "../entities/Group";

const router = express.Router();

router.post("/api/group", async (req, res) => {
  const { name,description } = req.body;
  try {
    const group = Group.create({
      name,
      description
    });

    await group.save();

    return res.json(group);
  } catch (error) {
    console.log("created Group ERROR");
    console.log(error);

    return res.status(520).json("Error");
  }
});

export { router as createGroupRouter };
