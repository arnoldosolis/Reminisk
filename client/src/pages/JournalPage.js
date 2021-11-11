import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { Image } from "cloudinary-react";
import { useState } from "react";
import { Button } from "@material-ui/core/";
import Axios from "axios";
import Popup from "../components/Popup";
import "./JournalPage.css";
import { Redirect } from "react-router-dom";
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;

/*
function Map() {
  const bangalore = { lat: 12.97, lng: 77.59 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: bangalore,
  });
  google.maps.event.addListener(map, "click", (event) => {
    addMarker(event.latLng, map);
  });
  addMarker(bangalore, map);
}

// Adds a marker to the map.
function addMarker(location, map) {

  new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map,
  });
} */

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function JournalPage({ authorized }) {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [date, setDate] = useState("");
  const [journal, setJournal] = useState("");
  const [entry, setEntry] = useState("");
  const [img, setImg] = useState([]);
  var imgU = "";
  var selectedJournal = 0;
  const [journalList, setJournalList] = useState([]);

  if (!authorized) {
    return <Redirect to="/" />;
  }

  // Need this to allow cloudinary
  Axios.defaults.withCredentials = false;

  const addJournalEntry = () => {
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "fom93swy");

    Axios.post(
      "https://api.cloudinary.com/v1_1/reminisk/image/upload",
      formData
    ).then((response) => {
      console.log(response.data.url);
      imgU = response.data.url;
    });

    setTimeout(() => {
      console.log(imgU);
      Axios.post("http://localhost:3001/upload", {
        date: date,
        journal: journal,
        imgURL: imgU,
      }).then(() => {
        setJournalList([
          ...journalList,
          {
            date: date,
            journal: journal,
            imgURL: imgU,
          },
        ]);
      });
    }, 1000);
  };

  const getJournalEntry = () => {
    Axios.get("http://localhost:3001/journals").then((response) => {
      setJournalList(response.data);
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen1 = () => {
    const uEntry = [];
    for (let i = 0; i < journalList.length; i++) {
      if (selectedJournal === journalList[i].journallog_id) {
        uEntry.push(journalList[i]);
        console.log(uEntry);
        setEntry(journalList[i]);
      }
      // console.log(journalList[i].journallog_id);
    }
    //console.log(journalList);
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  return (
    <div class="center-align">
      {/*Dialog for uploading a journal entry*/}
      <Button
        class="waves-effect waves-light btn-large black"
        onClick={handleClickOpen}
      >
        UPLOAD
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{"Journal Entry"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <input
              type="date"
              onChange={(e) => {
                setDate(e.target.value);
                //console.log(e.target.value);
              }}
            />
            <textarea
              placeholder="How was your day?"
              onChange={(e) => {
                setJournal(e.target.value);
                //console.log(e.target.value);
              }}
            />
            <label for="img">
              Chose any picture that you would like to remember today by:
            </label>
            <input
              type="file"
              onChange={(e) => {
                //console.log(e.target.files[0]);
                setImg(e.target.files[0]);
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            class="waves-effect waves-light btn-large black"
            onClick={() => {
              addJournalEntry();
              imgU = "";
              handleClose();
            }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>

      {/*Display Journal Entries*/}
      {getJournalEntry()}
      <div className="journal-entries">
        <TableContainer component={Paper}>
          <Table
            align="center"
            sx={{ maxWidth: 1500, border: 1 }}
            aria-label="caption table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <label style={{ color: "black" }}>Sort by</label>
                </TableCell>
                <TableCell align="center">
                  <Button class="waves-effect waves-light btn-large black">
                    Recent
                  </Button>
                  <Button class="waves-effect waves-light btn-large black">
                    Oldest
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <input
                    type="date"
                    id="myInput"
                    placeholder="Search by date"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  align="center"
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  Date
                </TableCell>
                <TableCell
                  align="center"
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  Entry&nbsp;
                </TableCell>
                <TableCell
                  align="center"
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  Image&nbsp;
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {journalList.map((val, key) => (
                <TableRow
                  hover
                  key={val.journallog_id}
                  onClick={() => {
                    selectedJournal = val.journallog_id;
                    console.log(selectedJournal);
                    handleClickOpen1();
                  }}
                >
                  <TableCell align="center">
                    {val.journal_date.substring(0, 10)}
                  </TableCell>
                  <TableCell align="center">{val.journal_entry}</TableCell>
                  <TableCell align="center">
                    <Image
                      style={{ width: 100, margin: 50 }}
                      cloudName="reminisk"
                      publicId={val.image}
                    />

                    {/*Dialog for viewing entries at fullscreen*/}
                    <Dialog
                      fullScreen
                      open={open1}
                      onClose={handleClose1}
                      TransitionComponent={Transition}
                    >
                      <AppBar
                        sx={{ position: "relative", backgroundColor: "black" }}
                      >
                        <Toolbar></Toolbar>
                      </AppBar>
                      <List>{entry.journallog_id}</List>
                      <List>{entry.journal_date.substring(0, 10)}</List>
                      <List>{entry.journal_entry}</List>
                      <List>
                        <Image
                          style={{ width: 400, margin: 20 }}
                          cloudName="reminisk"
                          publicId={entry.image}
                        />
                      </List>
                      <Button
                        autoFocus
                        onClick={handleClose}
                        style={{ width: "200px" }}
                        class="waves-effect waves-light btn-large black"
                      >
                        Exit
                      </Button>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default JournalPage;
