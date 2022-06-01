import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useStores } from "../stores";
import {
  Button,
  Table,
  Modal,
  DatePicker,
  Select,
  Form,
  Input,
  Space,
  Divider,
  InputNumber,
  Row,
  Col,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import "./style.css";
import { toJS } from "mobx";
import { convertDMY, getDateToday, countDate } from "../common/index";
import moment from "moment";

const { Option } = Select;
const dateFormat = "DD/MM/YYYY";
const layout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 10,
  },
};

export const PhieuThuePage = observer(() => {
  const [form] = Form.useForm();
  const { phieuThueStore, thanhVienStore, bangDiaStore } = useStores();
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [thanhViens, setThanhViens] = useState([]);
  const [bangDias, setBangDias] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [chiTietPhieuThue, setChiTietPhieuThue] = useState([]);

  useEffect(() => {
    phieuThueStore.getData().then(() => {
      setDataSource(toJS(phieuThueStore.data));
    });
    thanhVienStore.getData().then(() => {
      setThanhViens(toJS(thanhVienStore.data));
    });
    bangDiaStore.getData().then(() => {
      setBangDias(toJS(bangDiaStore.data));
    });
    return () => {
      phieuThueStore.clearData();
      thanhVienStore.clearData();
      bangDiaStore.clearData();
    };
  }, [refresh]);

  useEffect(() => {
    var tongTien = 0;
    console.log("tinhTong")
    try {
      var ngayThue = form.getFieldValue("ngayThue");
      var ngayHenTra = form.getFieldValue("ngayHenTra");
      var countdate2 = countDate(ngayThue,ngayHenTra);
      console.log(ngayThue);
      console.log(ngayHenTra);
      chiTietPhieuThue.forEach((element) => {
        if (element.soLuong && element.giaThue) {
          tongTien = tongTien + element.soLuong * element.giaThue * countdate2;
        }
        form.setFieldsValue({
          tongTien: tongTien.toFixed(2),
        });
      });
    } catch (error) { }
  }, [chiTietPhieuThue]);

  const columns = [
    {
      key: "1",
      title: "Người Thuê",
      dataIndex: "idNguoiThue",
      filterSearch: true,
      filters: thanhVienStore.data
        ? thanhVienStore.data.map((e) => ({ text: e.hoTen, value: e.id }))
        : null,
      onFilter: (value, record) => record.idNguoiThue === value,
      render: (idNguoiThue) => {
        let hoTen = "";
        thanhVienStore.data.map((data) => {
          if (data.id === idNguoiThue) {
            hoTen = data.hoTen;
          }
        });
        return hoTen;
      },
    },
    {
      key: "2",
      title: "Ngày thuê",
      dataIndex: "ngayThue",
      render: (ngayThue) => {
        return convertDMY(ngayThue);
      },
    },
    {
      key: "3",
      title: "Ngày hẹn trả",
      dataIndex: "ngayHenTra",
      render: (ngayHenTra) => {
        return convertDMY(ngayHenTra);
      },
    },
    {
      key: "4",
      title: "Ngày Trả",
      dataIndex: "ngayTra",
      render: (ngayTra) => {
        return ngayTra ? convertDMY(ngayTra) : null;
      },
    },
    {
      key: "5",
      title: "Tổng Tiền(VNĐ)",
      dataIndex: "tongTien",
      render: (tongTien) => {
        return tongTien.toFixed(2);
      },
      sorter: (a, b) => a.tongTien - b.tongTien,
    },
    {
      key: "6",
      title: "Actions",
      fixed: "right",
      width: 90,
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditPhieuThue(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeletePhieuThue(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onAddPhieuThue = () => {
    form.setFieldsValue({
      ngayThue: moment(convertDMY(getDateToday()), dateFormat),
    });
    setIsOpenAdd(true);
  };

  const onDeletePhieuThue = (record) => {
    Modal.confirm({
      title: "Bạn có chắc chắn xóa phiếu này?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        phieuThueStore
          .detailData(record.id)
          .then((ctpt) => {
            ctpt.map((e) => {
              phieuThueStore.deleteDetailData(e.id);
            });
          })
          .finally(() => {
            phieuThueStore.deleteData(record.id);
            setRefresh(!refresh);
          });
      },
    });
  };

  const onEditPhieuThue = (record) => {
    phieuThueStore.detailData(record.id).then((data) => {
      console.log(data);
      setIsOpenEdit(true);
      setChiTietPhieuThue(data);
      form.setFieldsValue({
        id: record.id,
        idNguoiThue: record.idNguoiThue,
        ngayThue: record.ngayThue
          ? moment(convertDMY(record.ngayThue), dateFormat)
          : null,
        ngayHenTra: record.ngayHenTra
          ? moment(convertDMY(record.ngayHenTra), dateFormat)
          : null,
        ngayTra: record.ngayTra
          ? moment(convertDMY(record.ngayTra), dateFormat)
          : null,
        chiTietPhieuThue: data,
        tongTien: record.tongTien.toFixed(2),
      });
    });
  };

  const onEditFinish = (values) => {
    console.log(values);
    let ctpt = [];
    ctpt = values.chiTietPhieuThue;
    console.log("thong tin phieu thue", values);
    phieuThueStore
      .updateData(values)
      .then(() => {
        ctpt.map((e) => {
          e.idPhieuThue = values.id;
          if (e.id) {
            phieuThueStore.updateDetailData(e);
          } else {
            phieuThueStore.insertDetailData(e);
          }
        });
      })
      .finally(() => {
        setRefresh(!refresh);
        resetEditing();
      });
  };

  const onAddFinished = (values) => {
    console.log(values);
    phieuThueStore
      .insertData(values)
      .then((data) => {
        let ctpt = [];
        ctpt = values.chiTietPhieuThue;
        ctpt.map((e) => {
          e.idPhieuThue = data.id;
          phieuThueStore.insertDetailData(e);
        });
      })
      .finally(() => {
        setRefresh(!refresh);
        resetEditing();
      });
  };

  const resetEditing = () => {
    setIsOpenEdit(false);
    setIsOpenAdd(false);
    setChiTietPhieuThue(null);
    form.setFieldsValue({
      id: null,
      idNguoiThue: null,
      ngayThue: null,
      ngayHenTra: null,
      ngayTra: null,
      chiTietPhieuThue: null,
      tongTien: null,
    });
  };

  return (
    <div className="container-fluid">
      <Button
        type="primary"
        style={{
          marginBottom: 16,
        }}
        onClick={onAddPhieuThue}
      >
        Add
      </Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 800, y: 400 }}
        bordered
        style={{ textAlign: "center" }}
        title={() => <h5>Bảng danh sách phiếu thuê băng đĩa của cửa hàng</h5>}
      ></Table>

      <Modal
        title="Sửa Phiếu thuê"
        visible={isOpenEdit}
        width={760}
        style={{ top: 20 }}
        footer={null}
        onCancel={() => {
          resetEditing();
        }}
      >
        <Form
          form={form}
          {...layout}
          name="form_sua_phieu_thue"
          onFinish={onEditFinish}
        >
          <Row>
            <Col span="12">
              <Form.Item name="id" hidden={true} />
              <Form.Item
                name="idNguoiThue"
                label="Người Thuê"
                rules={[
                  { required: true, message: "Bạn chưa nhập người thuê" },
                ]}
              >
                <Select style={{ width: 149.2 }}>
                  {thanhVienStore.data.map((thanhVien, index) => {
                    return (
                      <Option value={thanhVien.id} key={index}>
                        {thanhVien.hoTen}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="ngayThue"
                label="Ngày Thuê"
                rules={[{ required: true, message: "Bạn chưa nhập ngày thuê" }]}
              >
                <DatePicker format={dateFormat} disabled />
              </Form.Item>
            </Col>
            <Col span="12">
              <Form.Item
                name="ngayHenTra"
                label="Ngày hẹn trả"
                rules={[
                  { required: true, message: "Bạn chưa nhập ngày hẹn trả" },
                ]}
              >
                <DatePicker format={dateFormat} />
              </Form.Item>
              <Form.Item name="ngayTra" label="Ngày trả">
                <DatePicker format={dateFormat} />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <div className="ctpt-scroll">
            <Form.List name="chiTietPhieuThue">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, "id"]}
                        hidden={true}
                      />
                      <Form.Item
                        {...restField}
                        name={[name, "idPhieuThue"]}
                        hidden={true}
                      />
                      <Form.Item
                        {...restField}
                        label="Băng đĩa"
                        name={[name, "idBangDia"]}
                        rules={[
                          {
                            required: true,
                            message: "Bạn chưa nhập băng đĩa",
                          },
                        ]}
                      >
                        <Select
                          style={{ width: 130 }}
                          onChange={(idBangDia) => {
                            var ctpt = form.getFieldValue("chiTietPhieuThue");
                            const bd = bangDias.find((e) => e.id === idBangDia);
                            ctpt.map((e) =>
                              e.idBangDia === bd.id
                                ? (e.giaThue = bd.giaThue)
                                : e
                            );
                            form.setFieldsValue({
                              chiTietPhieuThue: ctpt,
                            });
                            setChiTietPhieuThue(
                              form.getFieldValue("chiTietPhieuThue")
                            );
                          }}
                        >
                          {(bangDiaStore.data || []).map((item) => {
                            return (
                              <Option key={item.id} value={item.id}>
                                {item.tenBangDia}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label="Số lượng"
                        name={[name, "soLuong"]}
                        rules={[
                          { required: true, message: "Bạn chưa nhập số lượng" },
                        ]}
                      >
                        <InputNumber
                          style={{ width: 136 }}
                          onChange={(e) => {
                            setChiTietPhieuThue(
                              form.getFieldValue("chiTietPhieuThue")
                            );
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label="Giá thuê"
                        name={[name, "giaThue"]}
                        style={{ marginRight: 10 }}
                      >
                        <InputNumber style={{ width: 127 }} disabled />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item wrapperCol={{ offset: 9, span: 14 }}>
                    <Button type="dashed" onClick={() => add()}>
                      Thêm băng đĩa
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
          <Divider />
          <Form.Item label="Tổng tiền" name="tongTien">
            <Input width={500} bordered={false} />
          </Form.Item>
          <Divider />
          <Form.Item wrapperCol={{ offset: 9, span: 14 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Thêm Phiếu thuê"
        visible={isOpenAdd}
        width={760}
        style={{ top: 20 }}
        footer={null}
        onCancel={() => {
          resetEditing();
        }}
      >
        <Form
          form={form}
          {...layout}
          name="form_thêm_phieu_thue"
          onFinish={onAddFinished}
        >
          <Row>
            <Col span="12">
              <Form.Item name="id" hidden={true} />
              <Form.Item
                name="idNguoiThue"
                label="Người Thuê"
                rules={[
                  { required: true, message: "Bạn chưa chọn người thuê" },
                ]}
              >
                <Select style={{ width: 149.2 }}>
                  {thanhVienStore.data.map((thanhVien, index) => {
                    return (
                      <Option value={thanhVien.id} key={index}>
                        {thanhVien.hoTen}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="ngayThue"
                label="Ngày Thuê"
                rules={[{ required: true, message: "Bạn chưa nhập ngày thuê" }]}
              >
                <DatePicker format={dateFormat} />
              </Form.Item>
            </Col>
            <Col span="12">
              <Form.Item
                name="ngayHenTra"
                label="Ngày hẹn trả"
                rules={[
                  { required: true, message: "Bạn chưa nhập ngày hẹn trả" },
                ]}
              >
                <DatePicker format={dateFormat} />
              </Form.Item>
              <Form.Item name="ngayTra" hidden={true} label="Ngày trả">
                <DatePicker format={dateFormat} />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <div className="ctpt-scroll">
            <Form.List name="chiTietPhieuThue">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, "id"]}
                        hidden={true}
                      />
                      <Form.Item
                        {...restField}
                        name={[name, "idPhieuThue"]}
                        hidden={true}
                      />
                      <Form.Item
                        {...restField}
                        label="Băng đĩa"
                        name={[name, "idBangDia"]}
                        rules={[
                          {
                            required: true,
                            message: "Bạn chưa nhập băng đĩa",
                          },
                        ]}
                      >
                        <Select
                          style={{ width: 130 }}
                          onChange={(idBangDia) => {
                            var ctpt = form.getFieldValue("chiTietPhieuThue");
                            const bd = bangDias.find((e) => e.id === idBangDia);
                            ctpt.map((e) =>
                              e.idBangDia === bd.id
                                ? (e.giaThue = bd.giaThue)
                                : e
                            );
                            form.setFieldsValue({
                              chiTietPhieuThue: ctpt,
                            });
                            setChiTietPhieuThue(
                              form.getFieldValue("chiTietPhieuThue")
                            );
                          }}
                        >
                          {(bangDiaStore.data || []).map((item) => (
                            <Option key={item.id} value={item.id}>
                              {item.tenBangDia}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label="Số lượng"
                        name={[name, "soLuong"]}
                        rules={[
                          { required: true, message: "Bạn chưa nhập số lượng" },
                        ]}
                      >
                        <InputNumber
                          style={{ width: 136 }}
                          onChange={(e) => {
                            setChiTietPhieuThue(
                              form.getFieldValue("chiTietPhieuThue")
                            );
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label="Giá thuê"
                        name={[name, "giaThue"]}
                        style={{ marginRight: 10 }}
                      >
                        <InputNumber style={{ width: 127 }} disabled
                        />
                      </Form.Item>
                      {/* <Form.Item
                        {...restField}
                        label="Thành tiền:"
                        name={[name, "thanhTien"]}
                      >
                        <InputNumber style={{width: 127 }} disabled/>
                      </Form.Item> */}
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}

                  <Form.Item wrapperCol={{ offset: 9, span: 14 }}>
                    <Button type="dashed" onClick={() => add()}>
                      Thêm băng đĩa
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
          <Divider />
          <Form.Item label="Tổng tiền" name="tongTien">
            <Input width={500} bordered={false} />
          </Form.Item>
          <Divider />
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
