<template>
  <div class="StrategyContainer">
    <Row :gutter="16">
      <Col span="12">
      <Upload style="width: 100%;" :beforeUpload="beforeUpload" action="//jsonplaceholder.typicode.com/posts/">
        <Button long icon="ios-cloud-upload-outline">upload</Button>
      </Upload>
      </Col>
      <Col span="12">
      <Button long @click="download" icon="ios-cloud-upload-outline">download</Button>
      </Col>
    </Row>
    <Row :gutter="16" style="margin-top: 20px;">
      <Col span="12">
      <Button @click="add" type="success" long>add</Button>
      </Col>
    </Row>
    <div style="margin-top: 20px;">
      <div class="listBox">
        <Row :gutter="8" v-for="(item, index) in tableList" :key="item.time" style="border-bottom: 1px dashed #999;margin-bottom: 10px;padding: 10px 0;">
          <Col span="4"><Button @click="delItem(item, index)" size="small" type="error">D</Button></Col>
          <Col span="16" style="text-align: center">{{item.time}}</Col>
          <Col span="4" class="text-right"><Button @click="editItem(item, index)" size="small" type="info">E</Button></Col>
          <Col span="2" class="text-right">qc:</Col>
          <Col span="6">{{item.qc || '-'}}</Col>
          <Col span="2" class="text-right">otc:</Col>
          <Col span="6">{{item.otc || '-'}}</Col>
          <Col span="2" class="text-right">usdt:</Col>
          <Col span="6">{{item.zbPrice || '-'}}</Col>
          <Col span="6" class="text-right">analysis:</Col>
          <Col span="18" style="line-height: 20px;padding: 5px 0;">{{item.analysis}}</Col>
          <Col span="6" class="text-right">conclusion:</Col>
          <Col span="18" style="line-height: 20px;padding: 5px 0;">{{item.conclusion}}</Col>
        </Row>
      </div>
    </div>
    <Modal v-model="modalStatus" :title="modalData.time?'edit':'add'" :mask-closable="false" :closable="false">
      <div>
        <Row>
          <Col class="formTitle" span="5">usdt</Col>
          <Col span="17"><Input v-model="modalData.zbPrice"></Input></Col>
        </Row>
        <div style="height: 10px"></div>
        <Row>
          <Col class="formTitle" span="5">qc</Col>
          <Col span="17"><Input v-model="modalData.qc"></Input></Col>
        </Row>
        <div style="height: 10px"></div>
        <Row>
          <Col class="formTitle" span="5">otc</Col>
          <Col span="17"><Input v-model="modalData.otc"></Input></Col>
        </Row>
        <div style="height: 10px"></div>
        <Row>
          <Col class="formTitle" span="5">analysis</Col>
          <Col span="17">
            <Input type="textarea" v-model="modalData.analysis"></Input>
          </Col>
        </Row>
        <div style="height: 10px"></div>
        <Row>
          <Col class="formTitle" span="5">conclusion</Col>
          <Col span="17">
            <Input type="textarea" v-model="modalData.conclusion"></Input>
          </Col>
        </Row>
      </div>
      <div slot="footer">
        <Button @click="modalStatus = false">cancel</Button>
        <Button @click="submit" type="success">submit</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import moment from 'moment'
  // 下载文件方法
  var funDownload = function (content, filename) {
    var eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    var blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
  };
  export default {
    name: 'Strategy',
    data() {
      return {
        tableList: [],
        modalStatus: false,
        modalData: {
          qc: '',
          otc: '',
          analysis: '',
          conclusion: '',
          zbPrice: ''
        }
      }
    },
    mounted() {
      this.getLocal()
    },
    methods: {
      add() {
        this.modalData = {
          qc: '',
          otc: '',
          analysis: '',
          conclusion: '',
          zbPrice: window.localStorage.getItem('zbPrice')
        }
        this.modalStatus = true
      },
      delItem(item, index) {
        this.$Modal.confirm({
            title: 'comfirm',
            content: '确定删除么？',
            onOk: () => {
                this.tableList.splice(index, 1)
                this.saveLocal()
            },
            onCancel: () => {
            }
        });
        
      },
      editItem(item, index) {
        this.modalData = {
          ...item,
          index
        }
        this.modalStatus = true
      },
      getLocal() {
        const dataStr = window.localStorage.getItem('StrategyData')
        if (dataStr) {
          this.tableList = JSON.parse(dataStr)
        }
      },
      saveLocal() {
        window.localStorage.setItem('StrategyData', JSON.stringify(this.tableList))
      },
      submit() {
        if (this.modalData.time) {
          this.tableList[this.modalData.index] = this.modalData
        } else {
          this.tableList.unshift({
            ...this.modalData,
            time: moment().format('YYYY-MM-DD HH:mm:ss')
          })
        }
        this.saveLocal()
        this.modalStatus = false
      },
      beforeUpload(val) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.tableList = JSON.parse(e.target.result)
          this.saveLocal()
        };
        reader.readAsText(val);
        return false
      },
      download() {
        funDownload(JSON.stringify(this.tableList), 'strategy.json')
      }
    }
  }

</script>
<style lang="less">
  .StrategyContainer {
    padding: 20px 10px;
    min-height: 100%;
    color: #eee;
    background: #333;

    .ivu-upload.ivu-upload-select {
      width: 100%
    }
  }
  .text-right {
    text-align: right
  }

</style>
<style lang="less" scoped>
.listBox {
  line-height: 30px;
}
.mySelect {
  width: 100%;
  height: 30px;
  border: 1px solid #dddee1;
  border-radius: 4px
}
  .formTitle {
    line-height: 30px;
    text-align: right;
    padding-right: 10px;
  }

  .mytable {
    width: 100%;
    text-align: center;
    border-collapse: collapse;

    td,
    th {
      padding: 5px 0;
      border: 1px solid #999;
    }
  }

</style>
