import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import * as actOrders from '../actions/orders'
import Item from '../components/Item'
import theme from './App.scss'

const App = () => {
  const dispatch = useDispatch()
  const orders = useSelector(state => state.orders.data)
  // const orders = store.orders && store.orders.data
  const [prcessing, setProcessing] = useState([])
  const [complete, setComplete] = useState([])
  useEffect(() => {
    dispatch(actOrders.get())
  },[])

  useEffect(() => {
    let com = [];
    let pro = []
    if (orders) {
      // 先照日期排序
      const sortOrders = orders.sort((a,b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        if (dateA > dateB) {
          return -1
        } else if (dateA < dateB){
          return 1
        }
        else {
          0
        }
      })
      sortOrders.map(item => {
        if (item.status.code === 1 || item.status.code === 2) {
          pro.push(item)
        }
        else if (item.status.code === 3 || item.status.code === 4) {
          com.push(item)
        }
      })
      setProcessing(pro)
      setComplete(com)
      console.log('111', pro, com, sortOrders);
    }
    
  }, [orders, setProcessing, setComplete])

  return (
    <div className={theme.self}>
      <div className={theme.title}>
        <div className={theme.decorator} />
        <span className={theme.text}>進行中</span>
      </div>
      {prcessing && prcessing.map((item, i) => {
        return (
          <div key={i}>
            <Item data={item} />
          </div>
        )
      })}
      <div className={theme.title}>
        <div className={theme.decorator} />
        <span className={theme.text}>已完成</span>
      </div>
      {complete && complete.map((item, i) => {
        return (
          <div key={i}>
            <Item data={item} />
          </div>
        )
      })}
    </div>
  )
}

export default App
