<template>
  <div class="about">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>个人信息</h2>
        </div>
      </template>
      <el-form
        ref="formRef"
        :model="userInfo"
        :rules="rules"
        label-width="100px"
        class="user-form"
      >
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleAvatarChange"
          >
            <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="userInfo.nickname" />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userInfo.email" />
        </el-form-item>

        <el-form-item label="个人简介" prop="bio">
          <el-input
            v-model="userInfo.bio"
            type="textarea"
            :rows="4"
          />
        </el-form-item>

        <el-form-item label="社交链接">
          <div class="social-links">
            <el-input v-model="userInfo.github" placeholder="GitHub">
              <template #prefix>
                <el-icon><Link /></el-icon>
              </template>
            </el-input>
            <el-input v-model="userInfo.twitter" placeholder="Twitter">
              <template #prefix>
                <el-icon><Link /></el-icon>
              </template>
            </el-input>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)">
            保存修改
          </el-button>
          <el-button @click="resetForm(formRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const formRef = ref(null)

const userInfo = ref({
  avatar: 'https://placeholder.co/100',
  nickname: '博主昵称',
  email: 'example@example.com',
  bio: '热爱技术，热爱生活',
  github: 'https://github.com/yourusername',
  twitter: 'https://twitter.com/yourusername'
})

const rules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  bio: [
    { max: 200, message: '不能超过200个字符', trigger: 'blur' }
  ]
}

const handleAvatarChange = (file) => {
  userInfo.value.avatar = URL.createObjectURL(file.raw)
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      ElMessage.success('保存成功')
      // 这里可以添加保存到后端的逻辑
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped>
.user-form {
  max-width: 600px;
  margin: 0 auto;
}

.avatar-uploader {
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.social-links {
  display: flex;
  gap: 10px;
}

.social-links .el-input {
  width: 250px;
}
</style> 