import "../styles/errorPage.css";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="error-page">
      <h1>
        Uh oh, route was not found click <Link to="/">here</Link> to redirect to
        home page
      </h1>
    </div>
  );
}

export default ErrorPage;
