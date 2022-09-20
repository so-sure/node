import { Request, Response, NextFunction } from 'express';
import { Phone } from '../types/phone';
import { getDbCollection } from '../db/conn';

// getting all phones
const getPhones = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const phonesCollection = getDbCollection();
        const phonesCursor = phonesCollection.find({});

        const allPhones = await phonesCursor.toArray();

        if(allPhones.length < 1) {
            return res.status(500).json({
                error: 'Failed to retrieve phones',
            });
        }

        return res.status(200).json({
            phones: allPhones,
        });
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
};

// getting a single phone
const getPhone = async (req: Request, res: Response, next: NextFunction) => {
    // get the phone id from the req
    const id: string = req.params.id;
    const idAsNumber = +id;

    // get the phone
    const result = await getPhoneById(idAsNumber);

    if(result === undefined) {
        const notFoundError = 'Phone not found';
        return res.status(500).json({
            error: notFoundError
        });
    }

    return res.status(200).json({
        phone: result
    });
};

const deletePhone = async (req: Request, res: Response, next: NextFunction) => {
    // get the phone id from the req
    const id: string = req.params.id;
    const idAsNumber = +id;

    // delete the phone
    const result = await deletePhoneById(idAsNumber);

    if(result) {
        return res.status(200).json({
            message: `Deleted phone with id => ${id}`
        }); 
    }

    return res.status(500).json({
        message: `Failed to delete phone with id => ${id}`
    });
}

const updatePhone  = async (req: Request, res: Response, next: NextFunction) => {
    // get the phone id from the req
    const id: string = req.params.id;
    const idAsNumber = +id;

    if(validateRequest(req)) {
        const phoneToUpdate = await getPhoneById(idAsNumber);
        const body = req.body;

        if(phoneToUpdate !== undefined) {
            if('make' in body) {
                phoneToUpdate.make = body.make;
            }

            if('model' in body) {
                phoneToUpdate.model = body.model;
            }

            if('storage' in body) {
                phoneToUpdate.storage = body.storage;
            }

            if('monthlyPremium' in body) {
                phoneToUpdate.monthlyPremium = body.monthlyPremium;

                // derive yearly premium by multiplying monthly premium by 11
                phoneToUpdate.yearlyPremium = body.monthlyPremium * 11;
            }

            if('excess' in body) {
                phoneToUpdate.excess = body.excess;
            }

            const result = await updatePhoneById(idAsNumber, phoneToUpdate)

            if(result) {
                return res.status(200).json({
                    message: `Updated phone with id => ${id}`
                }); 
            }
        
            return res.status(500).json({
                message: `Failed to update phone with id => ${id}`
            });

        }

        return res.status(500).json({
            message: `Failed to find phone with id => ${id}`
        });
    }

    return res.status(500).json({
        message: `Request is invalid`
    });
}

const updatePhoneById = async (id: number, updatedPhone: Phone): Promise<boolean> => {
    try {
        const phonesCollection = getDbCollection();
        const updateResult = await phonesCollection.updateOne({'id': id}, {$set: updatedPhone});
        
        if(updateResult.modifiedCount > 0) {
            return true;
        }

        return false;
    } catch(error) {
        console.error(error);
        return false;
    }
}

const validateRequest = (req: Request): boolean => {
    const body = req.body;
    
    // should not update id
    if('id' in body) {
        return false;
    }

    if('make' in body) {
        if(typeof body['make'] !== 'string') {
            return false;
        }

        const validMakes = ['LG', 'Apple', 'Samsung'];
        if(!validMakes.includes(body['make'])) {
            return false;
        }
    }

    if('model' in body) {
        if(typeof body['model'] !== 'string') {
            return false;
        }

        const validModels = ['G6', 'iPhone 11','Galaxy S10'];
        if(!validModels.includes(body['model'])) {
            return false;
        }
    }

    if('storage' in body) {
        if(typeof body['storage'] !== 'string') {
            return false;
        }

        const validStorage = ['32GB', '128GB', '512GB'];
        if(!validStorage.includes(body['storage'])) {
            return false;
        }
    }

    if('monthlyPremium' in body) {
        if(typeof body['monthlyPremium'] !== 'number') {
            return false;
        }

        if(!validateDecimalPlaces(body['monthlyPremium'], 2)) {
            return false;
        }
    }

    if('excess' in body) {
        if(typeof body['excess'] !== 'number') {
            return false;
        }

        if(!validateDecimalPlaces(body['excess'], 0)) {
            return false;
        }
    }
    
    // Yearly premiums are derived from monthly premiums
    if('yearlyPremium' in body) {
        return false;
    }

    return true;
}

// todo - handle numbers ending with 00 (ie. 2.00)
// https://stackoverflow.com/questions/27082377/get-number-of-decimal-places-with-javascript
const validateDecimalPlaces = (value: number, expectedNumberOfDecimals: number): boolean => {
    console.log('validateDecimalPlaces')
    const valString = String(value);

    console.log(`valString = ${valString}`)

    if(valString.includes('.')) {
        if(expectedNumberOfDecimals === 0) {
            console.log(`Expected 0 decimals`);
            return false;
        }

        const numDecimals = valString.split('.')[1].length;

        if(numDecimals !== expectedNumberOfDecimals) {
            console.log(`Incorrect number of decimals`)
            return false;
        }

        return true;
    }

    if(expectedNumberOfDecimals > 0) {
        console.log(`Expected decimals but found none`)
        return false;
    }

    return true;
}

const deletePhoneById = async (id: number): Promise<boolean> => {
    try {
        const phonesCollection = getDbCollection();
        const deleteResult = await phonesCollection.deleteOne({'id': id})
        
        if(deleteResult.deletedCount > 0) {
            return true;
        }

        return false;
    } catch(error) {
        console.error(error);
        return false;
    }
}

const getPhoneById = async (id: number): Promise<Phone | undefined> => {
    try {
        const phonesCollection = getDbCollection();
        const phoneResult = await phonesCollection.findOne({'id': id});

        if(phoneResult === null) {
            return;
        }

        return phoneResult;
    } catch(error) {
        console.error(error);
        return;
    }
    
}

export default { getPhones, getPhone, deletePhone, updatePhone };