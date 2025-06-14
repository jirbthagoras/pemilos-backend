import mongoose, {ClientSession} from "mongoose";
/* 

And then this is the MongoDB Session system, I want to create a reusable function
that can be used by many of services later.

*/

export const execWithTransaction = async (
     // First, we define a parameter (which is a service that'll be executed inside)
     func: (session: ClientSession) => Promise<void>
) => {
     // Start a session first, session. Session represents a state where database are being the "slave"
     const session = await mongoose.startSession()
     try {
          // From session, start a Transaction. Giving a the session an "immortality"
          // withTransaction() wraps function with fault-tolerancy.
          // If the query or exec success, it will commits the transaction.
          // If there is something wrong, just rollback to previous state.
          return await session.withTransaction(async () => {
               return await func(session);
          });
     } catch (error) {
          throw error
     } finally {
          // Don't forget to end session! terpaksa make finally karena di TS ndak ada defer.
          session.endSession()
     }
}