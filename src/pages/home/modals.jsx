import React from 'react'
import { Modal, Form, Input, Button } from 'antd';


const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};


export default class Modals extends React.Component {

    formRef = React.createRef();

    handleCancel = () => {
        this.props.visibleFalse()
    };
    handleSubmit = valuse => {
        if (this.props.formData) {
            valuse.id = this.props.formData.id
            this.props.visibleFalse(valuse)
        }
        else {
            this.props.visibleFalse(valuse)
        }
        this.formRef.current.resetFields();
    }
    render() {

        const { title, visible, formData } = this.props
        return (
            <div>
                <Modal
                    title={title} //标题
                    visible={visible} //visible 判断是否显示模态框 (true | false)
                    onCancel={this.handleCancel}
                    footer={null} //隐藏对话框下面的按钮
                    destroyOnClose={true}
                >
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={formData}
                        onFinish={this.handleSubmit}
                        ref={this.formRef}
                    // onFinishFailed={this.onFinishFailed}  //提交表单且数据验证失败后回调事件
                    >
                        <Form.Item
                            label="姓名"
                            name="name"
                            rules={[{ required: true, message: '请输入年龄！' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="年龄"
                            name="age"
                            rules={[{ required: true, message: '请输入年龄！' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="地址"
                            name="address"
                            rules={[{ required: true, message: '请输入地址！' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">确定</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}