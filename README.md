URL-Shortener-Microservice
==========================

**Description**: A url shortening microservice written in Node/Express/Mongo.
The cool thing here is that the main applicatoin logic is written in a pure,
functional-style. Utilizing functional composition, currying, and monadic interfaces,
I aimed to create a service that is fault-tolerant, pure, and easy to reason about.

![recording of minimal app functionality](https://raw.githubusercontent.com/vinnya3/url-shortener-microservice/master/screenshots/app-2.gif)

**Requirements**:
-----------------

**Installation**:
-----------------

**Todo**(in no particular order):
1. ~~Refactor composed findOrCreate function in ApiController~~
2. In UrlData pre-save hook, assure that generated shortenedUrl is unique
3. ~~Add route to receive shortened url~~
4. If needed, add some more helpful comments/refacor function names
5. Jest Test is the Best
6. Add pretty client
7. refactor dir structures

