import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import io from "socket.io-client";


const baseURL = process.env.NODE_ENV === "development"
    ? "http://localhost:8300/"
    : "https://socket-server.linneaolofsson.me";

class Chatlog extends Component {
    constructor() {
        super();
        this.state = {
            allMsgs: [],
            redirect: null
        };
        this.socket = io(baseURL);
        this.socket.emit("chatLogRequest", "send");
    }

    componentDidMount() {
        this.socket.on("chatLogConfirmed", function (log) {
            addLog(log);
        });

        const addLog = log => {
            this.setState({ allMsgs: [log] });
        }
    }

    //When leaving, disconnect the connection
    componentWillUnmount() {
        this.setState({ allMsgs: [] });
        this.socket.disconnect();
    }

    chatlogredirect = (event) => {
        this.setState({ redirect: '/chat'})
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <main>
                <h2>Chattloggen</h2>
                <p>Här kan du se all chatthistorik</p>
                <div>
                    <p>
                    <button className="chatbutton" onClick={this.chatlogredirect}>Tillbaka</button>
                    </p>
                </div>
                <div id="all_msg">
                    {
                        this.state.allMsgs.map((log, key) => {
                            return (
                                <div key={key}>
                                {
                                    log.map((entry, nr) => {
                                        return (
                                            <div key={nr}>
                                            <span className="log_time"> {`${entry.time} - `}</span>
                                            <span className="log_user">{`${entry.user}`}</span>
                                            <p className="log_text">{`${entry.msg}`}</p></div>
                                        )
                                    })
                                }
                                </div>
                            )
                        })
                    }
                </div>
            </main>
        )
    }
}

export { Chatlog };
