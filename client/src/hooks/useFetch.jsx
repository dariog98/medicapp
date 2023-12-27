import { useEffect, useState } from 'react'

const useFetch = (fetchFunction, triggers = []) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(undefined)

    const action = async () => {
        try {
            const response = await fetchFunction()
            console.log({response})
            setData(response)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        action()
    }, triggers)

    return {
        isLoading,
        data
    }
}

export default useFetch