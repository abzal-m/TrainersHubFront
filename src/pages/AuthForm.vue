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
            <Tab class="w-6" value="0">Вход</Tab>
            <Tab class="w-6" value="1">Регистрация</Tab>
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
                      <InputText v-model="userName" type="text" placeholder="Почта"/>
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
                      <Password name="password" v-model="password" placeholder="Пароль" :feedback="false" fluid/>
                      <!--                      <InputText v-model="password" type="text" placeholder="Пароль"/>-->
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
                  <FormField v-slot="$field" name="userName" initialValue="" class="flex flex-col gap-1">
                    <InputGroup>
                      <InputGroupAddon>
                        <i class="pi pi-user-plus"></i>
                      </InputGroupAddon>
                      <InputText v-model="userName" type="text" placeholder="Полное имя"/>
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
                      <Password name="password" v-model="password" placeholder="Пароль" :feedback="false" fluid/>
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
<script setup lang="ts">
import { ref } from "vue";
import Card from "primevue/card";
import Button from "primevue/button";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { useToast } from "primevue/usetoast";
import { router } from "@/main";
import { Routes } from "@/model/router";
import { api } from "@/api/index";

const email = ref("");
const password = ref("");
const userName = ref("");
const userType = ref("athlete");
const toast = useToast();

const goDashboard = (role: 'Athlete' | 'Trainer') => {
  router.push({ name: role === 'Athlete' ? Routes.AthleteDashboard : Routes.CouchPage });
};

const resolver = zodResolver(
  z.object({
    email: z.string().min(1, { message: "Введите почту" }),
    password: z.string().min(1, { message: "Введите пароль" }),
    userName: z.string().min(1, { message: "Введите ваше полное имя" }),
  })
);

const onFormLogin = async ({ valid }: { valid: boolean }) => {
  if (!valid) return;
  try {
    const response = await api.login({ username: userName.value, password: password.value });
    localStorage.setItem("access_token", response.accessToken);
    toast.add({ severity: "success", summary: "Вы вошли в систему", life: 3000 });
    goDashboard(response.role);
  } catch {
    toast.add({ severity: "error", summary: "Ошибка входа", detail: "Неверный логин или пароль", life: 3000 });
  }
};

const onFormRegister = async ({ valid }: { valid: boolean }) => {
  if (!valid) return;
  try {
    const response = await api.register({
      username: userName.value,
      password: password.value,
      email: email.value,
      role: userType.value === "athlete" ? "Athlete" : "Trainer",
    });
    localStorage.setItem("access_token", response.accessToken);
    toast.add({ severity: "success", summary: "Вы успешно зарегистрировались", life: 3000 });
    goDashboard(response.role);
  } catch {
    toast.add({ severity: "error", summary: "Ошибка регистрации", detail: "Попробуйте снова", life: 3000 });
  }
};
</script>
<style scoped>

</style>
