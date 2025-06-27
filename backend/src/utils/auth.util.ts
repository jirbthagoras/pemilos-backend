export const generatePassword = (username: string) => {
     // Password akan menyesuaikan kemauan osis.
     const randString = makeid(6)
     const token = `${randString}:${username}`

     return token
}

export function makeid(length: number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}