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

import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import { Image } from "cloudinary-react";
import { useState, useEffect } from "react";
import { Button } from "@material-ui/core/";
import Axios from "axios";
import "./JournalPage.css";
import { Redirect } from "react-router-dom";
//const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// let labelIndex = 0;

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
  const [journalList, setJournalList] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/journals").then((response) => {
      setJournalList(response.data);
    });
  }, []);

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [date, setDate] = useState("");
  const [journal, setJournal] = useState("");
  const [entry, setEntry] = useState("");
  const [img, setImg] = useState([]);
  const [location, setLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [upVal, setUpVal] = useState("");
  const [col, setCol] = useState("");
  const [fillInput, setFillInput] = useState("");
  var imgU = "";
  var selectedJournal = 0;
  const [jid, setJid] = useState(0);
  //if (!authorized) {
  //  return <Redirect to="/" />;
  // }

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
        location: location,
      }).then(() => {
        setJournalList([
          ...journalList,
          {
            date: date,
            journal: journal,
            imgURL: imgU,
            location: location,
          },
        ]);
      });
    }, 1000);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen1 = () => {
    for (let i = 0; i < journalList.length; i++) {
      if (selectedJournal === journalList[i].journallog_id) {
        journalList[i].journal_date = journalList[i].journal_date.substring(
          0,
          10
        );
        console.log("handleClickOpen1", journalList[i]);
        setEntry(journalList[i]);
      }
    }
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const sorting = (order) => {
    if (order === "Oldest") {
      const sorted = [...journalList].sort((a, b) =>
        a[journalList.journal_date] > b[journalList.journal_date] ? 1 : -1
      );
      setJournalList(sorted);
    }
    if (order === "Recent") {
      const sorted = [...journalList].sort((a, b) =>
        a[journalList.journal_date] < b[journalList.journal_date] ? 1 : -1
      );
      setJournalList(sorted);
    }
  };
  const updateJournalEntry = () => {
    Axios.put("http://localhost:3001/update", {
      upVal: upVal,
      journallog_id: jid,
      col: col,
    });
  };

  return (
    <div class="center-align">
      {/*Dialog for uploading a journal entry*/}
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
              style={{ width: "553px", height: "300px" }}
              onChange={(e) => {
                setJournal(e.target.value);
                //console.log(e.target.value);
              }}
            />
            <label for="img">
              Chose any picture that you would like to remember today by:
            </label>
            <br />
            <input
              type="file"
              onChange={(e) => {
                setImg(e.target.files[0]);
              }}
            />
            <input
              type="text"
              placeholder="Address of image that was taken..."
              onChange={(e) => {
                setLocation(e.target.value);
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
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>

      {/*Dialog for viewing entries at fullscreen*/}
      <Dialog
        fullScreen
        open={open1}
        onClose={handleClose1}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "black" }}>
          <Toolbar></Toolbar>
        </AppBar>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            margin: "100px",
          }}
        >
          <List>
            <Image
              style={{ width: 500, margin: 10 }}
              cloudName="reminisk"
              publicId={entry.image}
            />
          </List>
          <List
            onClick={() => {
              setCol("journal_date");
              setFillInput(entry.journal_date);
            }}
          >
            {entry.journal_date}
          </List>
          <List
            style={{ hover: "pointer" }}
            onClick={() => {
              setCol("journal_entry");
              setFillInput(entry.journal_entry);
            }}
          >
            {entry.journal_entry}
          </List>
          <Button
            onClick={handleClose1}
            style={{ width: "200px" }}
            class="waves-effect waves-light btn-large black"
          >
            Exit
          </Button>
          <label>
            Click on a field and then change or remove anything. Press update to
            make change.
          </label>
          <input
            type="text"
            style={{ width: "630px" }}
            placeholder={fillInput}
            onChange={(event) => {
              setUpVal(event.target.value);
            }}
          />
          <Button
            style={{ width: "200px" }}
            class="waves-effect waves-light btn-large black"
            onClick={() => {
              updateJournalEntry();
              handleClose1();
              window.location.reload();
            }}
          >
            Update
          </Button>
        </div>
      </Dialog>

      {/*Display Journal Entries*/}
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
                  <Button
                    class="waves-effect waves-light btn-large black"
                    onClick={() => {
                      sorting("Recent");
                    }}
                  >
                    Recent
                  </Button>
                  <Button
                    class="waves-effect waves-light btn-large black"
                    onClick={handleClickOpen}
                  >
                    UPLOAD
                  </Button>
                  <Button
                    class="waves-effect waves-light btn-large black"
                    onClick={() => {
                      sorting("Oldest");
                    }}
                  >
                    Oldest
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <input
                    type="date"
                    id="myInput"
                    placeholder="Search by date"
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
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
              {journalList
                .filter((val) => {
                  if (searchTerm === "") {
                    return val;
                  } else if (val.journal_date.includes(searchTerm)) {
                    return val;
                  }
                })
                .map((val, key) => (
                  <TableRow
                    hover
                    key={val.journallog_id}
                    onClick={() => {
                      selectedJournal = val.journallog_id;
                      setJid(val.journallog_id);
                      console.log(selectedJournal);
                      handleClickOpen1();
                    }}
                  >
                    <TableCell align="center">
                      {val.journal_date.substring(0, 10)}
                    </TableCell>
                    <TableCell align="center">
                      {val.journal_entry.substring(0, 20)}
                    </TableCell>
                    <TableCell align="center">
                      <Image
                        style={{ width: 100, margin: 50 }}
                        cloudName="reminisk"
                        publicId={val.image}
                      />
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
