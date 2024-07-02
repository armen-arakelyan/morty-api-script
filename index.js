"use strict";
const dotenv = require("dotenv");
const pg = require('pg');

dotenv.config();

const script = require('./script');

const dbConfig = require("./db.config");

const client = new pg.Client(dbConfig);

script(client);
