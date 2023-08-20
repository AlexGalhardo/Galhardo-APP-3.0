class Primitives {
    constructor() {
        this.isAllStrings = this.isAllStrings.bind(this);
        this.isAllNumbers = this.isAllNumbers.bind(this);
        this.isAllBooleans = this.isAllBooleans.bind(this);
        this.isAllObjects = this.isAllObjects.bind(this);
        this.isAllArrays = this.isAllArrays.bind(this);
        this.isAllFunctions = this.isAllFunctions.bind(this);
        this.isAllUndefined = this.isAllUndefined.bind(this);
        this.isAllNull = this.isAllNull.bind(this);
        this.isAllSymbols = this.isAllSymbols.bind(this);
        this.isAllBigInts = this.isAllBigInts.bind(this);
        this.isPrimitive = this.isPrimitive.bind(this);
        this.isAllPrimitives = this.isAllPrimitives.bind(this);
        this.isAllDates = this.isAllDates.bind(this);
        this.isAllRegExps = this.isAllRegExps.bind(this);
        this.isNaN = this.isNaN.bind(this);
        this.isAllNaNs = this.isAllNaNs.bind(this);
        this.isAllInfinities = this.isAllInfinities.bind(this);
        this.isInfinity = this.isInfinity.bind(this);
        this.hasValue = this.hasValue.bind(this);
    }

    public isString(value: unknown): boolean {
        return typeof value === "string";
    }

    public isAllStrings(...values: unknown[]): boolean {
        for (const value of values) {
            if (!this.isString(value)) return false;
        }
        return true;
    }

    public isNumber(value: unknown): boolean {
        return typeof value === "number";
    }

    public isAllNumbers(...values: unknown[]): boolean {
        for (const value of values) {
            if (!this.isNumber(value)) return false;
        }
        return true;
    }

    public isBoolean(value: unknown): boolean {
        return typeof value === "boolean";
    }

    public isAllBooleans(...values: unknown[]): boolean {
        for (const value of values) {
            if (!this.isBoolean(value)) return false;
        }
        return true;
    }

    public isObject(value: unknown): boolean {
        return typeof value === "object";
    }

    public isAllObjects(...values: unknown[]): boolean {
        for (const value of values) {
            if (!this.isObject(value)) return false;
        }
        return true;
    }

    public isArray(value: unknown): boolean {
        return Array.isArray(value);
    }

    public isAllArrays(...values: unknown[]): boolean {
        for (const value of values) {
            if (!this.isArray(value)) return false;
        }
        return true;
    }

    public isFunction(value: unknown): boolean {
        return typeof value === "function";
    }

    public isAllFunctions(...values: unknown[]): boolean {
        for (const value of values) {
            if (!this.isFunction(value)) return false;
        }
        return true;
    }

    public isUndefined(value: unknown): boolean {
        return typeof value === "undefined";
    }

    public isAllUndefined(...values: unknown[]): boolean {
        for (const value of values) {
            if (!this.isUndefined(value)) return false;
        }
        return true;
    }

    public isNull(value: unknown): boolean {
        return value === null;
    }

    public isAllNull(...values: unknown[]): boolean {
        for (const value of values) {
            if (!this.isNull(value)) return false;
        }
        return true;
    }

    public isDate(value: unknown): boolean {
        return value instanceof Date;
    }

    public isAllDates(...values: unknown[]): boolean {
        for (const value of values) {
            if (!this.isDate(value)) return false;
        }
        return true;
    }

    public isSymbol(value: unknown): boolean {
        return typeof value === "symbol";
    }

    public isAllSymbols(...values: unknown[]): boolean {
        for (const value of values) {
            if (!this.isSymbol(value)) return false;
        }
        return true;
    }

    public isBigInt(value: unknown): boolean {
        return typeof value === "bigint";
    }

    public isAllBigInts(...values: unknown[]): boolean {
        for (const value of values) {
            if (!this.isBigInt(value)) return false;
        }
        return true;
    }

    public isRegExp(value: unknown): boolean {
        return value instanceof RegExp;
    }

    public isAllRegExps(...values: unknown[]): boolean {
        for (const value of values) {
            if (!this.isRegExp(value)) return false;
        }
        return true;
    }

    public isPromise(value: unknown): boolean {
        return value instanceof Promise;
    }

    public isAllPromises(...values: unknown[]): boolean {
        for (const value of values) {
            if (!this.isPromise(value)) return false;
        }
        return true;
    }

    public isPrimitive(value: unknown): boolean {
        return (
            this.isString(value) ||
            this.isNumber(value) ||
            this.isBoolean(value) ||
            this.isSymbol(value) ||
            this.isBigInt(value) ||
            this.isUndefined(value) ||
            this.isNull(value)
        );
    }

    public isAllPrimitives(...values: unknown[]): boolean {
        for (const value of values) {
            if (!this.isPrimitive(value)) return false;
        }
        return true;
    }

    public isInfinity(value: unknown): boolean {
        return value === Infinity || value === -Infinity;
    }

    public isAllInfinities(...values: unknown[]): boolean {
        for (const value of values) {
            if (!this.isInfinity(value)) return false;
        }
        return true;
    }

    public isNaN(value: unknown): boolean {
        return Number.isNaN(value);
    }

    public isAllNaNs(...values: unknown[]): boolean {
        for (const value of values) {
            if (!this.isNaN(value)) return false;
        }
        return true;
    }

    public hasValue(value: unknown): boolean {
        return !this.isUndefined(value) && !this.isNull(value) && !this.isNaN(value) && !this.isInfinity(value);
    }

    public get methods() {
        return {
            isString: this.isString,
            isAllStrings: this.isAllStrings,
            isNumber: this.isNumber,
            isAllNumbers: this.isAllNumbers,
            isBoolean: this.isBoolean,
            isAllBooleans: this.isAllBooleans,
            isObject: this.isObject,
            isAllObjects: this.isAllObjects,
            isArray: this.isArray,
            isAllArrays: this.isAllArrays,
            isFunction: this.isFunction,
            isAllFunctions: this.isAllFunctions,
            isUndefined: this.isUndefined,
            isAllUndefined: this.isAllUndefined,
            isNull: this.isNull,
            isAllNull: this.isAllNull,
            isDate: this.isDate,
            isAllDates: this.isAllDates,
            isSymbol: this.isSymbol,
            isAllSymbols: this.isAllSymbols,
            isBigInt: this.isBigInt,
            isAllBigInts: this.isAllBigInts,
            isRegExp: this.isRegExp,
            isAllRegExps: this.isAllRegExps,
            isPromise: this.isPromise,
            isAllPromises: this.isAllPromises,
            isPrimitive: this.isPrimitive,
            isAllPrimitives: this.isAllPrimitives,
            isInfinity: this.isInfinity,
            isAllInfinities: this.isAllInfinities,
            isNaN: this.isNaN,
            isAllNaNs: this.isAllNaNs,
            hasValue: this.hasValue,
        };
    }
}

export default Primitives;
