<script setup lang="ts">
import {computed, ref} from "vue";
import Card from "primevue/card";
import Button from "primevue/button";
import {zodResolver} from '@primevue/forms/resolvers/zod';
import {z} from 'zod';
import {useToast} from 'primevue/usetoast';

const activeTab = ref(0);
const email = ref('')
const password = ref('')
const login = ref('')
const userType = ref('athlete')
const changeActiveTab = (tab: number) => {
  if (tab !== activeTab.value) {
    activeTab.value = tab;
    email.value = ''
    password.value = ''
    login.value = ''
  }
}

const toast = useToast();

const resolver = zodResolver(
    z.object({
      email: z.string().min(1, {message: 'Введите почту'}),
      password: z.string().min(1, {message: 'Введите пароль'}),
      login: z.string().min(1, {message: 'Введите ваше полное имя'})
    })
);

const onFormLogin = ({valid}) => {
  console.log(valid)
  if (valid) {
    toast.add({severity: 'success', summary: 'Вы вошли в систему', life: 3000});
    console.log(email.value, password.value, login.value);
  }
};

const onFormRegister = ({valid}) => {
  console.log(valid)
  if (valid) {
    toast.add({severity: 'success', summary: 'Вы успешно зарегистрировались', life: 3000});
    console.log(email.value, password.value, login.value, userType.value);
  }
};

</script>

<template>
  <div class="layout-container">
    <div class="flex flex-col items-center justify-center w-full p-2">
      <img class="w-6 p-1 mx-c" style="border-radius: 50%" src="@/assets/images/logo.png" alt=""/>
      <div>
        <p class="text-2xl font-bold text-center">Войдите в вашу тренировочную платформу</p>
      </div>
    </div>
    <Card class="mb-2">

      <template #content>
        <Toast/>
        <Tabs value='0' scrollable>
          <TabList>
            <Tab class="w-6" @click="changeActiveTab(0)" value="0">Вход</Tab>
            <Tab class="w-6" @click="changeActiveTab(1)" value="1">Регистрация</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0" class="">

              <div class="card flex justify-center">
                <Form :resolver @submit="onFormLogin" class="flex flex-col gap-4 w-full sm:w-56">
                  <FormField v-slot="$field" name="email" initialValue="" class="flex flex-col gap-1">
                    <InputGroup>
                      <InputGroupAddon>
                        <i class="pi pi-at"></i>
                      </InputGroupAddon>
                      <InputText v-model="email" type="text" placeholder="Почта"/>
                    </InputGroup>
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                      {{ $field.error?.message }}
                    </Message>
                  </FormField>
                  <FormField v-slot="$field" name="password" initialValue="" class="flex flex-col gap-1">
                    <InputGroup>
                      <InputGroupAddon>
                        <i class="pi pi-key"></i>
                      </InputGroupAddon>
                      <InputText v-model="password" type="text" placeholder="Пароль"/>
                    </InputGroup>

                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                      {{ $field.error?.message }}
                    </Message>
                  </FormField>
                  <Button class="bt" type="submit" severity="primary" label="Войти"/>
                </Form>
              </div>

            </TabPanel>
            <TabPanel value="1">
              <div class="card flex justify-center">
                <Form :resolver @submit="onFormRegister" class="flex flex-col gap-4 w-full sm:w-56">
                  <FormField v-slot="$field" name="login" initialValue="" class="flex flex-col gap-1">
                    <InputGroup>
                      <InputGroupAddon>
                        <i class="pi pi-user-plus"></i>
                      </InputGroupAddon>
                      <InputText v-model="login" type="text" placeholder="Полное имя"/>
                    </InputGroup>

                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                      {{ $field.error?.message }}
                    </Message>
                  </FormField>
                  <FormField v-slot="$field" name="email" initialValue="" class="flex flex-col gap-1">
                    <InputGroup>
                      <InputGroupAddon>
                        <i class="pi pi-at"></i>
                      </InputGroupAddon>
                      <InputText v-model="email" type="text" placeholder="Почта"/>
                    </InputGroup>
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                      {{ $field.error?.message }}
                    </Message>
                  </FormField>
                  <FormField v-slot="$field" name="password" initialValue="" class="flex flex-col gap-1">
                    <InputGroup>
                      <InputGroupAddon>
                        <i class="pi pi-key"></i>
                      </InputGroupAddon>
                      <InputText v-model="password" type="text" placeholder="Пароль"/>
                    </InputGroup>
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                      {{ $field.error?.message }}
                    </Message>
                  </FormField>
                  <div class="flex flex-wrap gap-4">
                    <div class="flex items-center gap-2">
                      <RadioButton v-model="userType" inputId="athlete" name="pizza" value="athlete"/>
                      <label for="athlete">Атлет</label>
                    </div>
                    <div class="flex items-center gap-2">
                      <RadioButton v-model="userType" inputId="trainer" name="pizza" value="trainer"/>
                      <label for="trainer">Тренер</label>
                    </div>
                  </div>
                  <Button class="bt" type="submit" severity="primary" label="Создать аккаунт"/>
                </Form>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </template>
    </Card>
  </div>
</template>

<style scoped>

</style>