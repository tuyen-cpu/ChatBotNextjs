import axios from 'axios'
import ChatBotResponse from '@/model/ChatBotResponse'
import { handleError } from '@/utils/fn'


  const URL = process.env.API_URL
  const callChatBot = (message: string) => {
    const result  = axios.post(`${URL}/api/request`, { message: message })
    return result
  }

const ChatApiService = {callChatBot}
export default ChatApiService
