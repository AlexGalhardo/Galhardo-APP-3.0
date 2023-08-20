class Objects {
    public hasKeys(object: unknown, ...keys: string[]): boolean {
        if (typeof object !== "object") return false;
        if (keys.length === 0) return false;

        const objectKeys = Object.keys(object);

        for (const key of keys) {
            if (!objectKeys.includes(key)) return false;
        }

        return true;
    }

    public hasValues(object: unknown, values: unknown[]): boolean {
        if (typeof object !== "object") return false;
        if (values.length === 0) return false;

        const objectValues = Object.values(object);

        for (const value of values) {
            if (!objectValues.includes(value)) return false;
        }

        return true;
    }

    public deepClone(object: unknown): unknown {
        if (typeof object !== "object") return object;
        if (object === null) return null;

        const clonedObject: Record<string, unknown> = {};

        for (const key in object) {
            clonedObject[key] = this.deepClone(object[key]);
        }

        return clonedObject;
    }

    public get methods() {
        return {
            objectHasKeys: this.hasKeys,
            objectHasValues: this.hasValues,
            objectDeepClone: this.deepClone,
        };
    }
}

export default Objects;
