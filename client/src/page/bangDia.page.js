import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Table, Modal, Input, Select, Form, InputNumber } from "antd";
import "./style.css";
import { toJS } from "mobx";
import { useStores } from "../stores";
const { TextArea } = Input;
const { Option } = Select;
export const BangDiaPage = observer(() => {
  const layout = {
    labelCol: {
      span: 9,
    },
    wrapperCol: {
      span: 10,
    },
  };
  const [form] = Form.useForm();
  const { bangDiaStore, theLoaiStore, nhaSanXuatStore } = useStores();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [dataSource, setDataSource] = useState();
  const [refresh, setRefresh] = useState(false);
  const [theLoais, setTheLoais] = useState();
  const [nhaSanXuats, setNhaSanXuats] = useState();
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  useEffect(() => {
    bangDiaStore.getData().then(() => {
      setDataSource(toJS(bangDiaStore.data));
    });
    theLoaiStore.getData().then(() => {
      setTheLoais(toJS(theLoaiStore.data));
    });
    nhaSanXuatStore.getData().then(() => {
      setNhaSanXuats(toJS(nhaSanXuatStore.data));
    });
    return () => {
      bangDiaStore.clearData();
      theLoaiStore.clearData();
      nhaSanXuatStore.clearData();
    };
  }, [refresh]);

  const columns = [
    {
      key: "1",
      title: "Tên Băng Đĩa",
      dataIndex: "tenBangDia",
      filterSearch: true,
      filters: dataSource
        ? dataSource.map((e) => ({ text: e.tenBangDia, value: e.tenBangDia }))
        : null,
      onFilter: (value, record) => record.tenBangDia.includes(value),
    },
    {
      key: "2",
      title: "Thể loại",
      dataIndex: "idTheLoai",
      filterSearch: true,
      filters: theLoaiStore.data
        ? theLoaiStore.data.map((e) => ({
            text: e.tenTheLoai,
            value: e.id,
          }))
        : null,
      onFilter: (value, record) => record.idTheLoai == value,
      render: (idTheLoai) => {
        let tenTheLoai = "";
        theLoaiStore.data.map((data) => {
          if (data.id === idTheLoai) {
            tenTheLoai = data.tenTheLoai;
          }
        });
        return tenTheLoai;
      },
    },
    {
      key: "3",
      title: "Nhà sản xuất",
      dataIndex: "idNhaSX",
      filterSearch: true,
      filters: nhaSanXuatStore.data
        ? nhaSanXuatStore.data.map((e) => ({
            text: e.tenNhaSX,
            value: e.id,
          }))
        : null,
      onFilter: (value, record) => record.idNhaSX == value,
      render: (idNhaSX) => {
        let tenNhaSX = "";
        nhaSanXuatStore.data.map((data) => {
          if (data.id === idNhaSX) {
            tenNhaSX = data.tenNhaSX;
          }
        });
        return tenNhaSX;
      },
    },
    {
      key: "4",
      title: "Tình trạng",
      dataIndex: "tinhTrang",
      filters: [
        {
          text: "Mới",
          value: "Mới",
        },
        {
          text: "Mới 99%",
          value: "Mới 99%",
        },
        {
          text: "Mới 89%",
          value: "Mới 89%",
        },
      ],
      onFilter: (value, record) => record.tinhTrang.startsWith(value),
      width: "10%",
    },

    {
      key: "5",
      title: "Giá Thuê",
      dataIndex: "giaThue",
      sorter: (a, b) => a.giaThue - b.giaThue,
      width: "10%",
    },
    {
      key: "6",
      title: "Ghi chú",
      dataIndex: "ghiChu",
      width: "30%",
    },
    {
      key: "7",
      title: "Actions",
      fixed: "right",
      width: 90,
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditBangDia(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteBangDia(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onAddBangDia = () => {
    form.setFieldsValue();
    setIsOpenAdd(true);
  };
  const onDeleteBangDia = (record) => {
    Modal.confirm({
      title: "Bạn có chắc xóa băng đĩa này?",
      okText: "Yes",
      onType: "danger",
      onOk: () => {
        bangDiaStore.deleteData(record.id);
        setRefresh(!refresh);
      },
    });
  };
  const onEditBangDia = (record) => {
    setIsOpenEdit(true);
    form.setFieldsValue({
      id: record.id,
      tenBangDia: record.tenBangDia,
      idTheLoai: record.idTheLoai,
      idNhaSX: record.idNhaSX,
      tinhTrang: record.tinhTrang,
      giaThue: record.giaThue,
      ghiChu: record.ghiChu,
    });
  };
  const resetEditing = () => {
    setIsOpenEdit(false);
    setIsOpenAdd(false);
    form.setFieldsValue({
      id: null,
      tenBangDia: null,
      idTheLoai: null,
      idNhaSX: null,
      tinhTrang: null,
      giaThue: null,
      ghiChu: null,
    });
  };
  const onAddFinish = (values) => {
    bangDiaStore.insertData(values).then(() => {
      setRefresh(!refresh);
      resetEditing();
    });
  };
  const onEditFinish = (values) => {
    bangDiaStore.updateData(values).then(() => {
      setRefresh(!refresh);
      resetEditing();
    });
  };
  return (
    <div className="container-fluid">
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={onAddBangDia}
      >
        Add
      </Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 800, y: 400 }}
        bordered
        style={{ textAlign: "center" }}
        title={() => <h5>Bảng danh sách băng đĩa của cửa hàng</h5>}
      ></Table>

      <Modal
        title="Thêm băng đĩa"
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
          name="form_them_bang_dia"
          onFinish={onAddFinish}
        >
          <Form.Item
            name="tenBangDia"
            label="Tên băng đĩa"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="idTheLoai"
            label="Tên thể loại"
            rules={[{ required: true }]}
          >
            <Select style={{ width: 210 }}>
              {(theLoaiStore.data || []).map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.tenTheLoai}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="idNhaSX"
            label="Tên nhà sản xuất"
            rules={[{ required: true }]}
          >
            <Select style={{ width: 210 }}>
              {(nhaSanXuatStore.data || []).map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.tenNhaSX}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="tinhTrang"
            label="Tình Trạng"
            rules={[{ required: true }]}
          >
            <Select style={{ width: 210 }}>
              <Option value="Mới">Mới</Option>
              <Option value="Mới 99%">Mới 99%</Option>
              <Option value="Mới 89%">Mới 89%</Option>
            </Select>
          </Form.Item>
          <Form.Item name="giaThue" label="Giá Thuê"  rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="ghiChu" label="Ghi Chú" rules={[{ required: true }]}>
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
        title="Sửa băng đĩa"
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
          name="form_sua_bang_dia"
          onFinish={onEditFinish}
        >
          <Form.Item name="id" hidden={true} />
          <Form.Item
            name="tenBangDia"
            label="Tên băng đĩa"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="idTheLoai"
            label="Tên thể loại"
            rules={[{ required: true }]}
          >
            <Select style={{ width: 210 }}>
              {(theLoaiStore.data || []).map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.tenTheLoai}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="idNhaSX"
            label="Tên nhà sản xuất"
            rules={[{ required: true }]}
          >
            <Select style={{ width: 210 }}>
              {(nhaSanXuatStore.data || []).map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.tenNhaSX}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="tinhTrang"
            label="Tình Trạng"
            rules={[{ required: true }]}
          >
            <Select style={{ width: 210 }}>
              <Option value="Mới">Mới</Option>
              <Option value="Mới 99%">Mới 99%</Option>
              <Option value="Mới 89%">Mới 89%</Option>
            </Select>
          </Form.Item>
          <Form.Item name="giaThue" label="Giá Thuê">
            <InputNumber />
          </Form.Item>
          <Form.Item name="ghiChu" label="Ghi chú">
            <TextArea rows={4} />
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
