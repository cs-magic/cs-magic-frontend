import React, { ReactNode } from 'react'
import Typist from 'react-typist'

const TitleLineComp = ({ content, onTypingDone }: { content: string | ReactNode, onTypingDone?: any }) =>
	<Typist
		avgTypingDelay={50}
		cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}
		className={'text-[#02CEC7] font-bold'}
		onTypingDone={onTypingDone}
	>
		{content}
	</Typist>


export default React.memo(TitleLineComp)
