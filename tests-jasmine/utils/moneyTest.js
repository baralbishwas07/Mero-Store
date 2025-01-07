import { formattedPrice } from "../../script/utils/pricing.js";

describe('test suite: formatCurrency',() => {
    it('convert cent into npr',() => {
        expect(formattedPrice(2095)).toEqual('2,095');
    });

    it('works with 0',() => {
        expect(formattedPrice(0)).toEqual('0');
    });

    it('works with decimal',() => {
        expect(formattedPrice(2000.5)).toEqual('2,000.5');
    });
})
