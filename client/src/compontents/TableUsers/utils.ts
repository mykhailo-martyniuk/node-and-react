import { Group } from "../../types";
import React, { useState } from "react";

export interface Column {
  id: "user_name" | "email" | "created" | "groups" | "id";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: any) => string;
}

export const columns: readonly Column[] = [
  { id: "id", label: "ID", minWidth: 50, format: (value: string) => value },
  {
    id: "user_name",
    label: "Nickname",
    minWidth: 150,
    align: "left",
    format: (value: string) => value,
  },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "left",
    format: (value: string) => value,
  },
  {
    id: "created",
    label: "Created",
    minWidth: 170,
    align: "left",
    format: (value: string) => value.replace("T", " ").replace(".000Z", ""),
  },
  {
    id: "groups",
    label: "Groups",
    minWidth: 200,
    align: "left",
    format: (value: Group[]) => value.map((el) => el.name).join(" "),
  },
];


