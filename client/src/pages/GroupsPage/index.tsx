import React from "react";
import Button from "../../compontents/Button";
import TableGroups from '../../compontents/TableGroups';

export function GroupsPage({ addClickHandler = (arg:any) => {} }) {
  return (
    <section style={{ marginTop: "30px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          buttonType={"Add"}
          text={"Add new group"}
          onClick={() => addClickHandler(undefined)}
          style={{ marginBottom: "30px" }}
        />
      </div>
      <TableGroups editModalSwitcher={addClickHandler} />
    </section>
  );
}
