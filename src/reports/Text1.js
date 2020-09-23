import React, { Component }from "react";
import ReactMarkdown from 'react-markdown';

import Markdown1 from './reportsmd/text1.md';

class Text1 extends Component {
    constructor(props) {
        super(props)

        this.state = { terms: null }
    }

    componentWillMount() {
        fetch(Markdown1)
        .then((response) => response.text())
        .then((text) => {
            this.setState({ terms: text })
        })
    }

    render() {
        return (
            <div className="content">
                <ReactMarkdown source={this.state.terms} />
            </div>
        )
    }
}

export { Text1 };
