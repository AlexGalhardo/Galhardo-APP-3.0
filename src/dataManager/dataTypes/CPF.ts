import Errors from "src/constants/Errors";

class CPF {
    constructor() {
        this.isValid = this.isValid.bind(this);
        this.sanitize = this.sanitize.bind(this);
        this.format = this.format.bind(this);
        this.generate = this.generate.bind(this);
    }

    public sanitize(cpf: string): string {
        return cpf.replace(/[^\d]+/g, "");
    }

    public isValid(cpf: string): boolean {
        let sum = 0;
        let rest: number;

        if (cpf.length !== 11) return false;

        // Verifica se todos os caracteres do CPF são iguais
        if (new Set(cpf).size === 1) return false;

        for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        rest = (sum * 10) % 11;

        if (rest == 10 || rest == 11) rest = 0;
        if (rest != parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        rest = (sum * 10) % 11;

        if (rest == 10 || rest == 11) rest = 0;
        if (rest != parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

    public format(cpf: string): string {
        const isValid = this.isValid(cpf);
        if (!isValid) throw new Error(Errors.CPF_IS_INVALID);
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    public generate(options: { withDashes: boolean } = { withDashes: false }): string {
        const create_array = (total: number, num: number) => Array.from(Array(total), () => number_random(num));
        const number_random = (num: number) => Math.round(Math.random() * num);
        const mod = (div: number, divs: number) => Math.round(div - Math.floor(div / divs) * divs);

        const total_array = 9;
        const n = 9;
        const [n1, n2, n3, n4, n5, n6, n7, n8, n9] = create_array(total_array, n);

        let d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
        d1 = 11 - mod(d1, 11);
        if (d1 >= 10) d1 = 0;

        let d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
        d2 = 11 - mod(d2, 11);
        if (d2 >= 10) d2 = 0;

        if (options.withDashes) return `${n1}${n2}${n3}.${n4}${n5}${n6}.${n7}${n8}${n9}-${d1}${d2}`;
        else return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${d1}${d2}`;
    }

    public get methods() {
        return {
            isValidCPF: this.isValid,
            formatCPF: this.format,
            generateNewCPF: this.generate,
            sanitizeCPF: this.sanitize,
        };
    }
}

export default CPF;
