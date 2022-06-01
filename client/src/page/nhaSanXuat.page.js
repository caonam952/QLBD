import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Table, Modal, Input, Form } from "antd";
import "./style.css";
import { toJS } from "mobx";
import { useStores } from "../stores";

const layout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 10,
  },
};

export const NhaSanXuatPage = observer(() => {
  const [form] = Form.useForm();
  const { nhaSanXuatStore } = useStores();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [dataSource, setDataSource] = useState();
  const [refresh, setRefresh] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  useEffect(() => {
    nhaSanXuatStore.getData().then(() => {
      setDataSource(toJS(nhaSanXuatStore.data));
    });
    return () => {
      nhaSanXuatStore.clearData();
    };
  }, [refresh]);

  const columns = [
    {
      key: "1",
      title: "Tên Nhà sản xuất",
      dataIndex: "tenNhaSX",
      width: 400,
      filterSearch: true,
      filters: dataSource
        ? dataSource.map((e) => ({ text: e.tenNhaSX, value: e.tenNhaSX }))
        : null,
      onFilter: (value, record) => record.tenNhaSX.includes(value),
    },
    {
      key: "2",
      title: "Địa chỉ",
      dataIndex: "diaChi",
    },
    {
      key: "3",
      title: "Actions",
      fixed: "right",
      width: 90,
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditNhaSanXuat(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteNhaSanXuat(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onAddNhaSanXuat = () => {
    form.setFieldsValue();
    setIsOpenAdd(true);
  };
  const onDeleteNhaSanXuat = (record) => {
    Modal.confirm({
      title: "Bạn có chắc xóa nhà sản xuất này?",
      okText: "Yes",
      onType: "danger",
      onOk: () => {
        nhaSanXuatStore.deleteData(record.id);
        setRefresh(!refresh);
      },
    });
  };
  const onEditNhaSanXuat = (record) => {
    setIsOpenEdit(true);
    form.setFieldsValue({
      id: record.id,
      tenNhaSX: record.tenNhaSX,
      diaChi: record.diaChi,
    });
  };
  const resetEditing = () => {
    setIsOpenEdit(false);
    setIsOpenAdd(false);
    form.setFieldsValue({
      id: null,
      tenNhaSX: null,
      diaChi: null,
    });
  };
  const onAddFinish = (values) => {
    nhaSanXuatStore.insertData(values).then(() => {
      setRefresh(!refresh);
      resetEditing();
    });
  };
  const onEditFinish = (values) => {
    nhaSanXuatStore.updateData(values).then(() => {
      setRefresh(!refresh);
      resetEditing();
    });
  };

  return (
    <div className="container-fluid">
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={onAddNhaSanXuat}
      >
        Add
      </Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 800, y: 400 }}
        bordered
        style={{ textAlign: "center" }}
        title={() => <h5>Bảng danh sách nhà sản xuất băng đĩa</h5>}
      ></Table>

      <Modal
        title="Thêm Nhà sản xuất"
        visible={isOpenAdd}
        width={740}
        footer={null}
        okText="Save"
        onCancel={() => {
          resetEditing();
        }}
      >
        <Form
          form={form}
          {...layout}
          name="form_them_nhaSX"
          onFinish={onAddFinish}
        >
          <Form.Item
            name="tenNhaSX"
            label="Tên nhà sản xuất"
            rules={[{ required: true }]}
          >
            <Input placeholder="Tên nhà sản xuất" />
          </Form.Item>
          <Form.Item name="diaChi" label="Địa chỉ" rules={[{ required: true }]}>
            <Input placeholder="Địa chỉ" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 9, span: 14 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Sửa Nhà sản xuất"
        visible={isOpenEdit}
        width={740}
        footer={null}
        okText="Save"
        onCancel={() => {
          resetEditing();
        }}
      >
        <Form
          form={form}
          {...layout}
          name="form_sua_nhaSX"
          onFinish={onEditFinish}
        >
          <Form.Item name="id" hidden={true} />
          <Form.Item
            name="tenNhaSX"
            label="Tên nhà sản xuất"
            rules={[{ required: true }]}
          >
            <Input placeholder="Tên nhà sản xuất" />
          </Form.Item>
          <Form.Item name="diaChi" label="Địa chỉ" rules={[{ required: true }]}>
            <Input placeholder="Địa chỉ" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 9, span: 14 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});
