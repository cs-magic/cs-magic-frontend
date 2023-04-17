import { baseApi } from '@/api/baseApi'

export const TAG_FILE = 'file'

export const fileApi = baseApi
	.enhanceEndpoints({
		addTagTypes: [TAG_FILE],
	})
	.injectEndpoints({
		endpoints: (builder) => ({
			
			uploadFile: builder.mutation<string, File>({
				query: (file) => {
					const formData = new FormData()
					formData.append('file', file)
					return {
						url: `/file`,
						method: 'post',
						body: formData,
					}
				},
			}),
			
		}),
	})


export const {
	
	useUploadFileMutation,
	
} = fileApi

