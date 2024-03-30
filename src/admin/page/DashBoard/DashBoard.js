import { Row,Col } from "antd";
import Weather from '../../components/Weather/index';
const DashBoard = () => {
    return (
        <>
            <Row gutter={[24, 24]}>
                <Col span={12}>
                    <Weather />
                </ Col>
                <Col span={12} />

                <Col span={12} />
                <Col span={12} />
            </Row>
            <Row gutter={[24, 24]}>
                <Col span={12} />
                <Col span={12} />
            </Row>
        </>
    )
}
export default DashBoard;