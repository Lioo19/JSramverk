import React, { Component } from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";


function Reports() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();

  return (
    <div>
      <h2>Rapporter</h2>
      <ul className="weeks">
        <li>
          <Link to={`${url}/week/1`}>Vecka 1</Link>
        </li>
        <li>
          <Link to={`${url}/week/2`}>Vecka 2</Link>
        </li>
        <li>
          <Link to={`${url}/week/3`}>Vecka 3</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
          <h4>För att läsa en rapport, välj vecka ovan</h4>
        </Route>
        <Route path={`${path}/week/:ReportId`} component={Report}>
        </Route>
      </Switch>
    </div>
  );
}

class Report extends Component {
  // The <Route> that rendered this component has a
  // path of `/Reports/:ReportId`. The `:ReportId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  constructor() {
      super();
      this.state = { data: "" };
  }

  componentDidMount() {
      console.log("mounted");
      fetch("http://localhost:1337/reports/week/" + this.props.match.params.ReportId)
          .then(response => response.json())
          .then(data => {
              this.setState({ data: data.data.reporttext});
          });
  };


  render() {
      return (
          <div>
            <h3>{`Rapport för vecka ${this.props.match.params.ReportId}`}</h3>
            <p>{this.state.data}</p>
          </div>
      )
  }
}

export { Reports };
