import React, { Component } from "react";

import { auth } from "./Auth.js";

class Edit extends Component {
    constructor() {
        super();
        this.state = {
            rtext: "",
            reportId: "",
            redirect: null,
            msg: ""
          };
    }

    componentDidMount() {
        fetch("https://me-api.linneaolofsson.me/reports/week/" + this.props.match.params.ReportId)
            .then(response => response.json())
            .then(data => {
                this.setState({ rtext: data.data.reporttext });
                this.setState({ reportId: this.props.match.params.ReportId });
            });
    };

    submitHandler = (event) => {
        event.preventDefault();
        const url = `https://me-api.linneaolofsson.me/reports/edit/${this.state.reportId}`;

        let payload={
            'rtext': this.state.rtext,
            'reportId': this.state.reportId
        }

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `${auth.token}`
            },
            body: JSON.stringify(payload)
        })
          .then(response => response.json())
          .then(data => {
              if (data.data) {
                  this.setState({ msg: 'Rapport uppdaterad'});
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
        this.setState({[name]: value});
    };

    render() {
        return (
            <main>
                <h3>Uppdatera</h3>
                <p>Här kan du editera din rapport.</p>
                <p className={"infomsg"}>{this.state.msg}</p>

                <form onSubmit={this.submitHandler}>
                <label htmlFor="reportId" >RapportID</label>
                    <br/>
                    <input
                        type="number"
                        name="reportId"
                        value={this.state.reportId}
                        onChange={this.changeHandler}
                        />
                    <br/>
                    <label htmlFor="rtext">Text</label>
                    <br/>
                    <textarea
                        type="textarea"
                        name="rtext"
                        value={this.state.rtext}
                        rows={20}
                        cols={40}
                        onChange={this.changeHandler}
                    />
                    <br/>
                    <input
                        type='submit'
                        value="Uppdatera"
                    />
                </form>
            </main>
        )
    }
}

export { Edit };
