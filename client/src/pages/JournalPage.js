import React from "react";
import { Image } from "cloudinary-react";
import { useState } from "react";
import { Button } from "@material-ui/core/";
import Axios from "axios";
import Popup from "../components/Popup";

function JournalPage() {
  const [buttonPopup, setButtonPopup] = useState(false);

  const [date, setDate] = useState("");
  const [journal, setJournal] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [img, setImg] = useState("");

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
          accept="image/*"
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
          <div>
            <h3>{val.journal_date}</h3>
            <h3>{val.journal_entry}</h3>
            <Image cloudName="reminisk" publicId={val.image} />
          </div>
        );
      })}
    </div>
  );
}

export default JournalPage;
