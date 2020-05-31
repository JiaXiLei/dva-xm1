import { getAxios, postAxios } from '@/utils/request'
import api from './api'

export const homeListData = () => getAxios(api.homeListData)  //获取列表
export const addListData = (option) => postAxios(api.addListData, option)  //添加数据
export const deleteListData = (option) => postAxios(api.deleteData, option)  //删除
export const upListData = (option) => postAxios(api.upData, option)  //编辑