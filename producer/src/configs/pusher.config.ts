import Pusher from "pusher"

export const getPusherClient = async () => {
     const pusher = new Pusher({
               appId: String(process.env.PUSHER_APPID),
               key: String(process.env.PUSHER_KEY),
               secret: String(process.env.PUSHER_SECRET),
               cluster: String(process.env.PUSHER_CLUSTER)
     })
     return pusher
}