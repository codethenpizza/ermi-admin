import {useAuthStore} from "@store";
import {useEffect} from "react";
import {authStorage} from "@utils";

export const useAuthenticate = (): void => {
  const {tokens, setTokens} = useAuthStore()

  useEffect(() => {
      if (tokens.authToken) {
        return
      }

      if (authStorage.getAuth()) {
        const {authToken, refreshToken} = authStorage.get()
        setTokens(authToken, refreshToken)
      }
  }, [])
}
