import React, { Component } from "react";
import frontimg from "./frontimg.jpg";

class Home extends Component {
  constructor() {
    super();
    this.state = { data: [] };
    this.hometext = ``;
  }

  componentDidMount() {
      fetch("http://localhost:1337")
          .then(response => response.json())
          .then(data => {
              this.setState({ data: data.data.msg});
              // console.log(this.state.data);
          });
  };

  render() {
      return (
        <div className="fpageDiv">
            <div className="left">
            {this.state.data}
            </div>
            <div className="right">
                <Image />
            </div>
        </div>
      );
  }

}

// function Home() {
//     componentDidMount() {
//         fetch("http://localhost:1337")
//             .then(response => response.json())
//             .then(data => {
//                 var hometext = data.data.msg;
//                 console.log(hometext);
//             });
//     };
//
//   return (
//     <div className="fpageDiv">
//         <div className="left">
//         {hometext}
//         Hejsan
//         </div>
//         <div className="right">
//             <Image />
//         </div>
//     </div>
//   );
// }


function Image() {
    return <img src={frontimg} className="frontimg" alt="Sidans skapare i öknen" />;
}

export { Home };
