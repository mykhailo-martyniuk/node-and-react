export interface Column {
  id: "name" | "description" | "id";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: any) => string;
}

export const columns: readonly Column[] = [
  { id: "id", label: "ID", minWidth: 50, format: (value: string) => value },
  {
    id: "name",
    label: "Name",
    minWidth: 150,
    align: "left",
    format: (value: string) => value,
  },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
    align: "left",
    format: (value: string) => value,
  },
];