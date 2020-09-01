import React from "react";
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

import { Text1 } from "./reports/Text1.js";
import { Text2 } from "./reports/Text2.js";
import { Text3 } from "./reports/Text3.js";


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
        <Route path={`${path}/week/:ReportId`}>
          <Report />
        </Route>
      </Switch>
    </div>
  );
}

function Report() {
  // The <Route> that rendered this component has a
  // path of `/Reports/:ReportId`. The `:ReportId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { ReportId } = useParams();
  let CurrText;
  switch (ReportId) {
      case "1":
      default:
          CurrText = Text1;
          break;
      case "2":
          CurrText = Text2;
          break;
      case "3":
          CurrText = Text3;
          break;
  }

  return (
      <div>
        <h3>{`Rapport för vecka ${ReportId}`}</h3>
        <CurrText />
      </div>
  )
}

export { Reports };
