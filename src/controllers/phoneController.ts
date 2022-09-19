import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { phones } from '../mocks/phoneMocks'
import { Phone } from '../types/phone';

// getting all phones
const getPhones = async (req: Request, res: Response, next: NextFunction) => {
    // get mock phones
    return res.status(200).json({
        phones: phones
    });
};

// getting a single phone
const getPhone = async (req: Request, res: Response, next: NextFunction) => {
    // get the phone id from the req
    const id: string = req.params.id;
    const idAsNumber = +id;
    
    // get the phone
    const result = await getPhoneById(idAsNumber);

    if(result.length === 1) {
        return res.status(200).json({
            phone: result[0]
        });
    }

    const notFoundError = 'Phone not found';
    return res.status(500).json({
        error: notFoundError
    });
    
};

const getPhoneById = async (id: number): Promise<Phone[]> => {
    return phones.filter(phone => phone.id === id);
}

export default { getPhones, getPhone };