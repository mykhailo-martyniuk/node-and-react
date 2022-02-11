import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { Formik, Form } from "formik";
import MultipleSelect from "../MultipleSelect";
import Button from "../Button";
import * as yup from "yup";
import { useGetGroupsQuery } from "../../api";
import { useCreateUserMutation, useUpdateUserMutation } from "../../api";
import { ForCreatingUser, User } from "../../types";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  userName: yup
    .string()
    .min(2, "User name should be of minimum 8 characters length")
    .required("User name is required"),
});

const AddUserForm: React.FC<{
  user: User | undefined;
  toggleForm: Function;
}> = ({ user, toggleForm }) => {
  const { data: groups, isFetching, isLoading } = useGetGroupsQuery();
  console.log(groups);

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  if (user) {
    console.log(user.groups.map((el) => el.name));
  }
  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: 300,
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "4px",
        zIndex: "5",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "30px",
        }}
      >
        <IconButton aria-label="close" onClick={() => toggleForm(undefined)}>
          <CloseIcon />
        </IconButton>
      </div>
      <Formik
        initialValues={{
          id: user?.id || undefined,
          email: user?.email || "",
          userName: user?.user_name || "",
          groups: user?.groups.map((el) => el.name) || [],
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          if (user) {
            const updatedUser: ForCreatingUser = {
              userName: values.userName,
              email: values.email,
              groups: values.groups,
            };
            // @ts-ignore
            updateUser({ id: user.id, data: updatedUser });
            actions.resetForm();
          } else {
            const newUser: ForCreatingUser = {
              userName: values.userName,
              email: values.email,
              groups: values.groups,
            };
            createUser(newUser);
            actions.resetForm();
          }
          toggleForm(undefined);
        }}
      >
        {(props) => (
          <Form>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={props.values.email}
              onChange={props.handleChange}
              error={props.touched.email && Boolean(props.errors.email)}
              helperText={props.touched.email && props.errors.email}
              sx={{ mb: "20px" }}
            />
            <TextField
              fullWidth
              id="userName"
              name="userName"
              label="User Name"
              type="text"
              value={props.values.userName}
              onChange={props.handleChange}
              error={props.touched.userName && Boolean(props.errors.userName)}
              helperText={props.touched.userName && props.errors.userName}
              sx={{ mb: "20px" }}
            />

            <MultipleSelect name="groups" value={props.values.groups} />
            <Button
              buttonType={"Add"}
              text={"Add"}
              type="submit"
              style={{ width: "100%", marginTop: "30px" }}
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddUserForm;
