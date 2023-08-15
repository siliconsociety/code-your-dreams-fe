"use client"

import React, { useState } from "react"
import styles from "./page.module.scss"
import { DataGrid } from "@mui/x-data-grid"
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import Modal from "@/components/Modal/Modal"
// import NewMaterialType from "./NewMaterialType"
import NewSuperUser from "./NewSuperUser"
import DestroyButton from "@/components/admin/DestroyButton/DestroyButton"

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "memberName", headerName: "Name", width: 250 },
  { field: "emailAddress", headerName: "Email", width: 300 },
  { field: "adminFlag", headerName: "Super Admin?", width: 200 },
]

const rows = [
  {
    id: 1,
    memberName: "Brianne Caplan",
    emailAddress: "brianne@codeyourdreams.org",
    adminFlag: "Yes",
  },
  {
    id: 2,
    memberName: "John Dodson",
    emailAddress: "john@codeyourdreams.org",
    adminFlag: "",
  },
]

function createData(type, count, edit, destroy) {
  return { type, count, edit, destroy }
}

const tableRows = [
  createData("Document", 52, "edit", ""),
  createData("Presentation", 64, "edit", ""),
  createData("Video", 16, "edit", ""),
  createData("Quiz", 8, "edit", ""),
  createData("Test", 0, "edit", "delete"),
]

export default function Page() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <main className={styles.admin}>
      <aside className="TODO">
        TODO:
        <ul>
          <li>Implement Auth0 integration for admin users.</li>
          <li>Implement local changes for admin users, e.g., admin flag.</li>
          <li>Add support for multiple modals on same page.</li>
        </ul>
      </aside>
      <section className="container">
        <h1>Admin Settings</h1>
        <div className="header-row">
          <h2>Super users</h2>
          <div className="add-button">
            <IconButton
              color="primary"
              size="large"
              onClick={() => handleOpen()}
              aria-label="add a super user"
            >
              <PersonAddIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
        <p className="italic">
          Super users will have the ability to access all course materials.
          Super admins will have the ability to manage settings for the entire
          application.
        </p>
        {/* TODO: We'll need to enable user editing via Auth0 as well as local editing.
            Locally we'd need to managed the admin flag, if anything else. */}
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </section>
      <section className={`container ${styles.materials}`}>
        {/* TODO: This is where we will put our materials types definitions.
            We'll need to think through logic on when we allow removal of a definition.
            E.g., if there are any instances linked to that definition, you cannot delete, etc.
            The UI must help ensure users only can delete an unlinked material type. */}
        <div className="header-row">
          <h2>Materials types</h2>
          <div className="add-button">
            <IconButton
              color="primary"
              size="large"
              onClick={() => handleOpen()}
              aria-label="add a materials type"
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
        <p className="italic">
          A materials type can only be removed if there are zero instances of it
          being used&mdash;you must change the type for each file for all files
          before you can delete a type.
        </p>
        {/* TODO: the DestroyButton component should be inserted into the "destroy" column of any material-type row with 0 linked materials */}
        <DestroyButton label="delete" />
        <TableContainer>
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Types</TableCell>
                <TableCell align="right">Count</TableCell>
                <TableCell colSpan={2}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRows.map((tableRows) => (
                <TableRow
                  key={tableRows.type}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {tableRows.type}
                  </TableCell>
                  <TableCell align="right">{tableRows.count}</TableCell>
                  <TableCell>{tableRows.edit}</TableCell>
                  <TableCell>{tableRows.destroy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>

      {/* TODO: We need to add support for multiple modal options in the same page.
      One would show the "NewMaterialType" component, while the other shows the
      "NewSuperUser" component. Each will need to have its own title field prop
      to send to the component. */}
      <Modal
        title="Create a New Materials Type"
        open={open}
        handleClose={handleClose}
      >
        {/* <NewMaterialType /> */}
        <NewSuperUser />
      </Modal>
    </main>
  )
}
