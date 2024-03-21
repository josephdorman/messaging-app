import "../styles/main.css";

function Main(props) {
  function setGrid(props) {
    if (props.grid) {
      return "grid-2";
    }

    return "grid-3";
  }

  return (
    <>
      <div className={`main ${setGrid(props)}`}>{props.body}</div>
    </>
  );
}

export default Main;
