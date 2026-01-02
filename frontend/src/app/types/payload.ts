export type Payload = {
    email: string;
    sub: number;
    //iatはトークンの発行時間、expは有効期限
    iat: number;
    exp: number;
}