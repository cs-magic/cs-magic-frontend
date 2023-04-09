import backendApi from '@/lib/api'

export const uploadFile = async (file: File): Promise<string> => {
	// ref: https://axios-http.com/docs/multipart
	const res = await backendApi.postForm('/general/file/upload', {
		"file": file
	})
	return res.data
}
