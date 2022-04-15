import {Menu} from '@components'
import './style.scss'

export type ContextMenuItems<T> = {
    name: string
    action: (record?: T) => void
}

export type ContextMenuProps<T extends object> = {
    record?: T
    isVisible: boolean
    items: ContextMenuItems<T>[]
    x?: number
    y?: number
}

const ContextMenu = <T extends object>({isVisible, items, y, x, record}: ContextMenuProps<T>) => {
    if (!isVisible) {
        return null
    }

    return (
        <Menu className='context-menu' style={{left: `${x}px`, top: `${y}px`}}>
            {
                items.map(({name, action}) => (
                    <Menu.Item key={name} onClick={() => action(record)}>{name}</Menu.Item>
                ))
            }
        </Menu>
    )
}

export {
    ContextMenu
}
