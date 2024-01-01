import { useEffect, useState } from 'react'

const useFetch = (fetchFunction, triggers = []) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(undefined)

    const fechData = async () => {
        try {
            const response = await fetchFunction()
            setData(response)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fechData()
    }, triggers)

    return {
        isLoading,
        data,
        fechData
    }
}

export default useFetch