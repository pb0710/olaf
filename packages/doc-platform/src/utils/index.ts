import { Net } from '@olaf/utils/src'

export const net = Net.create().use(async (ctx, next) => {
	await next()
})
