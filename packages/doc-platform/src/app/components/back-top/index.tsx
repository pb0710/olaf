import { useBoolean } from '@olaf/react-hook/src'
import { Button, Motion } from '@olaf/react-ui/src'
import { throttle } from '@olaf/utils/src'
import React, { useEffect } from 'react'
import { TbArrowBarToUp } from 'react-icons/tb'

interface BackTop {
	target?: HTMLElement
	threshold?: number
}
export default function BackTop(props: BackTop) {
	const { target = window, threshold = 400 } = props
	const [visible, { setTrue: show, setFalse: hide }] = useBoolean(false)

	const handleToTop = () => {
		target.scrollTo({
			top: 100,
			left: 100,
			behavior: 'smooth'
		})
	}
	useEffect(() => {
		const scrollHandler = throttle(() => {
			const { scrollTop } = target === window ? document.documentElement : (target as HTMLElement)
			if (scrollTop > threshold) {
				show()
			} else {
				hide()
			}
		}, 100)
		target.addEventListener('scroll', scrollHandler)
		return () => {
			target.removeEventListener('scroll', scrollHandler)
		}
	}, [hide, show, target, threshold])

	return (
		<Motion.Zoom in={visible}>
			<Button primary circle size="large" className="z-9 fixed right-12 bottom-8" onClick={handleToTop}>
				<TbArrowBarToUp className="text-5" />
			</Button>
		</Motion.Zoom>
	)
}
