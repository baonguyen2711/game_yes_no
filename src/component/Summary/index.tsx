import { Table } from 'antd'
import React from 'react'
import { useState, useEffect } from 'react'
import type { ColumnsType, TableProps } from 'antd/es/table'

interface DataType {
  key: React.Key
  number: number
  player: string
  date: string
  answer: boolean
  result: boolean
  score: number
}
interface DataTypes {
  key: React.Key
  summary: string
  percent: number
  total: number
}
const column: ColumnsType<DataType> = [
  {
    title: 'No',
    dataIndex: 'number',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.number - b.number
  },
  {
    title: 'Player',
    dataIndex: 'player',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.player.length - b.player.length
  },
  {
    title: 'Date',
    dataIndex: 'date',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.date.length - b.date.length
  },
  {
    title: 'Answer',
    dataIndex: 'answer'
  },
  {
    title: 'Result',
    dataIndex: 'result'
  },
  {
    title: 'Score',
    dataIndex: 'score'
  }
]

const columns: ColumnsType<DataTypes> = [
  {
    title: 'Summary',
    dataIndex: 'summary'
  },
  {
    title: 'Correct percent',
    dataIndex: 'percent',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.percent - b.percent
  },
  {
    title: 'Total score',
    dataIndex: 'total',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.total - b.total
  }
]
const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra)
}
const Summary = () => {
  const [data, setData] = useState<DataType[]>([])
  const [datas, setDatas] = useState<DataTypes[]>([])

  useEffect(() => {
    const playerData = JSON.parse(localStorage.getItem('allData') || '[]')
    const dates = JSON.stringify(localStorage.getItem('date') || '[]')
    // Tạo dữ liệu cho bảng ở đây
    const tableData = playerData.map((name: string, index: number) => ({
      key: index.toString(),
      number: index + 1,
      player: name,
      date: dates,
      answer: false,
      result: false,
      score: 0
    }))
    const tableDatas = playerData.map((name: string, index: number) => ({
      key: index.toString(),
      summary: name,
      percent: 0 + '%',
      total: 0
    }))
    setData(tableData)
    setDatas(tableDatas)

    console.log('bbb', dates)
  }, [])

  return (
    <div>
      <div style={{ textAlign: 'left' }}>
        <h3>Yes No WTF GAME</h3>
      </div>
      <div>
        <h3>Final Result</h3>
      </div>
      <Table columns={column} pagination={false} dataSource={data} onChange={onChange} />;
      <div style={{ width: '40.9%', float: 'right' }}>
        <Table columns={columns} pagination={false} dataSource={datas} onChange={onChange} />;
      </div>
    </div>
  )
}

export default Summary
