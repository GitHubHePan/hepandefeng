<template>
  <div class="content-page">
    <div class="content-main clearfix">
      <div class="header clearfix">
        <el-card class="box-card card-red">
          <router-link class="link-color" :to="{ path: '/dashboard/order' }">
            <h1>{{ dashboardData.infoData.orderToDelivery }}</h1>
            <div class="text item">待发货订单</div>
          </router-link>
        </el-card>
        <el-card class="box-card card-green">
          <router-link class="link-color" :to="{ path: '/dashboard/goods' }">
            <h1>{{ dashboardData.infoData.goodsOnsale }}</h1>
            <div class="text item">上架中的商品</div>
          </router-link>
        </el-card>
        <el-card class="box-card card-black">
          <router-link class="link-color" :to="{ path: '/dashboard/user' }">
            <h1>{{ dashboardData.infoData.user }}</h1>
            <div class="text item">总用户数</div>
          </router-link>
        </el-card>
      </div>
      <div class="main">
        <el-tabs class="o-tab" v-model="dashboardData.activeName2" type="card" @tab-click="handleClick">
          <el-tab-pane label="今天" name="first" />
          <el-tab-pane label="昨天" name="second" />
          <el-tab-pane label="最近7天" name="third" />
          <el-tab-pane label="最近30天" name="fourth" />
        </el-tabs>
        <div class="tab-content clearfix">
          <el-card class="box-card2">
            <template v-slot:header>
              <div class="clearfix">
                <span>顾客</span>
                <el-popover placement="right" v-model="dashboardData.related_pop" width="630">
                  <el-tabs class="user-tab" v-model="dashboardData.userTab" type="card" @tab-click="userTabClick">
                    <el-tab-pane label="新增" name="first" />
                    <el-tab-pane label="老客户" name="second" />
                  </el-tabs>
                  <el-table :data="dashboardData.userData" style="width: 100%" height="700" border stripe>
                    <el-table-column label="头像" width="80">
                      <template v-slot="scope">
                        <img :src="scope.row.avatar" alt="" />
                      </template>
                    </el-table-column>
                    <el-table-column prop="nickname" label="昵称" width="140" />
                    <el-table-column prop="gender" label="性别" width="50">
                      <template v-slot="scope">
                        {{ scope.row.gender == 2 ? "女" : "男" }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="register_time" label="注册时间" width="170" />
                    <el-table-column prop="last_login_time" label="最近登录" width="170" />
                  </el-table>
                  <template v-slot:reference>
                    <el-button class="float-right" size="small" type="primary" @click="seeClick">查看</el-button>
                  </template>
                </el-popover>
              </div>
            </template>
            <div class="text item">
              <span>新增</span>
              <h3 style="float: right">{{ dashboardData.mainInfo.newUser }}</h3>
            </div>
            <div class="text item">
              <span>老顾客</span>
              <h3 style="float: right">{{ dashboardData.mainInfo.oldUser }}</h3>
            </div>
          </el-card>
          <el-card class="box-card2">
            <template v-slot:header>
              <div class="clearfix">
                <span>下单</span>
              </div>
            </template>
            <div class="text item">
              <span>加入购物车</span>
              <h3 style="float: right">{{ dashboardData.mainInfo.addCart }}</h3>
            </div>
            <div class="text item">
              <span>提交订单数/金额</span>
              <h3 style="float: right">
                {{ dashboardData.mainInfo.addOrderNum }} / {{ dashboardData.mainInfo.addOrderSum }}
              </h3>
            </div>
          </el-card>
          <el-card class="box-card2">
            <template v-slot:header>
              <div class="clearfix">
                <span>支付</span>
              </div>
            </template>
            <div class="text item">
              <span>成交订单数</span>
              <h3 style="float: right">{{ dashboardData.mainInfo.payOrderNum }}</h3>
            </div>
            <div class="text item">
              <span>成交金额</span>
              <h3 style="float: right">{{ dashboardData.mainInfo.payOrderSum }}</h3>
            </div>
          </el-card>
        </div>
        <div class="line clearfix" />
        <div class="block-4 clearfix">
          <el-card class="box-card">
            <div class="text item">
              <span>客单价</span>
              <p style="float: right">
                {{ numFilter(dashboardData.mainInfo.payOrderSum / dashboardData.mainInfo.payOrderNum) }}
              </p>
            </div>
            <p class="tips">成交金额/成交订单数</p>
          </el-card>
          <el-card class="box-card">
            <div class="text item">
              <span>下单转化率</span>
              <p style="float: right">
                {{
                  numFilter(
                    dashboardData.mainInfo.addOrderNum /
                      (dashboardData.mainInfo.newUser + dashboardData.mainInfo.oldUser)
                  )
                }}
              </p>
            </div>
            <p class="tips">下单人数/访问人数</p>
          </el-card>
          <el-card class="box-card">
            <div class="text item">
              <span>下单-支付转化率</span>
              <p style="float: right">
                {{ numFilter(dashboardData.mainInfo.payOrderNum / dashboardData.mainInfo.addOrderNum) }}
              </p>
            </div>
            <p class="tips">支付人数/下单人数</p>
          </el-card>
          <el-card class="box-card">
            <div class="text item">
              <span>支付转化率</span>
              <p style="float: right">
                {{
                  numFilter(
                    dashboardData.mainInfo.payOrderNum /
                      (dashboardData.mainInfo.newUser + dashboardData.mainInfo.oldUser)
                  )
                }}
              </p>
            </div>
            <p class="tips">支付人数/访问人数</p>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import { getMainDataApi, getMainDataInfoApi } from "@/api/data"

const dashboardData = reactive({
  infoData: {},
  activeName2: "first",
  userTab: "first",
  mainInfo: {},
  loginInfo: null,
  username: "",
  label: "",
  userData: [],
  newData: [],
  oldData: [],
  related_pop: false,
  resetVision: true
})

const numFilter = (value: Number) => {
  const realVal = Number(value).toFixed(2)
  return Number(realVal)
}
const seeClick = () => {
  console.log("????")
}
const getInfo = () => {
  getMainDataApi().then((response: any) => {
    dashboardData.infoData = response.data
  })
}
const handleClick = (tab: any) => {
  dashboardData.related_pop = false
  dashboardData.userTab = "first"
  console.log(tab._data.index)
  const pindex = tab._data.index
  console.log("pindex:" + pindex)
  getMainInfo(pindex)
}
const userTabClick = (tab: any) => {
  const pindex = tab._data.index
  console.log(pindex)
  if (pindex == 0) {
    dashboardData.userData = dashboardData.newData
    console.log(dashboardData.userData)
  } else {
    dashboardData.userData = dashboardData.oldData
    console.log(dashboardData.userData)
  }
}
const getMainInfo = (index: Number) => {
  getMainDataInfoApi({ params: { pindex: index } }).then((response: any) => {
    dashboardData.mainInfo = response.data
    dashboardData.newData = response.data.newData
    dashboardData.oldData = response.data.oldData
    dashboardData.userData = dashboardData.newData
    console.log(dashboardData.mainInfo)
  })
}

getInfo()
getMainInfo(0)
</script>

<style scoped>
.notice {
  width: 100%;
  height: 0.6rem;
  padding: 0.3rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background: #ffecd5;
  margin-bottom: 0.2rem;
  font-size: 0.16rem;
  border-radius: 0.06rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.breadcrumb {
  margin-bottom: 0.1rem;
}

.notice .r {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.count {
  background: #fff;
  padding: 0.1rem;
}

.float-right {
  float: right;
}

.tips {
  color: #8c939d;
  font-size: 0.14rem;
}

.text {
  font-size: 0.14rem;
}

.item {
  padding: 0.1rem 0;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.tab-content {
  margin-bottom: 0.2rem;
}

.box-card {
  width: 32%;
  float: left;
  margin: 0 0.2rem 0.14rem 0;
}

.box-card:last-child {
  margin-right: 0px;
}

.box-card .link-color {
  color: #fff;
}

.box-card:last-child {
  margin-right: 0;
}

.box-card2 {
  width: 32%;
  float: left;
  margin-right: 0.18rem;
}

.box-card2:last-child {
  margin-right: 0;
}

.header {
  margin-bottom: 0.3rem;
}

.line {
  margin: 0.2rem 0;
  border-top: 1px solid #d1dbe5;
}

.card-red {
  background: #e64242;
  border: none;
  color: #fff;
}

.box-card h1 {
  font-size: 0.16rem;
}

.card-blue {
  background: #4db3ff;
  border: none;
  color: #fff;
}

.card-green {
  background: #11b95c;
  border: none;
  color: #fff;
}

.card-black {
  background: #1f2d3d;
  border: none;
  color: #fff;
}

.card-gray {
  background: #d1dbe5;
  border: none;
}

.card-gray a {
  color: #1f2d3d;
}

.card-yellow {
  background: #f8dd66;
  border: none;
  color: #111111;
}

.card-yellow .link-color {
  color: #111111;
}
</style>
