import axios from 'axios'
import { NEXT_PUBLIC_BACKEND_ENDPOINT } from '@/lib/env'


const instance = axios.create({
	baseURL: NEXT_PUBLIC_BACKEND_ENDPOINT,
})

instance.defaults.headers.post['Content-Type'] = 'application/json'

export default instance
