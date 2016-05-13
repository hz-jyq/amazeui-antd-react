import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Popconfirm, message } from 'antd'
import request from 'superagent'
import { requestRecords, destroyRecord } from 'ducks/suggestionTypes'

import SuggestionTypeModal from 'components/SuggestionTypeModal'


class SuggestionTypesPage extends Component {
  constructor(props) {
    super(props)

    this.tableColumns = [{
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '描述',
      dataIndex: 'description',
      key: 'description'
    }, {
      title: '是否公开',
      dataIndex: 'public',
      key: 'public',
      render: (text, record) => (
        <span>{record.public ? '是' : '否'}</span>
      )
    }, {
      title: '评审人',
      dataIndex: 'reviewers',
      key: 'reviewers',
      render: (text, record) => (
        <span>{record.reviewers.map(r => r.name).join(', ')}</span>
      )
    }, {
      title: '常用操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <span>
          <a href="#">编辑&nbsp;</a>

          <span className="ant-divider"></span>

          <Popconfirm
            title="确定要删除这个意见类型吗？"
            onConfirm={() => { this.handleDeleteOperationConfirm(record) }}
          >
            <a href="#">&nbsp;删除</a>
          </Popconfirm>
        </span>
      )
    }]
  }

  componentDidMount() {
    this.xhr = request.get('/api/suggestion_types').type('json')
      .set('AUTHORIZATION', `Bearer ${localStorage.getItem('accessToken')}`)
      .end((error, response) => {
        if (error) {
          this.props.dispatch(requestRecords(error))
        } else {
          this.props.dispatch(requestRecords(response.body))
        }
      })
  }

  componentWillUnmount() {
    this.xhr.abort()
  }

  handleDeleteOperationConfirm(record) {
    request.del(`/api/suggestion_types/${record.id}`).type('json')
      .set('AUTHORIZATION', `Bearer ${localStorage.getItem('accessToken')}`)
      .end((error, response) => {
        if (error) {
          if (response.body && response.body.error) { message.error(response.body.error) }
          this.props.dispatch(destroyRecord(error))
        } else {
          this.props.dispatch(destroyRecord({ id: record.id }))
        }
      })
  }

  render() {
    return (
      <div>
        <div style={{ marginBottom: 12 }}>
          <Button type="primary">新建意见类型</Button>
        </div>
        <Table
          bordered
          loading={this.props.loading}
          rowKey={record => record.id}
          columns={this.tableColumns}
          dataSource={this.props.records}
          pagination={false}
        />
        <SuggestionTypeModal
          visible={false}
        />
      </div>
    )
  }
}

SuggestionTypesPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  records: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    loading: state.suggestionTypes.loading,
    records: state.suggestionTypes.records
  }
}

export default connect(mapStateToProps)(SuggestionTypesPage)
