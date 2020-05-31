import {                //导入已经封装好的方法 
    homeListData,       //获取列表
    addListData,        //添加
    deleteListData,     //删除
    upListData,         //编辑
} from '@/services/home'
const { pathToRegexp } = require('path-to-regexp')

export default {
    namespace: 'home',

    state: {
        name: 'home',
        listData: [],
    },

    subscriptions: {
        setup({ history, dispatch }) {
            history.listen(({ pathname }) => {
                // test返回 true， false
                // exec返回对象
                const regexp = pathToRegexp('/home').test(pathname)
                if (regexp) {
                    dispatch({ type: 'getListData' })
                }
            })
        }
    },
    // 触发异步
    effects: {
        // 获取列表数据
        *getListData({ payload }, { call, put, select }) {
            const data = yield call(homeListData)

            yield put({
                type: 'setListData',
                payload: data.data.users,
            })
        },
        // 添加
        *addListData({ payload }, { call, put, select }) {
            yield call(addListData, payload)
            yield put({
                type: 'getListData'
            })
        },
        // 删除
        *deleteListData({ payload }, { call, put, select }) {
            yield call(deleteListData, { id: payload.id })
            yield put({
                type: 'getListData'
            })
        },
        // 编辑
        *upListData({ payload }, { call, put, select }) {
            yield call(upListData, payload)
            yield put({
                type: 'getListData'
            })
        }

    },
    // 修改state只能在这里面修改
    reducers: {
        setListData(state, action) {
            return { ...state, listData: action.payload }
        }
    }
}