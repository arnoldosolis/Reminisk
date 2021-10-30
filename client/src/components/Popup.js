import { Button } from "@material-ui/core";
import React from "react";
import "../components/Popup.css";

function JournalPagePopup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <Button
          class="waves-effect waves-light btn-large black"
          onClick={() => props.setTrigger(false)}
        >
          close
        </Button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default JournalPagePopup;
