import express from "express";
// @ts-ignore
import cors from 'cors';
import { createConnection } from 'typeorm';
import { User } from "./entities/User";
import { createUserRouter } from "./routes/create_user";
import { fetchUsersRouter } from "./routes/fetch_users";
import { Group } from './entities/Group';
import { createGroupRouter } from './routes/create_group';
import { fetchGroupsRouter } from './routes/fetch_groups';
import { deleteUserRouter } from './routes/delete_user';
import { deleteGroupRouter } from './routes/delete_group';
import { updateUserRouter } from './routes/update_user';
import { updateGroupRouter } from './routes/update_group';

const app = express();

const main = async () => {
  try {
    const connection = await createConnection({
      type: "postgres",
      host: "postgres",
      port: 5432,
      username: "root",
      password: "1234567890",
      database: "root",
      entities: [User, Group],
      synchronize: true,
    });
    console.log("Connected to Postgres");

    app.use(express.json());
    app.use(cors())

    app.use(createUserRouter);
    app.use(fetchUsersRouter);
    app.use(createGroupRouter);
    app.use(fetchGroupsRouter);
    app.use(deleteUserRouter);
    app.use(deleteGroupRouter);
    app.use(updateUserRouter);
    app.use(updateGroupRouter);


    app.listen(3080, () => {
      console.log('Now running on port 3080');
    });

    console.log("success");
  } catch (error) {
    console.log(error);
    throw new Error("Unable to connect to Postgres");
  }
};
main();
