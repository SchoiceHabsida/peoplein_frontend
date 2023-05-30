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