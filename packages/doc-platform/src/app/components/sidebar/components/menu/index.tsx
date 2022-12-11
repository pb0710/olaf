import { nav_routes } from '@/router/routes'
import { Motion, Space, Tooltip } from '@olaf/react-ui/src'
import { cls } from '@olaf/utils/src'
import React, { Fragment, MouseEvent, useState } from 'react'
import { GoChevronDown } from 'react-icons/go'
import { NavLink, useNavigate } from 'react-router-dom'

const map = nav_routes
	.filter(route => route.children?.length)
	.reduce<Record<string, boolean>>((obj, cur) => {
		obj[cur.path] = false
		return obj
	}, {})

interface MenuProps {
	expand: boolean
}

export default function Menu({ expand }: MenuProps) {
	const navigate = useNavigate()
	const [open_map, set_open_map] = useState<Record<string, boolean>>(map)

	const set_open = (name: string, open: boolean) => {
		set_open_map(p => ({
			...p,
			[name]: open
		}))
	}

	return (
		<Space className="flex-1 select-none" direction="vertical" size="small">
			{nav_routes.map(({ path, state, children = [] }) => {
				const has_sub_nav = children.length > 0
				const toggleSubMenu = (e: MouseEvent) => {
					e.stopPropagation()
					set_open(path, !open_map[path])
				}
				const checvron_down_icon = (
					<GoChevronDown className={cls('transition-all', open_map[path] ? 'rotate-180' : 'rotate-0')} />
				)
				const nav_content = (
					<>
						<div className="leading-0 text-4">{state.icon}</div>
						{expand ? (
							<>
								<div className="ml-2 flex-1 break-all ws-nowrap">{state.nav_name}</div>
								{has_sub_nav && (
									<div
										className="b-rd-1 w-6 h-6 flex items-center justify-center text-3
										!group-active-bg-#00000018 group-hover-bg-#00000010"
										onClick={toggleSubMenu}
									>
										{checvron_down_icon}
									</div>
								)}
							</>
						) : (
							has_sub_nav && (
								<div className="flex items-center text-3" onClick={toggleSubMenu}>
									{checvron_down_icon}
								</div>
							)
						)}
					</>
				)

				return (
					<Fragment key={path}>
						<Tooltip title={state.nav_name} placement="right" disabled={expand}>
							{has_sub_nav ? (
								<div
									className="group w-100% h-8 flex items-center pl-4 pr-1 b-rd-2 
								decoration-none color-inherit cursor-pointer 
								active-bg-#00000018 hover-not-active-bg-#00000010"
									onClick={() => {
										navigate(`${path}/${children[0].path}`)
										set_open(path, true)
									}}
								>
									{nav_content}
								</div>
							) : (
								<NavLink
									to={`${path}`}
									className={({ isActive }) =>
										cls(
											'group w-100% h-8 flex items-center pl-4 pr-1 b-rd-2 decoration-none color-inherit',
											{
												'active-bg-#00000018 hover-not-active-bg-#00000010': !isActive,
												'bg-#00000018': isActive
											}
										)
									}
								>
									{nav_content}
								</NavLink>
							)}
						</Tooltip>

						<Motion.Collapse in={open_map[path]} className="w-100%">
							<div
								className={cls('pt-1 pb-1', {
									'ml-8': expand
								})}
							>
								{children.map(child => {
									return (
										<Tooltip
											key={child.path}
											title={child.state.nav_name}
											placement="right"
											disabled={expand}
										>
											<NavLink
												to={`${path}/${child.path}`}
												className={({ isActive }) =>
													cls(
														'group w-100% h-8 flex items-center pl-4 pr-1 b-rd-2 decoration-none color-inherit',
														{
															'active-bg-#00000018 hover-not-active-bg-#00000010':
																!isActive,
															'bg-#00000018': isActive
														}
													)
												}
											>
												<div className="leading-0 text-4">{child.state.icon}</div>
												{expand && (
													<div className="flex-1 break-all ws-nowrap ml-2">
														{child.state.nav_name}
													</div>
												)}
											</NavLink>
										</Tooltip>
									)
								})}
							</div>
						</Motion.Collapse>
					</Fragment>
				)
			})}
		</Space>
	)
}
