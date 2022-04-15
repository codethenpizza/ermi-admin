import {ContextMenuItems, ContextMenuProps} from "../ContextMenu";
import {MouseEvent, useState} from "react";

export type useContextMenuRes<T extends object> = {
    contestMenuState: ContextMenuProps<T>
    onContextMenuClick: (event: MouseEvent, record: T, rowIndex: any) => void
}

export const useContextMenu = <T extends object>(items: ContextMenuItems<T>[]): useContextMenuRes<T> => {
    const [contestMenuState, setContestMenuState] = useState<ContextMenuProps<T>>({
        items: items,
        isVisible: false,
        x: 0,
        y: 0,
    })

    const onContextMenuClick = (event: MouseEvent, record: any) => {
        event.preventDefault()
        if (!contestMenuState.isVisible) {
            document.addEventListener(`click`, function onClickOutside() {
                setContestMenuState((p) => ({
                    ...p,
                    isVisible: false,
                    record: undefined
                }))
                document.removeEventListener(`click`, onClickOutside)
            })
        }
        setContestMenuState({
            x: event.clientX,
            y: event.clientY,
            items: items,
            isVisible: true,
            record
        })
    }

    return {
        contestMenuState,
        onContextMenuClick
    }
}
