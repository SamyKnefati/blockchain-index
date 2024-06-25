// Import the required libraries
import pgPromise from 'pg-promise';
import GrpcClient from './model';
import express from 'express';
import * as dotenv from 'dotenv';

const client = new GrpcClient('18.203.155.106:57291');

//const dbURL = process.env.DATABASE_URL; LIGNE QUI NE MARCHE PAS EN DEHORS DE FAIRE AVEC UN TRY

// Create a new instance of pg-promise
const db = pgPromise();
const connection = db("postgres://samy:samy@db:5432/miden");

// Define the column set for the insert operation
const cs = new db.helpers.ColumnSet([
    'version',
    'prev_hash_d0', 'prev_hash_d1', 'prev_hash_d2', 'prev_hash_d3',
    'block_num',
    'chain_root_d0', 'chain_root_d1', 'chain_root_d2', 'chain_root_d3',
    'account_root_d0', 'account_root_d1', 'account_root_d2', 'account_root_d3',
    'nullifier_root_d0', 'nullifier_root_d1', 'nullifier_root_d2', 'nullifier_root_d3',
    'note_root_d0', 'note_root_d1', 'note_root_d2', 'note_root_d3',
    'batch_root_d0', 'batch_root_d1', 'batch_root_d2', 'batch_root_d3',
    'proof_hash_d0', 'proof_hash_d1', 'proof_hash_d2', 'proof_hash_d3',
    'timestamp'
], { table: 'block_header' });


function flattenObject(obj: any, prefix = ''): any {
    return Object.keys(obj).reduce((acc: any, key: string) => {
        const propName = prefix ? `${prefix}_${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            Object.assign(acc, flattenObject(obj[key], propName));
        } else {
            acc[propName] = obj[key];
        }
        return acc;
    }, {});
}




async function add_blockheader() {
    client.getBlockHeaderByNumber("1", (error, response) => {
        if (error) {
            console.error('Error getting block:', error);
            return;
        }

        // Transformer les données structurées en un objet plat
        const flattenedData = flattenObject(response.block_header);

        const query = db.helpers.insert(flattenedData, cs);


        // Execute the insert query
        connection.none(query)
            .then(() => {
                console.log(`Block ${response.block_header.block_num} inserted successfully`);
            })
            .catch(error => {
                console.error(`Error inserting block ${response.block_header.block_num}:`, error);
            });
    });
}


// Example usage
setInterval(async () => {
    try {
        add_blockheader();        
    } catch (error) {
        console.error('Error during interval operation', error);
    }
}, 10000); // Check every 10 seconds

/* Partie du code à décommenter si besoin de vérifier en local sur le localhost3000


// Create an Express server for status checking
const app = express();
app.get('/', async (req, res) => {
            try {
                const result = await connection.any('SELECT * FROM block_header ORDER BY id DESC LIMIT 10');
                res.json(result);
            } catch (err) {
                res.status(500).send('Error fetching data');
            }
        });

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
*/