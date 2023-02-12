import React, { Dispatch, SetStateAction } from 'react'

interface IAuthUserContext {
    authUser: any
    setAuthUser: Dispatch<SetStateAction<any>>
}

const AuthUserContext = React.createContext<IAuthUserContext>({
    authUser: null,
    setAuthUser: () => { }
})

export const AuthUserProvider = AuthUserContext.Provider
export const AuthUserConsumer = AuthUserContext.Consumer

export default AuthUserContext;
