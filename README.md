# Cards-format

[jQuery.payment](https://github.com/stripe/jquery.payment#jquerypayment-) by TypeScripts service


## How to install
```
npm i cards-format --save
```

## How to import
For TypeScript usage there is a index.d.ts in node_modules folder
```typescript
import {CardsFormat} from 'cards-format';
```

or

```javascript
var CardsFormat = require('cards-format');
```

## API

+ `restrictNumeric` (e: KeyboardEvent): boolean - General numeric input restriction.
+ `formatCardNumber`(e: KeyboardEvent, callback: (value: string) => void): void

Formats card numbers:

* Includes a space between every 4 digits
*  Restricts input to numbers
*  Limits to 16 numbers
*  Supports American Express formatting
*  Adds a class of the card type (e.g. 'visa') to the input

#### Example
```typescript
    CardsFormat.formatCardNumber(event, (value: string) => {
        this.setState({
            value: value
        } as State);
    });
```
Then, when the payment form is submitted, you can validate the card number on the client-side:

+ `validateCardNumber` (num: number): boolean; - Full validate
+ `validateCardNumberSimple` (num: number): boolean; -  Simple validate

#### Example

```typescript
    let valid  = CardsFormat.validateCardNumber("Card number here");
```

+ `cardFromNumber` (num: number): Card;

Where type Card is:
```typescript
    export declare enum CardTypes {
        elo = 0,
        visaelectron = 1,
        maestro = 2,
        forbrugsforeningen = 3,
        dankort = 4,
        visa = 5,
        mastercard = 6,
        amex = 7,
        dinersclub = 8,
        discover = 9,
        unionpay = 10,
        jcb = 11,
    }

    export interface Card {
        type: CardTypes;
        patterns: number[];
        format: RegExp;
        length: number[];
        cvcLength: number[];
        luhn: boolean;
    }
```

+ `formatBackCardNumber` (e, callback: (value: string) => void)
+ `reFormatCardNumber` (event, (value: string))
+ `replaceFullWidthChars` (str: string): string
+ `cardType` (num: number): CardTypes - Returns a card type.
+ `reFormatExpiry` (e, callback: (value: string) => void): void
#### Example
```typescript
    CardsFormat.reFormatExpiry(event, (value:string)=> {
        this.setState({
            value: value
        } as State);
    });
```
+ `cardExpiryVal` (value: string): { month: number; year: number; };

Parses a credit card expiry in the form of MM/YYYY, returning an object containing the month and year. Shorthand years, such as 13 are also supported (and converted into the longhand, e.g. 2013).

#### Example
```typescript
    CardsFormat.cardExpiryVal('03 / 2025'); //=> {month: 3, year: 2025}
    CardsFormat.cardExpiryVal('05 / 04'); //=> {month: 5, year: 2004}
    CardsFormat.cardExpiryVal('cardExpiryVal') //=> {month: 4, year: 2020}
```

This function doesn't perform any validation of the month or year; use $.payment.validateCardExpiry(month, year) for that.

+ `validateCardExpiry`  (month: number, year: number): boolean;

## For reBuild

$ ./production
