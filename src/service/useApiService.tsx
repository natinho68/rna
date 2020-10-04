import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useApiService<T>(url: string): { data: T | null; error: Error | null; isLoading: boolean } {
  const baseUrl = 'https://api.monpetitgazon.com/stats/'
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true)
      try {
        const res = await axios(`${baseUrl}${url}`)
        setData(res.data)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        setError(error)
      }
    }
    fetchData()
  }, [url])
  return { data, error, isLoading }
}
