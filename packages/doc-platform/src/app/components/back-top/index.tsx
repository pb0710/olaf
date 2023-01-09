import { useBoolean } from '@olaf/react-hook/src'
import { Button, Motion, Tooltip } from '@olaf/react-ui/src'
import { debounce } from '@olaf/utils/src'
import React, { useEffect } from 'react'
import { TbArrowBarToUp } from 'react-icons/tb'

interface BackTop {
	target?: HTMLElement
	threshold?: number
}
export default function BackTop(props: BackTop) {
	const { target = window, threshold = 400 } = props
	const [visible, { setTrue: show, setFalse: hide }] = useBoolean(false)

	const handle_to_top = () => {
		target.scrollTo({
			top: 100,
			left: 100,
			behavior: 'smooth'
		})
	}
	useEffect(() => {
		const scroll_handler = debounce(() => {
			const { scrollTop } = target === window ? document.documentElement : (target as HTMLElement)
			if (scrollTop > threshold) {
				show()
			} else {
				hide()
			}
		}, 100)
		target.addEventListener('scroll', scroll_handler)
		return () => {
			target.removeEventListener('scroll', scroll_handler)
		}
	}, [hide, show, target, threshold])

	return (
		<Tooltip title="返回顶部">
			<Motion.Zoom in={visible}>
				<Button primary circle size="large" className="z-9 fixed right-12 bottom-8" onClick={handle_to_top}>
					<TbArrowBarToUp className="text-5" />
				</Button>
			</Motion.Zoom>
		</Tooltip>
	)
}
