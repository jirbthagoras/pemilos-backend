import mongoose, {ClientSession} from "mongoose";

export const execWithTransaction = async(
     func: (session: ClientSession) => Promise<void>
) => {
     const session = await mongoose.startSession()
     try {
          await session.withTransaction(async () => {
               await func(session);
          });
     } finally {
          session.endSession()
     }
}