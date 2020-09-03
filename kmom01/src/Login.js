import React, { Component } from "react";
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

class Login extends Component {
  constructor() {
      super();
      this.state = { data: "" };
  }

  submitHandler = (event) => {
      event.preventDefault();
      const url = 'http://localhost:1337/register/';

      let payload={
          'email': this.state.email,
          'password': this.state.password
      }

      fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
      })
        .then(response => response.json())
        .then(data => {
            console.log('success, ', data);
            //creates a redirect to login site
            this.props.history.push('/login');
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
  };

  changeHandler = (event) => {
      let email = event.target.email;
      let password = event.target.password;
      this.setState({[email]: password})
  };

  render() {
      return (
          <main>
              <h2>Logga In</h2>
              <ul className="weeks">
                  <li>
                      <Link to="register">Registrering</Link>
                  </li>
              </ul>

            <form onSubmit={this.submitHandler}>
                <label>Enter email: </label>
                <br/>
                <input
                    type='email'
                    name='email'
                    required
                    onChange={this.changeHandler}
                />
                <br/>
                <label>Enter Password (minimum 8 characters, 1 number)</label>
                <br/>
                <input
                    type='password'
                    name='password'
                    required
                    onChange={this.changeHandler}
                    autoComplete="off"
                />
                <br/>
                <input
                    type='submit'
                />
            </form>
          </main>
      );
  }
}



export { Login };
