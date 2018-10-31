import React, { Component } from 'react';
import axios from "axios";
import './CurrencyContiener.css'

class CurrencyContiener extends Component {
  state = {
          result: null,
          fromCurrency: "USD",
          toCurrency: "GBP",
          amount: 1,
          currencies: [],
      };

      componentDidMount() {
          axios
              .get("http://www.apilayer.net/api/live?access_key=8352f6b41464220b277f44d698ea6a34&format=1")
              .then(response => {
                  const currency = [];
                  for (const key in response.data.quotes) {
                    const newKey = key.replace("USD","")
                    currency.push({[newKey]: response.data.quotes[key]})
                  }
                  this.setState({currencies:(currency)});
              })
              .catch(err => {
                  console.log("Opps", err.message);
              });
      }

      selectHandler = (event) => {
        if (event.target.name === "from") {
            this.setState({ fromCurrency: event.target.value })
        }
        if (event.target.name === "to") {
            this.setState({ toCurrency: event.target.value })
        }
      }

      convertHandler = () => {
        if (this.state.fromCurrency !== this.state.toCurrency) {

          let  fromcurrency = this.state.currencies.filter(cur=>Object.keys(cur)[0]===this.state.fromCurrency);

          let valueOfFromCurrency = fromcurrency[0][this.state.fromCurrency];

          let  tocurrency = this.state.currencies.filter(cur=>Object.keys(cur)[0]===this.state.toCurrency);

          let valueOfToCurrency = tocurrency[0][this.state.toCurrency];

          const result = this.state.amount * (valueOfToCurrency/valueOfFromCurrency);
          this.setState({ result: result.toFixed(5) })

        } else {
            this.setState({ result: "You can't convert the same currency!" })
        }
    };
      render() {
          return (
              <div className="Converter">
                  <div className="Form">
                      <input
                          name="amount"
                          type="text"
                          value={this.state.amount}
                          onChange={event =>
                              this.setState({ amount: event.target.value })
                          }
                      />
                      <select
                          name="from"
                          onChange={(event) => this.selectHandler(event)}
                          value={this.state.fromCurrency}>

                          {this.state.currencies.map(cur => (
                              <option key={Object.keys(cur)[0]}>{Object.keys(cur)[0]}</option>
                            ))}
                      </select>

                      <select
                          name="to"
                          onChange={(event) => this.selectHandler(event)}
                          value={this.state.toCurrency}>

                          {this.state.currencies.map(cur => (
                            <option key={Object.keys(cur)[0]}>{Object.keys(cur)[0]}</option>
                          ))}
                      </select>
                      <button onClick={this.convertHandler}>Convert</button>
                  </div>
                  {this.state.result &&
                      <h3>{this.state.result}</h3>
                  }
              </div>
          );
      }
}

export default CurrencyContiener;
