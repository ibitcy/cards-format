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
+ `formatBackCardNumber` (e, callback: (value: string) => void)
+ `reFormatCardNumber` (event, (value: string))
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

## For reBuild

$ ./production
