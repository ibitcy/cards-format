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
export declare class CardsFormat {
    validateCardNumberSimple(num: number): boolean;
    validateCardNumber(num: number): boolean;
    cardFromNumber(num: number): Card;
    luhnCheck(num: number): boolean;
    cardType(num: number): CardTypes;
    reFormatCardNumber(e: KeyboardEvent, callback: (value: string) => void): void;
    formatCardNumber(e: KeyboardEvent, callback: (value: string) => void): void;
    replaceFullWidthChars(str: string): string;
    safeVal(value: string, $target: HTMLInputElement, callback: (value: string) => void): void;
    paymentFormatCardNumber(num: any): string;
    restrictNumeric(e: KeyboardEvent): boolean;
    restrictCardNumber(e: KeyboardEvent): boolean;
    hasTextSelected($target: HTMLInputElement): boolean;
    formatBackCardNumber(e: any, callback: (value: string) => void): void;
    reFormatExpiry(e: any, callback: (value: string) => void): void;
    paymentFormatExpiry(expiry: string): string;
    cardExpiryVal(value: string): {
        month: number;
        year: number;
    };
    validateCardExpiry(month: number, year: number): boolean;
}
