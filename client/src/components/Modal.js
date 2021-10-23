import styles from "./Modal.module.css";

function Modal(props) {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div className={styles.message}>
          <h5>{props.display}</h5>
        </div>
        <button className={styles.button} onClick={props.onClick}>
          OK
        </button>
      </div>
    </div>
  );
}

export default Modal;
