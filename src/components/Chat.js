import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import io from "socket.io-client";

const baseURL = process.env.NODE_ENV === "development"
    ? "http://localhost:8300/"
    : "https://socket-server.linneaolofsson.me";

class Chat extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            error: "",
            msg: "",
            prevUser: "",
            allMsgs: [],
            redirect: null
        };

        this.socket = io(baseURL);
    }

    componentDidMount() {
        this.socket.on("chatmsg", function (message) {
            addMessage(message);
        });

        // this.socket.on("allMsgs", function (message) {
        //     this.setState ({ allMsgs: message });
        // });

        //adds new message to log of all messages
        const addMessage = message => {
            this.setState({ allMsgs: [...this.state.allMsgs, message] });
        }

        this.postUser = temp => {
            temp.preventDefault();
        }

        this.postMsg = temp => {
            temp.preventDefault();
            let currtime = new Date();
            currtime = currtime.toLocaleTimeString();

            if (this.state.prevUser === "") {
                if (this.state.msg.length > 0 && this.state.user.length > 0) {
                    this.setState({ error: "" });
                    this.socket.emit("userConnected", {
                        time: currtime,
                        user: this.state.user,
                        msg: this.state.user + " har anslutit till chatten!"
                    });
                    this.socket.emit("send", {
                        time: currtime,
                        user: this.state.user,
                        msg: this.state.msg
                    });
                    this.setState({ msg: "" });
                    this.setState({ prevUser: this.state.user })
                    document.getElementById("new_msg").value = "";
                } else {
                    this.setState({ error: "Skriv in ditt användarnamn för att chatta" });
                }
            } else if (this.state.prevUser !== this.state.user) {
                if (this.state.msg.length > 0 && this.state.user.length > 0) {
                    this.setState({ error: "" });
                    this.socket.emit("userConnected", {
                        time: currtime,
                        user: this.state.user,
                        msg: this.state.prevUser + " har bytt namn till " + this.state.user
                    });
                    this.socket.emit("send", {
                        time: currtime,
                        user: this.state.user,
                        msg: this.state.msg
                    });
                    this.setState({ msg: "" });
                    this.setState({ prevUser: this.state.user })
                    document.getElementById("new_msg").value = "";
                } else {
                    this.setState({ error: "Skriv in ditt användarnamn för att chatta" });
                }
            } else  {
                if (this.state.msg.length > 0 && this.state.user.length > 0) {
                    this.setState({ error: "" });
                    this.socket.emit("send", {
                        time: currtime,
                        user: this.state.user,
                        msg: this.state.msg
                    });
                    this.setState({ msg: "" });
                    this.setState({ prevUser: this.state.user })
                    document.getElementById("new_msg").value = "";
                } else {
                    this.setState({ error: "Skriv in ditt användarnamn för att chatta" });
                }
            }
        }
    }

    changeHandlerUser = (event) => {
         this.setState({ user: event.target.value})
    }

    pressEnterHandler = (event) => {
        if (event.keyCode === 13) {
            this.postMsg(event);
        }
    }

    changeHandlerMsg = (event) => {
         this.setState({ msg: event.target.value})
    }

    chatlogredirect = (event) => {
        this.setState({ redirect: '/chatlog'})
    }

    //on update, adjust the window with scrolling to latest message
    componentDidUpdate() {
        if (this.state.redirect === null) {
            let update = document.getElementById("all_msg");
            update.scrollTop = update.scrollHeight;
        }
    }

    //When leaving, disconnect the chat.
    componentWillUnmount() {
        this.socket.disconnect();
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <main>
                <h2>Chatt</h2>
                <p>Sugen på att chatta? Fyll i ditt namn och sätt igång!</p>
                <div>
                    <p>
                    <button className="chatbutton" onClick={this.chatlogredirect}>Chattlog</button>
                    </p>
                </div>
                <div id="all_msg">
                    {
                        this.state.allMsgs.map((msg, key) => {
                            return (
                                <div key={key}>
                                <span className="msg_time"> {`${msg.time} - `}</span>
                                <span className="msg_user">{`${msg.user}`}</span>
                                <p className="msg_text">{`${msg.msg}`}</p></div>
                            )
                        })
                    }
                </div>
                <form>
                    <label htmlFor="user">Användarnamn</label>
                    <br/>
                    <input
                        type="text"
                        name="user"
                        className="new_msg"
                        required
                        onChange={this.changeHandlerUser}
                        />
                    <br/>
                    <div className="chaterror">
                    {this.state.error}
                    </div>
                    <label htmlFor="msg">Meddelande</label>
                    <br/>
                    <i className="smalli">Tryck enter för att skicka meddelandet</i>
                    <br/>
                    <textarea
                        type='textarea'
                        rows={10}
                        cols={40}
                        required
                        name="msg"
                        autoComplete="off"
                        onKeyDown= {this.pressEnterHandler}
                        onChange= {this.changeHandlerMsg}
                        id="new_msg"
                    />
                </form>
                <i>Observera att chattmeddelandena sparas med ditt användarnamn och meddelande</i>
            </main>
        )
    }
}

export { Chat };
