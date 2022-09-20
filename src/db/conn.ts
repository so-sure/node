import { MongoClient, Collection } from 'mongodb';
import { Phone } from '../types/phone';

const uri = 'mongodb://127.0.0.1:27017/?readPreference=primary&ssl=false';

export const getDbCollection = (): Collection<Phone> => {
    const client = new MongoClient(uri);
    const dbName = 'local';
    const collection = 'PHONE';
    
    return client.db(dbName).collection<Phone>(collection)
}

export const populateDb  = () => {
    const phoneCollection = getDbCollection();

    phoneCollection.drop();
    phoneCollection.insertMany([
        {
            'id': 1,
            'make': 'LG',
            'model': 'G6',
            'storage': '32GB',
            'monthlyPremium': 4.49,
            'yearlyPremium': 49.39,
            'excess': 75
        },
        {
            'id': 2,
            'make': 'Apple',
            'model': 'iPhone 11',
            'storage': '128GB',
            'monthlyPremium': 7.99,
            'yearlyPremium': 87.89,
            'excess': 125
        },
        {
            'id': 3,
            'make': 'Samsung',
            'model': 'Galaxy S10',
            'storage': '512GB',
            'monthlyPremium': 9.99,
            'yearlyPremium': 109.89,
            'excess': 150
        }
    ]);
}