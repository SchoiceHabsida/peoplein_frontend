export const calculateAge = (birthdate: string): number | string => {
    if (birthdate) {
        const birthdateObj = new Date(birthdate);
        const now = new Date();
        let age = now.getFullYear() - birthdateObj.getFullYear();
        const monthDiff = now.getMonth() - birthdateObj.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthdateObj.getDate())) {
            age--;
        }
        return age;
    } else return ''
}

export function removeTypename(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => removeTypename(item));
    }

    const newObj: any = {};

    for (const key in obj) {
        if (key !== '__typename') {
            newObj[key] = removeTypename(obj[key]);
        }
    }

    return newObj;
}