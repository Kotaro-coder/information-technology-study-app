export type JwtPayload = {
  email: string;
  //subは認証情報を識別するためのフィールド
  sub: number;
};
