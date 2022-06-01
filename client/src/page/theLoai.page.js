import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Table, Modal, Input, Form } from "antd";
import "./style.css";
import { toJS } from "mobx";
import { useStores } from "../stores";
const { TextArea } = Input;
const layout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 10,
  },
};
export const TheLoaiPage = observer(() => {
  const [form] = Form.useForm();
  const { theLoaiStore } = useStores();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [dataSource, setDataSource] = useState();
  const [refresh, setRefresh] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  useEffect(() => {
    theLoaiStore.getData().then(() => {
      setDataSource(toJS(theLoaiStore.data));
    });
    return () => {
      theLoaiStore.clearData();
    };
  }, [refresh]);

  const columns = [
    {
      key: "1",
      title: "Tên Thể loại",
      dataIndex: "tenTheLoai",
      width: 150,
      filterSearch: true,
      filters: dataSource
        ? dataSource.map((e) => ({ text: e.tenTheLoai, value: e.tenTheLoai }))
        : null,
      onFilter: (value, record) => record.tenTheLoai.includes(value),
    },
    {
      key: "2",
      title: "Ghi Chú",
      dataIndex: "ghiChu",
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
                onEditTheLoai(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteTheLoai(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onAddTheLoai = () => {
    form.setFieldsValue();
    setIsOpenAdd(true);
  };
  const onDeleteTheLoai = (record) => {
    Modal.confirm({
      title: "Bạn có chắc xóa thể loại này?",
      okText: "Yes",
      onType: "danger",
      onOk: () => {
        theLoaiStore.deleteData(record.id);
        setRefresh(!refresh);
      },
    });
  };
  const onEditTheLoai = (record) => {
    setIsOpenEdit(true);
    form.setFieldsValue({
      id: record.id,
      tenTheLoai: record.tenTheLoai,
      ghiChu: record.ghiChu,
    });
  };
  const resetEditing = () => {
    setIsOpenEdit(false);
    setIsOpenAdd(false);
    form.setFieldsValue({
      id: null,
      tenTheLoai: null,
      ghiChu: null,
    });
  };
  const onAddFinish = (values) => {
    theLoaiStore.insertData(values).then(() => {
      setRefresh(!refresh);
      resetEditing();
    });
  };
  const onEditFinish = (values) => {
    theLoaiStore.updateData(values).then(() => {
      setRefresh(!refresh);
      resetEditing();
    });
  };
  return (
    <div className="container-fluid">
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={onAddTheLoai}
      >
        Add
      </Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 800, y: 400 }}
        bordered
        style={{textAlign: 'center'}}
        title={() => <h5>Bảng danh sách thể loại băng đĩa</h5>}
      ></Table>

      <Modal
        title="Thêm thể loại"
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
          name="form_them_the_loai"
          onFinish={onAddFinish}
        >
          <Form.Item
            name="tenTheLoai"
            label="Tên thể loại"
            rules={[{ required: true }]}
          >
            <Input placeholder="Tên thể loại" />
          </Form.Item>
          <Form.Item name="ghiChu" label="Ghi chú" rules={[{ required: true }]}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 9, span: 14 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Sửa thể loại"
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
          name="form_sua_the_loai"
          onFinish={onEditFinish}
        >
          <Form.Item name="id" hidden={true} />
          <Form.Item
            name="tenTheLoai"
            label="Tên thể loại"
            rules={[{ required: true }]}
          >
            <Input placeholder="Tên thể loại" />
          </Form.Item>
          <Form.Item name="ghiChu" label="Ghi chú" rules={[{ required: true }]}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 9, span: 14 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* <Modal
        title="Edit Thể loại"
        visible={isEditing}
        okText="Save"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          theLoaiStore.updateData(editingTheLoai);
          setRefresh(!refresh);
          resetEditing();
        }}
      >
        <Input
          className="input_style"
          placeholder="Tên Thể loại"
          value={editingTheLoai?.tenTheLoai}
          onChange={(e) => {
            setEditingTheLoai((pre) => {
              return { ...pre, tenTheLoai: e.target.value };
            });
          }}
        />
        <TextArea
          rows={4}
          className="input_style"
          placeholder="Ghi chú"
          value={editingTheLoai?.ghiChu}
          onChange={(e) => {
            setEditingTheLoai((pre) => {
              return { ...pre, ghiChu: e.target.value };
            });
          }}
        />
      </Modal> */}
    </div>
  );
});
