export default class Address {
    public static readonly STATE_SYMBOL_BY_DDD = {
        "11": "SP",
        "12": "SP",
        "13": "SP",
        "14": "SP",
        "15": "SP",
        "16": "SP",
        "17": "SP",
        "18": "SP",
        "19": "SP",
        "21": "RJ",
        "22": "RJ",
        "24": "RJ",
        "27": "ES",
        "28": "ES",
        "31": "MG",
        "32": "MG",
        "33": "MG",
        "34": "MG",
        "35": "MG",
        "37": "MG",
        "38": "MG",
        "41": "PR",
        "42": "PR",
        "43": "PR",
        "44": "PR",
        "45": "PR",
        "46": "PR",
        "47": "SC",
        "48": "SC",
        "49": "SC",
        "51": "RS",
        "53": "RS",
        "54": "RS",
        "55": "RS",
        "61": "DF",
        "62": "GO",
        "63": "TO",
        "64": "GO",
        "65": "MT",
        "66": "MT",
        "67": "MS",
        "68": "AC",
        "69": "RO",
        "71": "BA",
        "73": "BA",
        "74": "BA",
        "75": "BA",
        "77": "BA",
        "79": "SE",
        "81": "PE",
        "82": "AL",
        "83": "PB",
        "84": "RN",
        "85": "CE",
        "86": "PI",
        "87": "PE",
        "88": "CE",
        "89": "PI",
        "91": "PA",
        "92": "AM",
        "93": "PA",
        "94": "PA",
        "95": "RR",
        "96": "AP",
        "97": "AM",
        "98": "MA",
        "99": "MA",
    };

    public static readonly VALID_DDD = [
        11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47,
        48, 49, 51, 53, 54, 55, 61, 62, 64, 63, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87,
        88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
    ];

    public static readonly STATES = [
        {
            code: "AC",
            name: "Acre",
        },
        {
            code: "AL",
            name: "Alagoas",
        },
        {
            code: "AM",
            name: "Amazonas",
        },
        {
            code: "AP",
            name: "Amapá",
        },
        {
            code: "BA",
            name: "Bahia",
        },
        {
            code: "CE",
            name: "Ceará",
        },
        {
            code: "DF",
            name: "Distrito Federal",
        },
        {
            code: "ES",
            name: "Espírito Santo",
        },
        {
            code: "GO",
            name: "Goiás",
        },
        {
            code: "MA",
            name: "Maranhão",
        },
        {
            code: "MG",
            name: "Minas Gerais",
        },
        {
            code: "MS",
            name: "Mato Grosso Do Sul",
        },
        {
            code: "MT",
            name: "Mato Grosso",
        },
        {
            code: "PA",
            name: "Pará",
        },
        {
            code: "PB",
            name: "Paraíba",
        },
        {
            code: "PE",
            name: "Pernambuco",
        },
        {
            code: "PI",
            name: "Piauí",
        },
        {
            code: "PR",
            name: "Paraná",
        },
        {
            code: "RJ",
            name: "Rio De Janeiro",
        },
        {
            code: "RN",
            name: "Rio Grande Do Norte",
        },
        {
            code: "RO",
            name: "Rondônia",
        },
        {
            code: "RR",
            name: "Roraima",
        },
        {
            code: "RS",
            name: "Rio Grande Do Sul",
        },
        {
            code: "SC",
            name: "Santa Catarina",
        },
        {
            code: "SE",
            name: "Sergipe",
        },
        {
            code: "SP",
            name: "São Paulo",
        },
        {
            code: "TO",
            name: "Tocantins",
        },
    ];
}
