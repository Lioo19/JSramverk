import React, { Component } from "react";

import { auth } from "./Auth.js"

class Newpost extends Component {
    constructor() {
        super();
        this.state = {
            rtext: "",
            reportId: "",
            redirect: null,
            msg: ""
        };
    }

    submitHandler = (event) => {
        event.preventDefault();
        const url = 'http://localhost:1337/reports/';

        let payload={
            'reportId': this.state.reportId,
            'rtext': this.state.rtext
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `${auth.token}`
            },
            body: JSON.stringify(payload)
        })
          .then(response => response.json())
          .then(data => {
              if (data.data) {
                  this.setState({ msg: 'Rapporten har skapats'});
              } else if (data.errors) {
                  this.setState({ msg: data.errors.detail });
              }
          })
          .catch((error) => {
              this.setState({ msg: error.details });
          });
    };


    changeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value})
    };

    render() {
        if (auth.token) {
            return (
                <main>
                    <h2>Ny Rapport</h2>
                    <p>Här kan du skapa en ny rapport. Glöm inte att fylla i rapportID</p>
                    <p>{this.state.msg}</p>
                    <form onSubmit={this.submitHandler}>
                        <label htmlFor="reportId" >RapportID</label>
                        <br/>
                        <input
                            type="number"
                            name="reportId"
                            required
                            onChange={this.changeHandler}
                            />
                        <br/>
                        <label htmlFor="rtext">Text</label>
                        <br/>
                        <textarea
                            type="textarea"
                            name="rtext"
                            rows={20}
                            cols={40}
                            required
                            onChange={this.changeHandler}
                        />
                        <br/>
                        <input
                            type='submit'
                            value="Skicka"
                        />
                    </form>
                </main>
            )
        }
        return (
            <main>
            <h3>Ny rapport</h3>
            <p> För att kunna skapa nya inlägg, vänligen logga in.</p>
            </main>
        )
    }
}

export { Newpost };
