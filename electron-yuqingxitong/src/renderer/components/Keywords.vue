<template>
  <div id="keywords"  class="content">


    
        <div class="main_top">


          
            <el-button type="primary" @click="dialogFormVisible = true">增加关键词</el-button>
            

            <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
              <el-form>
                
                     <el-form-item label="标题" label-width="120px">
                        <el-input v-model="form.name" auto-complete="off"></el-input>
                    </el-form-item>

                     <el-form-item label="必须包含关键词" label-width="120px">
                        <el-input v-model="form.name" auto-complete="off"></el-input>
                    </el-form-item>

                     <el-form-item label="可包含关键词" label-width="120px">
                        <el-input v-model="form.name" auto-complete="off"></el-input>
                    </el-form-item>
                     <el-form-item label="不包含关键词" label-width="120px">
                        <el-input v-model="form.name" auto-complete="off"></el-input>
                    </el-form-item>

                     <el-form-item label="监控评率" label-width="120px">
                        <el-input v-model="form.name" auto-complete="off"></el-input>
                    </el-form-item>


                
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>

            

        </div>



        <table class="electron-table">
            <tr>
                <th>标题/地址</th>
			        	<th>必须包含词</th>
                <th>可包含词</th>
				        <th>不包含词</th>            
                <th width="60">监控频率</th>	
                <th>负面数</th>	
                <th>舆情总数</th>
                <th>下次更新时间</th>
                <th width="100">操作</th>	
            </tr>
            <tr>
        	    <td align="center"><a class="blue" href="/yuqing/admin.php?m=Keywords&amp;a=index&amp;cate_id=5">企业舆情</a></td>           
              <td align="center">天然气分公司扁平化管理</td>
              <td align="center"></td>      
                      <td align="center"></td>
              <!--<td align="center"></td>-->
              <td align="center">0 分</td>
               <td align="center"><em style="color:red;"><a class="blue" href="/yuqing/admin.php?m=KeywordsSearch&amp;a=index&amp;id=26&amp;type=-1">负面：0</a></em>　</td>
              
              <td align="center">
                <a class="blue" href="/yuqing/admin.php?m=KeywordsSearch&amp;a=index&amp;id=26">1</a>					
              </td>
				   
              <td align="center">2014-07-08 08:38:45</td>             
              <td align="center">
                <a class="blue" href="/yuqing/admin.php?m=KeywordsSearch&amp;a=index&amp;id=26">查看内容</a>　　
                
                <a class="blue" href="javascript:edit(26,'')">编辑</a>
              </td>           
				
            </tr>
            

        </table>

        <div class="page">   

            <el-pagination
            background
            layout="prev, pager, next"
            :total="1000" @current-change="pageChange($event)">
            </el-pagination>
        </div>



  </div>
</template>

<script>
    export default {
      name: 'keywords',

      data(){

        return{

          dialogFormVisible:false,
          form:{}
        }
      },
      
      methods: {
        open (link) {
          // this.$electron.shell.openExternal(link)
        }
      }
    }
</script>

<style lang="scss">
 
</style>
