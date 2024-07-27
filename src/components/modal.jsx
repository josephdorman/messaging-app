import "../styles/modal.css";

function Modal(props) {
  return (
    <div className="modal">
      <h3>{props.title}</h3>
      {props.perm && (
        <p className="chunky modal-warning">This action can not be reversed</p>
      )}
      <div className="modal-btns">{props.btns}</div>
    </div>
  );
}

export default Modal;
