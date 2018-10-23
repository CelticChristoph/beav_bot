const app = require('../app');

// ----- Setup ----------------------------------------------------------------
const port = process.env.PORT || 8080;

// ----- Web-server -----------------------------------------------------------

app.listen(port, () => console.log(`Listening on port ${port}`));
