"use strict";
var DEFAULT_FORMAT = /(\d{1,4})/g;
var CardTypes;
(function (CardTypes) {
    CardTypes[CardTypes["elo"] = 0] = "elo";
    CardTypes[CardTypes["visaelectron"] = 1] = "visaelectron";
    CardTypes[CardTypes["maestro"] = 2] = "maestro";
    CardTypes[CardTypes["forbrugsforeningen"] = 3] = "forbrugsforeningen";
    CardTypes[CardTypes["dankort"] = 4] = "dankort";
    CardTypes[CardTypes["visa"] = 5] = "visa";
    CardTypes[CardTypes["mastercard"] = 6] = "mastercard";
    CardTypes[CardTypes["amex"] = 7] = "amex";
    CardTypes[CardTypes["dinersclub"] = 8] = "dinersclub";
    CardTypes[CardTypes["discover"] = 9] = "discover";
    CardTypes[CardTypes["unionpay"] = 10] = "unionpay";
    CardTypes[CardTypes["jcb"] = 11] = "jcb";
})(CardTypes = exports.CardTypes || (exports.CardTypes = {}));
var CARDS = [
    {
        type: CardTypes.elo,
        patterns: [401178, 401179, 431274, 438935, 451416, 457393, 457631, 457632, 504175, 506699, 5067, 509, 627780, 636297, 636368, 650, 6516, 6550],
        format: DEFAULT_FORMAT,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: CardTypes.visaelectron,
        patterns: [4026, 417500, 4405, 4508, 4844, 4913, 4917],
        format: DEFAULT_FORMAT,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: CardTypes.maestro,
        patterns: [5018, 502, 503, 506, 56, 58, 639, 6220, 67],
        format: DEFAULT_FORMAT,
        length: [12, 13, 14, 15, 16, 17, 18, 19],
        cvcLength: [3],
        luhn: true
    }, {
        type: CardTypes.forbrugsforeningen,
        patterns: [600],
        format: DEFAULT_FORMAT,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: CardTypes.dankort,
        patterns: [5019],
        format: DEFAULT_FORMAT,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: CardTypes.visa,
        patterns: [4],
        format: DEFAULT_FORMAT,
        length: [13, 16],
        cvcLength: [3],
        luhn: true
    }, {
        type: CardTypes.mastercard,
        patterns: [51, 52, 53, 54, 55, 22, 23, 24, 25, 26, 27],
        format: DEFAULT_FORMAT,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: CardTypes.amex,
        patterns: [34, 37],
        format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
        length: [15],
        cvcLength: [3, 4],
        luhn: true
    }, {
        type: CardTypes.dinersclub,
        patterns: [30, 36, 38, 39],
        format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
        length: [14],
        cvcLength: [3],
        luhn: true
    }, {
        type: CardTypes.discover,
        patterns: [60, 64, 65],
        format: DEFAULT_FORMAT,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: CardTypes.unionpay,
        patterns: [62, 88],
        format: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/,
        length: [16, 17, 18, 19],
        cvcLength: [3],
        luhn: false
    }, {
        type: CardTypes.jcb,
        patterns: [35],
        format: DEFAULT_FORMAT,
        length: [16],
        cvcLength: [3],
        luhn: true
    }
];
var CardsFormat = (function () {
    function CardsFormat() {
    }
    CardsFormat.prototype.validateCardNumber = function (num) {
        var numStr = (num + '').replace(/\s+|-/g, '');
        return numStr && numStr.length > 0;
    };
    CardsFormat.prototype.cardFromNumber = function (num) {
        var numStr = (num + '').replace(/\D/g, '');
        for (var _i = 0, _len = CARDS.length; _i < _len; _i++) {
            var card = CARDS[_i];
            var _ref = card.patterns;
            for (var _j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                var pattern = _ref[_j];
                var p = pattern + '';
                if (numStr.substr(0, p.length) === p) {
                    return card;
                }
            }
        }
    };
    ;
    CardsFormat.prototype.luhnCheck = function (num) {
        var odd = true;
        var sum = 0;
        var digits = (num + '').split('').reverse();
        for (var _i = 0, _len = digits.length; _i < _len; _i++) {
            var digit = parseInt(digits[_i], 10);
            if ((odd = !odd)) {
                digit *= 2;
            }
            if (digit > 9) {
                digit -= 9;
            }
            sum += digit;
        }
        return sum % 10 === 0;
    };
    ;
    CardsFormat.prototype.cardType = function (num) {
        var _ref = null;
        if (!num) {
            return null;
        }
        return ((_ref = this.cardFromNumber(num)) != null ? _ref.type : void 0) || null;
    };
    CardsFormat.prototype.reFormatCardNumber = function (e, callback) {
        var $target = e.currentTarget;
        var value = $target.value;
        value = this.replaceFullWidthChars(value);
        value = this.paymentFormatCardNumber(value);
        this.safeVal(value, $target, callback);
    };
    ;
    CardsFormat.prototype.formatCardNumber = function (e, callback) {
        var card, digit, length, re, upperLength;
        digit = String.fromCharCode(e.which);
        if (!/^\d+$/.test(digit)) {
            return;
        }
        var $target = e.currentTarget;
        var value = $target.value;
        card = this.cardFromNumber(parseInt(value + digit));
        length = (value.replace(/\D/g, '') + digit).length;
        upperLength = 16;
        if (card) {
            upperLength = card.length[card.length.length - 1];
        }
        if (length >= upperLength) {
            return;
        }
        if (($target.selectionStart != null) && $target.selectionStart !== value.length) {
            return;
        }
        // TODO: Check it!!!
        if (card && card.type == 'amex') {
            re = /^(\d{4}|\d{4}\s\d{6})$/;
        }
        else {
            re = /(?:^|\s)(\d{4})$/;
        }
        if (re.test(value)) {
            e.preventDefault();
            setTimeout(function () {
                callback(value + ' ' + digit);
            });
        }
        else if (re.test(value + digit)) {
            e.preventDefault();
            setTimeout(function () {
                callback(value + digit + ' ');
            });
        }
    };
    ;
    CardsFormat.prototype.replaceFullWidthChars = function (str) {
        if (str == null) {
            str = '';
        }
        var fullWidth = '\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19';
        var halfWidth = '0123456789';
        var value = '';
        var chars = str.split('');
        chars.map(function (chr) {
            var idx = fullWidth.indexOf(chr);
            if (idx > -1) {
                chr = halfWidth[idx];
            }
            value += chr;
        });
        return value;
    };
    ;
    CardsFormat.prototype.safeVal = function (value, $target, callback) {
        var currPair, cursor, digit, last, prevPair;
        try {
            cursor = $target.selectionStart;
        }
        catch (e) {
            cursor = null;
        }
        last = $target.value;
        setTimeout(function () {
            callback(value);
        });
        if (cursor !== null && $target === document.activeElement) {
            if (cursor === last.length) {
                cursor = value.length;
            }
            if (last !== value) {
                prevPair = last.slice(cursor - 1, +cursor + 1 || 9e9);
                currPair = value.slice(cursor - 1, +cursor + 1 || 9e9);
                digit = value[cursor];
                if (/\d/.test(digit) && prevPair === ("" + digit + " ") && currPair === (" " + digit)) {
                    cursor = cursor + 1;
                }
            }
            $target.selectionStart = cursor;
            $target.selectionEnd = cursor;
        }
    };
    ;
    CardsFormat.prototype.paymentFormatCardNumber = function (num) {
        var groups, _ref;
        var numStr = num.replace(/\D/g, '');
        var card = this.cardFromNumber(parseInt(numStr));
        if (!card) {
            return numStr;
        }
        var upperLength = card.length[card.length.length - 1];
        numStr = numStr.slice(0, upperLength);
        if (card.format.global) {
            var result = (_ref = numStr.match(card.format)) != null ? _ref : void 0;
            var str = '';
            for (var i = 0, l = result.length; i < l; i++) {
                var separator = '';
                if (i < 3 && result[i].length == 4) {
                    separator = ' ';
                }
                str += result[i] + separator;
            }
            return str;
        }
        else {
            groups = card.format.exec(numStr);
            if (groups == null) {
                return;
            }
            groups.shift();
            groups = groups.filter(function (n) {
                return n;
            });
            return groups.join(' ');
        }
    };
    ;
    CardsFormat.prototype.restrictNumeric = function (e) {
        if (e.metaKey || e.ctrlKey) {
            return true;
        }
        if (e.which === 32) {
            return false;
        }
        if (e.which === 0) {
            return true;
        }
        if (e.which < 33) {
            return true;
        }
        var input = String.fromCharCode(e.which);
        return !!/[\d\s]/.test(input);
    };
    ;
    CardsFormat.prototype.restrictCardNumber = function (e) {
        var $target = e.currentTarget;
        var digit = String.fromCharCode(e.which);
        if (!/^\d+$/.test(digit)) {
            return;
        }
        if (this.hasTextSelected($target)) {
            return;
        }
        var value = ($target.value + digit).replace(/\D/g, '');
        var card = this.cardFromNumber(parseInt(value));
        if (card) {
            return value.length <= card.length[card.length.length - 1];
        }
        else {
            return value.length <= 16;
        }
    };
    ;
    CardsFormat.prototype.hasTextSelected = function ($target) {
        var _ref;
        if (($target.selectionStart != null) && $target.selectionStart !== $target.selectionEnd) {
            return true;
        }
        var doc = document;
        if ((typeof doc !== "undefined" && doc !== null ? (_ref = doc.selection) != null ? _ref.createRange : void 0 : void 0) != null) {
            if (doc.selection.createRange().text) {
                return true;
            }
        }
        return false;
    };
    ;
    CardsFormat.prototype.formatBackCardNumber = function (e, callback) {
        var $target = e.currentTarget;
        var value = $target.value;
        if (e.which !== 8) {
            return;
        }
        if (($target.selectionStart != null) && $target.selectionStart !== value.length) {
            return;
        }
        if (/\d\s$/.test(value)) {
            e.preventDefault();
            setTimeout(function () {
                callback(value.replace(/\d\s$/, ''));
            });
        }
        else if (/\s\d?$/.test(value)) {
            e.preventDefault();
            setTimeout(function () {
                callback(value.replace(/\d$/, ''));
            });
        }
    };
    ;
    CardsFormat.prototype.reFormatExpiry = function (e, callback) {
        var $target = e.currentTarget;
        var value = $target.value;
        value = this.replaceFullWidthChars(value);
        value = this.paymentFormatExpiry(value);
        this.safeVal(value, $target, callback);
    };
    ;
    CardsFormat.prototype.paymentFormatExpiry = function (expiry) {
        var parts = expiry.match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/);
        if (!parts) {
            return '';
        }
        var mon = parts[1] || '';
        var sep = parts[2] || '';
        var year = parts[3] || '';
        if (year.length > 0) {
            sep = ' / ';
        }
        else if (sep === ' /') {
            mon = mon.substring(0, 1);
            sep = '';
        }
        else if (mon.length === 2 || sep.length > 0) {
            sep = ' / ';
        }
        else if (mon.length === 1 && (mon !== '0' && mon !== '1')) {
            mon = "0" + mon;
            sep = ' / ';
        }
        return mon + sep + year;
    };
    ;
    CardsFormat.prototype.cardExpiryVal = function (value) {
        var _ref = value.split(/[\s\/]+/, 2);
        var month = parseInt(_ref[0]);
        var year = parseInt(_ref[1]);
        if ((year != null ? year.toString().length : void 0) === 2 && /^\d+$/.test(year.toString())) {
            var prefix = (new Date).getFullYear();
            prefix = parseInt(prefix.toString().slice(0, 2));
            year = parseInt(prefix.toString() + year.toString());
        }
        return {
            month: month,
            year: year
        };
    };
    ;
    CardsFormat.prototype.validateCardExpiry = function (month, year) {
        if (!(month && year)) {
            return false;
        }
        month = parseInt((month + '').replace(/\s+/g, ''));
        year = parseInt((year + '').replace(/\s+/g, ''));
        if (!/^\d+$/.test(month.toString())) {
            return false;
        }
        if (!/^\d+$/.test(year.toString())) {
            return false;
        }
        if (!((1 <= month && month <= 12))) {
            return false;
        }
        if (year.toString().length === 2) {
            if (year < 70) {
                year = parseInt("20" + year);
            }
            else {
                year = parseInt("19" + year);
            }
        }
        if (year.toString().length !== 4) {
            return false;
        }
        var expiry = new Date(year, month);
        var currentTime = new Date;
        expiry.setMonth(expiry.getMonth() - 1);
        expiry.setMonth(expiry.getMonth() + 1, 1);
        return expiry > currentTime;
    };
    ;
    return CardsFormat;
}());
exports.CardsFormat = CardsFormat;
