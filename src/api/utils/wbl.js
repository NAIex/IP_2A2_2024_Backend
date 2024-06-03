import fs from 'fs';
import prisma from "../../prisma/index.js";

async function importWordsFromFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const words = data.split('\n').filter(Boolean);

        for (const word of words) {
            try {
                await addWordToDatabase(word);
            } catch (error) {
                console.error(`Failed to add '${word}': ${error.message}`);
            }
        }
        console.log('All words have been added to the blacklist.');
    } catch (error) {
        console.error(`Failed to read the file: ${error.message}`);
    }
}

async function addWordToDatabase(word) {
    if (!word) {
        throw new Error('No word provided.');
    }
    try {
        const newWord = await prisma.WordBlacklist.create({
            data: { word }
        });
        console.log(`Added: ${newWord.word}`);
    } catch (error) {
        throw new Error(`Failed to insert word '${word}': ${error.message}`);
    }
}

const filePath = process.argv[2];
if (!filePath) {
    console.log('Please provide the file path as an argument.');
    process.exit(1);
}

importWordsFromFile(filePath);

// run it with: node ./wbl.js ./words.txt
// in words.txt add the words you want to add to the database, each one on a separate line.