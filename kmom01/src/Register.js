import React, { Component } from "react";
import {
  Redirect,
  Link,
} from "react-router-dom";

class Register extends Component {
  constructor() {
      super();
      this.state = {
          email: "",
          password: "",
          redirect: null };
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
            this.setState({ redirect: '/login'});
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
  };

  changeHandler = (event) => {
      let name = event.target.name;
      let value = event.target.value;
      this.setState({[name]: value})
  };

  render() {
      if (this.state.redirect) {
          return <Redirect to={this.state.redirect} />
      }
      return (
          <main>
            <h3>Registrera dig</h3>
            <ul className="weeks">
              <li>
                <Link to="register">Logga in</Link>
              </li>
            </ul>

            <form onSubmit={this.submitHandler}>
                <p>Enter email: </p>
                <br/>
                <input
                    type='text'
                    name='email'
                    required
                    onChange={this.changeHandler}
                    autoComplete='username'
                />
                <br/>
                <p>Enter Password (minimum 8 characters, 1 number)</p>
                <br/>
                <input
                    type='password'
                    name='password'
                    required
                    onChange={this.changeHandler}
                    minLength='8'
                    autoComplete='current-password'
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



export { Register };
