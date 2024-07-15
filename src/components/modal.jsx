import "../styles/modal.css";

function Modal(props) {
  return (
    <div className="modal">
      <h3>{props.title}</h3>
      {props.perm && <p className="chunky">This action can not be reversed</p>}
      {props.btns}
    </div>
  );
}

export default Modal;
