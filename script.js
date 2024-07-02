const axios = require("axios");
const tableName = `"${process.env.TABLE_NAME}"`;

const dropTableQuery = `
DROP TABLE IF EXISTS ${tableName};
`;

const createTableQuery = `
CREATE TABLE IF NOT EXISTS ${tableName} (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    status VARCHAR(50),
    species VARCHAR(50),
    type VARCHAR(50),
    gender VARCHAR(50),
    origin VARCHAR(100),
    location VARCHAR(100),
    image VARCHAR(255),
    episode TEXT[],
    url VARCHAR(255),
    created TIMESTAMP
);
`;

const insertCharacterQuery = `
INSERT INTO ${tableName} (name, status, species, type, gender, origin, location, image, episode, url, created)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
`;

async function fetchCharacters() {
    const response = await axios.get(process.env.API_URL);
    return response.data.results;
}

async function main(client) {
    try {
        await client.connect();
        console.log('Connected to the database.');

        await client.query(dropTableQuery);
        console.log(`Table ${tableName} dropped if it existed.`);

        await client.query(createTableQuery);
        console.log(`Table ${tableName} created.`);

        const characters = await fetchCharacters();
        console.log('Fetched characters from the Rick and Morty API.');

        for (const character of characters) {
            const values = [
                character.name,
                character.status,
                character.species,
                character.type,
                character.gender,
                character.origin.name,
                character.location.name,
                character.image,
                character.episode,
                character.url,
                character.created
            ];
            await client.query(insertCharacterQuery, values);
        }

        console.log(`Inserted ${characters.length} characters into the table ${tableName}.`);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
        console.log('Disconnected from the database.');
    }
}

module.exports = main;
