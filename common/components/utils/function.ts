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


export function replaceEmptyStringWithUndefined(obj: any): any {
    if(!obj) {
        return undefined
    }
    if (typeof obj === 'object') {
      if (Array.isArray(obj)) {
        return obj.map(replaceEmptyStringWithUndefined);
      } else {
        return Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            replaceEmptyStringWithUndefined(value),
          ])
        );
      }
    } else if (obj === '') {
      return undefined;
    } else {
      return obj;
    }
  }

  export function formatDate(date: Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}