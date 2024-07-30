import {ApiUser} from "./api-user";

export interface ChatLine {
  "chatLineMessage": string,
  "chatLineSender": ApiUser,
  "chatLineTime": string
}
