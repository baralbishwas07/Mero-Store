import { formattedPrice } from "../script/utils/pricing.js";

console.log('test suite: formatCurrency')
console.log('convert cent into npr')
if (formattedPrice(2095) === '2,095'){
    console.log('passed');
} else {
    console.log('failed');
}

console.log('works with 0')
if (formattedPrice(0) === '0'){
    console.log('passed');
} else {
    console.log('failed')
}

console.log('works with decimals')
if (formattedPrice(2000.5) === '2,000.5'){
    console.log('passed')
} else {
    console.log('failed')
}