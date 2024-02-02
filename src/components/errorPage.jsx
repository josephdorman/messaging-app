import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <h1>
        Uh oh, route was not found click <Link to="/">here</Link> to redirect to
        home page
      </h1>
    </div>
  );
}

export default ErrorPage;
