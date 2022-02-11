import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useGetGroupsQuery } from "../../api";
import { useField } from 'formik';
import { useEffect } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function MultipleSelect(props:any) {
  const [groupName, setGroupName] = React.useState<string[]>([]);

  const [field, meta, helpers] = useField(props.name);
  const { value } = meta;
  console.log('value', value);
  const { setValue } = helpers;

  useEffect(() => {
    if(value.length > 0) {
      setGroupName(typeof value === "string" ? value.split(",") : value)
    }
  }, [])


  const { data: groups, isFetching, isLoading } = useGetGroupsQuery();


  const handleChange = (event: SelectChangeEvent<typeof groupName>) => {
    const {
      target: { value },
    } = event;
    setGroupName(
      typeof value === "string" ? value.split(",") : value
    );
    setValue(value)
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!groups) {
    return <div>Error</div>;
  }
  return (

      <FormControl sx={{  width: '100%' }} >
        <InputLabel id="multiple-checkbox-label">Groups</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple
          value={groupName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {groups.map((group) => (
            <MenuItem key={group.id} value={group.name} >
              <Checkbox checked={groupName.indexOf(group.name) > -1} />
              <ListItemText primary={group.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}



