import { MongoClient } from 'mongodb'

// extend global interface, ref: https://mariusschulz.com/blog/declaring-global-variables-in-typescript
declare global {
	var _mongoClientPromise: undefined | Promise<MongoClient>
}
