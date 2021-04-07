# certificate

you need create a cert folder with  localhost.crt and localhost.key
for working with http2 protocol

# module spdy
https://github.com/spdy-http2/node-spdy/issues/382

Node version 12 depracated OutgoingMessage.prototype._headers, which is used here in response.js L#18.

The fix is easy: Use getHeaders() instead:

  this.statusCode = statusCode

-   if (this._headers) {
+   if (this.getHeaders()) {
    // Slow-case: when progressive API and header fields are passed.
    if (obj) {
You can inspect the full trace when running node with --trace-deprecation flag.