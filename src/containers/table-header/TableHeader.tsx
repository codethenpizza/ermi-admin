import {FC, PropsWithChildren} from "react";
import {Row} from '@components'

const TableHeader: FC<PropsWithChildren<any>> = ({children}) => (
  <Row justify='end' style={{padding: '10px'}}>
    {children}
  </Row>
)

export {
    TableHeader
}
