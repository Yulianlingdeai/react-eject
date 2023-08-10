import React, { useState } from "react";
import { Drawer, Button, Form, Input, Select, Space, Table, Pagination } from "antd";
import type { PaginationProps } from "antd";
import CustomCloseIcon from "../CustomCloseIcon";
import style from "./index.module.css";
import icon_search_station from "../../assets/image/icon_search_station.png";

const { Column } = Table;
interface DataType {
    key: React.Key;
    stationId: string;
    stationName: string;
    type: number;
    altitude: number;
    longitude: string;
    latitude: string;
}
const data: DataType[] = [
    {
        key: "1",
        stationId: "1",
        stationName: "Brown",
        type: 1,
        altitude: 32,
        longitude: "New York No. 1",
        latitude: "developer"
    },
    {
        key: "2",
        stationId: "Jim",
        stationName: "Green",
        type: 1,
        altitude: 42,
        longitude: "London No. 1",
        latitude: "loser"
    },
    {
        key: "3",
        stationId: "Joe",
        stationName: "Black",
        type: 1,
        altitude: 32,
        longitude: "Sydney No. 1",
        latitude: "teacher"
    }
];
type props = { open: boolean; onClose: (isShow: boolean) => void };
export default function AirportSetting({ open, onClose }: props) {
    const [current, setCurrent] = useState(3);
    const [form] = Form.useForm();
    const handleCloseDrawer = () => {
        onClose(false);
    };
    const onFormFinish = (values: any) => {
        console.log("values===>>>>", values);
    };
    const handleChangePagination: PaginationProps["onChange"] = (page) => {
        console.log(page);
        setCurrent(page);
    };
    return (
        <Drawer
            width={980}
            title={
                <div className="drawer-title">
                    机场设置
                    <CustomCloseIcon onClick={handleCloseDrawer} backgroundColor="#D39422"></CustomCloseIcon>
                </div>
            }
            headerStyle={{ padding: "20px 0 20px 0", borderBottom: "none", textAlign: "center" }}
            bodyStyle={{ padding: 0 }}
            rootClassName="drawer-container"
            placement="right"
            onClose={handleCloseDrawer}
            open={open}
            closeIcon={false}
        >
            <div className={style.searchForm}>
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
                            <img className={style.searchIcon} src={icon_search_station} alt="" />
                            搜索
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <Table dataSource={data} rowKey={(record) => record.key} pagination={false} rowClassName={style.row}>
                <Column title="站点ID" align="center" dataIndex="stationId" />
                <Column title="站点名称" align="center" dataIndex="stationName" />
                <Column title="站点类型" align="center" dataIndex="type" />
                <Column title="海拔高度" align="center" dataIndex="altitude" />
                <Column title="经度" align="center" dataIndex="longitude" />
                <Column title="纬度" align="center" dataIndex="latitude" />
                <Column title="？" align="center" dataIndex="address" />
                <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: DataType) => (
                        <Space size="middle">
                            <a>Invite {record.stationId}</a>
                            <a>Delete</a>
                        </Space>
                    )}
                />
            </Table>
            <Pagination
                className={style.pagination}
                locale={{
                    items_per_page: "条/页",
                    jump_to: "跳至",
                    page: "页",
                    prev_page: "上一页",
                    next_page: "下一页"
                }}
                showSizeChanger
                showQuickJumper
                current={current}
                onChange={handleChangePagination}
                showTotal={(total) => `共${total}条`}
                defaultCurrent={1}
                total={500}
            />
        </Drawer>
    );
}
