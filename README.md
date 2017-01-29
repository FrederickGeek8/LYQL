# LYQL
**Disclaimer: I am in no way affiliated with Yahoo. This tool likely violates Yahoo Terms and Conditions. Use *only* for personal use. I am not liable for misuse of this program or any effects it may have.**

LYQL is a tool for achieving real-time, free stock prices. By modifying this code, you should be able to scrape any type of data. Currently, this is achieved by the Server application keeping track of requested ticker symbols and users connected over Socket.io. Users are added to channels determined by their requested ticker symbols.

## Request Parameters
* a00: Ask
* a50: Ask Size
* b00: Bid
* b60: Bid Size
* c10: Change
* c63: Change Realtime
* c85: Change Realtime After Hours
* c86: Percent Change Realtime After Hours
* g53: Day Low
* h53: Day High
* j10: Market Capitalization
* l10: Price
* l84: Price Realtime
* l86: Price Realtime After Hours
* p20: Percent Change
* p43: Percent Change Realtime
* t53: unknown suspected timestamp
* v53: unknown suspected volume of trade

## Installation
TODO: Write this

## Usage
TODO: Write this

## TODO
- [ ] Write documentation and code comments.
- [x] Modularize so that it can be used within other use cases.
- [ ] Add Browser support, these processes can be distributed amongst web clients.
- [ ] \(Disputed\) Write SQL-style language which can communicate with the LYQL API.
