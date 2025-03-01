import Mock from 'mockjs'
import homeApi from './mockServeData/home'

//interception interface
Mock.mock(/home\/getData/, homeApi.getStatisticalData)
