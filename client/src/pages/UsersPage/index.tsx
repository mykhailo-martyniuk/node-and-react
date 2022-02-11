import Table from "../../compontents/TableUsers";
import React from "react";
import Button from "../../compontents/Button";

export default function UsersPage({ addClickHandler = (arg: any) => {} }) {
  return (
    <section style={{ marginTop: "30px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          buttonType={"Add"}
          text={"Add new user"}
          onClick={() => addClickHandler(undefined)}
          style={{ marginBottom: "30px" }}
        />
      </div>
      <Table editModalSwitcher={addClickHandler} />
    </section>
  );
}
