import axios from "axios";

export const createInternalAxios = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  });
  return instance;
};
export const internalAxios = createInternalAxios();
export const api = {
  getStraveActivity: async () => {
    var result = await internalAxios.get("api/StravaActivity/GetLastActivity");
    return result.data
  },
  // updateBugStatus:async (data: BugsData) => {
  //     return await internalAxios.post('api/Tasks/UpdateBugs', data)
  // },
  // getTaskList:async () => {
  //     return await internalAxios.get('api/Tasks/GetAllTaskList')
  // },
  // updateTaskList:async (data: TasksData) => {
  //     return await internalAxios.post('api/Tasks/UpdateTasks', data)
  // },
  // getBugListById:async (data: string) => {
  //     return await internalAxios.get('api/Tasks/GetBugListById/' + data)
  // }
};
