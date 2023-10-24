import axios from "axios";
import { backendUrl } from "../constants/config";
import { SigninRequestDto } from "../redux/dto/auth";

export const signin = (dto: SigninRequestDto) =>
  axios.post(`${backendUrl}/auth/signin/`, dto);
