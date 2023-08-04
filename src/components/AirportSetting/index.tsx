import React from "react";
import { Drawer, Button, Form, Input, Select, Space, Table } from "antd";
import CustomCloseIcon from "../CustomCloseIcon";
import "./index.css";
import icon_search_station from "../../assets/image/icon_search_station.png";

const { Column } = Table;
interface DataType {
    key: React.Key;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    tags: string[];
}
const data: DataType[] = [
    {
        key: "1",
        firstName: "John",
        lastName: "Brown",
        age: 32,
        address: "New York No. 1",
        tags: ["nice", "developer"]
    },
    {
        key: "2",
        firstName: "Jim",
        lastName: "Green",
        age: 42,
        address: "London No. 1",
        tags: ["loser"]
    },
    {
        key: "3",
        firstName: "Joe",
        lastName: "Black",
        age: 32,
        address: "Sydney No. 1",
        tags: ["cool", "teacher"]
    }
];
type props = { open: boolean; onClose: (isShow: boolean) => void };
export default function AirportSetting({ open, onClose }: props) {
    const [form] = Form.useForm();
    const handleCloseDrawer = () => {
        onClose(false);
    };
    const onFormFinish = (values: any) => {
        console.log("values===>>>>", values);
    };
    return (
        <Drawer
            width={980}
            title={<div style={{ fontSize: "24px", fontWeight: "bold", color: "#3D3D3D" }}>机场设置</div>}
            headerStyle={{ padding: "20px 0 20px 0", borderBottom: "none", textAlign: "center" }}
            bodyStyle={{ padding: 0 }}
            rootClassName="drawer-container"
            placement="right"
            onClose={handleCloseDrawer}
            open={open}
            closeIcon={<CustomCloseIcon></CustomCloseIcon>}
        >
            <div className="search-form">
                <Form
                    layout={"inline"}
                    form={form}
                    onFinish={onFormFinish}
                    initialValues={{ layout: "inline" }}
                    style={{ maxWidth: "none" }}
                    autoComplete="off"
                >
                    <Form.Item label="站点ID" name="stationId">
                        <Input placeholder="请输入站点ID" />
                    </Form.Item>
                    <Form.Item label="站点名称" name="stationName">
                        <Input placeholder="请输入站点名称" />
                    </Form.Item>
                    <Form.Item label="站点类型" name="stationType">
                        <Select style={{ minWidth: 180 }}>
                            <Select.Option value="机场站">机场站</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">
                            <img className="search-icon2" src={icon_search_station} alt="" />
                            搜索
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <Table dataSource={data}>
                <Column title="站点ID" align="center" dataIndex="lastName" key="lastName" />
                <Column title="站点名称" align="center" dataIndex="age" key="age" />
                <Column title="站点类型" align="center" dataIndex="age" key="age" />
                <Column title="海拔高度" align="center" dataIndex="age" key="age" />
                <Column title="经度" align="center" dataIndex="address" key="address" />
                <Column title="纬度" align="center" dataIndex="address" key="address" />
                <Column title="？" align="center" dataIndex="address" key="address" />
                <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: DataType) => (
                        <Space size="middle">
                            <a>Invite {record.lastName}</a>
                            <a>Delete</a>
                        </Space>
                    )}
                />
            </Table>
        </Drawer>
    );
}
