import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Image } from "cloudinary-react";
import { useState } from "react";
import { Button } from "@material-ui/core/";
import Axios from "axios";
import Popup from "../components/Popup";
import "./JournalPage.css";
import { Redirect } from "react-router-dom";
// const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// let labelIndex = 0;
//
// function Map() {
//   const bangalore = { lat: 12.97, lng: 77.59 };
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 12,
//     center: bangalore,
//   });
//   google.maps.event.addListener(map, "click", (event) => {
//     addMarker(event.latLng, map);
//   });
//   addMarker(bangalore, map);
// }
//
// // Adds a marker to the map.
// function addMarker(location, map) {
//
//   new google.maps.Marker({
//     position: location,
//     label: labels[labelIndex++ % labels.length],
//     map: map,
//   });
// }

function JournalPage({ authorized }) {
  const [buttonPopup, setButtonPopup] = useState(false);

  const [date, setDate] = useState("");
  const [journal, setJournal] = useState("");
  const [img, setImg] = useState([]);
  var imgU = "";
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

  return (
    <div class="center-align">
      <Button
        class="waves-effect waves-light btn-large black"
        onClick={() => setButtonPopup(true)}
      >
        Upload
      </Button>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
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
        //pin location
        <label for="maps">Pin a location</label>
        <div id="map" ></div>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCjexxgkitg1lfaWOqau0OIOW0OYBCgrTc&callback=myMap"></script>

        <br />
        <Button
          class="waves-effect waves-light btn-large black"
          onClick={() => {
            addJournalEntry();
            imgU = "";
          }}
        >
          Done
        </Button>
      </Popup>
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
                  <label>Sort by</label>
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
                    type="text"
                    id="myInput"
                    placeholder="Search by date"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Entry&nbsp;</TableCell>
                <TableCell align="center">Image&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {journalList.map((val, key) => (
                <TableRow key={val.journallog_id}>
                  <TableCell align="center">
                    {val.journal_date.substring(0, 10)}
                  </TableCell>
                  <TableCell align="center">{val.journal_entry}</TableCell>
                  <TableCell align="center">
                    <Image
                      style={{ width: 200, margin: 50 }}
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
