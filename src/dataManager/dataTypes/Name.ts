class Name {
    constructor() {
        this.isValid = this.isValid.bind(this);
        this.isValidFullName = this.isValidFullName.bind(this);
    }

    public isValid(name: string): boolean {
        if (!name || name.length <= 1) return false;
        const regexOfValidNamesWithAcents = /^[a-zA-ZÀ-ú]+$/g;
        return regexOfValidNamesWithAcents.test(name);
    }

    public isValidFullName(fullName: string): boolean {
        const names = fullName.split(" ");
        if (names.length < 2) return false;
        for (const name of names) {
            if (!this.isValid(name)) return false;
        }
        return true;
    }

    public capitalize(fullName: string): string {
        if (!this.isValidFullName(fullName)) throw new Error("Invalid person name");

        const arr = fullName.toLowerCase().split(" "),
            prepositions = ["da", "de", "do", "das", "dos", "e"];

        for (let i = 0; i < arr.length; i++) {
            arr[i] = !prepositions.includes(arr[i]) ? arr[i].charAt(0).toUpperCase() + arr[i].slice(1) : arr[i];
        }

        return arr.join(" ");
    }

    public get methods() {
        return {
            isValidFullName: this.isValidFullName,
            isValidName: this.isValid,
            capitalizeNames: this.capitalize,
        };
    }
}

export default Name;
