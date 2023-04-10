import axios from 'axios'
import { BACKEND_ENDPOINT } from '@/lib/env'


console.log({ BACKEND_ENDPOINT })
// Set config defaults when creating the instance
const instance = axios.create({
	baseURL: BACKEND_ENDPOINT,
})

instance.defaults.headers.post['Content-Type'] = 'application/json'

export default instance
