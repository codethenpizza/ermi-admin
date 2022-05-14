import {FC} from "react";
import {Row} from '@components'

const TableHeader: FC = ({children}) => (
  <Row justify='end' style={{padding: '10px'}}>
    {children}
  </Row>
)

export {
    TableHeader
}
