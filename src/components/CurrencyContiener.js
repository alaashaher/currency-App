import React, { Component } from 'react';
import axios from "axios";
const currencyname = [];
let currencyvalue = [];
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
                  currencyvalue = Object.values(response.data.quotes);
                  for (const key in response.data.quotes) {
                      currencyname.push(key)
                  }
                  const currencynamer = currencyname.map(x => x.replace("USD",""))
                  this.setState({ currencies: currencynamer.sort() })
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
          const indexoffromCurrency = currencyname.indexOf("USD"+this.state.fromCurrency);
          const indexoftoCurrency = currencyname.indexOf("USD"+this.state.toCurrency);
          console.log("index of from Currency "+indexoffromCurrency);
          console.log("name of from Currency "+currencyname[indexoffromCurrency]);
          console.log("index of to Currency "+indexoftoCurrency);
          console.log("name of to Currency "+currencyname[indexoftoCurrency]);


          const valueOfFromCurrency = currencyvalue[indexoffromCurrency];
          const valueOfToCurrency = currencyvalue[indexoftoCurrency];
          console.log("value Of To Currency " +valueOfToCurrency);
          console.log("value Of From Currency "+valueOfFromCurrency);
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
                          value={this.state.fromCurrency}
                      >
                          {this.state.currencies.map(cur => (
                              <option key={cur}>{cur}</option>
                          ))}
                      </select>
                      <select
                          name="to"
                          onChange={(event) => this.selectHandler(event)}
                          value={this.state.toCurrency}
                      >
                          {this.state.currencies.map(cur => (
                              <option key={cur}>{cur}</option>
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
