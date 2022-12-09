interface useFetchProps {
  url: string
}
export default function useFetch<T>() {
  const [data, setDate] = useState<T>()
}