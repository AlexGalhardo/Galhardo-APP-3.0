import Data from "src/constants/Data";

class States {
    constructor() {
        this.isValid = this.isValid.bind(this);
        this.codeToName = this.codeToName.bind(this);
    }

    public isValid(stateCode: string): boolean {
        const foundState = this.getState(stateCode);
        if (foundState === null || foundState === undefined) return false;
        return true;
    }

    public codeToName(stateCode: string): string {
        const state = this.getState(stateCode);
        if (state === null || state === undefined) return "";
        return state.name;
    }

    private getState(stateCode: string): { code: string; name: string } | null {
        const foundState = Data.STATES.find((state) => state.code === stateCode);
        if (!foundState) return null;
        return foundState;
    }

    public get methods() {
        return {
            isValidStateShortCode: this.isValid,
            stateShorCodeToStateName: this.codeToName,
        };
    }
}

export default States;
