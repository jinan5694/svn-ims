<template>
  <Page
    v-loading="loading"
    :element-loading-text="$t('loading_text')">
    <template slot="toolbar">
      <Search
        v-model="searchKey"
        :placeholder="$t('placeholder.employee')"
        @search="fetch"/>
      <Button
        button-type="add"
        @click="toAdd"/>
    </template>
    <DataTable
      ref="table"
      :url="urlQuery"
      :params="params"
      :columns="columns">
      <template
        slot="operator"
        slot-scope="{row, index}">
        <Button
          button-type="view"
          @click="toView(row.id)"/>
        <Button
          button-type="edit"
          @click="toEdit(row.id)"/>
        <ConfirmButton @click="remove(row)"/>
      </template>
    </DataTable>
  </Page>
</template>
<script>
import CrudMixin from '@/mixins/crud'
import configMixin from './mixins/config'

import { timeToDate } from '@/common/utils'

export default {
  mixins: [ CrudMixin, configMixin ],
  data () {
    return {
      searchKey: ''
    }
  },
  computed: {
    columns () {
      return [
        {
          label: '员工编号',
          prop: 'employeeNo'
        },
        {
          label: '员工姓名',
          prop: 'employeeName'
        },
        {
          label: '职务',
          prop: 'postPosition'
        },
        {
          label: '性别',
          prop: 'sex'
        },
        {
          label: '入职日期',
          prop: 'entryDate',
          formatter: row => timeToDate(row.entryDate)
        },
        {
          label: '出生日期',
          prop: 'dateOfBirth',
          formatter: row => timeToDate(row.dateOfBirth)
        },
        {
          label: '操作',
          slotName: 'operator',
          align: 'center',
          width: 150
        }
      ]
    },
    params () {
      const params = {
        where: {
          and: [
            { enableFlag: 'System_EnableFlag_1' }
          ]
        }
      }
      if (this.searchKey !== '') {
        params.where.or = [
          { employeeNo: { like: this.searchKey } },
          { employeeName: { like: this.searchKey } }
        ]
      }
      const path = []
      return [params, path]
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
