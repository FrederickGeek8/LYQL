# LYQL
**Disclaimer: I am in no way affiliated with Yahoo. This tool likely violates Yahoo Terms and Conditions. Use *only* for personal use. I am not liable for misuse of this program or any effects it may have.**

LYQL is a tool for achieving real-time, free stock prices. By modifying this code, you should be able to scrape any type of data. Currently, this is achieved by the Server application keeping track of requested ticker symbols and users connected over Socket.io. Users are added to channels determined by their requested ticker symbols.

## Notes
- `page1.html` is a basic console
- `page2.html` is an stylish example application using LYQL

## Installation
In a similar manner

## Usage
Just run `index.js`. It will create a local server that handles fetching & distributing stock data, as well as HTTP.

## TODO
- [ ] Write documentation and code comments.
- [ ] Modularize so that it can be used within other use cases.
- [ ] Add Browser support, these processes can be distributed amongst web clients.
- [ ] \(Disputed\) Write SQL-style language which can communicate with the LYQL API.
