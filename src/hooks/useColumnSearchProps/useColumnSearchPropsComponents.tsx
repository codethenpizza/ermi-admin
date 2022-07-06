import {Button, Input, InputRef, Space} from "antd";
import {Key, useRef} from "react";
import {SearchOutlined} from "@ant-design/icons";
import {FilterConfirmProps} from "antd/lib/table/interface";
import {ColumnDataType} from "@types";

export const useColumnSearchPropsComponents = (): Partial<ColumnDataType> => {

    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
    ) => {
        confirm();
    };

    const handleOnChange = (
        setSelectedKeys: (keys: Key[]) => void,
        value?: string,
    ) => {
        if (value) {
            setSelectedKeys([searchValueAdapterTo(value)]);
        } else {
            setSelectedKeys([]);
        }
    }

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
    };

    const SEARCH_SUFFIX = 'LIKE_';
    const searchValueAdapterTo = (val: string): string => SEARCH_SUFFIX + val;
    const searchValueAdapterFrom = (val?: string | Key): string => {
        if (!val) {
            return '';
        }

        if (val.toString().indexOf(SEARCH_SUFFIX) === 0) {
            return val.toString().slice(SEARCH_SUFFIX.length);
        }

        return val.toString();
    }

    return {
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={searchInput}
                    placeholder={`Поиск`}
                    value={searchValueAdapterFrom(selectedKeys[0])}
                    onChange={e => handleOnChange(setSelectedKeys, e.target.value)}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm)}
                    style={{marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Искать
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{width: 90}}
                    >
                        Очистить
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({closeDropdown: false});
                        }}
                    >
                        Фильтровать
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    };
};
