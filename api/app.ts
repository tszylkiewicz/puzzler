import { createServer } from './utils/server';
import db from './utils/db'

require("dotenv").config();
const port = process.env.PORT;

db.open()
    .then(() => createServer())
    .then(server => {
        server.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    })
    .catch(err => {
        console.log(`Error: ${err}`)
    })