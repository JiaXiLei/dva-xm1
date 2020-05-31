import React from 'react'
import { connect } from 'dva'
import { Table, Button, Popconfirm } from 'antd'
import Modals from './modals'
import './style.less'


export default @connect(({ home }) => {
    return {
        listData: home.listData
    }
})
class Home extends React.PureComponent {
    state = {
        visible: false,
        title: '',
        formData: [],
    }

    // 添加
    addList = option => {
        this.setState({
            visible: true,
            title: option,
            formData: [],
        })
    }
    visibleFalse = option => {
        this.setState({
            visible: false,
        })
        if (option.id) {  //添加
            this.props.dispatch({
                type: 'home/upListData',
                payload: option
            })
        } else {   //编辑
            this.props.dispatch({
                type: 'home/addListData',
                payload: option
            })
        }
    }
    // 删除
    deleteList = option => {
        this.props.dispatch({
            type: 'home/deleteListData',
            payload: option
        })
    }
    //修改
    upData = option => {
        this.setState({
            visible: true,
            title: option.title,
            formData: option.payload
        })
    }
    render() {
        const { listData } = this.props
        const { visible, title, formData } = this.state
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
            },
            {
                title: '住址',
                dataIndex: 'address',
            },
            {
                title: '操作',
                render: (v) => {

                    return (
                        <React.Fragment>
                            <Button onClick={() => this.addList('添加')} type='primary'>添加</Button>
                            <Button onClick={() => this.upData({ title: '编辑', payload: v })} type='link'>编辑</Button>
                            {
                                listData.length >= 1
                                    ? <Popconfirm title="是否删除?" onConfirm={() => this.deleteList(v)}>
                                        <Button type='link'>删除</Button>
                                    </Popconfirm>
                                    : null
                            }
                        </React.Fragment >
                    )
                }
            }
        ];
        return (
            <div className="pages-home">
                <Table
                    rowKey={v => v.id}
                    dataSource={listData}
                    columns={columns}
                    pagination={{
                        pageSize: 5,  //每页几条数据
                        total: Number(listData.length),  //多少条数据，默认给你分配多少页
                    }}
                >

                </Table>
                <Modals
                    visible={visible}
                    title={title}
                    formData={formData}
                    visibleFalse={this.visibleFalse}
                />
            </div>
        )
    }
}