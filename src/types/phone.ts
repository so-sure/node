type Make = 'LG' | 'Apple' | 'Samsung';
type Model = 'G6' | 'iPhone 11' | 'Galaxy S10';
type Storage = '32GB' | '128GB' | '512GB';

export type Phone = {
    id: number,
    make: Make,
    model: Model,
    storage: Storage,
    monthlyPremium: number,
    yearlyPremium: number,
    excess: number,
}