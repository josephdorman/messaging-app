import profile from "../../assets/profileIcon.svg";

function Pending() {
  return (
    <>
      <div className="pending">
        <h3 className="chunky">Pending - 0</h3>
        <div className="fr-layout">
          <div className="fr">
            <img className="icon-md" src={profile} alt="" />
            <p>fhsdjhfjksdhfjksdhfjk</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pending;
