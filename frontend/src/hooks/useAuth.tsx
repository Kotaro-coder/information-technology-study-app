import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Payload } from "../app/types/payload";

export const  useAuth = () => {
    const [authInfo, setAuthInfo] = useState<{
        checked: boolean,
        isAuthenticated: boolean,
    }>({ checked: false, isAuthenticated: false });

    //backendで受け取ったjwtトークンをローカルストレージに保存し、認証状態を管理する
    useEffect(() => {
        const token = localStorage.getItem('token');
        try {
            if(token) {
                const decodedToken = jwtDecode<Payload>(token);
                if(decodedToken.exp * 1000 < Date.now()) {
                    //トークンの有効期限が切れたらローカルストレージから削除
                    localStorage.removeItem('token');
                    // eslint-disable-next-line react-hooks/set-state-in-effect
                    setAuthInfo({checked: true, isAuthenticated: false});
                }
                else {
                    setAuthInfo({checked: true, isAuthenticated: true});
                }
            }
            else {
                setAuthInfo({checked: true, isAuthenticated: false});
            }
        } catch(error) {
            setAuthInfo({checked: true, isAuthenticated: false});
        }
    } ,[])

    return authInfo;
}