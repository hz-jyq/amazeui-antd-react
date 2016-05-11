import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'
import request from 'superagent'


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
      render: () => (
        <span>
          <a href="#">编辑&nbsp;</a>
          <span className="ant-divider"></span>
          <a href="#">&nbsp;删除</a>
        </span>
      )
    }]

    this.state = {
      isLoading: true,
      records: []
    }
  }

  componentDidMount() {
    this.xhr = request.get('/api/suggestion_types').type('json')
      .set('AUTHORIZATION', `Bearer ${localStorage.getItem('accessToken')}`)
      .end((error, response) => {
        if (error) {
          this.setState({
            isLoading: false
          })
        } else {
          this.setState({
            isLoading: false,
            records: response.body
          })
        }
      })
  }

  componentWillUnmount() {
    this.xhr.abort()
  }

  render() {
    return (
      <Table bordered={true} loading={this.state.isLoading}
        rowKey={record => record.id}
        columns={this.tableColumns}
        dataSource={this.state.records}
        pagination={false}
      />
    )
  }
}

SuggestionTypesPage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(/* state */) {
  return {
    // ...
  }
}

export default connect(mapStateToProps)(SuggestionTypesPage)
