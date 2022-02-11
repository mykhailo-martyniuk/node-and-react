import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { Formik, Form } from "formik";
import Button from "../Button";
import * as yup from "yup";
import { useCreateGroupMutation, useUpdateGroupMutation } from "../../api";
import CloseIcon from "@mui/icons-material/Close";
import { ForCreatingGroup, GroupExtended } from "../../types";
import { IconButton } from "@mui/material";

const validationSchema = yup.object({
  name: yup
    .string()
    .min(2, "Name should be of minimum 8 characters length")
    .required("Name is required"),
  description: yup
    .string()
    .min(2, "Description should be of minimum 8 characters length")
    .required("Description is required"),
});

const GroupForm: React.FC<{
  group: GroupExtended | undefined;
  toggleForm: Function;
}> = ({ group, toggleForm }) => {
  const [createGroup, { isLoading: isCreating }] = useCreateGroupMutation();
  const [updateGroup, { isLoading: isUpdating }] = useUpdateGroupMutation();

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
          id: group?.id || undefined,
          name: group?.name || "",
          description: group?.description || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          if (group) {
            const updatedGroup: ForCreatingGroup = {
              name: values.name,
              description: values.description,
            };
            // @ts-ignore
            updateGroup({ id: group.id, data: updatedGroup });
            actions.resetForm();
          } else {
            const newGroup: ForCreatingGroup = {
              name: values.name,
              description: values.description,
            };
            createGroup(newGroup);
            actions.resetForm();
          }
          toggleForm(undefined);
        }}
      >
        {(props) => (
          <Form>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={props.values.name}
              onChange={props.handleChange}
              error={props.touched.name && Boolean(props.errors.name)}
              helperText={props.touched.name && props.errors.name}
              sx={{ mb: "20px" }}
            />
            <TextField
              fullWidth
              multiline
              id="description"
              name="description"
              label="Description"
              type="text"
              rows={3}
              maxRows={10}
              value={props.values.description}
              onChange={props.handleChange}
              error={
                props.touched.description && Boolean(props.errors.description)
              }
              helperText={props.touched.description && props.errors.description}
              sx={{ mb: "30px" }}
            />

            <Button
              buttonType={"Add"}
              text={"Add"}
              type="submit"
              style={{ width: "100%" }}
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default GroupForm;
