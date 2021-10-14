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

function JournalPage() {
  const [buttonPopup, setButtonPopup] = useState(false);

  const [date, setDate] = useState("");
  const [journal, setJournal] = useState("");
  const [img, setImg] = useState("");
  const [imgURL, setImgURL] = useState("");

  const [journalList, setJournalList] = useState([]);

  const addJournalEntry = () => {
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "fom93swy");

    Axios.post(
      "https://api.cloudinary.com/v1_1/reminisk/image/upload",
      formData
    ).then((response) => {
      console.log(response.data.url);
      setImgURL(response.data.url);
    });
    Axios.post("http://localhost:3001/upload", {
      date: date,
      journal: journal,
      imgURL: imgURL,
    }).then(() => {
      setJournalList([
        ...journalList,
        {
          date: date,
          journal: journal,
          imgURL: imgURL,
        },
      ]);
      console.log("Success");
    });
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
        <br />
        <Button
          class="waves-effect waves-light btn-large black"
          onClick={addJournalEntry}
        >
          Done
        </Button>
      </Popup>
      {getJournalEntry()}
      {journalList.map((val, key) => {
        return (
          <div className="journal-entries">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <caption>A basic table example with a caption</caption>
                <TableHead>
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
        );
      })}
    </div>
  );
}

export default JournalPage;
