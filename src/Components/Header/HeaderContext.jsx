import { createContext, useContext, useMemo, useState } from 'react'

export const HeaderContext = createContext(null)

export const HeaderProvider = ({ children }) => {
	const [isLogged, setIsLogged] = useState(false)

	const contextValue = useMemo(() => ({ isLogged, setIsLogged }), [isLogged])

	return (
		<HeaderContext.Provider value={contextValue}>
			{children}
		</HeaderContext.Provider>
	)
}
