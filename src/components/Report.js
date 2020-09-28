import React, { Component } from "react";
import ReactMarkdown from 'react-markdown';

import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

import { Edit } from "./Edit.js";
import { Newpost } from "./Newpost.js";
import { auth } from "./Auth.js";

const baseURL = process.env.NODE_ENV === "development"
    ? "http://localhost:1337/reports/week/"
    : "https://me-api.linneaolofsson.me/reports/week/";


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
        <li>
          <Link to={`${url}/week/4`}>Vecka 4</Link>
        </li>
        <li>
          <Link to={`${url}/week/5`}>Vecka 5</Link>
        </li>
        <li>
          <Link to={`${url}/week/6`}>Vecka 6</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
          <h4>För att läsa en rapport, välj vecka ovan</h4>
          {/* om jag vill ta bort från report startpage*/}
          <Newpost />
        </Route>
        <Route path={`${path}/week/:ReportId`} component={Report}>
        </Route>
        <Route path={`${path}/edit/:ReportId`} component={Edit}>
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
      fetch(baseURL + this.props.match.params.ReportId)
          .then(response => response.json())
          .then(data => {
              this.setState({ data: data.data.reporttext});
          });
  };

  componentDidUpdate(prevProps) {
      if(prevProps.match.params.ReportId !== this.props.match.params.ReportId) {
          fetch(baseURL + this.props.match.params.ReportId)
              .then(response => response.json())
              .then(data => {
                  this.setState({ data: data.data.reporttext});
              });
      }
  }

  render() {
      if (auth.token) {
          return (
              <main>
                  <Link className={"edit"} to={`/reports/edit/${this.props.match.params.ReportId}`}>Editera</Link>
                  <div className={"content"} >
                    <h3>{`Rapport för vecka ${this.props.match.params.ReportId}`}</h3>
                    <ReactMarkdown source={this.state.data} />
                  </div>
              </main>
          )
      }
      return (
          <div className={"content"} >
            <h3>{`Rapport för vecka ${this.props.match.params.ReportId}`}</h3>
            <ReactMarkdown source={this.state.data} />
          </div>
      )
  }
}

export { Reports };
