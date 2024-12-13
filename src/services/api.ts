import { authRequest } from "@/config/baseUrl";

export default class ApiService {
  static fetchOpinion = async (id: any) => {
    const res = await authRequest.get(`/case/get-opinion/${id}/`);
    return res?.data?.data;
  };
}
