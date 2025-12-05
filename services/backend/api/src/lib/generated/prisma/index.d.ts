
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Source
 * 
 */
export type Source = $Result.DefaultSelection<Prisma.$SourcePayload>
/**
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>
/**
 * Model Chunk
 * 
 */
export type Chunk = $Result.DefaultSelection<Prisma.$ChunkPayload>
/**
 * Model Embedding
 * 
 */
export type Embedding = $Result.DefaultSelection<Prisma.$EmbeddingPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model Reminder
 * 
 */
export type Reminder = $Result.DefaultSelection<Prisma.$ReminderPayload>
/**
 * Model QueryLog
 * 
 */
export type QueryLog = $Result.DefaultSelection<Prisma.$QueryLogPayload>
/**
 * Model OAuthToken
 * 
 */
export type OAuthToken = $Result.DefaultSelection<Prisma.$OAuthTokenPayload>
/**
 * Model FileUpload
 * 
 */
export type FileUpload = $Result.DefaultSelection<Prisma.$FileUploadPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.source`: Exposes CRUD operations for the **Source** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sources
    * const sources = await prisma.source.findMany()
    * ```
    */
  get source(): Prisma.SourceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chunk`: Exposes CRUD operations for the **Chunk** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Chunks
    * const chunks = await prisma.chunk.findMany()
    * ```
    */
  get chunk(): Prisma.ChunkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.embedding`: Exposes CRUD operations for the **Embedding** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Embeddings
    * const embeddings = await prisma.embedding.findMany()
    * ```
    */
  get embedding(): Prisma.EmbeddingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reminder`: Exposes CRUD operations for the **Reminder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reminders
    * const reminders = await prisma.reminder.findMany()
    * ```
    */
  get reminder(): Prisma.ReminderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.queryLog`: Exposes CRUD operations for the **QueryLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QueryLogs
    * const queryLogs = await prisma.queryLog.findMany()
    * ```
    */
  get queryLog(): Prisma.QueryLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oAuthToken`: Exposes CRUD operations for the **OAuthToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OAuthTokens
    * const oAuthTokens = await prisma.oAuthToken.findMany()
    * ```
    */
  get oAuthToken(): Prisma.OAuthTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fileUpload`: Exposes CRUD operations for the **FileUpload** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FileUploads
    * const fileUploads = await prisma.fileUpload.findMany()
    * ```
    */
  get fileUpload(): Prisma.FileUploadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.1.0
   * Query Engine version: ab635e6b9d606fa5c8fb8b1a7f909c3c3c1c98ba
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Source: 'Source',
    Document: 'Document',
    Chunk: 'Chunk',
    Embedding: 'Embedding',
    Task: 'Task',
    Reminder: 'Reminder',
    QueryLog: 'QueryLog',
    OAuthToken: 'OAuthToken',
    FileUpload: 'FileUpload',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "source" | "document" | "chunk" | "embedding" | "task" | "reminder" | "queryLog" | "oAuthToken" | "fileUpload" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Source: {
        payload: Prisma.$SourcePayload<ExtArgs>
        fields: Prisma.SourceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SourceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SourceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          findFirst: {
            args: Prisma.SourceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SourceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          findMany: {
            args: Prisma.SourceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>[]
          }
          create: {
            args: Prisma.SourceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          createMany: {
            args: Prisma.SourceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SourceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>[]
          }
          delete: {
            args: Prisma.SourceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          update: {
            args: Prisma.SourceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          deleteMany: {
            args: Prisma.SourceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SourceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SourceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>[]
          }
          upsert: {
            args: Prisma.SourceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          aggregate: {
            args: Prisma.SourceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSource>
          }
          groupBy: {
            args: Prisma.SourceGroupByArgs<ExtArgs>
            result: $Utils.Optional<SourceGroupByOutputType>[]
          }
          count: {
            args: Prisma.SourceCountArgs<ExtArgs>
            result: $Utils.Optional<SourceCountAggregateOutputType> | number
          }
        }
      }
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
      Chunk: {
        payload: Prisma.$ChunkPayload<ExtArgs>
        fields: Prisma.ChunkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChunkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChunkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChunkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChunkPayload>
          }
          findFirst: {
            args: Prisma.ChunkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChunkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChunkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChunkPayload>
          }
          findMany: {
            args: Prisma.ChunkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChunkPayload>[]
          }
          create: {
            args: Prisma.ChunkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChunkPayload>
          }
          createMany: {
            args: Prisma.ChunkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChunkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChunkPayload>[]
          }
          delete: {
            args: Prisma.ChunkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChunkPayload>
          }
          update: {
            args: Prisma.ChunkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChunkPayload>
          }
          deleteMany: {
            args: Prisma.ChunkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChunkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChunkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChunkPayload>[]
          }
          upsert: {
            args: Prisma.ChunkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChunkPayload>
          }
          aggregate: {
            args: Prisma.ChunkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChunk>
          }
          groupBy: {
            args: Prisma.ChunkGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChunkGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChunkCountArgs<ExtArgs>
            result: $Utils.Optional<ChunkCountAggregateOutputType> | number
          }
        }
      }
      Embedding: {
        payload: Prisma.$EmbeddingPayload<ExtArgs>
        fields: Prisma.EmbeddingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmbeddingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmbeddingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingPayload>
          }
          findFirst: {
            args: Prisma.EmbeddingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmbeddingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingPayload>
          }
          findMany: {
            args: Prisma.EmbeddingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingPayload>[]
          }
          create: {
            args: Prisma.EmbeddingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingPayload>
          }
          createMany: {
            args: Prisma.EmbeddingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmbeddingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingPayload>[]
          }
          delete: {
            args: Prisma.EmbeddingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingPayload>
          }
          update: {
            args: Prisma.EmbeddingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingPayload>
          }
          deleteMany: {
            args: Prisma.EmbeddingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmbeddingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmbeddingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingPayload>[]
          }
          upsert: {
            args: Prisma.EmbeddingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingPayload>
          }
          aggregate: {
            args: Prisma.EmbeddingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmbedding>
          }
          groupBy: {
            args: Prisma.EmbeddingGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmbeddingGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmbeddingCountArgs<ExtArgs>
            result: $Utils.Optional<EmbeddingCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      Reminder: {
        payload: Prisma.$ReminderPayload<ExtArgs>
        fields: Prisma.ReminderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReminderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReminderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          findFirst: {
            args: Prisma.ReminderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReminderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          findMany: {
            args: Prisma.ReminderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>[]
          }
          create: {
            args: Prisma.ReminderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          createMany: {
            args: Prisma.ReminderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReminderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>[]
          }
          delete: {
            args: Prisma.ReminderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          update: {
            args: Prisma.ReminderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          deleteMany: {
            args: Prisma.ReminderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReminderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReminderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>[]
          }
          upsert: {
            args: Prisma.ReminderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReminderPayload>
          }
          aggregate: {
            args: Prisma.ReminderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReminder>
          }
          groupBy: {
            args: Prisma.ReminderGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReminderGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReminderCountArgs<ExtArgs>
            result: $Utils.Optional<ReminderCountAggregateOutputType> | number
          }
        }
      }
      QueryLog: {
        payload: Prisma.$QueryLogPayload<ExtArgs>
        fields: Prisma.QueryLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QueryLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QueryLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryLogPayload>
          }
          findFirst: {
            args: Prisma.QueryLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QueryLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryLogPayload>
          }
          findMany: {
            args: Prisma.QueryLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryLogPayload>[]
          }
          create: {
            args: Prisma.QueryLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryLogPayload>
          }
          createMany: {
            args: Prisma.QueryLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QueryLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryLogPayload>[]
          }
          delete: {
            args: Prisma.QueryLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryLogPayload>
          }
          update: {
            args: Prisma.QueryLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryLogPayload>
          }
          deleteMany: {
            args: Prisma.QueryLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QueryLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QueryLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryLogPayload>[]
          }
          upsert: {
            args: Prisma.QueryLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueryLogPayload>
          }
          aggregate: {
            args: Prisma.QueryLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQueryLog>
          }
          groupBy: {
            args: Prisma.QueryLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<QueryLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.QueryLogCountArgs<ExtArgs>
            result: $Utils.Optional<QueryLogCountAggregateOutputType> | number
          }
        }
      }
      OAuthToken: {
        payload: Prisma.$OAuthTokenPayload<ExtArgs>
        fields: Prisma.OAuthTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OAuthTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OAuthTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          findFirst: {
            args: Prisma.OAuthTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OAuthTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          findMany: {
            args: Prisma.OAuthTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>[]
          }
          create: {
            args: Prisma.OAuthTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          createMany: {
            args: Prisma.OAuthTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OAuthTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>[]
          }
          delete: {
            args: Prisma.OAuthTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          update: {
            args: Prisma.OAuthTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          deleteMany: {
            args: Prisma.OAuthTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OAuthTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OAuthTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>[]
          }
          upsert: {
            args: Prisma.OAuthTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          aggregate: {
            args: Prisma.OAuthTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOAuthToken>
          }
          groupBy: {
            args: Prisma.OAuthTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<OAuthTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.OAuthTokenCountArgs<ExtArgs>
            result: $Utils.Optional<OAuthTokenCountAggregateOutputType> | number
          }
        }
      }
      FileUpload: {
        payload: Prisma.$FileUploadPayload<ExtArgs>
        fields: Prisma.FileUploadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FileUploadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileUploadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FileUploadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileUploadPayload>
          }
          findFirst: {
            args: Prisma.FileUploadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileUploadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FileUploadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileUploadPayload>
          }
          findMany: {
            args: Prisma.FileUploadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileUploadPayload>[]
          }
          create: {
            args: Prisma.FileUploadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileUploadPayload>
          }
          createMany: {
            args: Prisma.FileUploadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FileUploadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileUploadPayload>[]
          }
          delete: {
            args: Prisma.FileUploadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileUploadPayload>
          }
          update: {
            args: Prisma.FileUploadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileUploadPayload>
          }
          deleteMany: {
            args: Prisma.FileUploadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FileUploadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FileUploadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileUploadPayload>[]
          }
          upsert: {
            args: Prisma.FileUploadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileUploadPayload>
          }
          aggregate: {
            args: Prisma.FileUploadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFileUpload>
          }
          groupBy: {
            args: Prisma.FileUploadGroupByArgs<ExtArgs>
            result: $Utils.Optional<FileUploadGroupByOutputType>[]
          }
          count: {
            args: Prisma.FileUploadCountArgs<ExtArgs>
            result: $Utils.Optional<FileUploadCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    source?: SourceOmit
    document?: DocumentOmit
    chunk?: ChunkOmit
    embedding?: EmbeddingOmit
    task?: TaskOmit
    reminder?: ReminderOmit
    queryLog?: QueryLogOmit
    oAuthToken?: OAuthTokenOmit
    fileUpload?: FileUploadOmit
    auditLog?: AuditLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sources: number
    documents: number
    tasks: number
    reminders: number
    queries: number
    oauthTokens: number
    audits: number
    fileUploads: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sources?: boolean | UserCountOutputTypeCountSourcesArgs
    documents?: boolean | UserCountOutputTypeCountDocumentsArgs
    tasks?: boolean | UserCountOutputTypeCountTasksArgs
    reminders?: boolean | UserCountOutputTypeCountRemindersArgs
    queries?: boolean | UserCountOutputTypeCountQueriesArgs
    oauthTokens?: boolean | UserCountOutputTypeCountOauthTokensArgs
    audits?: boolean | UserCountOutputTypeCountAuditsArgs
    fileUploads?: boolean | UserCountOutputTypeCountFileUploadsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSourcesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SourceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRemindersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReminderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountQueriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QueryLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOauthTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFileUploadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileUploadWhereInput
  }


  /**
   * Count Type SourceCountOutputType
   */

  export type SourceCountOutputType = {
    documents: number
    oauthTokens: number
  }

  export type SourceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | SourceCountOutputTypeCountDocumentsArgs
    oauthTokens?: boolean | SourceCountOutputTypeCountOauthTokensArgs
  }

  // Custom InputTypes
  /**
   * SourceCountOutputType without action
   */
  export type SourceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceCountOutputType
     */
    select?: SourceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SourceCountOutputType without action
   */
  export type SourceCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }

  /**
   * SourceCountOutputType without action
   */
  export type SourceCountOutputTypeCountOauthTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthTokenWhereInput
  }


  /**
   * Count Type DocumentCountOutputType
   */

  export type DocumentCountOutputType = {
    chunks: number
  }

  export type DocumentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chunks?: boolean | DocumentCountOutputTypeCountChunksArgs
  }

  // Custom InputTypes
  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentCountOutputType
     */
    select?: DocumentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountChunksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChunkWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    displayName: string | null
    imageUrl: string | null
    timezone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    displayName: string | null
    imageUrl: string | null
    timezone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    displayName: number
    imageUrl: number
    timezone: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    displayName?: true
    imageUrl?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    displayName?: true
    imageUrl?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    displayName?: true
    imageUrl?: true
    timezone?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    password: string
    displayName: string | null
    imageUrl: string | null
    timezone: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    displayName?: boolean
    imageUrl?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sources?: boolean | User$sourcesArgs<ExtArgs>
    documents?: boolean | User$documentsArgs<ExtArgs>
    tasks?: boolean | User$tasksArgs<ExtArgs>
    reminders?: boolean | User$remindersArgs<ExtArgs>
    queries?: boolean | User$queriesArgs<ExtArgs>
    oauthTokens?: boolean | User$oauthTokensArgs<ExtArgs>
    audits?: boolean | User$auditsArgs<ExtArgs>
    fileUploads?: boolean | User$fileUploadsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    displayName?: boolean
    imageUrl?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    displayName?: boolean
    imageUrl?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    displayName?: boolean
    imageUrl?: boolean
    timezone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "displayName" | "imageUrl" | "timezone" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sources?: boolean | User$sourcesArgs<ExtArgs>
    documents?: boolean | User$documentsArgs<ExtArgs>
    tasks?: boolean | User$tasksArgs<ExtArgs>
    reminders?: boolean | User$remindersArgs<ExtArgs>
    queries?: boolean | User$queriesArgs<ExtArgs>
    oauthTokens?: boolean | User$oauthTokensArgs<ExtArgs>
    audits?: boolean | User$auditsArgs<ExtArgs>
    fileUploads?: boolean | User$fileUploadsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sources: Prisma.$SourcePayload<ExtArgs>[]
      documents: Prisma.$DocumentPayload<ExtArgs>[]
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      reminders: Prisma.$ReminderPayload<ExtArgs>[]
      queries: Prisma.$QueryLogPayload<ExtArgs>[]
      oauthTokens: Prisma.$OAuthTokenPayload<ExtArgs>[]
      audits: Prisma.$AuditLogPayload<ExtArgs>[]
      fileUploads: Prisma.$FileUploadPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      displayName: string | null
      imageUrl: string | null
      timezone: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sources<T extends User$sourcesArgs<ExtArgs> = {}>(args?: Subset<T, User$sourcesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documents<T extends User$documentsArgs<ExtArgs> = {}>(args?: Subset<T, User$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasks<T extends User$tasksArgs<ExtArgs> = {}>(args?: Subset<T, User$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reminders<T extends User$remindersArgs<ExtArgs> = {}>(args?: Subset<T, User$remindersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    queries<T extends User$queriesArgs<ExtArgs> = {}>(args?: Subset<T, User$queriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueryLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    oauthTokens<T extends User$oauthTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$oauthTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    audits<T extends User$auditsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    fileUploads<T extends User$fileUploadsArgs<ExtArgs> = {}>(args?: Subset<T, User$fileUploadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FileUploadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly displayName: FieldRef<"User", 'String'>
    readonly imageUrl: FieldRef<"User", 'String'>
    readonly timezone: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.sources
   */
  export type User$sourcesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    where?: SourceWhereInput
    orderBy?: SourceOrderByWithRelationInput | SourceOrderByWithRelationInput[]
    cursor?: SourceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SourceScalarFieldEnum | SourceScalarFieldEnum[]
  }

  /**
   * User.documents
   */
  export type User$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * User.tasks
   */
  export type User$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * User.reminders
   */
  export type User$remindersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    where?: ReminderWhereInput
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    cursor?: ReminderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReminderScalarFieldEnum | ReminderScalarFieldEnum[]
  }

  /**
   * User.queries
   */
  export type User$queriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryLog
     */
    select?: QueryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueryLog
     */
    omit?: QueryLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryLogInclude<ExtArgs> | null
    where?: QueryLogWhereInput
    orderBy?: QueryLogOrderByWithRelationInput | QueryLogOrderByWithRelationInput[]
    cursor?: QueryLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QueryLogScalarFieldEnum | QueryLogScalarFieldEnum[]
  }

  /**
   * User.oauthTokens
   */
  export type User$oauthTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    where?: OAuthTokenWhereInput
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    cursor?: OAuthTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OAuthTokenScalarFieldEnum | OAuthTokenScalarFieldEnum[]
  }

  /**
   * User.audits
   */
  export type User$auditsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User.fileUploads
   */
  export type User$fileUploadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadInclude<ExtArgs> | null
    where?: FileUploadWhereInput
    orderBy?: FileUploadOrderByWithRelationInput | FileUploadOrderByWithRelationInput[]
    cursor?: FileUploadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FileUploadScalarFieldEnum | FileUploadScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Source
   */

  export type AggregateSource = {
    _count: SourceCountAggregateOutputType | null
    _avg: SourceAvgAggregateOutputType | null
    _sum: SourceSumAggregateOutputType | null
    _min: SourceMinAggregateOutputType | null
    _max: SourceMaxAggregateOutputType | null
  }

  export type SourceAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type SourceSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type SourceMinAggregateOutputType = {
    id: number | null
    userId: number | null
    provider: string | null
    providerId: string | null
    displayName: string | null
    encryptedToken: string | null
    connectedAt: Date | null
    createdAt: Date | null
  }

  export type SourceMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    provider: string | null
    providerId: string | null
    displayName: string | null
    encryptedToken: string | null
    connectedAt: Date | null
    createdAt: Date | null
  }

  export type SourceCountAggregateOutputType = {
    id: number
    userId: number
    provider: number
    providerId: number
    displayName: number
    config: number
    encryptedToken: number
    connectedAt: number
    createdAt: number
    _all: number
  }


  export type SourceAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type SourceSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type SourceMinAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerId?: true
    displayName?: true
    encryptedToken?: true
    connectedAt?: true
    createdAt?: true
  }

  export type SourceMaxAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerId?: true
    displayName?: true
    encryptedToken?: true
    connectedAt?: true
    createdAt?: true
  }

  export type SourceCountAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    providerId?: true
    displayName?: true
    config?: true
    encryptedToken?: true
    connectedAt?: true
    createdAt?: true
    _all?: true
  }

  export type SourceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Source to aggregate.
     */
    where?: SourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sources to fetch.
     */
    orderBy?: SourceOrderByWithRelationInput | SourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sources
    **/
    _count?: true | SourceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SourceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SourceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SourceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SourceMaxAggregateInputType
  }

  export type GetSourceAggregateType<T extends SourceAggregateArgs> = {
        [P in keyof T & keyof AggregateSource]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSource[P]>
      : GetScalarType<T[P], AggregateSource[P]>
  }




  export type SourceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SourceWhereInput
    orderBy?: SourceOrderByWithAggregationInput | SourceOrderByWithAggregationInput[]
    by: SourceScalarFieldEnum[] | SourceScalarFieldEnum
    having?: SourceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SourceCountAggregateInputType | true
    _avg?: SourceAvgAggregateInputType
    _sum?: SourceSumAggregateInputType
    _min?: SourceMinAggregateInputType
    _max?: SourceMaxAggregateInputType
  }

  export type SourceGroupByOutputType = {
    id: number
    userId: number
    provider: string
    providerId: string | null
    displayName: string | null
    config: JsonValue | null
    encryptedToken: string | null
    connectedAt: Date | null
    createdAt: Date
    _count: SourceCountAggregateOutputType | null
    _avg: SourceAvgAggregateOutputType | null
    _sum: SourceSumAggregateOutputType | null
    _min: SourceMinAggregateOutputType | null
    _max: SourceMaxAggregateOutputType | null
  }

  type GetSourceGroupByPayload<T extends SourceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SourceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SourceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SourceGroupByOutputType[P]>
            : GetScalarType<T[P], SourceGroupByOutputType[P]>
        }
      >
    >


  export type SourceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerId?: boolean
    displayName?: boolean
    config?: boolean
    encryptedToken?: boolean
    connectedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    documents?: boolean | Source$documentsArgs<ExtArgs>
    oauthTokens?: boolean | Source$oauthTokensArgs<ExtArgs>
    _count?: boolean | SourceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["source"]>

  export type SourceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerId?: boolean
    displayName?: boolean
    config?: boolean
    encryptedToken?: boolean
    connectedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["source"]>

  export type SourceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerId?: boolean
    displayName?: boolean
    config?: boolean
    encryptedToken?: boolean
    connectedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["source"]>

  export type SourceSelectScalar = {
    id?: boolean
    userId?: boolean
    provider?: boolean
    providerId?: boolean
    displayName?: boolean
    config?: boolean
    encryptedToken?: boolean
    connectedAt?: boolean
    createdAt?: boolean
  }

  export type SourceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "provider" | "providerId" | "displayName" | "config" | "encryptedToken" | "connectedAt" | "createdAt", ExtArgs["result"]["source"]>
  export type SourceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    documents?: boolean | Source$documentsArgs<ExtArgs>
    oauthTokens?: boolean | Source$oauthTokensArgs<ExtArgs>
    _count?: boolean | SourceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SourceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SourceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SourcePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Source"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      documents: Prisma.$DocumentPayload<ExtArgs>[]
      oauthTokens: Prisma.$OAuthTokenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      provider: string
      providerId: string | null
      displayName: string | null
      config: Prisma.JsonValue | null
      encryptedToken: string | null
      connectedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["source"]>
    composites: {}
  }

  type SourceGetPayload<S extends boolean | null | undefined | SourceDefaultArgs> = $Result.GetResult<Prisma.$SourcePayload, S>

  type SourceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SourceCountAggregateInputType | true
    }

  export interface SourceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Source'], meta: { name: 'Source' } }
    /**
     * Find zero or one Source that matches the filter.
     * @param {SourceFindUniqueArgs} args - Arguments to find a Source
     * @example
     * // Get one Source
     * const source = await prisma.source.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SourceFindUniqueArgs>(args: SelectSubset<T, SourceFindUniqueArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Source that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SourceFindUniqueOrThrowArgs} args - Arguments to find a Source
     * @example
     * // Get one Source
     * const source = await prisma.source.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SourceFindUniqueOrThrowArgs>(args: SelectSubset<T, SourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Source that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceFindFirstArgs} args - Arguments to find a Source
     * @example
     * // Get one Source
     * const source = await prisma.source.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SourceFindFirstArgs>(args?: SelectSubset<T, SourceFindFirstArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Source that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceFindFirstOrThrowArgs} args - Arguments to find a Source
     * @example
     * // Get one Source
     * const source = await prisma.source.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SourceFindFirstOrThrowArgs>(args?: SelectSubset<T, SourceFindFirstOrThrowArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sources
     * const sources = await prisma.source.findMany()
     * 
     * // Get first 10 Sources
     * const sources = await prisma.source.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sourceWithIdOnly = await prisma.source.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SourceFindManyArgs>(args?: SelectSubset<T, SourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Source.
     * @param {SourceCreateArgs} args - Arguments to create a Source.
     * @example
     * // Create one Source
     * const Source = await prisma.source.create({
     *   data: {
     *     // ... data to create a Source
     *   }
     * })
     * 
     */
    create<T extends SourceCreateArgs>(args: SelectSubset<T, SourceCreateArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sources.
     * @param {SourceCreateManyArgs} args - Arguments to create many Sources.
     * @example
     * // Create many Sources
     * const source = await prisma.source.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SourceCreateManyArgs>(args?: SelectSubset<T, SourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sources and returns the data saved in the database.
     * @param {SourceCreateManyAndReturnArgs} args - Arguments to create many Sources.
     * @example
     * // Create many Sources
     * const source = await prisma.source.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sources and only return the `id`
     * const sourceWithIdOnly = await prisma.source.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SourceCreateManyAndReturnArgs>(args?: SelectSubset<T, SourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Source.
     * @param {SourceDeleteArgs} args - Arguments to delete one Source.
     * @example
     * // Delete one Source
     * const Source = await prisma.source.delete({
     *   where: {
     *     // ... filter to delete one Source
     *   }
     * })
     * 
     */
    delete<T extends SourceDeleteArgs>(args: SelectSubset<T, SourceDeleteArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Source.
     * @param {SourceUpdateArgs} args - Arguments to update one Source.
     * @example
     * // Update one Source
     * const source = await prisma.source.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SourceUpdateArgs>(args: SelectSubset<T, SourceUpdateArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sources.
     * @param {SourceDeleteManyArgs} args - Arguments to filter Sources to delete.
     * @example
     * // Delete a few Sources
     * const { count } = await prisma.source.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SourceDeleteManyArgs>(args?: SelectSubset<T, SourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sources
     * const source = await prisma.source.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SourceUpdateManyArgs>(args: SelectSubset<T, SourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sources and returns the data updated in the database.
     * @param {SourceUpdateManyAndReturnArgs} args - Arguments to update many Sources.
     * @example
     * // Update many Sources
     * const source = await prisma.source.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sources and only return the `id`
     * const sourceWithIdOnly = await prisma.source.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SourceUpdateManyAndReturnArgs>(args: SelectSubset<T, SourceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Source.
     * @param {SourceUpsertArgs} args - Arguments to update or create a Source.
     * @example
     * // Update or create a Source
     * const source = await prisma.source.upsert({
     *   create: {
     *     // ... data to create a Source
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Source we want to update
     *   }
     * })
     */
    upsert<T extends SourceUpsertArgs>(args: SelectSubset<T, SourceUpsertArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceCountArgs} args - Arguments to filter Sources to count.
     * @example
     * // Count the number of Sources
     * const count = await prisma.source.count({
     *   where: {
     *     // ... the filter for the Sources we want to count
     *   }
     * })
    **/
    count<T extends SourceCountArgs>(
      args?: Subset<T, SourceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SourceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Source.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SourceAggregateArgs>(args: Subset<T, SourceAggregateArgs>): Prisma.PrismaPromise<GetSourceAggregateType<T>>

    /**
     * Group by Source.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SourceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SourceGroupByArgs['orderBy'] }
        : { orderBy?: SourceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Source model
   */
  readonly fields: SourceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Source.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SourceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    documents<T extends Source$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Source$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    oauthTokens<T extends Source$oauthTokensArgs<ExtArgs> = {}>(args?: Subset<T, Source$oauthTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Source model
   */
  interface SourceFieldRefs {
    readonly id: FieldRef<"Source", 'Int'>
    readonly userId: FieldRef<"Source", 'Int'>
    readonly provider: FieldRef<"Source", 'String'>
    readonly providerId: FieldRef<"Source", 'String'>
    readonly displayName: FieldRef<"Source", 'String'>
    readonly config: FieldRef<"Source", 'Json'>
    readonly encryptedToken: FieldRef<"Source", 'String'>
    readonly connectedAt: FieldRef<"Source", 'DateTime'>
    readonly createdAt: FieldRef<"Source", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Source findUnique
   */
  export type SourceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * Filter, which Source to fetch.
     */
    where: SourceWhereUniqueInput
  }

  /**
   * Source findUniqueOrThrow
   */
  export type SourceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * Filter, which Source to fetch.
     */
    where: SourceWhereUniqueInput
  }

  /**
   * Source findFirst
   */
  export type SourceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * Filter, which Source to fetch.
     */
    where?: SourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sources to fetch.
     */
    orderBy?: SourceOrderByWithRelationInput | SourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sources.
     */
    cursor?: SourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sources.
     */
    distinct?: SourceScalarFieldEnum | SourceScalarFieldEnum[]
  }

  /**
   * Source findFirstOrThrow
   */
  export type SourceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * Filter, which Source to fetch.
     */
    where?: SourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sources to fetch.
     */
    orderBy?: SourceOrderByWithRelationInput | SourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sources.
     */
    cursor?: SourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sources.
     */
    distinct?: SourceScalarFieldEnum | SourceScalarFieldEnum[]
  }

  /**
   * Source findMany
   */
  export type SourceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * Filter, which Sources to fetch.
     */
    where?: SourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sources to fetch.
     */
    orderBy?: SourceOrderByWithRelationInput | SourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sources.
     */
    cursor?: SourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sources.
     */
    skip?: number
    distinct?: SourceScalarFieldEnum | SourceScalarFieldEnum[]
  }

  /**
   * Source create
   */
  export type SourceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * The data needed to create a Source.
     */
    data: XOR<SourceCreateInput, SourceUncheckedCreateInput>
  }

  /**
   * Source createMany
   */
  export type SourceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sources.
     */
    data: SourceCreateManyInput | SourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Source createManyAndReturn
   */
  export type SourceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * The data used to create many Sources.
     */
    data: SourceCreateManyInput | SourceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Source update
   */
  export type SourceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * The data needed to update a Source.
     */
    data: XOR<SourceUpdateInput, SourceUncheckedUpdateInput>
    /**
     * Choose, which Source to update.
     */
    where: SourceWhereUniqueInput
  }

  /**
   * Source updateMany
   */
  export type SourceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sources.
     */
    data: XOR<SourceUpdateManyMutationInput, SourceUncheckedUpdateManyInput>
    /**
     * Filter which Sources to update
     */
    where?: SourceWhereInput
    /**
     * Limit how many Sources to update.
     */
    limit?: number
  }

  /**
   * Source updateManyAndReturn
   */
  export type SourceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * The data used to update Sources.
     */
    data: XOR<SourceUpdateManyMutationInput, SourceUncheckedUpdateManyInput>
    /**
     * Filter which Sources to update
     */
    where?: SourceWhereInput
    /**
     * Limit how many Sources to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Source upsert
   */
  export type SourceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * The filter to search for the Source to update in case it exists.
     */
    where: SourceWhereUniqueInput
    /**
     * In case the Source found by the `where` argument doesn't exist, create a new Source with this data.
     */
    create: XOR<SourceCreateInput, SourceUncheckedCreateInput>
    /**
     * In case the Source was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SourceUpdateInput, SourceUncheckedUpdateInput>
  }

  /**
   * Source delete
   */
  export type SourceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * Filter which Source to delete.
     */
    where: SourceWhereUniqueInput
  }

  /**
   * Source deleteMany
   */
  export type SourceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sources to delete
     */
    where?: SourceWhereInput
    /**
     * Limit how many Sources to delete.
     */
    limit?: number
  }

  /**
   * Source.documents
   */
  export type Source$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Source.oauthTokens
   */
  export type Source$oauthTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    where?: OAuthTokenWhereInput
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    cursor?: OAuthTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OAuthTokenScalarFieldEnum | OAuthTokenScalarFieldEnum[]
  }

  /**
   * Source without action
   */
  export type SourceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
  }


  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    sourceId: number | null
    size: number | null
  }

  export type DocumentSumAggregateOutputType = {
    id: number | null
    userId: number | null
    sourceId: number | null
    size: number | null
  }

  export type DocumentMinAggregateOutputType = {
    id: number | null
    userId: number | null
    sourceId: number | null
    title: string | null
    docType: string | null
    s3Path: string | null
    size: number | null
    language: string | null
    hash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    sourceId: number | null
    title: string | null
    docType: string | null
    s3Path: string | null
    size: number | null
    language: string | null
    hash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    userId: number
    sourceId: number
    title: number
    docType: number
    s3Path: number
    size: number
    language: number
    hash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DocumentAvgAggregateInputType = {
    id?: true
    userId?: true
    sourceId?: true
    size?: true
  }

  export type DocumentSumAggregateInputType = {
    id?: true
    userId?: true
    sourceId?: true
    size?: true
  }

  export type DocumentMinAggregateInputType = {
    id?: true
    userId?: true
    sourceId?: true
    title?: true
    docType?: true
    s3Path?: true
    size?: true
    language?: true
    hash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    userId?: true
    sourceId?: true
    title?: true
    docType?: true
    s3Path?: true
    size?: true
    language?: true
    hash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    userId?: true
    sourceId?: true
    title?: true
    docType?: true
    s3Path?: true
    size?: true
    language?: true
    hash?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _avg?: DocumentAvgAggregateInputType
    _sum?: DocumentSumAggregateInputType
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: number
    userId: number
    sourceId: number | null
    title: string
    docType: string
    s3Path: string
    size: number | null
    language: string | null
    hash: string | null
    createdAt: Date
    updatedAt: Date
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sourceId?: boolean
    title?: boolean
    docType?: boolean
    s3Path?: boolean
    size?: boolean
    language?: boolean
    hash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    chunks?: boolean | Document$chunksArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    source?: boolean | Document$sourceArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sourceId?: boolean
    title?: boolean
    docType?: boolean
    s3Path?: boolean
    size?: boolean
    language?: boolean
    hash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    source?: boolean | Document$sourceArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sourceId?: boolean
    title?: boolean
    docType?: boolean
    s3Path?: boolean
    size?: boolean
    language?: boolean
    hash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    source?: boolean | Document$sourceArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectScalar = {
    id?: boolean
    userId?: boolean
    sourceId?: boolean
    title?: boolean
    docType?: boolean
    s3Path?: boolean
    size?: boolean
    language?: boolean
    hash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "sourceId" | "title" | "docType" | "s3Path" | "size" | "language" | "hash" | "createdAt" | "updatedAt", ExtArgs["result"]["document"]>
  export type DocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chunks?: boolean | Document$chunksArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    source?: boolean | Document$sourceArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    source?: boolean | Document$sourceArgs<ExtArgs>
  }
  export type DocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    source?: boolean | Document$sourceArgs<ExtArgs>
  }

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {
      chunks: Prisma.$ChunkPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
      source: Prisma.$SourcePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      sourceId: number | null
      title: string
      docType: string
      s3Path: string
      size: number | null
      language: string | null
      hash: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents and returns the data updated in the database.
     * @param {DocumentUpdateManyAndReturnArgs} args - Arguments to update many Documents.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chunks<T extends Document$chunksArgs<ExtArgs> = {}>(args?: Subset<T, Document$chunksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChunkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    source<T extends Document$sourceArgs<ExtArgs> = {}>(args?: Subset<T, Document$sourceArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Document model
   */
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'Int'>
    readonly userId: FieldRef<"Document", 'Int'>
    readonly sourceId: FieldRef<"Document", 'Int'>
    readonly title: FieldRef<"Document", 'String'>
    readonly docType: FieldRef<"Document", 'String'>
    readonly s3Path: FieldRef<"Document", 'String'>
    readonly size: FieldRef<"Document", 'Int'>
    readonly language: FieldRef<"Document", 'String'>
    readonly hash: FieldRef<"Document", 'String'>
    readonly createdAt: FieldRef<"Document", 'DateTime'>
    readonly updatedAt: FieldRef<"Document", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
  }

  /**
   * Document updateManyAndReturn
   */
  export type DocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to delete.
     */
    limit?: number
  }

  /**
   * Document.chunks
   */
  export type Document$chunksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chunk
     */
    select?: ChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chunk
     */
    omit?: ChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChunkInclude<ExtArgs> | null
    where?: ChunkWhereInput
    orderBy?: ChunkOrderByWithRelationInput | ChunkOrderByWithRelationInput[]
    cursor?: ChunkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChunkScalarFieldEnum | ChunkScalarFieldEnum[]
  }

  /**
   * Document.source
   */
  export type Document$sourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    where?: SourceWhereInput
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
  }


  /**
   * Model Chunk
   */

  export type AggregateChunk = {
    _count: ChunkCountAggregateOutputType | null
    _avg: ChunkAvgAggregateOutputType | null
    _sum: ChunkSumAggregateOutputType | null
    _min: ChunkMinAggregateOutputType | null
    _max: ChunkMaxAggregateOutputType | null
  }

  export type ChunkAvgAggregateOutputType = {
    id: number | null
    documentId: number | null
    userId: number | null
    startPos: number | null
    endPos: number | null
    tokenCount: number | null
    embeddingId: number | null
  }

  export type ChunkSumAggregateOutputType = {
    id: number | null
    documentId: number | null
    userId: number | null
    startPos: number | null
    endPos: number | null
    tokenCount: number | null
    embeddingId: number | null
  }

  export type ChunkMinAggregateOutputType = {
    id: number | null
    documentId: number | null
    userId: number | null
    text: string | null
    chunkHash: string | null
    startPos: number | null
    endPos: number | null
    tokenCount: number | null
    embeddingId: number | null
    createdAt: Date | null
  }

  export type ChunkMaxAggregateOutputType = {
    id: number | null
    documentId: number | null
    userId: number | null
    text: string | null
    chunkHash: string | null
    startPos: number | null
    endPos: number | null
    tokenCount: number | null
    embeddingId: number | null
    createdAt: Date | null
  }

  export type ChunkCountAggregateOutputType = {
    id: number
    documentId: number
    userId: number
    text: number
    chunkHash: number
    startPos: number
    endPos: number
    tokenCount: number
    embeddingId: number
    createdAt: number
    _all: number
  }


  export type ChunkAvgAggregateInputType = {
    id?: true
    documentId?: true
    userId?: true
    startPos?: true
    endPos?: true
    tokenCount?: true
    embeddingId?: true
  }

  export type ChunkSumAggregateInputType = {
    id?: true
    documentId?: true
    userId?: true
    startPos?: true
    endPos?: true
    tokenCount?: true
    embeddingId?: true
  }

  export type ChunkMinAggregateInputType = {
    id?: true
    documentId?: true
    userId?: true
    text?: true
    chunkHash?: true
    startPos?: true
    endPos?: true
    tokenCount?: true
    embeddingId?: true
    createdAt?: true
  }

  export type ChunkMaxAggregateInputType = {
    id?: true
    documentId?: true
    userId?: true
    text?: true
    chunkHash?: true
    startPos?: true
    endPos?: true
    tokenCount?: true
    embeddingId?: true
    createdAt?: true
  }

  export type ChunkCountAggregateInputType = {
    id?: true
    documentId?: true
    userId?: true
    text?: true
    chunkHash?: true
    startPos?: true
    endPos?: true
    tokenCount?: true
    embeddingId?: true
    createdAt?: true
    _all?: true
  }

  export type ChunkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Chunk to aggregate.
     */
    where?: ChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chunks to fetch.
     */
    orderBy?: ChunkOrderByWithRelationInput | ChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Chunks
    **/
    _count?: true | ChunkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChunkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChunkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChunkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChunkMaxAggregateInputType
  }

  export type GetChunkAggregateType<T extends ChunkAggregateArgs> = {
        [P in keyof T & keyof AggregateChunk]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChunk[P]>
      : GetScalarType<T[P], AggregateChunk[P]>
  }




  export type ChunkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChunkWhereInput
    orderBy?: ChunkOrderByWithAggregationInput | ChunkOrderByWithAggregationInput[]
    by: ChunkScalarFieldEnum[] | ChunkScalarFieldEnum
    having?: ChunkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChunkCountAggregateInputType | true
    _avg?: ChunkAvgAggregateInputType
    _sum?: ChunkSumAggregateInputType
    _min?: ChunkMinAggregateInputType
    _max?: ChunkMaxAggregateInputType
  }

  export type ChunkGroupByOutputType = {
    id: number
    documentId: number
    userId: number
    text: string
    chunkHash: string
    startPos: number | null
    endPos: number | null
    tokenCount: number | null
    embeddingId: number | null
    createdAt: Date
    _count: ChunkCountAggregateOutputType | null
    _avg: ChunkAvgAggregateOutputType | null
    _sum: ChunkSumAggregateOutputType | null
    _min: ChunkMinAggregateOutputType | null
    _max: ChunkMaxAggregateOutputType | null
  }

  type GetChunkGroupByPayload<T extends ChunkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChunkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChunkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChunkGroupByOutputType[P]>
            : GetScalarType<T[P], ChunkGroupByOutputType[P]>
        }
      >
    >


  export type ChunkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    userId?: boolean
    text?: boolean
    chunkHash?: boolean
    startPos?: boolean
    endPos?: boolean
    tokenCount?: boolean
    embeddingId?: boolean
    createdAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    embedding?: boolean | Chunk$embeddingArgs<ExtArgs>
  }, ExtArgs["result"]["chunk"]>

  export type ChunkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    userId?: boolean
    text?: boolean
    chunkHash?: boolean
    startPos?: boolean
    endPos?: boolean
    tokenCount?: boolean
    embeddingId?: boolean
    createdAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chunk"]>

  export type ChunkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    userId?: boolean
    text?: boolean
    chunkHash?: boolean
    startPos?: boolean
    endPos?: boolean
    tokenCount?: boolean
    embeddingId?: boolean
    createdAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chunk"]>

  export type ChunkSelectScalar = {
    id?: boolean
    documentId?: boolean
    userId?: boolean
    text?: boolean
    chunkHash?: boolean
    startPos?: boolean
    endPos?: boolean
    tokenCount?: boolean
    embeddingId?: boolean
    createdAt?: boolean
  }

  export type ChunkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "documentId" | "userId" | "text" | "chunkHash" | "startPos" | "endPos" | "tokenCount" | "embeddingId" | "createdAt", ExtArgs["result"]["chunk"]>
  export type ChunkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
    embedding?: boolean | Chunk$embeddingArgs<ExtArgs>
  }
  export type ChunkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type ChunkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }

  export type $ChunkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Chunk"
    objects: {
      document: Prisma.$DocumentPayload<ExtArgs>
      embedding: Prisma.$EmbeddingPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      documentId: number
      userId: number
      text: string
      chunkHash: string
      startPos: number | null
      endPos: number | null
      tokenCount: number | null
      embeddingId: number | null
      createdAt: Date
    }, ExtArgs["result"]["chunk"]>
    composites: {}
  }

  type ChunkGetPayload<S extends boolean | null | undefined | ChunkDefaultArgs> = $Result.GetResult<Prisma.$ChunkPayload, S>

  type ChunkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChunkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChunkCountAggregateInputType | true
    }

  export interface ChunkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Chunk'], meta: { name: 'Chunk' } }
    /**
     * Find zero or one Chunk that matches the filter.
     * @param {ChunkFindUniqueArgs} args - Arguments to find a Chunk
     * @example
     * // Get one Chunk
     * const chunk = await prisma.chunk.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChunkFindUniqueArgs>(args: SelectSubset<T, ChunkFindUniqueArgs<ExtArgs>>): Prisma__ChunkClient<$Result.GetResult<Prisma.$ChunkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Chunk that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChunkFindUniqueOrThrowArgs} args - Arguments to find a Chunk
     * @example
     * // Get one Chunk
     * const chunk = await prisma.chunk.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChunkFindUniqueOrThrowArgs>(args: SelectSubset<T, ChunkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChunkClient<$Result.GetResult<Prisma.$ChunkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chunk that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChunkFindFirstArgs} args - Arguments to find a Chunk
     * @example
     * // Get one Chunk
     * const chunk = await prisma.chunk.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChunkFindFirstArgs>(args?: SelectSubset<T, ChunkFindFirstArgs<ExtArgs>>): Prisma__ChunkClient<$Result.GetResult<Prisma.$ChunkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chunk that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChunkFindFirstOrThrowArgs} args - Arguments to find a Chunk
     * @example
     * // Get one Chunk
     * const chunk = await prisma.chunk.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChunkFindFirstOrThrowArgs>(args?: SelectSubset<T, ChunkFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChunkClient<$Result.GetResult<Prisma.$ChunkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Chunks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChunkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Chunks
     * const chunks = await prisma.chunk.findMany()
     * 
     * // Get first 10 Chunks
     * const chunks = await prisma.chunk.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chunkWithIdOnly = await prisma.chunk.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChunkFindManyArgs>(args?: SelectSubset<T, ChunkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChunkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Chunk.
     * @param {ChunkCreateArgs} args - Arguments to create a Chunk.
     * @example
     * // Create one Chunk
     * const Chunk = await prisma.chunk.create({
     *   data: {
     *     // ... data to create a Chunk
     *   }
     * })
     * 
     */
    create<T extends ChunkCreateArgs>(args: SelectSubset<T, ChunkCreateArgs<ExtArgs>>): Prisma__ChunkClient<$Result.GetResult<Prisma.$ChunkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Chunks.
     * @param {ChunkCreateManyArgs} args - Arguments to create many Chunks.
     * @example
     * // Create many Chunks
     * const chunk = await prisma.chunk.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChunkCreateManyArgs>(args?: SelectSubset<T, ChunkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Chunks and returns the data saved in the database.
     * @param {ChunkCreateManyAndReturnArgs} args - Arguments to create many Chunks.
     * @example
     * // Create many Chunks
     * const chunk = await prisma.chunk.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Chunks and only return the `id`
     * const chunkWithIdOnly = await prisma.chunk.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChunkCreateManyAndReturnArgs>(args?: SelectSubset<T, ChunkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChunkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Chunk.
     * @param {ChunkDeleteArgs} args - Arguments to delete one Chunk.
     * @example
     * // Delete one Chunk
     * const Chunk = await prisma.chunk.delete({
     *   where: {
     *     // ... filter to delete one Chunk
     *   }
     * })
     * 
     */
    delete<T extends ChunkDeleteArgs>(args: SelectSubset<T, ChunkDeleteArgs<ExtArgs>>): Prisma__ChunkClient<$Result.GetResult<Prisma.$ChunkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Chunk.
     * @param {ChunkUpdateArgs} args - Arguments to update one Chunk.
     * @example
     * // Update one Chunk
     * const chunk = await prisma.chunk.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChunkUpdateArgs>(args: SelectSubset<T, ChunkUpdateArgs<ExtArgs>>): Prisma__ChunkClient<$Result.GetResult<Prisma.$ChunkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Chunks.
     * @param {ChunkDeleteManyArgs} args - Arguments to filter Chunks to delete.
     * @example
     * // Delete a few Chunks
     * const { count } = await prisma.chunk.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChunkDeleteManyArgs>(args?: SelectSubset<T, ChunkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chunks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChunkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Chunks
     * const chunk = await prisma.chunk.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChunkUpdateManyArgs>(args: SelectSubset<T, ChunkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chunks and returns the data updated in the database.
     * @param {ChunkUpdateManyAndReturnArgs} args - Arguments to update many Chunks.
     * @example
     * // Update many Chunks
     * const chunk = await prisma.chunk.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Chunks and only return the `id`
     * const chunkWithIdOnly = await prisma.chunk.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChunkUpdateManyAndReturnArgs>(args: SelectSubset<T, ChunkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChunkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Chunk.
     * @param {ChunkUpsertArgs} args - Arguments to update or create a Chunk.
     * @example
     * // Update or create a Chunk
     * const chunk = await prisma.chunk.upsert({
     *   create: {
     *     // ... data to create a Chunk
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Chunk we want to update
     *   }
     * })
     */
    upsert<T extends ChunkUpsertArgs>(args: SelectSubset<T, ChunkUpsertArgs<ExtArgs>>): Prisma__ChunkClient<$Result.GetResult<Prisma.$ChunkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Chunks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChunkCountArgs} args - Arguments to filter Chunks to count.
     * @example
     * // Count the number of Chunks
     * const count = await prisma.chunk.count({
     *   where: {
     *     // ... the filter for the Chunks we want to count
     *   }
     * })
    **/
    count<T extends ChunkCountArgs>(
      args?: Subset<T, ChunkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChunkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Chunk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChunkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChunkAggregateArgs>(args: Subset<T, ChunkAggregateArgs>): Prisma.PrismaPromise<GetChunkAggregateType<T>>

    /**
     * Group by Chunk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChunkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChunkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChunkGroupByArgs['orderBy'] }
        : { orderBy?: ChunkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChunkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChunkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Chunk model
   */
  readonly fields: ChunkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Chunk.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChunkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    document<T extends DocumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentDefaultArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    embedding<T extends Chunk$embeddingArgs<ExtArgs> = {}>(args?: Subset<T, Chunk$embeddingArgs<ExtArgs>>): Prisma__EmbeddingClient<$Result.GetResult<Prisma.$EmbeddingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Chunk model
   */
  interface ChunkFieldRefs {
    readonly id: FieldRef<"Chunk", 'Int'>
    readonly documentId: FieldRef<"Chunk", 'Int'>
    readonly userId: FieldRef<"Chunk", 'Int'>
    readonly text: FieldRef<"Chunk", 'String'>
    readonly chunkHash: FieldRef<"Chunk", 'String'>
    readonly startPos: FieldRef<"Chunk", 'Int'>
    readonly endPos: FieldRef<"Chunk", 'Int'>
    readonly tokenCount: FieldRef<"Chunk", 'Int'>
    readonly embeddingId: FieldRef<"Chunk", 'Int'>
    readonly createdAt: FieldRef<"Chunk", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Chunk findUnique
   */
  export type ChunkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chunk
     */
    select?: ChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chunk
     */
    omit?: ChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChunkInclude<ExtArgs> | null
    /**
     * Filter, which Chunk to fetch.
     */
    where: ChunkWhereUniqueInput
  }

  /**
   * Chunk findUniqueOrThrow
   */
  export type ChunkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chunk
     */
    select?: ChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chunk
     */
    omit?: ChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChunkInclude<ExtArgs> | null
    /**
     * Filter, which Chunk to fetch.
     */
    where: ChunkWhereUniqueInput
  }

  /**
   * Chunk findFirst
   */
  export type ChunkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chunk
     */
    select?: ChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chunk
     */
    omit?: ChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChunkInclude<ExtArgs> | null
    /**
     * Filter, which Chunk to fetch.
     */
    where?: ChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chunks to fetch.
     */
    orderBy?: ChunkOrderByWithRelationInput | ChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Chunks.
     */
    cursor?: ChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Chunks.
     */
    distinct?: ChunkScalarFieldEnum | ChunkScalarFieldEnum[]
  }

  /**
   * Chunk findFirstOrThrow
   */
  export type ChunkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chunk
     */
    select?: ChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chunk
     */
    omit?: ChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChunkInclude<ExtArgs> | null
    /**
     * Filter, which Chunk to fetch.
     */
    where?: ChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chunks to fetch.
     */
    orderBy?: ChunkOrderByWithRelationInput | ChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Chunks.
     */
    cursor?: ChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Chunks.
     */
    distinct?: ChunkScalarFieldEnum | ChunkScalarFieldEnum[]
  }

  /**
   * Chunk findMany
   */
  export type ChunkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chunk
     */
    select?: ChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chunk
     */
    omit?: ChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChunkInclude<ExtArgs> | null
    /**
     * Filter, which Chunks to fetch.
     */
    where?: ChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chunks to fetch.
     */
    orderBy?: ChunkOrderByWithRelationInput | ChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Chunks.
     */
    cursor?: ChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chunks.
     */
    skip?: number
    distinct?: ChunkScalarFieldEnum | ChunkScalarFieldEnum[]
  }

  /**
   * Chunk create
   */
  export type ChunkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chunk
     */
    select?: ChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chunk
     */
    omit?: ChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChunkInclude<ExtArgs> | null
    /**
     * The data needed to create a Chunk.
     */
    data: XOR<ChunkCreateInput, ChunkUncheckedCreateInput>
  }

  /**
   * Chunk createMany
   */
  export type ChunkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Chunks.
     */
    data: ChunkCreateManyInput | ChunkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Chunk createManyAndReturn
   */
  export type ChunkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chunk
     */
    select?: ChunkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Chunk
     */
    omit?: ChunkOmit<ExtArgs> | null
    /**
     * The data used to create many Chunks.
     */
    data: ChunkCreateManyInput | ChunkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChunkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Chunk update
   */
  export type ChunkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chunk
     */
    select?: ChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chunk
     */
    omit?: ChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChunkInclude<ExtArgs> | null
    /**
     * The data needed to update a Chunk.
     */
    data: XOR<ChunkUpdateInput, ChunkUncheckedUpdateInput>
    /**
     * Choose, which Chunk to update.
     */
    where: ChunkWhereUniqueInput
  }

  /**
   * Chunk updateMany
   */
  export type ChunkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Chunks.
     */
    data: XOR<ChunkUpdateManyMutationInput, ChunkUncheckedUpdateManyInput>
    /**
     * Filter which Chunks to update
     */
    where?: ChunkWhereInput
    /**
     * Limit how many Chunks to update.
     */
    limit?: number
  }

  /**
   * Chunk updateManyAndReturn
   */
  export type ChunkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chunk
     */
    select?: ChunkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Chunk
     */
    omit?: ChunkOmit<ExtArgs> | null
    /**
     * The data used to update Chunks.
     */
    data: XOR<ChunkUpdateManyMutationInput, ChunkUncheckedUpdateManyInput>
    /**
     * Filter which Chunks to update
     */
    where?: ChunkWhereInput
    /**
     * Limit how many Chunks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChunkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Chunk upsert
   */
  export type ChunkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chunk
     */
    select?: ChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chunk
     */
    omit?: ChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChunkInclude<ExtArgs> | null
    /**
     * The filter to search for the Chunk to update in case it exists.
     */
    where: ChunkWhereUniqueInput
    /**
     * In case the Chunk found by the `where` argument doesn't exist, create a new Chunk with this data.
     */
    create: XOR<ChunkCreateInput, ChunkUncheckedCreateInput>
    /**
     * In case the Chunk was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChunkUpdateInput, ChunkUncheckedUpdateInput>
  }

  /**
   * Chunk delete
   */
  export type ChunkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chunk
     */
    select?: ChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chunk
     */
    omit?: ChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChunkInclude<ExtArgs> | null
    /**
     * Filter which Chunk to delete.
     */
    where: ChunkWhereUniqueInput
  }

  /**
   * Chunk deleteMany
   */
  export type ChunkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Chunks to delete
     */
    where?: ChunkWhereInput
    /**
     * Limit how many Chunks to delete.
     */
    limit?: number
  }

  /**
   * Chunk.embedding
   */
  export type Chunk$embeddingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbeddingInclude<ExtArgs> | null
    where?: EmbeddingWhereInput
  }

  /**
   * Chunk without action
   */
  export type ChunkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chunk
     */
    select?: ChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chunk
     */
    omit?: ChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChunkInclude<ExtArgs> | null
  }


  /**
   * Model Embedding
   */

  export type AggregateEmbedding = {
    _count: EmbeddingCountAggregateOutputType | null
    _avg: EmbeddingAvgAggregateOutputType | null
    _sum: EmbeddingSumAggregateOutputType | null
    _min: EmbeddingMinAggregateOutputType | null
    _max: EmbeddingMaxAggregateOutputType | null
  }

  export type EmbeddingAvgAggregateOutputType = {
    id: number | null
    chunkId: number | null
  }

  export type EmbeddingSumAggregateOutputType = {
    id: number | null
    chunkId: number | null
  }

  export type EmbeddingMinAggregateOutputType = {
    id: number | null
    chunkId: number | null
    model: string | null
    vectorRef: string | null
    createdAt: Date | null
  }

  export type EmbeddingMaxAggregateOutputType = {
    id: number | null
    chunkId: number | null
    model: string | null
    vectorRef: string | null
    createdAt: Date | null
  }

  export type EmbeddingCountAggregateOutputType = {
    id: number
    chunkId: number
    model: number
    vectorRef: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type EmbeddingAvgAggregateInputType = {
    id?: true
    chunkId?: true
  }

  export type EmbeddingSumAggregateInputType = {
    id?: true
    chunkId?: true
  }

  export type EmbeddingMinAggregateInputType = {
    id?: true
    chunkId?: true
    model?: true
    vectorRef?: true
    createdAt?: true
  }

  export type EmbeddingMaxAggregateInputType = {
    id?: true
    chunkId?: true
    model?: true
    vectorRef?: true
    createdAt?: true
  }

  export type EmbeddingCountAggregateInputType = {
    id?: true
    chunkId?: true
    model?: true
    vectorRef?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type EmbeddingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Embedding to aggregate.
     */
    where?: EmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Embeddings to fetch.
     */
    orderBy?: EmbeddingOrderByWithRelationInput | EmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Embeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Embeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Embeddings
    **/
    _count?: true | EmbeddingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmbeddingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmbeddingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmbeddingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmbeddingMaxAggregateInputType
  }

  export type GetEmbeddingAggregateType<T extends EmbeddingAggregateArgs> = {
        [P in keyof T & keyof AggregateEmbedding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmbedding[P]>
      : GetScalarType<T[P], AggregateEmbedding[P]>
  }




  export type EmbeddingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmbeddingWhereInput
    orderBy?: EmbeddingOrderByWithAggregationInput | EmbeddingOrderByWithAggregationInput[]
    by: EmbeddingScalarFieldEnum[] | EmbeddingScalarFieldEnum
    having?: EmbeddingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmbeddingCountAggregateInputType | true
    _avg?: EmbeddingAvgAggregateInputType
    _sum?: EmbeddingSumAggregateInputType
    _min?: EmbeddingMinAggregateInputType
    _max?: EmbeddingMaxAggregateInputType
  }

  export type EmbeddingGroupByOutputType = {
    id: number
    chunkId: number
    model: string | null
    vectorRef: string | null
    metadata: JsonValue | null
    createdAt: Date
    _count: EmbeddingCountAggregateOutputType | null
    _avg: EmbeddingAvgAggregateOutputType | null
    _sum: EmbeddingSumAggregateOutputType | null
    _min: EmbeddingMinAggregateOutputType | null
    _max: EmbeddingMaxAggregateOutputType | null
  }

  type GetEmbeddingGroupByPayload<T extends EmbeddingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmbeddingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmbeddingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmbeddingGroupByOutputType[P]>
            : GetScalarType<T[P], EmbeddingGroupByOutputType[P]>
        }
      >
    >


  export type EmbeddingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chunkId?: boolean
    model?: boolean
    vectorRef?: boolean
    metadata?: boolean
    createdAt?: boolean
    chunk?: boolean | ChunkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["embedding"]>

  export type EmbeddingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chunkId?: boolean
    model?: boolean
    vectorRef?: boolean
    metadata?: boolean
    createdAt?: boolean
    chunk?: boolean | ChunkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["embedding"]>

  export type EmbeddingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chunkId?: boolean
    model?: boolean
    vectorRef?: boolean
    metadata?: boolean
    createdAt?: boolean
    chunk?: boolean | ChunkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["embedding"]>

  export type EmbeddingSelectScalar = {
    id?: boolean
    chunkId?: boolean
    model?: boolean
    vectorRef?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type EmbeddingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "chunkId" | "model" | "vectorRef" | "metadata" | "createdAt", ExtArgs["result"]["embedding"]>
  export type EmbeddingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chunk?: boolean | ChunkDefaultArgs<ExtArgs>
  }
  export type EmbeddingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chunk?: boolean | ChunkDefaultArgs<ExtArgs>
  }
  export type EmbeddingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chunk?: boolean | ChunkDefaultArgs<ExtArgs>
  }

  export type $EmbeddingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Embedding"
    objects: {
      chunk: Prisma.$ChunkPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      chunkId: number
      model: string | null
      vectorRef: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["embedding"]>
    composites: {}
  }

  type EmbeddingGetPayload<S extends boolean | null | undefined | EmbeddingDefaultArgs> = $Result.GetResult<Prisma.$EmbeddingPayload, S>

  type EmbeddingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmbeddingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmbeddingCountAggregateInputType | true
    }

  export interface EmbeddingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Embedding'], meta: { name: 'Embedding' } }
    /**
     * Find zero or one Embedding that matches the filter.
     * @param {EmbeddingFindUniqueArgs} args - Arguments to find a Embedding
     * @example
     * // Get one Embedding
     * const embedding = await prisma.embedding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmbeddingFindUniqueArgs>(args: SelectSubset<T, EmbeddingFindUniqueArgs<ExtArgs>>): Prisma__EmbeddingClient<$Result.GetResult<Prisma.$EmbeddingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Embedding that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmbeddingFindUniqueOrThrowArgs} args - Arguments to find a Embedding
     * @example
     * // Get one Embedding
     * const embedding = await prisma.embedding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmbeddingFindUniqueOrThrowArgs>(args: SelectSubset<T, EmbeddingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmbeddingClient<$Result.GetResult<Prisma.$EmbeddingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Embedding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingFindFirstArgs} args - Arguments to find a Embedding
     * @example
     * // Get one Embedding
     * const embedding = await prisma.embedding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmbeddingFindFirstArgs>(args?: SelectSubset<T, EmbeddingFindFirstArgs<ExtArgs>>): Prisma__EmbeddingClient<$Result.GetResult<Prisma.$EmbeddingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Embedding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingFindFirstOrThrowArgs} args - Arguments to find a Embedding
     * @example
     * // Get one Embedding
     * const embedding = await prisma.embedding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmbeddingFindFirstOrThrowArgs>(args?: SelectSubset<T, EmbeddingFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmbeddingClient<$Result.GetResult<Prisma.$EmbeddingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Embeddings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Embeddings
     * const embeddings = await prisma.embedding.findMany()
     * 
     * // Get first 10 Embeddings
     * const embeddings = await prisma.embedding.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const embeddingWithIdOnly = await prisma.embedding.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmbeddingFindManyArgs>(args?: SelectSubset<T, EmbeddingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmbeddingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Embedding.
     * @param {EmbeddingCreateArgs} args - Arguments to create a Embedding.
     * @example
     * // Create one Embedding
     * const Embedding = await prisma.embedding.create({
     *   data: {
     *     // ... data to create a Embedding
     *   }
     * })
     * 
     */
    create<T extends EmbeddingCreateArgs>(args: SelectSubset<T, EmbeddingCreateArgs<ExtArgs>>): Prisma__EmbeddingClient<$Result.GetResult<Prisma.$EmbeddingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Embeddings.
     * @param {EmbeddingCreateManyArgs} args - Arguments to create many Embeddings.
     * @example
     * // Create many Embeddings
     * const embedding = await prisma.embedding.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmbeddingCreateManyArgs>(args?: SelectSubset<T, EmbeddingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Embeddings and returns the data saved in the database.
     * @param {EmbeddingCreateManyAndReturnArgs} args - Arguments to create many Embeddings.
     * @example
     * // Create many Embeddings
     * const embedding = await prisma.embedding.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Embeddings and only return the `id`
     * const embeddingWithIdOnly = await prisma.embedding.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmbeddingCreateManyAndReturnArgs>(args?: SelectSubset<T, EmbeddingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmbeddingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Embedding.
     * @param {EmbeddingDeleteArgs} args - Arguments to delete one Embedding.
     * @example
     * // Delete one Embedding
     * const Embedding = await prisma.embedding.delete({
     *   where: {
     *     // ... filter to delete one Embedding
     *   }
     * })
     * 
     */
    delete<T extends EmbeddingDeleteArgs>(args: SelectSubset<T, EmbeddingDeleteArgs<ExtArgs>>): Prisma__EmbeddingClient<$Result.GetResult<Prisma.$EmbeddingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Embedding.
     * @param {EmbeddingUpdateArgs} args - Arguments to update one Embedding.
     * @example
     * // Update one Embedding
     * const embedding = await prisma.embedding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmbeddingUpdateArgs>(args: SelectSubset<T, EmbeddingUpdateArgs<ExtArgs>>): Prisma__EmbeddingClient<$Result.GetResult<Prisma.$EmbeddingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Embeddings.
     * @param {EmbeddingDeleteManyArgs} args - Arguments to filter Embeddings to delete.
     * @example
     * // Delete a few Embeddings
     * const { count } = await prisma.embedding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmbeddingDeleteManyArgs>(args?: SelectSubset<T, EmbeddingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Embeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Embeddings
     * const embedding = await prisma.embedding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmbeddingUpdateManyArgs>(args: SelectSubset<T, EmbeddingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Embeddings and returns the data updated in the database.
     * @param {EmbeddingUpdateManyAndReturnArgs} args - Arguments to update many Embeddings.
     * @example
     * // Update many Embeddings
     * const embedding = await prisma.embedding.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Embeddings and only return the `id`
     * const embeddingWithIdOnly = await prisma.embedding.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmbeddingUpdateManyAndReturnArgs>(args: SelectSubset<T, EmbeddingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmbeddingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Embedding.
     * @param {EmbeddingUpsertArgs} args - Arguments to update or create a Embedding.
     * @example
     * // Update or create a Embedding
     * const embedding = await prisma.embedding.upsert({
     *   create: {
     *     // ... data to create a Embedding
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Embedding we want to update
     *   }
     * })
     */
    upsert<T extends EmbeddingUpsertArgs>(args: SelectSubset<T, EmbeddingUpsertArgs<ExtArgs>>): Prisma__EmbeddingClient<$Result.GetResult<Prisma.$EmbeddingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Embeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingCountArgs} args - Arguments to filter Embeddings to count.
     * @example
     * // Count the number of Embeddings
     * const count = await prisma.embedding.count({
     *   where: {
     *     // ... the filter for the Embeddings we want to count
     *   }
     * })
    **/
    count<T extends EmbeddingCountArgs>(
      args?: Subset<T, EmbeddingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmbeddingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Embedding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmbeddingAggregateArgs>(args: Subset<T, EmbeddingAggregateArgs>): Prisma.PrismaPromise<GetEmbeddingAggregateType<T>>

    /**
     * Group by Embedding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmbeddingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmbeddingGroupByArgs['orderBy'] }
        : { orderBy?: EmbeddingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmbeddingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmbeddingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Embedding model
   */
  readonly fields: EmbeddingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Embedding.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmbeddingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chunk<T extends ChunkDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChunkDefaultArgs<ExtArgs>>): Prisma__ChunkClient<$Result.GetResult<Prisma.$ChunkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Embedding model
   */
  interface EmbeddingFieldRefs {
    readonly id: FieldRef<"Embedding", 'Int'>
    readonly chunkId: FieldRef<"Embedding", 'Int'>
    readonly model: FieldRef<"Embedding", 'String'>
    readonly vectorRef: FieldRef<"Embedding", 'String'>
    readonly metadata: FieldRef<"Embedding", 'Json'>
    readonly createdAt: FieldRef<"Embedding", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Embedding findUnique
   */
  export type EmbeddingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which Embedding to fetch.
     */
    where: EmbeddingWhereUniqueInput
  }

  /**
   * Embedding findUniqueOrThrow
   */
  export type EmbeddingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which Embedding to fetch.
     */
    where: EmbeddingWhereUniqueInput
  }

  /**
   * Embedding findFirst
   */
  export type EmbeddingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which Embedding to fetch.
     */
    where?: EmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Embeddings to fetch.
     */
    orderBy?: EmbeddingOrderByWithRelationInput | EmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Embeddings.
     */
    cursor?: EmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Embeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Embeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Embeddings.
     */
    distinct?: EmbeddingScalarFieldEnum | EmbeddingScalarFieldEnum[]
  }

  /**
   * Embedding findFirstOrThrow
   */
  export type EmbeddingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which Embedding to fetch.
     */
    where?: EmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Embeddings to fetch.
     */
    orderBy?: EmbeddingOrderByWithRelationInput | EmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Embeddings.
     */
    cursor?: EmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Embeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Embeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Embeddings.
     */
    distinct?: EmbeddingScalarFieldEnum | EmbeddingScalarFieldEnum[]
  }

  /**
   * Embedding findMany
   */
  export type EmbeddingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which Embeddings to fetch.
     */
    where?: EmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Embeddings to fetch.
     */
    orderBy?: EmbeddingOrderByWithRelationInput | EmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Embeddings.
     */
    cursor?: EmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Embeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Embeddings.
     */
    skip?: number
    distinct?: EmbeddingScalarFieldEnum | EmbeddingScalarFieldEnum[]
  }

  /**
   * Embedding create
   */
  export type EmbeddingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbeddingInclude<ExtArgs> | null
    /**
     * The data needed to create a Embedding.
     */
    data: XOR<EmbeddingCreateInput, EmbeddingUncheckedCreateInput>
  }

  /**
   * Embedding createMany
   */
  export type EmbeddingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Embeddings.
     */
    data: EmbeddingCreateManyInput | EmbeddingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Embedding createManyAndReturn
   */
  export type EmbeddingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
    /**
     * The data used to create many Embeddings.
     */
    data: EmbeddingCreateManyInput | EmbeddingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbeddingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Embedding update
   */
  export type EmbeddingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbeddingInclude<ExtArgs> | null
    /**
     * The data needed to update a Embedding.
     */
    data: XOR<EmbeddingUpdateInput, EmbeddingUncheckedUpdateInput>
    /**
     * Choose, which Embedding to update.
     */
    where: EmbeddingWhereUniqueInput
  }

  /**
   * Embedding updateMany
   */
  export type EmbeddingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Embeddings.
     */
    data: XOR<EmbeddingUpdateManyMutationInput, EmbeddingUncheckedUpdateManyInput>
    /**
     * Filter which Embeddings to update
     */
    where?: EmbeddingWhereInput
    /**
     * Limit how many Embeddings to update.
     */
    limit?: number
  }

  /**
   * Embedding updateManyAndReturn
   */
  export type EmbeddingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
    /**
     * The data used to update Embeddings.
     */
    data: XOR<EmbeddingUpdateManyMutationInput, EmbeddingUncheckedUpdateManyInput>
    /**
     * Filter which Embeddings to update
     */
    where?: EmbeddingWhereInput
    /**
     * Limit how many Embeddings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbeddingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Embedding upsert
   */
  export type EmbeddingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbeddingInclude<ExtArgs> | null
    /**
     * The filter to search for the Embedding to update in case it exists.
     */
    where: EmbeddingWhereUniqueInput
    /**
     * In case the Embedding found by the `where` argument doesn't exist, create a new Embedding with this data.
     */
    create: XOR<EmbeddingCreateInput, EmbeddingUncheckedCreateInput>
    /**
     * In case the Embedding was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmbeddingUpdateInput, EmbeddingUncheckedUpdateInput>
  }

  /**
   * Embedding delete
   */
  export type EmbeddingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbeddingInclude<ExtArgs> | null
    /**
     * Filter which Embedding to delete.
     */
    where: EmbeddingWhereUniqueInput
  }

  /**
   * Embedding deleteMany
   */
  export type EmbeddingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Embeddings to delete
     */
    where?: EmbeddingWhereInput
    /**
     * Limit how many Embeddings to delete.
     */
    limit?: number
  }

  /**
   * Embedding without action
   */
  export type EmbeddingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Embedding
     */
    select?: EmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Embedding
     */
    omit?: EmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbeddingInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type TaskSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type TaskMinAggregateOutputType = {
    id: number | null
    userId: number | null
    title: string | null
    description: string | null
    dueAt: Date | null
    completed: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    title: string | null
    description: string | null
    dueAt: Date | null
    completed: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    description: number
    dueAt: number
    completed: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type TaskSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type TaskMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    dueAt?: true
    completed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    dueAt?: true
    completed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    dueAt?: true
    completed?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: number
    userId: number
    title: string
    description: string | null
    dueAt: Date | null
    completed: boolean
    createdAt: Date
    updatedAt: Date
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    dueAt?: boolean
    completed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    dueAt?: boolean
    completed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    dueAt?: boolean
    completed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    dueAt?: boolean
    completed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "description" | "dueAt" | "completed" | "createdAt" | "updatedAt", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      title: string
      description: string | null
      dueAt: Date | null
      completed: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'Int'>
    readonly userId: FieldRef<"Task", 'Int'>
    readonly title: FieldRef<"Task", 'String'>
    readonly description: FieldRef<"Task", 'String'>
    readonly dueAt: FieldRef<"Task", 'DateTime'>
    readonly completed: FieldRef<"Task", 'Boolean'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly updatedAt: FieldRef<"Task", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model Reminder
   */

  export type AggregateReminder = {
    _count: ReminderCountAggregateOutputType | null
    _avg: ReminderAvgAggregateOutputType | null
    _sum: ReminderSumAggregateOutputType | null
    _min: ReminderMinAggregateOutputType | null
    _max: ReminderMaxAggregateOutputType | null
  }

  export type ReminderAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type ReminderSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type ReminderMinAggregateOutputType = {
    id: number | null
    userId: number | null
    text: string | null
    remindAt: Date | null
    sent: boolean | null
    createdAt: Date | null
  }

  export type ReminderMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    text: string | null
    remindAt: Date | null
    sent: boolean | null
    createdAt: Date | null
  }

  export type ReminderCountAggregateOutputType = {
    id: number
    userId: number
    text: number
    remindAt: number
    sent: number
    createdAt: number
    _all: number
  }


  export type ReminderAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ReminderSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ReminderMinAggregateInputType = {
    id?: true
    userId?: true
    text?: true
    remindAt?: true
    sent?: true
    createdAt?: true
  }

  export type ReminderMaxAggregateInputType = {
    id?: true
    userId?: true
    text?: true
    remindAt?: true
    sent?: true
    createdAt?: true
  }

  export type ReminderCountAggregateInputType = {
    id?: true
    userId?: true
    text?: true
    remindAt?: true
    sent?: true
    createdAt?: true
    _all?: true
  }

  export type ReminderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reminder to aggregate.
     */
    where?: ReminderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reminders to fetch.
     */
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReminderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reminders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reminders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reminders
    **/
    _count?: true | ReminderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReminderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReminderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReminderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReminderMaxAggregateInputType
  }

  export type GetReminderAggregateType<T extends ReminderAggregateArgs> = {
        [P in keyof T & keyof AggregateReminder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReminder[P]>
      : GetScalarType<T[P], AggregateReminder[P]>
  }




  export type ReminderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReminderWhereInput
    orderBy?: ReminderOrderByWithAggregationInput | ReminderOrderByWithAggregationInput[]
    by: ReminderScalarFieldEnum[] | ReminderScalarFieldEnum
    having?: ReminderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReminderCountAggregateInputType | true
    _avg?: ReminderAvgAggregateInputType
    _sum?: ReminderSumAggregateInputType
    _min?: ReminderMinAggregateInputType
    _max?: ReminderMaxAggregateInputType
  }

  export type ReminderGroupByOutputType = {
    id: number
    userId: number
    text: string
    remindAt: Date
    sent: boolean
    createdAt: Date
    _count: ReminderCountAggregateOutputType | null
    _avg: ReminderAvgAggregateOutputType | null
    _sum: ReminderSumAggregateOutputType | null
    _min: ReminderMinAggregateOutputType | null
    _max: ReminderMaxAggregateOutputType | null
  }

  type GetReminderGroupByPayload<T extends ReminderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReminderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReminderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReminderGroupByOutputType[P]>
            : GetScalarType<T[P], ReminderGroupByOutputType[P]>
        }
      >
    >


  export type ReminderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    text?: boolean
    remindAt?: boolean
    sent?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reminder"]>

  export type ReminderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    text?: boolean
    remindAt?: boolean
    sent?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reminder"]>

  export type ReminderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    text?: boolean
    remindAt?: boolean
    sent?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reminder"]>

  export type ReminderSelectScalar = {
    id?: boolean
    userId?: boolean
    text?: boolean
    remindAt?: boolean
    sent?: boolean
    createdAt?: boolean
  }

  export type ReminderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "text" | "remindAt" | "sent" | "createdAt", ExtArgs["result"]["reminder"]>
  export type ReminderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReminderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReminderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ReminderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Reminder"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      text: string
      remindAt: Date
      sent: boolean
      createdAt: Date
    }, ExtArgs["result"]["reminder"]>
    composites: {}
  }

  type ReminderGetPayload<S extends boolean | null | undefined | ReminderDefaultArgs> = $Result.GetResult<Prisma.$ReminderPayload, S>

  type ReminderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReminderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReminderCountAggregateInputType | true
    }

  export interface ReminderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Reminder'], meta: { name: 'Reminder' } }
    /**
     * Find zero or one Reminder that matches the filter.
     * @param {ReminderFindUniqueArgs} args - Arguments to find a Reminder
     * @example
     * // Get one Reminder
     * const reminder = await prisma.reminder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReminderFindUniqueArgs>(args: SelectSubset<T, ReminderFindUniqueArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Reminder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReminderFindUniqueOrThrowArgs} args - Arguments to find a Reminder
     * @example
     * // Get one Reminder
     * const reminder = await prisma.reminder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReminderFindUniqueOrThrowArgs>(args: SelectSubset<T, ReminderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reminder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderFindFirstArgs} args - Arguments to find a Reminder
     * @example
     * // Get one Reminder
     * const reminder = await prisma.reminder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReminderFindFirstArgs>(args?: SelectSubset<T, ReminderFindFirstArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reminder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderFindFirstOrThrowArgs} args - Arguments to find a Reminder
     * @example
     * // Get one Reminder
     * const reminder = await prisma.reminder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReminderFindFirstOrThrowArgs>(args?: SelectSubset<T, ReminderFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reminders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reminders
     * const reminders = await prisma.reminder.findMany()
     * 
     * // Get first 10 Reminders
     * const reminders = await prisma.reminder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reminderWithIdOnly = await prisma.reminder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReminderFindManyArgs>(args?: SelectSubset<T, ReminderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Reminder.
     * @param {ReminderCreateArgs} args - Arguments to create a Reminder.
     * @example
     * // Create one Reminder
     * const Reminder = await prisma.reminder.create({
     *   data: {
     *     // ... data to create a Reminder
     *   }
     * })
     * 
     */
    create<T extends ReminderCreateArgs>(args: SelectSubset<T, ReminderCreateArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reminders.
     * @param {ReminderCreateManyArgs} args - Arguments to create many Reminders.
     * @example
     * // Create many Reminders
     * const reminder = await prisma.reminder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReminderCreateManyArgs>(args?: SelectSubset<T, ReminderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reminders and returns the data saved in the database.
     * @param {ReminderCreateManyAndReturnArgs} args - Arguments to create many Reminders.
     * @example
     * // Create many Reminders
     * const reminder = await prisma.reminder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reminders and only return the `id`
     * const reminderWithIdOnly = await prisma.reminder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReminderCreateManyAndReturnArgs>(args?: SelectSubset<T, ReminderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Reminder.
     * @param {ReminderDeleteArgs} args - Arguments to delete one Reminder.
     * @example
     * // Delete one Reminder
     * const Reminder = await prisma.reminder.delete({
     *   where: {
     *     // ... filter to delete one Reminder
     *   }
     * })
     * 
     */
    delete<T extends ReminderDeleteArgs>(args: SelectSubset<T, ReminderDeleteArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Reminder.
     * @param {ReminderUpdateArgs} args - Arguments to update one Reminder.
     * @example
     * // Update one Reminder
     * const reminder = await prisma.reminder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReminderUpdateArgs>(args: SelectSubset<T, ReminderUpdateArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reminders.
     * @param {ReminderDeleteManyArgs} args - Arguments to filter Reminders to delete.
     * @example
     * // Delete a few Reminders
     * const { count } = await prisma.reminder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReminderDeleteManyArgs>(args?: SelectSubset<T, ReminderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reminders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reminders
     * const reminder = await prisma.reminder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReminderUpdateManyArgs>(args: SelectSubset<T, ReminderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reminders and returns the data updated in the database.
     * @param {ReminderUpdateManyAndReturnArgs} args - Arguments to update many Reminders.
     * @example
     * // Update many Reminders
     * const reminder = await prisma.reminder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reminders and only return the `id`
     * const reminderWithIdOnly = await prisma.reminder.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReminderUpdateManyAndReturnArgs>(args: SelectSubset<T, ReminderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Reminder.
     * @param {ReminderUpsertArgs} args - Arguments to update or create a Reminder.
     * @example
     * // Update or create a Reminder
     * const reminder = await prisma.reminder.upsert({
     *   create: {
     *     // ... data to create a Reminder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reminder we want to update
     *   }
     * })
     */
    upsert<T extends ReminderUpsertArgs>(args: SelectSubset<T, ReminderUpsertArgs<ExtArgs>>): Prisma__ReminderClient<$Result.GetResult<Prisma.$ReminderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reminders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderCountArgs} args - Arguments to filter Reminders to count.
     * @example
     * // Count the number of Reminders
     * const count = await prisma.reminder.count({
     *   where: {
     *     // ... the filter for the Reminders we want to count
     *   }
     * })
    **/
    count<T extends ReminderCountArgs>(
      args?: Subset<T, ReminderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReminderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reminder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReminderAggregateArgs>(args: Subset<T, ReminderAggregateArgs>): Prisma.PrismaPromise<GetReminderAggregateType<T>>

    /**
     * Group by Reminder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReminderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReminderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReminderGroupByArgs['orderBy'] }
        : { orderBy?: ReminderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReminderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReminderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Reminder model
   */
  readonly fields: ReminderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Reminder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReminderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Reminder model
   */
  interface ReminderFieldRefs {
    readonly id: FieldRef<"Reminder", 'Int'>
    readonly userId: FieldRef<"Reminder", 'Int'>
    readonly text: FieldRef<"Reminder", 'String'>
    readonly remindAt: FieldRef<"Reminder", 'DateTime'>
    readonly sent: FieldRef<"Reminder", 'Boolean'>
    readonly createdAt: FieldRef<"Reminder", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Reminder findUnique
   */
  export type ReminderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminder to fetch.
     */
    where: ReminderWhereUniqueInput
  }

  /**
   * Reminder findUniqueOrThrow
   */
  export type ReminderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminder to fetch.
     */
    where: ReminderWhereUniqueInput
  }

  /**
   * Reminder findFirst
   */
  export type ReminderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminder to fetch.
     */
    where?: ReminderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reminders to fetch.
     */
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reminders.
     */
    cursor?: ReminderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reminders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reminders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reminders.
     */
    distinct?: ReminderScalarFieldEnum | ReminderScalarFieldEnum[]
  }

  /**
   * Reminder findFirstOrThrow
   */
  export type ReminderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminder to fetch.
     */
    where?: ReminderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reminders to fetch.
     */
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reminders.
     */
    cursor?: ReminderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reminders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reminders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reminders.
     */
    distinct?: ReminderScalarFieldEnum | ReminderScalarFieldEnum[]
  }

  /**
   * Reminder findMany
   */
  export type ReminderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter, which Reminders to fetch.
     */
    where?: ReminderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reminders to fetch.
     */
    orderBy?: ReminderOrderByWithRelationInput | ReminderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reminders.
     */
    cursor?: ReminderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reminders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reminders.
     */
    skip?: number
    distinct?: ReminderScalarFieldEnum | ReminderScalarFieldEnum[]
  }

  /**
   * Reminder create
   */
  export type ReminderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * The data needed to create a Reminder.
     */
    data: XOR<ReminderCreateInput, ReminderUncheckedCreateInput>
  }

  /**
   * Reminder createMany
   */
  export type ReminderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reminders.
     */
    data: ReminderCreateManyInput | ReminderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Reminder createManyAndReturn
   */
  export type ReminderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * The data used to create many Reminders.
     */
    data: ReminderCreateManyInput | ReminderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reminder update
   */
  export type ReminderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * The data needed to update a Reminder.
     */
    data: XOR<ReminderUpdateInput, ReminderUncheckedUpdateInput>
    /**
     * Choose, which Reminder to update.
     */
    where: ReminderWhereUniqueInput
  }

  /**
   * Reminder updateMany
   */
  export type ReminderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reminders.
     */
    data: XOR<ReminderUpdateManyMutationInput, ReminderUncheckedUpdateManyInput>
    /**
     * Filter which Reminders to update
     */
    where?: ReminderWhereInput
    /**
     * Limit how many Reminders to update.
     */
    limit?: number
  }

  /**
   * Reminder updateManyAndReturn
   */
  export type ReminderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * The data used to update Reminders.
     */
    data: XOR<ReminderUpdateManyMutationInput, ReminderUncheckedUpdateManyInput>
    /**
     * Filter which Reminders to update
     */
    where?: ReminderWhereInput
    /**
     * Limit how many Reminders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reminder upsert
   */
  export type ReminderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * The filter to search for the Reminder to update in case it exists.
     */
    where: ReminderWhereUniqueInput
    /**
     * In case the Reminder found by the `where` argument doesn't exist, create a new Reminder with this data.
     */
    create: XOR<ReminderCreateInput, ReminderUncheckedCreateInput>
    /**
     * In case the Reminder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReminderUpdateInput, ReminderUncheckedUpdateInput>
  }

  /**
   * Reminder delete
   */
  export type ReminderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
    /**
     * Filter which Reminder to delete.
     */
    where: ReminderWhereUniqueInput
  }

  /**
   * Reminder deleteMany
   */
  export type ReminderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reminders to delete
     */
    where?: ReminderWhereInput
    /**
     * Limit how many Reminders to delete.
     */
    limit?: number
  }

  /**
   * Reminder without action
   */
  export type ReminderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reminder
     */
    select?: ReminderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reminder
     */
    omit?: ReminderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReminderInclude<ExtArgs> | null
  }


  /**
   * Model QueryLog
   */

  export type AggregateQueryLog = {
    _count: QueryLogCountAggregateOutputType | null
    _avg: QueryLogAvgAggregateOutputType | null
    _sum: QueryLogSumAggregateOutputType | null
    _min: QueryLogMinAggregateOutputType | null
    _max: QueryLogMaxAggregateOutputType | null
  }

  export type QueryLogAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    latencyMs: number | null
  }

  export type QueryLogSumAggregateOutputType = {
    id: number | null
    userId: number | null
    latencyMs: number | null
  }

  export type QueryLogMinAggregateOutputType = {
    id: number | null
    userId: number | null
    query: string | null
    response: string | null
    usedChunks: string | null
    latencyMs: number | null
    createdAt: Date | null
  }

  export type QueryLogMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    query: string | null
    response: string | null
    usedChunks: string | null
    latencyMs: number | null
    createdAt: Date | null
  }

  export type QueryLogCountAggregateOutputType = {
    id: number
    userId: number
    query: number
    response: number
    usedChunks: number
    latencyMs: number
    createdAt: number
    _all: number
  }


  export type QueryLogAvgAggregateInputType = {
    id?: true
    userId?: true
    latencyMs?: true
  }

  export type QueryLogSumAggregateInputType = {
    id?: true
    userId?: true
    latencyMs?: true
  }

  export type QueryLogMinAggregateInputType = {
    id?: true
    userId?: true
    query?: true
    response?: true
    usedChunks?: true
    latencyMs?: true
    createdAt?: true
  }

  export type QueryLogMaxAggregateInputType = {
    id?: true
    userId?: true
    query?: true
    response?: true
    usedChunks?: true
    latencyMs?: true
    createdAt?: true
  }

  export type QueryLogCountAggregateInputType = {
    id?: true
    userId?: true
    query?: true
    response?: true
    usedChunks?: true
    latencyMs?: true
    createdAt?: true
    _all?: true
  }

  export type QueryLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QueryLog to aggregate.
     */
    where?: QueryLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueryLogs to fetch.
     */
    orderBy?: QueryLogOrderByWithRelationInput | QueryLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QueryLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueryLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueryLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QueryLogs
    **/
    _count?: true | QueryLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QueryLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QueryLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QueryLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QueryLogMaxAggregateInputType
  }

  export type GetQueryLogAggregateType<T extends QueryLogAggregateArgs> = {
        [P in keyof T & keyof AggregateQueryLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQueryLog[P]>
      : GetScalarType<T[P], AggregateQueryLog[P]>
  }




  export type QueryLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QueryLogWhereInput
    orderBy?: QueryLogOrderByWithAggregationInput | QueryLogOrderByWithAggregationInput[]
    by: QueryLogScalarFieldEnum[] | QueryLogScalarFieldEnum
    having?: QueryLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QueryLogCountAggregateInputType | true
    _avg?: QueryLogAvgAggregateInputType
    _sum?: QueryLogSumAggregateInputType
    _min?: QueryLogMinAggregateInputType
    _max?: QueryLogMaxAggregateInputType
  }

  export type QueryLogGroupByOutputType = {
    id: number
    userId: number
    query: string
    response: string | null
    usedChunks: string | null
    latencyMs: number | null
    createdAt: Date
    _count: QueryLogCountAggregateOutputType | null
    _avg: QueryLogAvgAggregateOutputType | null
    _sum: QueryLogSumAggregateOutputType | null
    _min: QueryLogMinAggregateOutputType | null
    _max: QueryLogMaxAggregateOutputType | null
  }

  type GetQueryLogGroupByPayload<T extends QueryLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QueryLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QueryLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QueryLogGroupByOutputType[P]>
            : GetScalarType<T[P], QueryLogGroupByOutputType[P]>
        }
      >
    >


  export type QueryLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    query?: boolean
    response?: boolean
    usedChunks?: boolean
    latencyMs?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["queryLog"]>

  export type QueryLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    query?: boolean
    response?: boolean
    usedChunks?: boolean
    latencyMs?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["queryLog"]>

  export type QueryLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    query?: boolean
    response?: boolean
    usedChunks?: boolean
    latencyMs?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["queryLog"]>

  export type QueryLogSelectScalar = {
    id?: boolean
    userId?: boolean
    query?: boolean
    response?: boolean
    usedChunks?: boolean
    latencyMs?: boolean
    createdAt?: boolean
  }

  export type QueryLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "query" | "response" | "usedChunks" | "latencyMs" | "createdAt", ExtArgs["result"]["queryLog"]>
  export type QueryLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type QueryLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type QueryLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $QueryLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QueryLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      query: string
      response: string | null
      usedChunks: string | null
      latencyMs: number | null
      createdAt: Date
    }, ExtArgs["result"]["queryLog"]>
    composites: {}
  }

  type QueryLogGetPayload<S extends boolean | null | undefined | QueryLogDefaultArgs> = $Result.GetResult<Prisma.$QueryLogPayload, S>

  type QueryLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QueryLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QueryLogCountAggregateInputType | true
    }

  export interface QueryLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QueryLog'], meta: { name: 'QueryLog' } }
    /**
     * Find zero or one QueryLog that matches the filter.
     * @param {QueryLogFindUniqueArgs} args - Arguments to find a QueryLog
     * @example
     * // Get one QueryLog
     * const queryLog = await prisma.queryLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QueryLogFindUniqueArgs>(args: SelectSubset<T, QueryLogFindUniqueArgs<ExtArgs>>): Prisma__QueryLogClient<$Result.GetResult<Prisma.$QueryLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QueryLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QueryLogFindUniqueOrThrowArgs} args - Arguments to find a QueryLog
     * @example
     * // Get one QueryLog
     * const queryLog = await prisma.queryLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QueryLogFindUniqueOrThrowArgs>(args: SelectSubset<T, QueryLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QueryLogClient<$Result.GetResult<Prisma.$QueryLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QueryLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueryLogFindFirstArgs} args - Arguments to find a QueryLog
     * @example
     * // Get one QueryLog
     * const queryLog = await prisma.queryLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QueryLogFindFirstArgs>(args?: SelectSubset<T, QueryLogFindFirstArgs<ExtArgs>>): Prisma__QueryLogClient<$Result.GetResult<Prisma.$QueryLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QueryLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueryLogFindFirstOrThrowArgs} args - Arguments to find a QueryLog
     * @example
     * // Get one QueryLog
     * const queryLog = await prisma.queryLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QueryLogFindFirstOrThrowArgs>(args?: SelectSubset<T, QueryLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__QueryLogClient<$Result.GetResult<Prisma.$QueryLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QueryLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueryLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QueryLogs
     * const queryLogs = await prisma.queryLog.findMany()
     * 
     * // Get first 10 QueryLogs
     * const queryLogs = await prisma.queryLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const queryLogWithIdOnly = await prisma.queryLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QueryLogFindManyArgs>(args?: SelectSubset<T, QueryLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueryLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QueryLog.
     * @param {QueryLogCreateArgs} args - Arguments to create a QueryLog.
     * @example
     * // Create one QueryLog
     * const QueryLog = await prisma.queryLog.create({
     *   data: {
     *     // ... data to create a QueryLog
     *   }
     * })
     * 
     */
    create<T extends QueryLogCreateArgs>(args: SelectSubset<T, QueryLogCreateArgs<ExtArgs>>): Prisma__QueryLogClient<$Result.GetResult<Prisma.$QueryLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QueryLogs.
     * @param {QueryLogCreateManyArgs} args - Arguments to create many QueryLogs.
     * @example
     * // Create many QueryLogs
     * const queryLog = await prisma.queryLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QueryLogCreateManyArgs>(args?: SelectSubset<T, QueryLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QueryLogs and returns the data saved in the database.
     * @param {QueryLogCreateManyAndReturnArgs} args - Arguments to create many QueryLogs.
     * @example
     * // Create many QueryLogs
     * const queryLog = await prisma.queryLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QueryLogs and only return the `id`
     * const queryLogWithIdOnly = await prisma.queryLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QueryLogCreateManyAndReturnArgs>(args?: SelectSubset<T, QueryLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueryLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QueryLog.
     * @param {QueryLogDeleteArgs} args - Arguments to delete one QueryLog.
     * @example
     * // Delete one QueryLog
     * const QueryLog = await prisma.queryLog.delete({
     *   where: {
     *     // ... filter to delete one QueryLog
     *   }
     * })
     * 
     */
    delete<T extends QueryLogDeleteArgs>(args: SelectSubset<T, QueryLogDeleteArgs<ExtArgs>>): Prisma__QueryLogClient<$Result.GetResult<Prisma.$QueryLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QueryLog.
     * @param {QueryLogUpdateArgs} args - Arguments to update one QueryLog.
     * @example
     * // Update one QueryLog
     * const queryLog = await prisma.queryLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QueryLogUpdateArgs>(args: SelectSubset<T, QueryLogUpdateArgs<ExtArgs>>): Prisma__QueryLogClient<$Result.GetResult<Prisma.$QueryLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QueryLogs.
     * @param {QueryLogDeleteManyArgs} args - Arguments to filter QueryLogs to delete.
     * @example
     * // Delete a few QueryLogs
     * const { count } = await prisma.queryLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QueryLogDeleteManyArgs>(args?: SelectSubset<T, QueryLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QueryLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueryLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QueryLogs
     * const queryLog = await prisma.queryLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QueryLogUpdateManyArgs>(args: SelectSubset<T, QueryLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QueryLogs and returns the data updated in the database.
     * @param {QueryLogUpdateManyAndReturnArgs} args - Arguments to update many QueryLogs.
     * @example
     * // Update many QueryLogs
     * const queryLog = await prisma.queryLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QueryLogs and only return the `id`
     * const queryLogWithIdOnly = await prisma.queryLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QueryLogUpdateManyAndReturnArgs>(args: SelectSubset<T, QueryLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueryLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QueryLog.
     * @param {QueryLogUpsertArgs} args - Arguments to update or create a QueryLog.
     * @example
     * // Update or create a QueryLog
     * const queryLog = await prisma.queryLog.upsert({
     *   create: {
     *     // ... data to create a QueryLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QueryLog we want to update
     *   }
     * })
     */
    upsert<T extends QueryLogUpsertArgs>(args: SelectSubset<T, QueryLogUpsertArgs<ExtArgs>>): Prisma__QueryLogClient<$Result.GetResult<Prisma.$QueryLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QueryLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueryLogCountArgs} args - Arguments to filter QueryLogs to count.
     * @example
     * // Count the number of QueryLogs
     * const count = await prisma.queryLog.count({
     *   where: {
     *     // ... the filter for the QueryLogs we want to count
     *   }
     * })
    **/
    count<T extends QueryLogCountArgs>(
      args?: Subset<T, QueryLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QueryLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QueryLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueryLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QueryLogAggregateArgs>(args: Subset<T, QueryLogAggregateArgs>): Prisma.PrismaPromise<GetQueryLogAggregateType<T>>

    /**
     * Group by QueryLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueryLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QueryLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QueryLogGroupByArgs['orderBy'] }
        : { orderBy?: QueryLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QueryLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQueryLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QueryLog model
   */
  readonly fields: QueryLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QueryLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QueryLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QueryLog model
   */
  interface QueryLogFieldRefs {
    readonly id: FieldRef<"QueryLog", 'Int'>
    readonly userId: FieldRef<"QueryLog", 'Int'>
    readonly query: FieldRef<"QueryLog", 'String'>
    readonly response: FieldRef<"QueryLog", 'String'>
    readonly usedChunks: FieldRef<"QueryLog", 'String'>
    readonly latencyMs: FieldRef<"QueryLog", 'Int'>
    readonly createdAt: FieldRef<"QueryLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QueryLog findUnique
   */
  export type QueryLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryLog
     */
    select?: QueryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueryLog
     */
    omit?: QueryLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryLogInclude<ExtArgs> | null
    /**
     * Filter, which QueryLog to fetch.
     */
    where: QueryLogWhereUniqueInput
  }

  /**
   * QueryLog findUniqueOrThrow
   */
  export type QueryLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryLog
     */
    select?: QueryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueryLog
     */
    omit?: QueryLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryLogInclude<ExtArgs> | null
    /**
     * Filter, which QueryLog to fetch.
     */
    where: QueryLogWhereUniqueInput
  }

  /**
   * QueryLog findFirst
   */
  export type QueryLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryLog
     */
    select?: QueryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueryLog
     */
    omit?: QueryLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryLogInclude<ExtArgs> | null
    /**
     * Filter, which QueryLog to fetch.
     */
    where?: QueryLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueryLogs to fetch.
     */
    orderBy?: QueryLogOrderByWithRelationInput | QueryLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QueryLogs.
     */
    cursor?: QueryLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueryLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueryLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QueryLogs.
     */
    distinct?: QueryLogScalarFieldEnum | QueryLogScalarFieldEnum[]
  }

  /**
   * QueryLog findFirstOrThrow
   */
  export type QueryLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryLog
     */
    select?: QueryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueryLog
     */
    omit?: QueryLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryLogInclude<ExtArgs> | null
    /**
     * Filter, which QueryLog to fetch.
     */
    where?: QueryLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueryLogs to fetch.
     */
    orderBy?: QueryLogOrderByWithRelationInput | QueryLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QueryLogs.
     */
    cursor?: QueryLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueryLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueryLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QueryLogs.
     */
    distinct?: QueryLogScalarFieldEnum | QueryLogScalarFieldEnum[]
  }

  /**
   * QueryLog findMany
   */
  export type QueryLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryLog
     */
    select?: QueryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueryLog
     */
    omit?: QueryLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryLogInclude<ExtArgs> | null
    /**
     * Filter, which QueryLogs to fetch.
     */
    where?: QueryLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueryLogs to fetch.
     */
    orderBy?: QueryLogOrderByWithRelationInput | QueryLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QueryLogs.
     */
    cursor?: QueryLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueryLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueryLogs.
     */
    skip?: number
    distinct?: QueryLogScalarFieldEnum | QueryLogScalarFieldEnum[]
  }

  /**
   * QueryLog create
   */
  export type QueryLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryLog
     */
    select?: QueryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueryLog
     */
    omit?: QueryLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryLogInclude<ExtArgs> | null
    /**
     * The data needed to create a QueryLog.
     */
    data: XOR<QueryLogCreateInput, QueryLogUncheckedCreateInput>
  }

  /**
   * QueryLog createMany
   */
  export type QueryLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QueryLogs.
     */
    data: QueryLogCreateManyInput | QueryLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QueryLog createManyAndReturn
   */
  export type QueryLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryLog
     */
    select?: QueryLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QueryLog
     */
    omit?: QueryLogOmit<ExtArgs> | null
    /**
     * The data used to create many QueryLogs.
     */
    data: QueryLogCreateManyInput | QueryLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QueryLog update
   */
  export type QueryLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryLog
     */
    select?: QueryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueryLog
     */
    omit?: QueryLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryLogInclude<ExtArgs> | null
    /**
     * The data needed to update a QueryLog.
     */
    data: XOR<QueryLogUpdateInput, QueryLogUncheckedUpdateInput>
    /**
     * Choose, which QueryLog to update.
     */
    where: QueryLogWhereUniqueInput
  }

  /**
   * QueryLog updateMany
   */
  export type QueryLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QueryLogs.
     */
    data: XOR<QueryLogUpdateManyMutationInput, QueryLogUncheckedUpdateManyInput>
    /**
     * Filter which QueryLogs to update
     */
    where?: QueryLogWhereInput
    /**
     * Limit how many QueryLogs to update.
     */
    limit?: number
  }

  /**
   * QueryLog updateManyAndReturn
   */
  export type QueryLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryLog
     */
    select?: QueryLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QueryLog
     */
    omit?: QueryLogOmit<ExtArgs> | null
    /**
     * The data used to update QueryLogs.
     */
    data: XOR<QueryLogUpdateManyMutationInput, QueryLogUncheckedUpdateManyInput>
    /**
     * Filter which QueryLogs to update
     */
    where?: QueryLogWhereInput
    /**
     * Limit how many QueryLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * QueryLog upsert
   */
  export type QueryLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryLog
     */
    select?: QueryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueryLog
     */
    omit?: QueryLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryLogInclude<ExtArgs> | null
    /**
     * The filter to search for the QueryLog to update in case it exists.
     */
    where: QueryLogWhereUniqueInput
    /**
     * In case the QueryLog found by the `where` argument doesn't exist, create a new QueryLog with this data.
     */
    create: XOR<QueryLogCreateInput, QueryLogUncheckedCreateInput>
    /**
     * In case the QueryLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QueryLogUpdateInput, QueryLogUncheckedUpdateInput>
  }

  /**
   * QueryLog delete
   */
  export type QueryLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryLog
     */
    select?: QueryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueryLog
     */
    omit?: QueryLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryLogInclude<ExtArgs> | null
    /**
     * Filter which QueryLog to delete.
     */
    where: QueryLogWhereUniqueInput
  }

  /**
   * QueryLog deleteMany
   */
  export type QueryLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QueryLogs to delete
     */
    where?: QueryLogWhereInput
    /**
     * Limit how many QueryLogs to delete.
     */
    limit?: number
  }

  /**
   * QueryLog without action
   */
  export type QueryLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueryLog
     */
    select?: QueryLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueryLog
     */
    omit?: QueryLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueryLogInclude<ExtArgs> | null
  }


  /**
   * Model OAuthToken
   */

  export type AggregateOAuthToken = {
    _count: OAuthTokenCountAggregateOutputType | null
    _avg: OAuthTokenAvgAggregateOutputType | null
    _sum: OAuthTokenSumAggregateOutputType | null
    _min: OAuthTokenMinAggregateOutputType | null
    _max: OAuthTokenMaxAggregateOutputType | null
  }

  export type OAuthTokenAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    sourceId: number | null
  }

  export type OAuthTokenSumAggregateOutputType = {
    id: number | null
    userId: number | null
    sourceId: number | null
  }

  export type OAuthTokenMinAggregateOutputType = {
    id: number | null
    userId: number | null
    sourceId: number | null
    provider: string | null
    refreshToken: string | null
    accessToken: string | null
    scope: string | null
    expiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OAuthTokenMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    sourceId: number | null
    provider: string | null
    refreshToken: string | null
    accessToken: string | null
    scope: string | null
    expiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OAuthTokenCountAggregateOutputType = {
    id: number
    userId: number
    sourceId: number
    provider: number
    refreshToken: number
    accessToken: number
    scope: number
    expiry: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OAuthTokenAvgAggregateInputType = {
    id?: true
    userId?: true
    sourceId?: true
  }

  export type OAuthTokenSumAggregateInputType = {
    id?: true
    userId?: true
    sourceId?: true
  }

  export type OAuthTokenMinAggregateInputType = {
    id?: true
    userId?: true
    sourceId?: true
    provider?: true
    refreshToken?: true
    accessToken?: true
    scope?: true
    expiry?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OAuthTokenMaxAggregateInputType = {
    id?: true
    userId?: true
    sourceId?: true
    provider?: true
    refreshToken?: true
    accessToken?: true
    scope?: true
    expiry?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OAuthTokenCountAggregateInputType = {
    id?: true
    userId?: true
    sourceId?: true
    provider?: true
    refreshToken?: true
    accessToken?: true
    scope?: true
    expiry?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OAuthTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthToken to aggregate.
     */
    where?: OAuthTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthTokens to fetch.
     */
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OAuthTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OAuthTokens
    **/
    _count?: true | OAuthTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OAuthTokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OAuthTokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OAuthTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OAuthTokenMaxAggregateInputType
  }

  export type GetOAuthTokenAggregateType<T extends OAuthTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateOAuthToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOAuthToken[P]>
      : GetScalarType<T[P], AggregateOAuthToken[P]>
  }




  export type OAuthTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthTokenWhereInput
    orderBy?: OAuthTokenOrderByWithAggregationInput | OAuthTokenOrderByWithAggregationInput[]
    by: OAuthTokenScalarFieldEnum[] | OAuthTokenScalarFieldEnum
    having?: OAuthTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OAuthTokenCountAggregateInputType | true
    _avg?: OAuthTokenAvgAggregateInputType
    _sum?: OAuthTokenSumAggregateInputType
    _min?: OAuthTokenMinAggregateInputType
    _max?: OAuthTokenMaxAggregateInputType
  }

  export type OAuthTokenGroupByOutputType = {
    id: number
    userId: number
    sourceId: number | null
    provider: string
    refreshToken: string
    accessToken: string | null
    scope: string | null
    expiry: Date | null
    createdAt: Date
    updatedAt: Date
    _count: OAuthTokenCountAggregateOutputType | null
    _avg: OAuthTokenAvgAggregateOutputType | null
    _sum: OAuthTokenSumAggregateOutputType | null
    _min: OAuthTokenMinAggregateOutputType | null
    _max: OAuthTokenMaxAggregateOutputType | null
  }

  type GetOAuthTokenGroupByPayload<T extends OAuthTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OAuthTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OAuthTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OAuthTokenGroupByOutputType[P]>
            : GetScalarType<T[P], OAuthTokenGroupByOutputType[P]>
        }
      >
    >


  export type OAuthTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sourceId?: boolean
    provider?: boolean
    refreshToken?: boolean
    accessToken?: boolean
    scope?: boolean
    expiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    source?: boolean | OAuthToken$sourceArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthToken"]>

  export type OAuthTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sourceId?: boolean
    provider?: boolean
    refreshToken?: boolean
    accessToken?: boolean
    scope?: boolean
    expiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    source?: boolean | OAuthToken$sourceArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthToken"]>

  export type OAuthTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sourceId?: boolean
    provider?: boolean
    refreshToken?: boolean
    accessToken?: boolean
    scope?: boolean
    expiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    source?: boolean | OAuthToken$sourceArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthToken"]>

  export type OAuthTokenSelectScalar = {
    id?: boolean
    userId?: boolean
    sourceId?: boolean
    provider?: boolean
    refreshToken?: boolean
    accessToken?: boolean
    scope?: boolean
    expiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OAuthTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "sourceId" | "provider" | "refreshToken" | "accessToken" | "scope" | "expiry" | "createdAt" | "updatedAt", ExtArgs["result"]["oAuthToken"]>
  export type OAuthTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    source?: boolean | OAuthToken$sourceArgs<ExtArgs>
  }
  export type OAuthTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    source?: boolean | OAuthToken$sourceArgs<ExtArgs>
  }
  export type OAuthTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    source?: boolean | OAuthToken$sourceArgs<ExtArgs>
  }

  export type $OAuthTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OAuthToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      source: Prisma.$SourcePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      sourceId: number | null
      provider: string
      refreshToken: string
      accessToken: string | null
      scope: string | null
      expiry: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["oAuthToken"]>
    composites: {}
  }

  type OAuthTokenGetPayload<S extends boolean | null | undefined | OAuthTokenDefaultArgs> = $Result.GetResult<Prisma.$OAuthTokenPayload, S>

  type OAuthTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OAuthTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OAuthTokenCountAggregateInputType | true
    }

  export interface OAuthTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OAuthToken'], meta: { name: 'OAuthToken' } }
    /**
     * Find zero or one OAuthToken that matches the filter.
     * @param {OAuthTokenFindUniqueArgs} args - Arguments to find a OAuthToken
     * @example
     * // Get one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OAuthTokenFindUniqueArgs>(args: SelectSubset<T, OAuthTokenFindUniqueArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OAuthToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OAuthTokenFindUniqueOrThrowArgs} args - Arguments to find a OAuthToken
     * @example
     * // Get one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OAuthTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, OAuthTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenFindFirstArgs} args - Arguments to find a OAuthToken
     * @example
     * // Get one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OAuthTokenFindFirstArgs>(args?: SelectSubset<T, OAuthTokenFindFirstArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenFindFirstOrThrowArgs} args - Arguments to find a OAuthToken
     * @example
     * // Get one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OAuthTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, OAuthTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OAuthTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OAuthTokens
     * const oAuthTokens = await prisma.oAuthToken.findMany()
     * 
     * // Get first 10 OAuthTokens
     * const oAuthTokens = await prisma.oAuthToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oAuthTokenWithIdOnly = await prisma.oAuthToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OAuthTokenFindManyArgs>(args?: SelectSubset<T, OAuthTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OAuthToken.
     * @param {OAuthTokenCreateArgs} args - Arguments to create a OAuthToken.
     * @example
     * // Create one OAuthToken
     * const OAuthToken = await prisma.oAuthToken.create({
     *   data: {
     *     // ... data to create a OAuthToken
     *   }
     * })
     * 
     */
    create<T extends OAuthTokenCreateArgs>(args: SelectSubset<T, OAuthTokenCreateArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OAuthTokens.
     * @param {OAuthTokenCreateManyArgs} args - Arguments to create many OAuthTokens.
     * @example
     * // Create many OAuthTokens
     * const oAuthToken = await prisma.oAuthToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OAuthTokenCreateManyArgs>(args?: SelectSubset<T, OAuthTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OAuthTokens and returns the data saved in the database.
     * @param {OAuthTokenCreateManyAndReturnArgs} args - Arguments to create many OAuthTokens.
     * @example
     * // Create many OAuthTokens
     * const oAuthToken = await prisma.oAuthToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OAuthTokens and only return the `id`
     * const oAuthTokenWithIdOnly = await prisma.oAuthToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OAuthTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, OAuthTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OAuthToken.
     * @param {OAuthTokenDeleteArgs} args - Arguments to delete one OAuthToken.
     * @example
     * // Delete one OAuthToken
     * const OAuthToken = await prisma.oAuthToken.delete({
     *   where: {
     *     // ... filter to delete one OAuthToken
     *   }
     * })
     * 
     */
    delete<T extends OAuthTokenDeleteArgs>(args: SelectSubset<T, OAuthTokenDeleteArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OAuthToken.
     * @param {OAuthTokenUpdateArgs} args - Arguments to update one OAuthToken.
     * @example
     * // Update one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OAuthTokenUpdateArgs>(args: SelectSubset<T, OAuthTokenUpdateArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OAuthTokens.
     * @param {OAuthTokenDeleteManyArgs} args - Arguments to filter OAuthTokens to delete.
     * @example
     * // Delete a few OAuthTokens
     * const { count } = await prisma.oAuthToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OAuthTokenDeleteManyArgs>(args?: SelectSubset<T, OAuthTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OAuthTokens
     * const oAuthToken = await prisma.oAuthToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OAuthTokenUpdateManyArgs>(args: SelectSubset<T, OAuthTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthTokens and returns the data updated in the database.
     * @param {OAuthTokenUpdateManyAndReturnArgs} args - Arguments to update many OAuthTokens.
     * @example
     * // Update many OAuthTokens
     * const oAuthToken = await prisma.oAuthToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OAuthTokens and only return the `id`
     * const oAuthTokenWithIdOnly = await prisma.oAuthToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OAuthTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, OAuthTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OAuthToken.
     * @param {OAuthTokenUpsertArgs} args - Arguments to update or create a OAuthToken.
     * @example
     * // Update or create a OAuthToken
     * const oAuthToken = await prisma.oAuthToken.upsert({
     *   create: {
     *     // ... data to create a OAuthToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OAuthToken we want to update
     *   }
     * })
     */
    upsert<T extends OAuthTokenUpsertArgs>(args: SelectSubset<T, OAuthTokenUpsertArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OAuthTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenCountArgs} args - Arguments to filter OAuthTokens to count.
     * @example
     * // Count the number of OAuthTokens
     * const count = await prisma.oAuthToken.count({
     *   where: {
     *     // ... the filter for the OAuthTokens we want to count
     *   }
     * })
    **/
    count<T extends OAuthTokenCountArgs>(
      args?: Subset<T, OAuthTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OAuthTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OAuthToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OAuthTokenAggregateArgs>(args: Subset<T, OAuthTokenAggregateArgs>): Prisma.PrismaPromise<GetOAuthTokenAggregateType<T>>

    /**
     * Group by OAuthToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OAuthTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OAuthTokenGroupByArgs['orderBy'] }
        : { orderBy?: OAuthTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OAuthTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOAuthTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OAuthToken model
   */
  readonly fields: OAuthTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OAuthToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OAuthTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    source<T extends OAuthToken$sourceArgs<ExtArgs> = {}>(args?: Subset<T, OAuthToken$sourceArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OAuthToken model
   */
  interface OAuthTokenFieldRefs {
    readonly id: FieldRef<"OAuthToken", 'Int'>
    readonly userId: FieldRef<"OAuthToken", 'Int'>
    readonly sourceId: FieldRef<"OAuthToken", 'Int'>
    readonly provider: FieldRef<"OAuthToken", 'String'>
    readonly refreshToken: FieldRef<"OAuthToken", 'String'>
    readonly accessToken: FieldRef<"OAuthToken", 'String'>
    readonly scope: FieldRef<"OAuthToken", 'String'>
    readonly expiry: FieldRef<"OAuthToken", 'DateTime'>
    readonly createdAt: FieldRef<"OAuthToken", 'DateTime'>
    readonly updatedAt: FieldRef<"OAuthToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OAuthToken findUnique
   */
  export type OAuthTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthToken to fetch.
     */
    where: OAuthTokenWhereUniqueInput
  }

  /**
   * OAuthToken findUniqueOrThrow
   */
  export type OAuthTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthToken to fetch.
     */
    where: OAuthTokenWhereUniqueInput
  }

  /**
   * OAuthToken findFirst
   */
  export type OAuthTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthToken to fetch.
     */
    where?: OAuthTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthTokens to fetch.
     */
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthTokens.
     */
    cursor?: OAuthTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthTokens.
     */
    distinct?: OAuthTokenScalarFieldEnum | OAuthTokenScalarFieldEnum[]
  }

  /**
   * OAuthToken findFirstOrThrow
   */
  export type OAuthTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthToken to fetch.
     */
    where?: OAuthTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthTokens to fetch.
     */
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthTokens.
     */
    cursor?: OAuthTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthTokens.
     */
    distinct?: OAuthTokenScalarFieldEnum | OAuthTokenScalarFieldEnum[]
  }

  /**
   * OAuthToken findMany
   */
  export type OAuthTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthTokens to fetch.
     */
    where?: OAuthTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthTokens to fetch.
     */
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OAuthTokens.
     */
    cursor?: OAuthTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthTokens.
     */
    skip?: number
    distinct?: OAuthTokenScalarFieldEnum | OAuthTokenScalarFieldEnum[]
  }

  /**
   * OAuthToken create
   */
  export type OAuthTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a OAuthToken.
     */
    data: XOR<OAuthTokenCreateInput, OAuthTokenUncheckedCreateInput>
  }

  /**
   * OAuthToken createMany
   */
  export type OAuthTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OAuthTokens.
     */
    data: OAuthTokenCreateManyInput | OAuthTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OAuthToken createManyAndReturn
   */
  export type OAuthTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * The data used to create many OAuthTokens.
     */
    data: OAuthTokenCreateManyInput | OAuthTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthToken update
   */
  export type OAuthTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a OAuthToken.
     */
    data: XOR<OAuthTokenUpdateInput, OAuthTokenUncheckedUpdateInput>
    /**
     * Choose, which OAuthToken to update.
     */
    where: OAuthTokenWhereUniqueInput
  }

  /**
   * OAuthToken updateMany
   */
  export type OAuthTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OAuthTokens.
     */
    data: XOR<OAuthTokenUpdateManyMutationInput, OAuthTokenUncheckedUpdateManyInput>
    /**
     * Filter which OAuthTokens to update
     */
    where?: OAuthTokenWhereInput
    /**
     * Limit how many OAuthTokens to update.
     */
    limit?: number
  }

  /**
   * OAuthToken updateManyAndReturn
   */
  export type OAuthTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * The data used to update OAuthTokens.
     */
    data: XOR<OAuthTokenUpdateManyMutationInput, OAuthTokenUncheckedUpdateManyInput>
    /**
     * Filter which OAuthTokens to update
     */
    where?: OAuthTokenWhereInput
    /**
     * Limit how many OAuthTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthToken upsert
   */
  export type OAuthTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the OAuthToken to update in case it exists.
     */
    where: OAuthTokenWhereUniqueInput
    /**
     * In case the OAuthToken found by the `where` argument doesn't exist, create a new OAuthToken with this data.
     */
    create: XOR<OAuthTokenCreateInput, OAuthTokenUncheckedCreateInput>
    /**
     * In case the OAuthToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OAuthTokenUpdateInput, OAuthTokenUncheckedUpdateInput>
  }

  /**
   * OAuthToken delete
   */
  export type OAuthTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter which OAuthToken to delete.
     */
    where: OAuthTokenWhereUniqueInput
  }

  /**
   * OAuthToken deleteMany
   */
  export type OAuthTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthTokens to delete
     */
    where?: OAuthTokenWhereInput
    /**
     * Limit how many OAuthTokens to delete.
     */
    limit?: number
  }

  /**
   * OAuthToken.source
   */
  export type OAuthToken$sourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    where?: SourceWhereInput
  }

  /**
   * OAuthToken without action
   */
  export type OAuthTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
  }


  /**
   * Model FileUpload
   */

  export type AggregateFileUpload = {
    _count: FileUploadCountAggregateOutputType | null
    _avg: FileUploadAvgAggregateOutputType | null
    _sum: FileUploadSumAggregateOutputType | null
    _min: FileUploadMinAggregateOutputType | null
    _max: FileUploadMaxAggregateOutputType | null
  }

  export type FileUploadAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    size: number | null
  }

  export type FileUploadSumAggregateOutputType = {
    id: number | null
    userId: number | null
    size: number | null
  }

  export type FileUploadMinAggregateOutputType = {
    id: number | null
    userId: number | null
    filename: string | null
    s3Path: string | null
    size: number | null
    mimeType: string | null
    createdAt: Date | null
  }

  export type FileUploadMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    filename: string | null
    s3Path: string | null
    size: number | null
    mimeType: string | null
    createdAt: Date | null
  }

  export type FileUploadCountAggregateOutputType = {
    id: number
    userId: number
    filename: number
    s3Path: number
    size: number
    mimeType: number
    createdAt: number
    _all: number
  }


  export type FileUploadAvgAggregateInputType = {
    id?: true
    userId?: true
    size?: true
  }

  export type FileUploadSumAggregateInputType = {
    id?: true
    userId?: true
    size?: true
  }

  export type FileUploadMinAggregateInputType = {
    id?: true
    userId?: true
    filename?: true
    s3Path?: true
    size?: true
    mimeType?: true
    createdAt?: true
  }

  export type FileUploadMaxAggregateInputType = {
    id?: true
    userId?: true
    filename?: true
    s3Path?: true
    size?: true
    mimeType?: true
    createdAt?: true
  }

  export type FileUploadCountAggregateInputType = {
    id?: true
    userId?: true
    filename?: true
    s3Path?: true
    size?: true
    mimeType?: true
    createdAt?: true
    _all?: true
  }

  export type FileUploadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FileUpload to aggregate.
     */
    where?: FileUploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FileUploads to fetch.
     */
    orderBy?: FileUploadOrderByWithRelationInput | FileUploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FileUploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FileUploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FileUploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FileUploads
    **/
    _count?: true | FileUploadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FileUploadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FileUploadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FileUploadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FileUploadMaxAggregateInputType
  }

  export type GetFileUploadAggregateType<T extends FileUploadAggregateArgs> = {
        [P in keyof T & keyof AggregateFileUpload]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFileUpload[P]>
      : GetScalarType<T[P], AggregateFileUpload[P]>
  }




  export type FileUploadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileUploadWhereInput
    orderBy?: FileUploadOrderByWithAggregationInput | FileUploadOrderByWithAggregationInput[]
    by: FileUploadScalarFieldEnum[] | FileUploadScalarFieldEnum
    having?: FileUploadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FileUploadCountAggregateInputType | true
    _avg?: FileUploadAvgAggregateInputType
    _sum?: FileUploadSumAggregateInputType
    _min?: FileUploadMinAggregateInputType
    _max?: FileUploadMaxAggregateInputType
  }

  export type FileUploadGroupByOutputType = {
    id: number
    userId: number
    filename: string
    s3Path: string
    size: number | null
    mimeType: string | null
    createdAt: Date
    _count: FileUploadCountAggregateOutputType | null
    _avg: FileUploadAvgAggregateOutputType | null
    _sum: FileUploadSumAggregateOutputType | null
    _min: FileUploadMinAggregateOutputType | null
    _max: FileUploadMaxAggregateOutputType | null
  }

  type GetFileUploadGroupByPayload<T extends FileUploadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FileUploadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FileUploadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FileUploadGroupByOutputType[P]>
            : GetScalarType<T[P], FileUploadGroupByOutputType[P]>
        }
      >
    >


  export type FileUploadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    filename?: boolean
    s3Path?: boolean
    size?: boolean
    mimeType?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fileUpload"]>

  export type FileUploadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    filename?: boolean
    s3Path?: boolean
    size?: boolean
    mimeType?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fileUpload"]>

  export type FileUploadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    filename?: boolean
    s3Path?: boolean
    size?: boolean
    mimeType?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fileUpload"]>

  export type FileUploadSelectScalar = {
    id?: boolean
    userId?: boolean
    filename?: boolean
    s3Path?: boolean
    size?: boolean
    mimeType?: boolean
    createdAt?: boolean
  }

  export type FileUploadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "filename" | "s3Path" | "size" | "mimeType" | "createdAt", ExtArgs["result"]["fileUpload"]>
  export type FileUploadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FileUploadIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FileUploadIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FileUploadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FileUpload"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      filename: string
      s3Path: string
      size: number | null
      mimeType: string | null
      createdAt: Date
    }, ExtArgs["result"]["fileUpload"]>
    composites: {}
  }

  type FileUploadGetPayload<S extends boolean | null | undefined | FileUploadDefaultArgs> = $Result.GetResult<Prisma.$FileUploadPayload, S>

  type FileUploadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FileUploadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FileUploadCountAggregateInputType | true
    }

  export interface FileUploadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FileUpload'], meta: { name: 'FileUpload' } }
    /**
     * Find zero or one FileUpload that matches the filter.
     * @param {FileUploadFindUniqueArgs} args - Arguments to find a FileUpload
     * @example
     * // Get one FileUpload
     * const fileUpload = await prisma.fileUpload.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FileUploadFindUniqueArgs>(args: SelectSubset<T, FileUploadFindUniqueArgs<ExtArgs>>): Prisma__FileUploadClient<$Result.GetResult<Prisma.$FileUploadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FileUpload that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FileUploadFindUniqueOrThrowArgs} args - Arguments to find a FileUpload
     * @example
     * // Get one FileUpload
     * const fileUpload = await prisma.fileUpload.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FileUploadFindUniqueOrThrowArgs>(args: SelectSubset<T, FileUploadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FileUploadClient<$Result.GetResult<Prisma.$FileUploadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FileUpload that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileUploadFindFirstArgs} args - Arguments to find a FileUpload
     * @example
     * // Get one FileUpload
     * const fileUpload = await prisma.fileUpload.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FileUploadFindFirstArgs>(args?: SelectSubset<T, FileUploadFindFirstArgs<ExtArgs>>): Prisma__FileUploadClient<$Result.GetResult<Prisma.$FileUploadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FileUpload that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileUploadFindFirstOrThrowArgs} args - Arguments to find a FileUpload
     * @example
     * // Get one FileUpload
     * const fileUpload = await prisma.fileUpload.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FileUploadFindFirstOrThrowArgs>(args?: SelectSubset<T, FileUploadFindFirstOrThrowArgs<ExtArgs>>): Prisma__FileUploadClient<$Result.GetResult<Prisma.$FileUploadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FileUploads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileUploadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FileUploads
     * const fileUploads = await prisma.fileUpload.findMany()
     * 
     * // Get first 10 FileUploads
     * const fileUploads = await prisma.fileUpload.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fileUploadWithIdOnly = await prisma.fileUpload.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FileUploadFindManyArgs>(args?: SelectSubset<T, FileUploadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FileUploadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FileUpload.
     * @param {FileUploadCreateArgs} args - Arguments to create a FileUpload.
     * @example
     * // Create one FileUpload
     * const FileUpload = await prisma.fileUpload.create({
     *   data: {
     *     // ... data to create a FileUpload
     *   }
     * })
     * 
     */
    create<T extends FileUploadCreateArgs>(args: SelectSubset<T, FileUploadCreateArgs<ExtArgs>>): Prisma__FileUploadClient<$Result.GetResult<Prisma.$FileUploadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FileUploads.
     * @param {FileUploadCreateManyArgs} args - Arguments to create many FileUploads.
     * @example
     * // Create many FileUploads
     * const fileUpload = await prisma.fileUpload.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FileUploadCreateManyArgs>(args?: SelectSubset<T, FileUploadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FileUploads and returns the data saved in the database.
     * @param {FileUploadCreateManyAndReturnArgs} args - Arguments to create many FileUploads.
     * @example
     * // Create many FileUploads
     * const fileUpload = await prisma.fileUpload.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FileUploads and only return the `id`
     * const fileUploadWithIdOnly = await prisma.fileUpload.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FileUploadCreateManyAndReturnArgs>(args?: SelectSubset<T, FileUploadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FileUploadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FileUpload.
     * @param {FileUploadDeleteArgs} args - Arguments to delete one FileUpload.
     * @example
     * // Delete one FileUpload
     * const FileUpload = await prisma.fileUpload.delete({
     *   where: {
     *     // ... filter to delete one FileUpload
     *   }
     * })
     * 
     */
    delete<T extends FileUploadDeleteArgs>(args: SelectSubset<T, FileUploadDeleteArgs<ExtArgs>>): Prisma__FileUploadClient<$Result.GetResult<Prisma.$FileUploadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FileUpload.
     * @param {FileUploadUpdateArgs} args - Arguments to update one FileUpload.
     * @example
     * // Update one FileUpload
     * const fileUpload = await prisma.fileUpload.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FileUploadUpdateArgs>(args: SelectSubset<T, FileUploadUpdateArgs<ExtArgs>>): Prisma__FileUploadClient<$Result.GetResult<Prisma.$FileUploadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FileUploads.
     * @param {FileUploadDeleteManyArgs} args - Arguments to filter FileUploads to delete.
     * @example
     * // Delete a few FileUploads
     * const { count } = await prisma.fileUpload.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FileUploadDeleteManyArgs>(args?: SelectSubset<T, FileUploadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FileUploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileUploadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FileUploads
     * const fileUpload = await prisma.fileUpload.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FileUploadUpdateManyArgs>(args: SelectSubset<T, FileUploadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FileUploads and returns the data updated in the database.
     * @param {FileUploadUpdateManyAndReturnArgs} args - Arguments to update many FileUploads.
     * @example
     * // Update many FileUploads
     * const fileUpload = await prisma.fileUpload.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FileUploads and only return the `id`
     * const fileUploadWithIdOnly = await prisma.fileUpload.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FileUploadUpdateManyAndReturnArgs>(args: SelectSubset<T, FileUploadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FileUploadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FileUpload.
     * @param {FileUploadUpsertArgs} args - Arguments to update or create a FileUpload.
     * @example
     * // Update or create a FileUpload
     * const fileUpload = await prisma.fileUpload.upsert({
     *   create: {
     *     // ... data to create a FileUpload
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FileUpload we want to update
     *   }
     * })
     */
    upsert<T extends FileUploadUpsertArgs>(args: SelectSubset<T, FileUploadUpsertArgs<ExtArgs>>): Prisma__FileUploadClient<$Result.GetResult<Prisma.$FileUploadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FileUploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileUploadCountArgs} args - Arguments to filter FileUploads to count.
     * @example
     * // Count the number of FileUploads
     * const count = await prisma.fileUpload.count({
     *   where: {
     *     // ... the filter for the FileUploads we want to count
     *   }
     * })
    **/
    count<T extends FileUploadCountArgs>(
      args?: Subset<T, FileUploadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FileUploadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FileUpload.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileUploadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FileUploadAggregateArgs>(args: Subset<T, FileUploadAggregateArgs>): Prisma.PrismaPromise<GetFileUploadAggregateType<T>>

    /**
     * Group by FileUpload.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileUploadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FileUploadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FileUploadGroupByArgs['orderBy'] }
        : { orderBy?: FileUploadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FileUploadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFileUploadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FileUpload model
   */
  readonly fields: FileUploadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FileUpload.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FileUploadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FileUpload model
   */
  interface FileUploadFieldRefs {
    readonly id: FieldRef<"FileUpload", 'Int'>
    readonly userId: FieldRef<"FileUpload", 'Int'>
    readonly filename: FieldRef<"FileUpload", 'String'>
    readonly s3Path: FieldRef<"FileUpload", 'String'>
    readonly size: FieldRef<"FileUpload", 'Int'>
    readonly mimeType: FieldRef<"FileUpload", 'String'>
    readonly createdAt: FieldRef<"FileUpload", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FileUpload findUnique
   */
  export type FileUploadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadInclude<ExtArgs> | null
    /**
     * Filter, which FileUpload to fetch.
     */
    where: FileUploadWhereUniqueInput
  }

  /**
   * FileUpload findUniqueOrThrow
   */
  export type FileUploadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadInclude<ExtArgs> | null
    /**
     * Filter, which FileUpload to fetch.
     */
    where: FileUploadWhereUniqueInput
  }

  /**
   * FileUpload findFirst
   */
  export type FileUploadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadInclude<ExtArgs> | null
    /**
     * Filter, which FileUpload to fetch.
     */
    where?: FileUploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FileUploads to fetch.
     */
    orderBy?: FileUploadOrderByWithRelationInput | FileUploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FileUploads.
     */
    cursor?: FileUploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FileUploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FileUploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FileUploads.
     */
    distinct?: FileUploadScalarFieldEnum | FileUploadScalarFieldEnum[]
  }

  /**
   * FileUpload findFirstOrThrow
   */
  export type FileUploadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadInclude<ExtArgs> | null
    /**
     * Filter, which FileUpload to fetch.
     */
    where?: FileUploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FileUploads to fetch.
     */
    orderBy?: FileUploadOrderByWithRelationInput | FileUploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FileUploads.
     */
    cursor?: FileUploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FileUploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FileUploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FileUploads.
     */
    distinct?: FileUploadScalarFieldEnum | FileUploadScalarFieldEnum[]
  }

  /**
   * FileUpload findMany
   */
  export type FileUploadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadInclude<ExtArgs> | null
    /**
     * Filter, which FileUploads to fetch.
     */
    where?: FileUploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FileUploads to fetch.
     */
    orderBy?: FileUploadOrderByWithRelationInput | FileUploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FileUploads.
     */
    cursor?: FileUploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FileUploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FileUploads.
     */
    skip?: number
    distinct?: FileUploadScalarFieldEnum | FileUploadScalarFieldEnum[]
  }

  /**
   * FileUpload create
   */
  export type FileUploadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadInclude<ExtArgs> | null
    /**
     * The data needed to create a FileUpload.
     */
    data: XOR<FileUploadCreateInput, FileUploadUncheckedCreateInput>
  }

  /**
   * FileUpload createMany
   */
  export type FileUploadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FileUploads.
     */
    data: FileUploadCreateManyInput | FileUploadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FileUpload createManyAndReturn
   */
  export type FileUploadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * The data used to create many FileUploads.
     */
    data: FileUploadCreateManyInput | FileUploadCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FileUpload update
   */
  export type FileUploadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadInclude<ExtArgs> | null
    /**
     * The data needed to update a FileUpload.
     */
    data: XOR<FileUploadUpdateInput, FileUploadUncheckedUpdateInput>
    /**
     * Choose, which FileUpload to update.
     */
    where: FileUploadWhereUniqueInput
  }

  /**
   * FileUpload updateMany
   */
  export type FileUploadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FileUploads.
     */
    data: XOR<FileUploadUpdateManyMutationInput, FileUploadUncheckedUpdateManyInput>
    /**
     * Filter which FileUploads to update
     */
    where?: FileUploadWhereInput
    /**
     * Limit how many FileUploads to update.
     */
    limit?: number
  }

  /**
   * FileUpload updateManyAndReturn
   */
  export type FileUploadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * The data used to update FileUploads.
     */
    data: XOR<FileUploadUpdateManyMutationInput, FileUploadUncheckedUpdateManyInput>
    /**
     * Filter which FileUploads to update
     */
    where?: FileUploadWhereInput
    /**
     * Limit how many FileUploads to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FileUpload upsert
   */
  export type FileUploadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadInclude<ExtArgs> | null
    /**
     * The filter to search for the FileUpload to update in case it exists.
     */
    where: FileUploadWhereUniqueInput
    /**
     * In case the FileUpload found by the `where` argument doesn't exist, create a new FileUpload with this data.
     */
    create: XOR<FileUploadCreateInput, FileUploadUncheckedCreateInput>
    /**
     * In case the FileUpload was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FileUploadUpdateInput, FileUploadUncheckedUpdateInput>
  }

  /**
   * FileUpload delete
   */
  export type FileUploadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadInclude<ExtArgs> | null
    /**
     * Filter which FileUpload to delete.
     */
    where: FileUploadWhereUniqueInput
  }

  /**
   * FileUpload deleteMany
   */
  export type FileUploadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FileUploads to delete
     */
    where?: FileUploadWhereInput
    /**
     * Limit how many FileUploads to delete.
     */
    limit?: number
  }

  /**
   * FileUpload without action
   */
  export type FileUploadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type AuditLogSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: number | null
    userId: number | null
    action: string | null
    ip: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    action: string | null
    ip: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    userId: number
    action: number
    details: number
    ip: number
    createdAt: number
    _all: number
  }


  export type AuditLogAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type AuditLogSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type AuditLogMinAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    ip?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    ip?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    details?: true
    ip?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuditLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuditLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _avg?: AuditLogAvgAggregateInputType
    _sum?: AuditLogSumAggregateInputType
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: number
    userId: number | null
    action: string
    details: JsonValue | null
    ip: string | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    details?: boolean
    ip?: boolean
    createdAt?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    details?: boolean
    ip?: boolean
    createdAt?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    details?: boolean
    ip?: boolean
    createdAt?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    userId?: boolean
    action?: boolean
    details?: boolean
    ip?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "action" | "details" | "ip" | "createdAt", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number | null
      action: string
      details: Prisma.JsonValue | null
      ip: string | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AuditLog$userArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'Int'>
    readonly userId: FieldRef<"AuditLog", 'Int'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly details: FieldRef<"AuditLog", 'Json'>
    readonly ip: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog.user
   */
  export type AuditLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    displayName: 'displayName',
    imageUrl: 'imageUrl',
    timezone: 'timezone',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SourceScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    provider: 'provider',
    providerId: 'providerId',
    displayName: 'displayName',
    config: 'config',
    encryptedToken: 'encryptedToken',
    connectedAt: 'connectedAt',
    createdAt: 'createdAt'
  };

  export type SourceScalarFieldEnum = (typeof SourceScalarFieldEnum)[keyof typeof SourceScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    sourceId: 'sourceId',
    title: 'title',
    docType: 'docType',
    s3Path: 's3Path',
    size: 'size',
    language: 'language',
    hash: 'hash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const ChunkScalarFieldEnum: {
    id: 'id',
    documentId: 'documentId',
    userId: 'userId',
    text: 'text',
    chunkHash: 'chunkHash',
    startPos: 'startPos',
    endPos: 'endPos',
    tokenCount: 'tokenCount',
    embeddingId: 'embeddingId',
    createdAt: 'createdAt'
  };

  export type ChunkScalarFieldEnum = (typeof ChunkScalarFieldEnum)[keyof typeof ChunkScalarFieldEnum]


  export const EmbeddingScalarFieldEnum: {
    id: 'id',
    chunkId: 'chunkId',
    model: 'model',
    vectorRef: 'vectorRef',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type EmbeddingScalarFieldEnum = (typeof EmbeddingScalarFieldEnum)[keyof typeof EmbeddingScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    description: 'description',
    dueAt: 'dueAt',
    completed: 'completed',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const ReminderScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    text: 'text',
    remindAt: 'remindAt',
    sent: 'sent',
    createdAt: 'createdAt'
  };

  export type ReminderScalarFieldEnum = (typeof ReminderScalarFieldEnum)[keyof typeof ReminderScalarFieldEnum]


  export const QueryLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    query: 'query',
    response: 'response',
    usedChunks: 'usedChunks',
    latencyMs: 'latencyMs',
    createdAt: 'createdAt'
  };

  export type QueryLogScalarFieldEnum = (typeof QueryLogScalarFieldEnum)[keyof typeof QueryLogScalarFieldEnum]


  export const OAuthTokenScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    sourceId: 'sourceId',
    provider: 'provider',
    refreshToken: 'refreshToken',
    accessToken: 'accessToken',
    scope: 'scope',
    expiry: 'expiry',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OAuthTokenScalarFieldEnum = (typeof OAuthTokenScalarFieldEnum)[keyof typeof OAuthTokenScalarFieldEnum]


  export const FileUploadScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    filename: 'filename',
    s3Path: 's3Path',
    size: 'size',
    mimeType: 'mimeType',
    createdAt: 'createdAt'
  };

  export type FileUploadScalarFieldEnum = (typeof FileUploadScalarFieldEnum)[keyof typeof FileUploadScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    details: 'details',
    ip: 'ip',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    displayName?: StringNullableFilter<"User"> | string | null
    imageUrl?: StringNullableFilter<"User"> | string | null
    timezone?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sources?: SourceListRelationFilter
    documents?: DocumentListRelationFilter
    tasks?: TaskListRelationFilter
    reminders?: ReminderListRelationFilter
    queries?: QueryLogListRelationFilter
    oauthTokens?: OAuthTokenListRelationFilter
    audits?: AuditLogListRelationFilter
    fileUploads?: FileUploadListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    displayName?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    timezone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sources?: SourceOrderByRelationAggregateInput
    documents?: DocumentOrderByRelationAggregateInput
    tasks?: TaskOrderByRelationAggregateInput
    reminders?: ReminderOrderByRelationAggregateInput
    queries?: QueryLogOrderByRelationAggregateInput
    oauthTokens?: OAuthTokenOrderByRelationAggregateInput
    audits?: AuditLogOrderByRelationAggregateInput
    fileUploads?: FileUploadOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    displayName?: StringNullableFilter<"User"> | string | null
    imageUrl?: StringNullableFilter<"User"> | string | null
    timezone?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sources?: SourceListRelationFilter
    documents?: DocumentListRelationFilter
    tasks?: TaskListRelationFilter
    reminders?: ReminderListRelationFilter
    queries?: QueryLogListRelationFilter
    oauthTokens?: OAuthTokenListRelationFilter
    audits?: AuditLogListRelationFilter
    fileUploads?: FileUploadListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    displayName?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    timezone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    displayName?: StringNullableWithAggregatesFilter<"User"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    timezone?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SourceWhereInput = {
    AND?: SourceWhereInput | SourceWhereInput[]
    OR?: SourceWhereInput[]
    NOT?: SourceWhereInput | SourceWhereInput[]
    id?: IntFilter<"Source"> | number
    userId?: IntFilter<"Source"> | number
    provider?: StringFilter<"Source"> | string
    providerId?: StringNullableFilter<"Source"> | string | null
    displayName?: StringNullableFilter<"Source"> | string | null
    config?: JsonNullableFilter<"Source">
    encryptedToken?: StringNullableFilter<"Source"> | string | null
    connectedAt?: DateTimeNullableFilter<"Source"> | Date | string | null
    createdAt?: DateTimeFilter<"Source"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    documents?: DocumentListRelationFilter
    oauthTokens?: OAuthTokenListRelationFilter
  }

  export type SourceOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrderInput | SortOrder
    displayName?: SortOrderInput | SortOrder
    config?: SortOrderInput | SortOrder
    encryptedToken?: SortOrderInput | SortOrder
    connectedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    documents?: DocumentOrderByRelationAggregateInput
    oauthTokens?: OAuthTokenOrderByRelationAggregateInput
  }

  export type SourceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SourceWhereInput | SourceWhereInput[]
    OR?: SourceWhereInput[]
    NOT?: SourceWhereInput | SourceWhereInput[]
    userId?: IntFilter<"Source"> | number
    provider?: StringFilter<"Source"> | string
    providerId?: StringNullableFilter<"Source"> | string | null
    displayName?: StringNullableFilter<"Source"> | string | null
    config?: JsonNullableFilter<"Source">
    encryptedToken?: StringNullableFilter<"Source"> | string | null
    connectedAt?: DateTimeNullableFilter<"Source"> | Date | string | null
    createdAt?: DateTimeFilter<"Source"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    documents?: DocumentListRelationFilter
    oauthTokens?: OAuthTokenListRelationFilter
  }, "id">

  export type SourceOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrderInput | SortOrder
    displayName?: SortOrderInput | SortOrder
    config?: SortOrderInput | SortOrder
    encryptedToken?: SortOrderInput | SortOrder
    connectedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SourceCountOrderByAggregateInput
    _avg?: SourceAvgOrderByAggregateInput
    _max?: SourceMaxOrderByAggregateInput
    _min?: SourceMinOrderByAggregateInput
    _sum?: SourceSumOrderByAggregateInput
  }

  export type SourceScalarWhereWithAggregatesInput = {
    AND?: SourceScalarWhereWithAggregatesInput | SourceScalarWhereWithAggregatesInput[]
    OR?: SourceScalarWhereWithAggregatesInput[]
    NOT?: SourceScalarWhereWithAggregatesInput | SourceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Source"> | number
    userId?: IntWithAggregatesFilter<"Source"> | number
    provider?: StringWithAggregatesFilter<"Source"> | string
    providerId?: StringNullableWithAggregatesFilter<"Source"> | string | null
    displayName?: StringNullableWithAggregatesFilter<"Source"> | string | null
    config?: JsonNullableWithAggregatesFilter<"Source">
    encryptedToken?: StringNullableWithAggregatesFilter<"Source"> | string | null
    connectedAt?: DateTimeNullableWithAggregatesFilter<"Source"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Source"> | Date | string
  }

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: IntFilter<"Document"> | number
    userId?: IntFilter<"Document"> | number
    sourceId?: IntNullableFilter<"Document"> | number | null
    title?: StringFilter<"Document"> | string
    docType?: StringFilter<"Document"> | string
    s3Path?: StringFilter<"Document"> | string
    size?: IntNullableFilter<"Document"> | number | null
    language?: StringNullableFilter<"Document"> | string | null
    hash?: StringNullableFilter<"Document"> | string | null
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    chunks?: ChunkListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    source?: XOR<SourceNullableScalarRelationFilter, SourceWhereInput> | null
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceId?: SortOrderInput | SortOrder
    title?: SortOrder
    docType?: SortOrder
    s3Path?: SortOrder
    size?: SortOrderInput | SortOrder
    language?: SortOrderInput | SortOrder
    hash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    chunks?: ChunkOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
    source?: SourceOrderByWithRelationInput
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    hash?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    userId?: IntFilter<"Document"> | number
    sourceId?: IntNullableFilter<"Document"> | number | null
    title?: StringFilter<"Document"> | string
    docType?: StringFilter<"Document"> | string
    s3Path?: StringFilter<"Document"> | string
    size?: IntNullableFilter<"Document"> | number | null
    language?: StringNullableFilter<"Document"> | string | null
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    chunks?: ChunkListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    source?: XOR<SourceNullableScalarRelationFilter, SourceWhereInput> | null
  }, "id" | "hash">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceId?: SortOrderInput | SortOrder
    title?: SortOrder
    docType?: SortOrder
    s3Path?: SortOrder
    size?: SortOrderInput | SortOrder
    language?: SortOrderInput | SortOrder
    hash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _avg?: DocumentAvgOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
    _sum?: DocumentSumOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Document"> | number
    userId?: IntWithAggregatesFilter<"Document"> | number
    sourceId?: IntNullableWithAggregatesFilter<"Document"> | number | null
    title?: StringWithAggregatesFilter<"Document"> | string
    docType?: StringWithAggregatesFilter<"Document"> | string
    s3Path?: StringWithAggregatesFilter<"Document"> | string
    size?: IntNullableWithAggregatesFilter<"Document"> | number | null
    language?: StringNullableWithAggregatesFilter<"Document"> | string | null
    hash?: StringNullableWithAggregatesFilter<"Document"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
  }

  export type ChunkWhereInput = {
    AND?: ChunkWhereInput | ChunkWhereInput[]
    OR?: ChunkWhereInput[]
    NOT?: ChunkWhereInput | ChunkWhereInput[]
    id?: IntFilter<"Chunk"> | number
    documentId?: IntFilter<"Chunk"> | number
    userId?: IntFilter<"Chunk"> | number
    text?: StringFilter<"Chunk"> | string
    chunkHash?: StringFilter<"Chunk"> | string
    startPos?: IntNullableFilter<"Chunk"> | number | null
    endPos?: IntNullableFilter<"Chunk"> | number | null
    tokenCount?: IntNullableFilter<"Chunk"> | number | null
    embeddingId?: IntNullableFilter<"Chunk"> | number | null
    createdAt?: DateTimeFilter<"Chunk"> | Date | string
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
    embedding?: XOR<EmbeddingNullableScalarRelationFilter, EmbeddingWhereInput> | null
  }

  export type ChunkOrderByWithRelationInput = {
    id?: SortOrder
    documentId?: SortOrder
    userId?: SortOrder
    text?: SortOrder
    chunkHash?: SortOrder
    startPos?: SortOrderInput | SortOrder
    endPos?: SortOrderInput | SortOrder
    tokenCount?: SortOrderInput | SortOrder
    embeddingId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    document?: DocumentOrderByWithRelationInput
    embedding?: EmbeddingOrderByWithRelationInput
  }

  export type ChunkWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    chunkHash?: string
    AND?: ChunkWhereInput | ChunkWhereInput[]
    OR?: ChunkWhereInput[]
    NOT?: ChunkWhereInput | ChunkWhereInput[]
    documentId?: IntFilter<"Chunk"> | number
    userId?: IntFilter<"Chunk"> | number
    text?: StringFilter<"Chunk"> | string
    startPos?: IntNullableFilter<"Chunk"> | number | null
    endPos?: IntNullableFilter<"Chunk"> | number | null
    tokenCount?: IntNullableFilter<"Chunk"> | number | null
    embeddingId?: IntNullableFilter<"Chunk"> | number | null
    createdAt?: DateTimeFilter<"Chunk"> | Date | string
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
    embedding?: XOR<EmbeddingNullableScalarRelationFilter, EmbeddingWhereInput> | null
  }, "id" | "chunkHash">

  export type ChunkOrderByWithAggregationInput = {
    id?: SortOrder
    documentId?: SortOrder
    userId?: SortOrder
    text?: SortOrder
    chunkHash?: SortOrder
    startPos?: SortOrderInput | SortOrder
    endPos?: SortOrderInput | SortOrder
    tokenCount?: SortOrderInput | SortOrder
    embeddingId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ChunkCountOrderByAggregateInput
    _avg?: ChunkAvgOrderByAggregateInput
    _max?: ChunkMaxOrderByAggregateInput
    _min?: ChunkMinOrderByAggregateInput
    _sum?: ChunkSumOrderByAggregateInput
  }

  export type ChunkScalarWhereWithAggregatesInput = {
    AND?: ChunkScalarWhereWithAggregatesInput | ChunkScalarWhereWithAggregatesInput[]
    OR?: ChunkScalarWhereWithAggregatesInput[]
    NOT?: ChunkScalarWhereWithAggregatesInput | ChunkScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Chunk"> | number
    documentId?: IntWithAggregatesFilter<"Chunk"> | number
    userId?: IntWithAggregatesFilter<"Chunk"> | number
    text?: StringWithAggregatesFilter<"Chunk"> | string
    chunkHash?: StringWithAggregatesFilter<"Chunk"> | string
    startPos?: IntNullableWithAggregatesFilter<"Chunk"> | number | null
    endPos?: IntNullableWithAggregatesFilter<"Chunk"> | number | null
    tokenCount?: IntNullableWithAggregatesFilter<"Chunk"> | number | null
    embeddingId?: IntNullableWithAggregatesFilter<"Chunk"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Chunk"> | Date | string
  }

  export type EmbeddingWhereInput = {
    AND?: EmbeddingWhereInput | EmbeddingWhereInput[]
    OR?: EmbeddingWhereInput[]
    NOT?: EmbeddingWhereInput | EmbeddingWhereInput[]
    id?: IntFilter<"Embedding"> | number
    chunkId?: IntFilter<"Embedding"> | number
    model?: StringNullableFilter<"Embedding"> | string | null
    vectorRef?: StringNullableFilter<"Embedding"> | string | null
    metadata?: JsonNullableFilter<"Embedding">
    createdAt?: DateTimeFilter<"Embedding"> | Date | string
    chunk?: XOR<ChunkScalarRelationFilter, ChunkWhereInput>
  }

  export type EmbeddingOrderByWithRelationInput = {
    id?: SortOrder
    chunkId?: SortOrder
    model?: SortOrderInput | SortOrder
    vectorRef?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    chunk?: ChunkOrderByWithRelationInput
  }

  export type EmbeddingWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    chunkId?: number
    AND?: EmbeddingWhereInput | EmbeddingWhereInput[]
    OR?: EmbeddingWhereInput[]
    NOT?: EmbeddingWhereInput | EmbeddingWhereInput[]
    model?: StringNullableFilter<"Embedding"> | string | null
    vectorRef?: StringNullableFilter<"Embedding"> | string | null
    metadata?: JsonNullableFilter<"Embedding">
    createdAt?: DateTimeFilter<"Embedding"> | Date | string
    chunk?: XOR<ChunkScalarRelationFilter, ChunkWhereInput>
  }, "id" | "chunkId">

  export type EmbeddingOrderByWithAggregationInput = {
    id?: SortOrder
    chunkId?: SortOrder
    model?: SortOrderInput | SortOrder
    vectorRef?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: EmbeddingCountOrderByAggregateInput
    _avg?: EmbeddingAvgOrderByAggregateInput
    _max?: EmbeddingMaxOrderByAggregateInput
    _min?: EmbeddingMinOrderByAggregateInput
    _sum?: EmbeddingSumOrderByAggregateInput
  }

  export type EmbeddingScalarWhereWithAggregatesInput = {
    AND?: EmbeddingScalarWhereWithAggregatesInput | EmbeddingScalarWhereWithAggregatesInput[]
    OR?: EmbeddingScalarWhereWithAggregatesInput[]
    NOT?: EmbeddingScalarWhereWithAggregatesInput | EmbeddingScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Embedding"> | number
    chunkId?: IntWithAggregatesFilter<"Embedding"> | number
    model?: StringNullableWithAggregatesFilter<"Embedding"> | string | null
    vectorRef?: StringNullableWithAggregatesFilter<"Embedding"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"Embedding">
    createdAt?: DateTimeWithAggregatesFilter<"Embedding"> | Date | string
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: IntFilter<"Task"> | number
    userId?: IntFilter<"Task"> | number
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    dueAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    completed?: BoolFilter<"Task"> | boolean
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    dueAt?: SortOrderInput | SortOrder
    completed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    userId?: IntFilter<"Task"> | number
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    dueAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    completed?: BoolFilter<"Task"> | boolean
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    dueAt?: SortOrderInput | SortOrder
    completed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Task"> | number
    userId?: IntWithAggregatesFilter<"Task"> | number
    title?: StringWithAggregatesFilter<"Task"> | string
    description?: StringNullableWithAggregatesFilter<"Task"> | string | null
    dueAt?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    completed?: BoolWithAggregatesFilter<"Task"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
  }

  export type ReminderWhereInput = {
    AND?: ReminderWhereInput | ReminderWhereInput[]
    OR?: ReminderWhereInput[]
    NOT?: ReminderWhereInput | ReminderWhereInput[]
    id?: IntFilter<"Reminder"> | number
    userId?: IntFilter<"Reminder"> | number
    text?: StringFilter<"Reminder"> | string
    remindAt?: DateTimeFilter<"Reminder"> | Date | string
    sent?: BoolFilter<"Reminder"> | boolean
    createdAt?: DateTimeFilter<"Reminder"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ReminderOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    text?: SortOrder
    remindAt?: SortOrder
    sent?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ReminderWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ReminderWhereInput | ReminderWhereInput[]
    OR?: ReminderWhereInput[]
    NOT?: ReminderWhereInput | ReminderWhereInput[]
    userId?: IntFilter<"Reminder"> | number
    text?: StringFilter<"Reminder"> | string
    remindAt?: DateTimeFilter<"Reminder"> | Date | string
    sent?: BoolFilter<"Reminder"> | boolean
    createdAt?: DateTimeFilter<"Reminder"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ReminderOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    text?: SortOrder
    remindAt?: SortOrder
    sent?: SortOrder
    createdAt?: SortOrder
    _count?: ReminderCountOrderByAggregateInput
    _avg?: ReminderAvgOrderByAggregateInput
    _max?: ReminderMaxOrderByAggregateInput
    _min?: ReminderMinOrderByAggregateInput
    _sum?: ReminderSumOrderByAggregateInput
  }

  export type ReminderScalarWhereWithAggregatesInput = {
    AND?: ReminderScalarWhereWithAggregatesInput | ReminderScalarWhereWithAggregatesInput[]
    OR?: ReminderScalarWhereWithAggregatesInput[]
    NOT?: ReminderScalarWhereWithAggregatesInput | ReminderScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Reminder"> | number
    userId?: IntWithAggregatesFilter<"Reminder"> | number
    text?: StringWithAggregatesFilter<"Reminder"> | string
    remindAt?: DateTimeWithAggregatesFilter<"Reminder"> | Date | string
    sent?: BoolWithAggregatesFilter<"Reminder"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Reminder"> | Date | string
  }

  export type QueryLogWhereInput = {
    AND?: QueryLogWhereInput | QueryLogWhereInput[]
    OR?: QueryLogWhereInput[]
    NOT?: QueryLogWhereInput | QueryLogWhereInput[]
    id?: IntFilter<"QueryLog"> | number
    userId?: IntFilter<"QueryLog"> | number
    query?: StringFilter<"QueryLog"> | string
    response?: StringNullableFilter<"QueryLog"> | string | null
    usedChunks?: StringNullableFilter<"QueryLog"> | string | null
    latencyMs?: IntNullableFilter<"QueryLog"> | number | null
    createdAt?: DateTimeFilter<"QueryLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type QueryLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    query?: SortOrder
    response?: SortOrderInput | SortOrder
    usedChunks?: SortOrderInput | SortOrder
    latencyMs?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type QueryLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: QueryLogWhereInput | QueryLogWhereInput[]
    OR?: QueryLogWhereInput[]
    NOT?: QueryLogWhereInput | QueryLogWhereInput[]
    userId?: IntFilter<"QueryLog"> | number
    query?: StringFilter<"QueryLog"> | string
    response?: StringNullableFilter<"QueryLog"> | string | null
    usedChunks?: StringNullableFilter<"QueryLog"> | string | null
    latencyMs?: IntNullableFilter<"QueryLog"> | number | null
    createdAt?: DateTimeFilter<"QueryLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type QueryLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    query?: SortOrder
    response?: SortOrderInput | SortOrder
    usedChunks?: SortOrderInput | SortOrder
    latencyMs?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: QueryLogCountOrderByAggregateInput
    _avg?: QueryLogAvgOrderByAggregateInput
    _max?: QueryLogMaxOrderByAggregateInput
    _min?: QueryLogMinOrderByAggregateInput
    _sum?: QueryLogSumOrderByAggregateInput
  }

  export type QueryLogScalarWhereWithAggregatesInput = {
    AND?: QueryLogScalarWhereWithAggregatesInput | QueryLogScalarWhereWithAggregatesInput[]
    OR?: QueryLogScalarWhereWithAggregatesInput[]
    NOT?: QueryLogScalarWhereWithAggregatesInput | QueryLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"QueryLog"> | number
    userId?: IntWithAggregatesFilter<"QueryLog"> | number
    query?: StringWithAggregatesFilter<"QueryLog"> | string
    response?: StringNullableWithAggregatesFilter<"QueryLog"> | string | null
    usedChunks?: StringNullableWithAggregatesFilter<"QueryLog"> | string | null
    latencyMs?: IntNullableWithAggregatesFilter<"QueryLog"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"QueryLog"> | Date | string
  }

  export type OAuthTokenWhereInput = {
    AND?: OAuthTokenWhereInput | OAuthTokenWhereInput[]
    OR?: OAuthTokenWhereInput[]
    NOT?: OAuthTokenWhereInput | OAuthTokenWhereInput[]
    id?: IntFilter<"OAuthToken"> | number
    userId?: IntFilter<"OAuthToken"> | number
    sourceId?: IntNullableFilter<"OAuthToken"> | number | null
    provider?: StringFilter<"OAuthToken"> | string
    refreshToken?: StringFilter<"OAuthToken"> | string
    accessToken?: StringNullableFilter<"OAuthToken"> | string | null
    scope?: StringNullableFilter<"OAuthToken"> | string | null
    expiry?: DateTimeNullableFilter<"OAuthToken"> | Date | string | null
    createdAt?: DateTimeFilter<"OAuthToken"> | Date | string
    updatedAt?: DateTimeFilter<"OAuthToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    source?: XOR<SourceNullableScalarRelationFilter, SourceWhereInput> | null
  }

  export type OAuthTokenOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceId?: SortOrderInput | SortOrder
    provider?: SortOrder
    refreshToken?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    expiry?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    source?: SourceOrderByWithRelationInput
  }

  export type OAuthTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OAuthTokenWhereInput | OAuthTokenWhereInput[]
    OR?: OAuthTokenWhereInput[]
    NOT?: OAuthTokenWhereInput | OAuthTokenWhereInput[]
    userId?: IntFilter<"OAuthToken"> | number
    sourceId?: IntNullableFilter<"OAuthToken"> | number | null
    provider?: StringFilter<"OAuthToken"> | string
    refreshToken?: StringFilter<"OAuthToken"> | string
    accessToken?: StringNullableFilter<"OAuthToken"> | string | null
    scope?: StringNullableFilter<"OAuthToken"> | string | null
    expiry?: DateTimeNullableFilter<"OAuthToken"> | Date | string | null
    createdAt?: DateTimeFilter<"OAuthToken"> | Date | string
    updatedAt?: DateTimeFilter<"OAuthToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    source?: XOR<SourceNullableScalarRelationFilter, SourceWhereInput> | null
  }, "id">

  export type OAuthTokenOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceId?: SortOrderInput | SortOrder
    provider?: SortOrder
    refreshToken?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    expiry?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OAuthTokenCountOrderByAggregateInput
    _avg?: OAuthTokenAvgOrderByAggregateInput
    _max?: OAuthTokenMaxOrderByAggregateInput
    _min?: OAuthTokenMinOrderByAggregateInput
    _sum?: OAuthTokenSumOrderByAggregateInput
  }

  export type OAuthTokenScalarWhereWithAggregatesInput = {
    AND?: OAuthTokenScalarWhereWithAggregatesInput | OAuthTokenScalarWhereWithAggregatesInput[]
    OR?: OAuthTokenScalarWhereWithAggregatesInput[]
    NOT?: OAuthTokenScalarWhereWithAggregatesInput | OAuthTokenScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OAuthToken"> | number
    userId?: IntWithAggregatesFilter<"OAuthToken"> | number
    sourceId?: IntNullableWithAggregatesFilter<"OAuthToken"> | number | null
    provider?: StringWithAggregatesFilter<"OAuthToken"> | string
    refreshToken?: StringWithAggregatesFilter<"OAuthToken"> | string
    accessToken?: StringNullableWithAggregatesFilter<"OAuthToken"> | string | null
    scope?: StringNullableWithAggregatesFilter<"OAuthToken"> | string | null
    expiry?: DateTimeNullableWithAggregatesFilter<"OAuthToken"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OAuthToken"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"OAuthToken"> | Date | string
  }

  export type FileUploadWhereInput = {
    AND?: FileUploadWhereInput | FileUploadWhereInput[]
    OR?: FileUploadWhereInput[]
    NOT?: FileUploadWhereInput | FileUploadWhereInput[]
    id?: IntFilter<"FileUpload"> | number
    userId?: IntFilter<"FileUpload"> | number
    filename?: StringFilter<"FileUpload"> | string
    s3Path?: StringFilter<"FileUpload"> | string
    size?: IntNullableFilter<"FileUpload"> | number | null
    mimeType?: StringNullableFilter<"FileUpload"> | string | null
    createdAt?: DateTimeFilter<"FileUpload"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FileUploadOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    filename?: SortOrder
    s3Path?: SortOrder
    size?: SortOrderInput | SortOrder
    mimeType?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type FileUploadWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FileUploadWhereInput | FileUploadWhereInput[]
    OR?: FileUploadWhereInput[]
    NOT?: FileUploadWhereInput | FileUploadWhereInput[]
    userId?: IntFilter<"FileUpload"> | number
    filename?: StringFilter<"FileUpload"> | string
    s3Path?: StringFilter<"FileUpload"> | string
    size?: IntNullableFilter<"FileUpload"> | number | null
    mimeType?: StringNullableFilter<"FileUpload"> | string | null
    createdAt?: DateTimeFilter<"FileUpload"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type FileUploadOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    filename?: SortOrder
    s3Path?: SortOrder
    size?: SortOrderInput | SortOrder
    mimeType?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: FileUploadCountOrderByAggregateInput
    _avg?: FileUploadAvgOrderByAggregateInput
    _max?: FileUploadMaxOrderByAggregateInput
    _min?: FileUploadMinOrderByAggregateInput
    _sum?: FileUploadSumOrderByAggregateInput
  }

  export type FileUploadScalarWhereWithAggregatesInput = {
    AND?: FileUploadScalarWhereWithAggregatesInput | FileUploadScalarWhereWithAggregatesInput[]
    OR?: FileUploadScalarWhereWithAggregatesInput[]
    NOT?: FileUploadScalarWhereWithAggregatesInput | FileUploadScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FileUpload"> | number
    userId?: IntWithAggregatesFilter<"FileUpload"> | number
    filename?: StringWithAggregatesFilter<"FileUpload"> | string
    s3Path?: StringWithAggregatesFilter<"FileUpload"> | string
    size?: IntNullableWithAggregatesFilter<"FileUpload"> | number | null
    mimeType?: StringNullableWithAggregatesFilter<"FileUpload"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"FileUpload"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: IntFilter<"AuditLog"> | number
    userId?: IntNullableFilter<"AuditLog"> | number | null
    action?: StringFilter<"AuditLog"> | string
    details?: JsonNullableFilter<"AuditLog">
    ip?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    details?: SortOrderInput | SortOrder
    ip?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    userId?: IntNullableFilter<"AuditLog"> | number | null
    action?: StringFilter<"AuditLog"> | string
    details?: JsonNullableFilter<"AuditLog">
    ip?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    details?: SortOrderInput | SortOrder
    ip?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _avg?: AuditLogAvgOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
    _sum?: AuditLogSumOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AuditLog"> | number
    userId?: IntNullableWithAggregatesFilter<"AuditLog"> | number | null
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    details?: JsonNullableWithAggregatesFilter<"AuditLog">
    ip?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    password: string
    displayName?: string | null
    imageUrl?: string | null
    timezone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sources?: SourceCreateNestedManyWithoutUserInput
    documents?: DocumentCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    reminders?: ReminderCreateNestedManyWithoutUserInput
    queries?: QueryLogCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenCreateNestedManyWithoutUserInput
    audits?: AuditLogCreateNestedManyWithoutUserInput
    fileUploads?: FileUploadCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    displayName?: string | null
    imageUrl?: string | null
    timezone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sources?: SourceUncheckedCreateNestedManyWithoutUserInput
    documents?: DocumentUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutUserInput
    queries?: QueryLogUncheckedCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
    audits?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    fileUploads?: FileUploadUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sources?: SourceUpdateManyWithoutUserNestedInput
    documents?: DocumentUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    reminders?: ReminderUpdateManyWithoutUserNestedInput
    queries?: QueryLogUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUpdateManyWithoutUserNestedInput
    audits?: AuditLogUpdateManyWithoutUserNestedInput
    fileUploads?: FileUploadUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sources?: SourceUncheckedUpdateManyWithoutUserNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutUserNestedInput
    queries?: QueryLogUncheckedUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
    audits?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    fileUploads?: FileUploadUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    password: string
    displayName?: string | null
    imageUrl?: string | null
    timezone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SourceCreateInput = {
    provider: string
    providerId?: string | null
    displayName?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    encryptedToken?: string | null
    connectedAt?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSourcesInput
    documents?: DocumentCreateNestedManyWithoutSourceInput
    oauthTokens?: OAuthTokenCreateNestedManyWithoutSourceInput
  }

  export type SourceUncheckedCreateInput = {
    id?: number
    userId: number
    provider: string
    providerId?: string | null
    displayName?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    encryptedToken?: string | null
    connectedAt?: Date | string | null
    createdAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutSourceInput
    oauthTokens?: OAuthTokenUncheckedCreateNestedManyWithoutSourceInput
  }

  export type SourceUpdateInput = {
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    encryptedToken?: NullableStringFieldUpdateOperationsInput | string | null
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSourcesNestedInput
    documents?: DocumentUpdateManyWithoutSourceNestedInput
    oauthTokens?: OAuthTokenUpdateManyWithoutSourceNestedInput
  }

  export type SourceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    encryptedToken?: NullableStringFieldUpdateOperationsInput | string | null
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutSourceNestedInput
    oauthTokens?: OAuthTokenUncheckedUpdateManyWithoutSourceNestedInput
  }

  export type SourceCreateManyInput = {
    id?: number
    userId: number
    provider: string
    providerId?: string | null
    displayName?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    encryptedToken?: string | null
    connectedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SourceUpdateManyMutationInput = {
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    encryptedToken?: NullableStringFieldUpdateOperationsInput | string | null
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SourceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    encryptedToken?: NullableStringFieldUpdateOperationsInput | string | null
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentCreateInput = {
    title: string
    docType: string
    s3Path: string
    size?: number | null
    language?: string | null
    hash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    chunks?: ChunkCreateNestedManyWithoutDocumentInput
    user: UserCreateNestedOneWithoutDocumentsInput
    source?: SourceCreateNestedOneWithoutDocumentsInput
  }

  export type DocumentUncheckedCreateInput = {
    id?: number
    userId: number
    sourceId?: number | null
    title: string
    docType: string
    s3Path: string
    size?: number | null
    language?: string | null
    hash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    chunks?: ChunkUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
    s3Path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunks?: ChunkUpdateManyWithoutDocumentNestedInput
    user?: UserUpdateOneRequiredWithoutDocumentsNestedInput
    source?: SourceUpdateOneWithoutDocumentsNestedInput
  }

  export type DocumentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    sourceId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
    s3Path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunks?: ChunkUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentCreateManyInput = {
    id?: number
    userId: number
    sourceId?: number | null
    title: string
    docType: string
    s3Path: string
    size?: number | null
    language?: string | null
    hash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
    s3Path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    sourceId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
    s3Path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChunkCreateInput = {
    userId: number
    text: string
    chunkHash: string
    startPos?: number | null
    endPos?: number | null
    tokenCount?: number | null
    embeddingId?: number | null
    createdAt?: Date | string
    document: DocumentCreateNestedOneWithoutChunksInput
    embedding?: EmbeddingCreateNestedOneWithoutChunkInput
  }

  export type ChunkUncheckedCreateInput = {
    id?: number
    documentId: number
    userId: number
    text: string
    chunkHash: string
    startPos?: number | null
    endPos?: number | null
    tokenCount?: number | null
    embeddingId?: number | null
    createdAt?: Date | string
    embedding?: EmbeddingUncheckedCreateNestedOneWithoutChunkInput
  }

  export type ChunkUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    chunkHash?: StringFieldUpdateOperationsInput | string
    startPos?: NullableIntFieldUpdateOperationsInput | number | null
    endPos?: NullableIntFieldUpdateOperationsInput | number | null
    tokenCount?: NullableIntFieldUpdateOperationsInput | number | null
    embeddingId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    document?: DocumentUpdateOneRequiredWithoutChunksNestedInput
    embedding?: EmbeddingUpdateOneWithoutChunkNestedInput
  }

  export type ChunkUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    documentId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    chunkHash?: StringFieldUpdateOperationsInput | string
    startPos?: NullableIntFieldUpdateOperationsInput | number | null
    endPos?: NullableIntFieldUpdateOperationsInput | number | null
    tokenCount?: NullableIntFieldUpdateOperationsInput | number | null
    embeddingId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    embedding?: EmbeddingUncheckedUpdateOneWithoutChunkNestedInput
  }

  export type ChunkCreateManyInput = {
    id?: number
    documentId: number
    userId: number
    text: string
    chunkHash: string
    startPos?: number | null
    endPos?: number | null
    tokenCount?: number | null
    embeddingId?: number | null
    createdAt?: Date | string
  }

  export type ChunkUpdateManyMutationInput = {
    userId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    chunkHash?: StringFieldUpdateOperationsInput | string
    startPos?: NullableIntFieldUpdateOperationsInput | number | null
    endPos?: NullableIntFieldUpdateOperationsInput | number | null
    tokenCount?: NullableIntFieldUpdateOperationsInput | number | null
    embeddingId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChunkUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    documentId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    chunkHash?: StringFieldUpdateOperationsInput | string
    startPos?: NullableIntFieldUpdateOperationsInput | number | null
    endPos?: NullableIntFieldUpdateOperationsInput | number | null
    tokenCount?: NullableIntFieldUpdateOperationsInput | number | null
    embeddingId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmbeddingCreateInput = {
    model?: string | null
    vectorRef?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    chunk: ChunkCreateNestedOneWithoutEmbeddingInput
  }

  export type EmbeddingUncheckedCreateInput = {
    id?: number
    chunkId: number
    model?: string | null
    vectorRef?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type EmbeddingUpdateInput = {
    model?: NullableStringFieldUpdateOperationsInput | string | null
    vectorRef?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunk?: ChunkUpdateOneRequiredWithoutEmbeddingNestedInput
  }

  export type EmbeddingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    chunkId?: IntFieldUpdateOperationsInput | number
    model?: NullableStringFieldUpdateOperationsInput | string | null
    vectorRef?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmbeddingCreateManyInput = {
    id?: number
    chunkId: number
    model?: string | null
    vectorRef?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type EmbeddingUpdateManyMutationInput = {
    model?: NullableStringFieldUpdateOperationsInput | string | null
    vectorRef?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmbeddingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    chunkId?: IntFieldUpdateOperationsInput | number
    model?: NullableStringFieldUpdateOperationsInput | string | null
    vectorRef?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateInput = {
    title: string
    description?: string | null
    dueAt?: Date | string | null
    completed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateInput = {
    id?: number
    userId: number
    title: string
    description?: string | null
    dueAt?: Date | string | null
    completed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateManyInput = {
    id?: number
    userId: number
    title: string
    description?: string | null
    dueAt?: Date | string | null
    completed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReminderCreateInput = {
    text: string
    remindAt: Date | string
    sent?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutRemindersInput
  }

  export type ReminderUncheckedCreateInput = {
    id?: number
    userId: number
    text: string
    remindAt: Date | string
    sent?: boolean
    createdAt?: Date | string
  }

  export type ReminderUpdateInput = {
    text?: StringFieldUpdateOperationsInput | string
    remindAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRemindersNestedInput
  }

  export type ReminderUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    remindAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReminderCreateManyInput = {
    id?: number
    userId: number
    text: string
    remindAt: Date | string
    sent?: boolean
    createdAt?: Date | string
  }

  export type ReminderUpdateManyMutationInput = {
    text?: StringFieldUpdateOperationsInput | string
    remindAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReminderUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    remindAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueryLogCreateInput = {
    query: string
    response?: string | null
    usedChunks?: string | null
    latencyMs?: number | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutQueriesInput
  }

  export type QueryLogUncheckedCreateInput = {
    id?: number
    userId: number
    query: string
    response?: string | null
    usedChunks?: string | null
    latencyMs?: number | null
    createdAt?: Date | string
  }

  export type QueryLogUpdateInput = {
    query?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    usedChunks?: NullableStringFieldUpdateOperationsInput | string | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutQueriesNestedInput
  }

  export type QueryLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    query?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    usedChunks?: NullableStringFieldUpdateOperationsInput | string | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueryLogCreateManyInput = {
    id?: number
    userId: number
    query: string
    response?: string | null
    usedChunks?: string | null
    latencyMs?: number | null
    createdAt?: Date | string
  }

  export type QueryLogUpdateManyMutationInput = {
    query?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    usedChunks?: NullableStringFieldUpdateOperationsInput | string | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueryLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    query?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    usedChunks?: NullableStringFieldUpdateOperationsInput | string | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenCreateInput = {
    provider: string
    refreshToken: string
    accessToken?: string | null
    scope?: string | null
    expiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOauthTokensInput
    source?: SourceCreateNestedOneWithoutOauthTokensInput
  }

  export type OAuthTokenUncheckedCreateInput = {
    id?: number
    userId: number
    sourceId?: number | null
    provider: string
    refreshToken: string
    accessToken?: string | null
    scope?: string | null
    expiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OAuthTokenUpdateInput = {
    provider?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOauthTokensNestedInput
    source?: SourceUpdateOneWithoutOauthTokensNestedInput
  }

  export type OAuthTokenUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    sourceId?: NullableIntFieldUpdateOperationsInput | number | null
    provider?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenCreateManyInput = {
    id?: number
    userId: number
    sourceId?: number | null
    provider: string
    refreshToken: string
    accessToken?: string | null
    scope?: string | null
    expiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OAuthTokenUpdateManyMutationInput = {
    provider?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    sourceId?: NullableIntFieldUpdateOperationsInput | number | null
    provider?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileUploadCreateInput = {
    filename: string
    s3Path: string
    size?: number | null
    mimeType?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFileUploadsInput
  }

  export type FileUploadUncheckedCreateInput = {
    id?: number
    userId: number
    filename: string
    s3Path: string
    size?: number | null
    mimeType?: string | null
    createdAt?: Date | string
  }

  export type FileUploadUpdateInput = {
    filename?: StringFieldUpdateOperationsInput | string
    s3Path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFileUploadsNestedInput
  }

  export type FileUploadUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    filename?: StringFieldUpdateOperationsInput | string
    s3Path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileUploadCreateManyInput = {
    id?: number
    userId: number
    filename: string
    s3Path: string
    size?: number | null
    mimeType?: string | null
    createdAt?: Date | string
  }

  export type FileUploadUpdateManyMutationInput = {
    filename?: StringFieldUpdateOperationsInput | string
    s3Path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileUploadUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    filename?: StringFieldUpdateOperationsInput | string
    s3Path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    ip?: string | null
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAuditsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: number
    userId?: number | null
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    ip?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAuditsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: number
    userId?: number | null
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    ip?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SourceListRelationFilter = {
    every?: SourceWhereInput
    some?: SourceWhereInput
    none?: SourceWhereInput
  }

  export type DocumentListRelationFilter = {
    every?: DocumentWhereInput
    some?: DocumentWhereInput
    none?: DocumentWhereInput
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type ReminderListRelationFilter = {
    every?: ReminderWhereInput
    some?: ReminderWhereInput
    none?: ReminderWhereInput
  }

  export type QueryLogListRelationFilter = {
    every?: QueryLogWhereInput
    some?: QueryLogWhereInput
    none?: QueryLogWhereInput
  }

  export type OAuthTokenListRelationFilter = {
    every?: OAuthTokenWhereInput
    some?: OAuthTokenWhereInput
    none?: OAuthTokenWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type FileUploadListRelationFilter = {
    every?: FileUploadWhereInput
    some?: FileUploadWhereInput
    none?: FileUploadWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SourceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReminderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QueryLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OAuthTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FileUploadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    displayName?: SortOrder
    imageUrl?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    displayName?: SortOrder
    imageUrl?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    displayName?: SortOrder
    imageUrl?: SortOrder
    timezone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SourceCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    displayName?: SortOrder
    config?: SortOrder
    encryptedToken?: SortOrder
    connectedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SourceAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type SourceMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    displayName?: SortOrder
    encryptedToken?: SortOrder
    connectedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SourceMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    displayName?: SortOrder
    encryptedToken?: SortOrder
    connectedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SourceSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ChunkListRelationFilter = {
    every?: ChunkWhereInput
    some?: ChunkWhereInput
    none?: ChunkWhereInput
  }

  export type SourceNullableScalarRelationFilter = {
    is?: SourceWhereInput | null
    isNot?: SourceWhereInput | null
  }

  export type ChunkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceId?: SortOrder
    title?: SortOrder
    docType?: SortOrder
    s3Path?: SortOrder
    size?: SortOrder
    language?: SortOrder
    hash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceId?: SortOrder
    size?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceId?: SortOrder
    title?: SortOrder
    docType?: SortOrder
    s3Path?: SortOrder
    size?: SortOrder
    language?: SortOrder
    hash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceId?: SortOrder
    title?: SortOrder
    docType?: SortOrder
    s3Path?: SortOrder
    size?: SortOrder
    language?: SortOrder
    hash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceId?: SortOrder
    size?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DocumentScalarRelationFilter = {
    is?: DocumentWhereInput
    isNot?: DocumentWhereInput
  }

  export type EmbeddingNullableScalarRelationFilter = {
    is?: EmbeddingWhereInput | null
    isNot?: EmbeddingWhereInput | null
  }

  export type ChunkCountOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    userId?: SortOrder
    text?: SortOrder
    chunkHash?: SortOrder
    startPos?: SortOrder
    endPos?: SortOrder
    tokenCount?: SortOrder
    embeddingId?: SortOrder
    createdAt?: SortOrder
  }

  export type ChunkAvgOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    userId?: SortOrder
    startPos?: SortOrder
    endPos?: SortOrder
    tokenCount?: SortOrder
    embeddingId?: SortOrder
  }

  export type ChunkMaxOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    userId?: SortOrder
    text?: SortOrder
    chunkHash?: SortOrder
    startPos?: SortOrder
    endPos?: SortOrder
    tokenCount?: SortOrder
    embeddingId?: SortOrder
    createdAt?: SortOrder
  }

  export type ChunkMinOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    userId?: SortOrder
    text?: SortOrder
    chunkHash?: SortOrder
    startPos?: SortOrder
    endPos?: SortOrder
    tokenCount?: SortOrder
    embeddingId?: SortOrder
    createdAt?: SortOrder
  }

  export type ChunkSumOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    userId?: SortOrder
    startPos?: SortOrder
    endPos?: SortOrder
    tokenCount?: SortOrder
    embeddingId?: SortOrder
  }

  export type ChunkScalarRelationFilter = {
    is?: ChunkWhereInput
    isNot?: ChunkWhereInput
  }

  export type EmbeddingCountOrderByAggregateInput = {
    id?: SortOrder
    chunkId?: SortOrder
    model?: SortOrder
    vectorRef?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type EmbeddingAvgOrderByAggregateInput = {
    id?: SortOrder
    chunkId?: SortOrder
  }

  export type EmbeddingMaxOrderByAggregateInput = {
    id?: SortOrder
    chunkId?: SortOrder
    model?: SortOrder
    vectorRef?: SortOrder
    createdAt?: SortOrder
  }

  export type EmbeddingMinOrderByAggregateInput = {
    id?: SortOrder
    chunkId?: SortOrder
    model?: SortOrder
    vectorRef?: SortOrder
    createdAt?: SortOrder
  }

  export type EmbeddingSumOrderByAggregateInput = {
    id?: SortOrder
    chunkId?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    dueAt?: SortOrder
    completed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    dueAt?: SortOrder
    completed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    dueAt?: SortOrder
    completed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ReminderCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    text?: SortOrder
    remindAt?: SortOrder
    sent?: SortOrder
    createdAt?: SortOrder
  }

  export type ReminderAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type ReminderMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    text?: SortOrder
    remindAt?: SortOrder
    sent?: SortOrder
    createdAt?: SortOrder
  }

  export type ReminderMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    text?: SortOrder
    remindAt?: SortOrder
    sent?: SortOrder
    createdAt?: SortOrder
  }

  export type ReminderSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type QueryLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    query?: SortOrder
    response?: SortOrder
    usedChunks?: SortOrder
    latencyMs?: SortOrder
    createdAt?: SortOrder
  }

  export type QueryLogAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    latencyMs?: SortOrder
  }

  export type QueryLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    query?: SortOrder
    response?: SortOrder
    usedChunks?: SortOrder
    latencyMs?: SortOrder
    createdAt?: SortOrder
  }

  export type QueryLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    query?: SortOrder
    response?: SortOrder
    usedChunks?: SortOrder
    latencyMs?: SortOrder
    createdAt?: SortOrder
  }

  export type QueryLogSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    latencyMs?: SortOrder
  }

  export type OAuthTokenCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceId?: SortOrder
    provider?: SortOrder
    refreshToken?: SortOrder
    accessToken?: SortOrder
    scope?: SortOrder
    expiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OAuthTokenAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceId?: SortOrder
  }

  export type OAuthTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceId?: SortOrder
    provider?: SortOrder
    refreshToken?: SortOrder
    accessToken?: SortOrder
    scope?: SortOrder
    expiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OAuthTokenMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceId?: SortOrder
    provider?: SortOrder
    refreshToken?: SortOrder
    accessToken?: SortOrder
    scope?: SortOrder
    expiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OAuthTokenSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sourceId?: SortOrder
  }

  export type FileUploadCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    filename?: SortOrder
    s3Path?: SortOrder
    size?: SortOrder
    mimeType?: SortOrder
    createdAt?: SortOrder
  }

  export type FileUploadAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    size?: SortOrder
  }

  export type FileUploadMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    filename?: SortOrder
    s3Path?: SortOrder
    size?: SortOrder
    mimeType?: SortOrder
    createdAt?: SortOrder
  }

  export type FileUploadMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    filename?: SortOrder
    s3Path?: SortOrder
    size?: SortOrder
    mimeType?: SortOrder
    createdAt?: SortOrder
  }

  export type FileUploadSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    size?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    ip?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    ip?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    ip?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type SourceCreateNestedManyWithoutUserInput = {
    create?: XOR<SourceCreateWithoutUserInput, SourceUncheckedCreateWithoutUserInput> | SourceCreateWithoutUserInput[] | SourceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SourceCreateOrConnectWithoutUserInput | SourceCreateOrConnectWithoutUserInput[]
    createMany?: SourceCreateManyUserInputEnvelope
    connect?: SourceWhereUniqueInput | SourceWhereUniqueInput[]
  }

  export type DocumentCreateNestedManyWithoutUserInput = {
    create?: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput> | DocumentCreateWithoutUserInput[] | DocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutUserInput | DocumentCreateOrConnectWithoutUserInput[]
    createMany?: DocumentCreateManyUserInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type ReminderCreateNestedManyWithoutUserInput = {
    create?: XOR<ReminderCreateWithoutUserInput, ReminderUncheckedCreateWithoutUserInput> | ReminderCreateWithoutUserInput[] | ReminderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutUserInput | ReminderCreateOrConnectWithoutUserInput[]
    createMany?: ReminderCreateManyUserInputEnvelope
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
  }

  export type QueryLogCreateNestedManyWithoutUserInput = {
    create?: XOR<QueryLogCreateWithoutUserInput, QueryLogUncheckedCreateWithoutUserInput> | QueryLogCreateWithoutUserInput[] | QueryLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QueryLogCreateOrConnectWithoutUserInput | QueryLogCreateOrConnectWithoutUserInput[]
    createMany?: QueryLogCreateManyUserInputEnvelope
    connect?: QueryLogWhereUniqueInput | QueryLogWhereUniqueInput[]
  }

  export type OAuthTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput> | OAuthTokenCreateWithoutUserInput[] | OAuthTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutUserInput | OAuthTokenCreateOrConnectWithoutUserInput[]
    createMany?: OAuthTokenCreateManyUserInputEnvelope
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type FileUploadCreateNestedManyWithoutUserInput = {
    create?: XOR<FileUploadCreateWithoutUserInput, FileUploadUncheckedCreateWithoutUserInput> | FileUploadCreateWithoutUserInput[] | FileUploadUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FileUploadCreateOrConnectWithoutUserInput | FileUploadCreateOrConnectWithoutUserInput[]
    createMany?: FileUploadCreateManyUserInputEnvelope
    connect?: FileUploadWhereUniqueInput | FileUploadWhereUniqueInput[]
  }

  export type SourceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SourceCreateWithoutUserInput, SourceUncheckedCreateWithoutUserInput> | SourceCreateWithoutUserInput[] | SourceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SourceCreateOrConnectWithoutUserInput | SourceCreateOrConnectWithoutUserInput[]
    createMany?: SourceCreateManyUserInputEnvelope
    connect?: SourceWhereUniqueInput | SourceWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput> | DocumentCreateWithoutUserInput[] | DocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutUserInput | DocumentCreateOrConnectWithoutUserInput[]
    createMany?: DocumentCreateManyUserInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type ReminderUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReminderCreateWithoutUserInput, ReminderUncheckedCreateWithoutUserInput> | ReminderCreateWithoutUserInput[] | ReminderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutUserInput | ReminderCreateOrConnectWithoutUserInput[]
    createMany?: ReminderCreateManyUserInputEnvelope
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
  }

  export type QueryLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<QueryLogCreateWithoutUserInput, QueryLogUncheckedCreateWithoutUserInput> | QueryLogCreateWithoutUserInput[] | QueryLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QueryLogCreateOrConnectWithoutUserInput | QueryLogCreateOrConnectWithoutUserInput[]
    createMany?: QueryLogCreateManyUserInputEnvelope
    connect?: QueryLogWhereUniqueInput | QueryLogWhereUniqueInput[]
  }

  export type OAuthTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput> | OAuthTokenCreateWithoutUserInput[] | OAuthTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutUserInput | OAuthTokenCreateOrConnectWithoutUserInput[]
    createMany?: OAuthTokenCreateManyUserInputEnvelope
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type FileUploadUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FileUploadCreateWithoutUserInput, FileUploadUncheckedCreateWithoutUserInput> | FileUploadCreateWithoutUserInput[] | FileUploadUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FileUploadCreateOrConnectWithoutUserInput | FileUploadCreateOrConnectWithoutUserInput[]
    createMany?: FileUploadCreateManyUserInputEnvelope
    connect?: FileUploadWhereUniqueInput | FileUploadWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SourceUpdateManyWithoutUserNestedInput = {
    create?: XOR<SourceCreateWithoutUserInput, SourceUncheckedCreateWithoutUserInput> | SourceCreateWithoutUserInput[] | SourceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SourceCreateOrConnectWithoutUserInput | SourceCreateOrConnectWithoutUserInput[]
    upsert?: SourceUpsertWithWhereUniqueWithoutUserInput | SourceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SourceCreateManyUserInputEnvelope
    set?: SourceWhereUniqueInput | SourceWhereUniqueInput[]
    disconnect?: SourceWhereUniqueInput | SourceWhereUniqueInput[]
    delete?: SourceWhereUniqueInput | SourceWhereUniqueInput[]
    connect?: SourceWhereUniqueInput | SourceWhereUniqueInput[]
    update?: SourceUpdateWithWhereUniqueWithoutUserInput | SourceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SourceUpdateManyWithWhereWithoutUserInput | SourceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SourceScalarWhereInput | SourceScalarWhereInput[]
  }

  export type DocumentUpdateManyWithoutUserNestedInput = {
    create?: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput> | DocumentCreateWithoutUserInput[] | DocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutUserInput | DocumentCreateOrConnectWithoutUserInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutUserInput | DocumentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DocumentCreateManyUserInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutUserInput | DocumentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutUserInput | DocumentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutUserInput | TaskUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutUserInput | TaskUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutUserInput | TaskUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ReminderUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReminderCreateWithoutUserInput, ReminderUncheckedCreateWithoutUserInput> | ReminderCreateWithoutUserInput[] | ReminderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutUserInput | ReminderCreateOrConnectWithoutUserInput[]
    upsert?: ReminderUpsertWithWhereUniqueWithoutUserInput | ReminderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReminderCreateManyUserInputEnvelope
    set?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    disconnect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    delete?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    update?: ReminderUpdateWithWhereUniqueWithoutUserInput | ReminderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReminderUpdateManyWithWhereWithoutUserInput | ReminderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
  }

  export type QueryLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<QueryLogCreateWithoutUserInput, QueryLogUncheckedCreateWithoutUserInput> | QueryLogCreateWithoutUserInput[] | QueryLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QueryLogCreateOrConnectWithoutUserInput | QueryLogCreateOrConnectWithoutUserInput[]
    upsert?: QueryLogUpsertWithWhereUniqueWithoutUserInput | QueryLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: QueryLogCreateManyUserInputEnvelope
    set?: QueryLogWhereUniqueInput | QueryLogWhereUniqueInput[]
    disconnect?: QueryLogWhereUniqueInput | QueryLogWhereUniqueInput[]
    delete?: QueryLogWhereUniqueInput | QueryLogWhereUniqueInput[]
    connect?: QueryLogWhereUniqueInput | QueryLogWhereUniqueInput[]
    update?: QueryLogUpdateWithWhereUniqueWithoutUserInput | QueryLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: QueryLogUpdateManyWithWhereWithoutUserInput | QueryLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: QueryLogScalarWhereInput | QueryLogScalarWhereInput[]
  }

  export type OAuthTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput> | OAuthTokenCreateWithoutUserInput[] | OAuthTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutUserInput | OAuthTokenCreateOrConnectWithoutUserInput[]
    upsert?: OAuthTokenUpsertWithWhereUniqueWithoutUserInput | OAuthTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthTokenCreateManyUserInputEnvelope
    set?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    disconnect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    delete?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    update?: OAuthTokenUpdateWithWhereUniqueWithoutUserInput | OAuthTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthTokenUpdateManyWithWhereWithoutUserInput | OAuthTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type FileUploadUpdateManyWithoutUserNestedInput = {
    create?: XOR<FileUploadCreateWithoutUserInput, FileUploadUncheckedCreateWithoutUserInput> | FileUploadCreateWithoutUserInput[] | FileUploadUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FileUploadCreateOrConnectWithoutUserInput | FileUploadCreateOrConnectWithoutUserInput[]
    upsert?: FileUploadUpsertWithWhereUniqueWithoutUserInput | FileUploadUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FileUploadCreateManyUserInputEnvelope
    set?: FileUploadWhereUniqueInput | FileUploadWhereUniqueInput[]
    disconnect?: FileUploadWhereUniqueInput | FileUploadWhereUniqueInput[]
    delete?: FileUploadWhereUniqueInput | FileUploadWhereUniqueInput[]
    connect?: FileUploadWhereUniqueInput | FileUploadWhereUniqueInput[]
    update?: FileUploadUpdateWithWhereUniqueWithoutUserInput | FileUploadUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FileUploadUpdateManyWithWhereWithoutUserInput | FileUploadUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FileUploadScalarWhereInput | FileUploadScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SourceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SourceCreateWithoutUserInput, SourceUncheckedCreateWithoutUserInput> | SourceCreateWithoutUserInput[] | SourceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SourceCreateOrConnectWithoutUserInput | SourceCreateOrConnectWithoutUserInput[]
    upsert?: SourceUpsertWithWhereUniqueWithoutUserInput | SourceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SourceCreateManyUserInputEnvelope
    set?: SourceWhereUniqueInput | SourceWhereUniqueInput[]
    disconnect?: SourceWhereUniqueInput | SourceWhereUniqueInput[]
    delete?: SourceWhereUniqueInput | SourceWhereUniqueInput[]
    connect?: SourceWhereUniqueInput | SourceWhereUniqueInput[]
    update?: SourceUpdateWithWhereUniqueWithoutUserInput | SourceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SourceUpdateManyWithWhereWithoutUserInput | SourceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SourceScalarWhereInput | SourceScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput> | DocumentCreateWithoutUserInput[] | DocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutUserInput | DocumentCreateOrConnectWithoutUserInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutUserInput | DocumentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DocumentCreateManyUserInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutUserInput | DocumentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutUserInput | DocumentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutUserInput | TaskUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutUserInput | TaskUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutUserInput | TaskUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ReminderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReminderCreateWithoutUserInput, ReminderUncheckedCreateWithoutUserInput> | ReminderCreateWithoutUserInput[] | ReminderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReminderCreateOrConnectWithoutUserInput | ReminderCreateOrConnectWithoutUserInput[]
    upsert?: ReminderUpsertWithWhereUniqueWithoutUserInput | ReminderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReminderCreateManyUserInputEnvelope
    set?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    disconnect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    delete?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    connect?: ReminderWhereUniqueInput | ReminderWhereUniqueInput[]
    update?: ReminderUpdateWithWhereUniqueWithoutUserInput | ReminderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReminderUpdateManyWithWhereWithoutUserInput | ReminderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
  }

  export type QueryLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<QueryLogCreateWithoutUserInput, QueryLogUncheckedCreateWithoutUserInput> | QueryLogCreateWithoutUserInput[] | QueryLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QueryLogCreateOrConnectWithoutUserInput | QueryLogCreateOrConnectWithoutUserInput[]
    upsert?: QueryLogUpsertWithWhereUniqueWithoutUserInput | QueryLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: QueryLogCreateManyUserInputEnvelope
    set?: QueryLogWhereUniqueInput | QueryLogWhereUniqueInput[]
    disconnect?: QueryLogWhereUniqueInput | QueryLogWhereUniqueInput[]
    delete?: QueryLogWhereUniqueInput | QueryLogWhereUniqueInput[]
    connect?: QueryLogWhereUniqueInput | QueryLogWhereUniqueInput[]
    update?: QueryLogUpdateWithWhereUniqueWithoutUserInput | QueryLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: QueryLogUpdateManyWithWhereWithoutUserInput | QueryLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: QueryLogScalarWhereInput | QueryLogScalarWhereInput[]
  }

  export type OAuthTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput> | OAuthTokenCreateWithoutUserInput[] | OAuthTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutUserInput | OAuthTokenCreateOrConnectWithoutUserInput[]
    upsert?: OAuthTokenUpsertWithWhereUniqueWithoutUserInput | OAuthTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthTokenCreateManyUserInputEnvelope
    set?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    disconnect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    delete?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    update?: OAuthTokenUpdateWithWhereUniqueWithoutUserInput | OAuthTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthTokenUpdateManyWithWhereWithoutUserInput | OAuthTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type FileUploadUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FileUploadCreateWithoutUserInput, FileUploadUncheckedCreateWithoutUserInput> | FileUploadCreateWithoutUserInput[] | FileUploadUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FileUploadCreateOrConnectWithoutUserInput | FileUploadCreateOrConnectWithoutUserInput[]
    upsert?: FileUploadUpsertWithWhereUniqueWithoutUserInput | FileUploadUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FileUploadCreateManyUserInputEnvelope
    set?: FileUploadWhereUniqueInput | FileUploadWhereUniqueInput[]
    disconnect?: FileUploadWhereUniqueInput | FileUploadWhereUniqueInput[]
    delete?: FileUploadWhereUniqueInput | FileUploadWhereUniqueInput[]
    connect?: FileUploadWhereUniqueInput | FileUploadWhereUniqueInput[]
    update?: FileUploadUpdateWithWhereUniqueWithoutUserInput | FileUploadUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FileUploadUpdateManyWithWhereWithoutUserInput | FileUploadUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FileUploadScalarWhereInput | FileUploadScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSourcesInput = {
    create?: XOR<UserCreateWithoutSourcesInput, UserUncheckedCreateWithoutSourcesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSourcesInput
    connect?: UserWhereUniqueInput
  }

  export type DocumentCreateNestedManyWithoutSourceInput = {
    create?: XOR<DocumentCreateWithoutSourceInput, DocumentUncheckedCreateWithoutSourceInput> | DocumentCreateWithoutSourceInput[] | DocumentUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutSourceInput | DocumentCreateOrConnectWithoutSourceInput[]
    createMany?: DocumentCreateManySourceInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type OAuthTokenCreateNestedManyWithoutSourceInput = {
    create?: XOR<OAuthTokenCreateWithoutSourceInput, OAuthTokenUncheckedCreateWithoutSourceInput> | OAuthTokenCreateWithoutSourceInput[] | OAuthTokenUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutSourceInput | OAuthTokenCreateOrConnectWithoutSourceInput[]
    createMany?: OAuthTokenCreateManySourceInputEnvelope
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutSourceInput = {
    create?: XOR<DocumentCreateWithoutSourceInput, DocumentUncheckedCreateWithoutSourceInput> | DocumentCreateWithoutSourceInput[] | DocumentUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutSourceInput | DocumentCreateOrConnectWithoutSourceInput[]
    createMany?: DocumentCreateManySourceInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type OAuthTokenUncheckedCreateNestedManyWithoutSourceInput = {
    create?: XOR<OAuthTokenCreateWithoutSourceInput, OAuthTokenUncheckedCreateWithoutSourceInput> | OAuthTokenCreateWithoutSourceInput[] | OAuthTokenUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutSourceInput | OAuthTokenCreateOrConnectWithoutSourceInput[]
    createMany?: OAuthTokenCreateManySourceInputEnvelope
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutSourcesNestedInput = {
    create?: XOR<UserCreateWithoutSourcesInput, UserUncheckedCreateWithoutSourcesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSourcesInput
    upsert?: UserUpsertWithoutSourcesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSourcesInput, UserUpdateWithoutSourcesInput>, UserUncheckedUpdateWithoutSourcesInput>
  }

  export type DocumentUpdateManyWithoutSourceNestedInput = {
    create?: XOR<DocumentCreateWithoutSourceInput, DocumentUncheckedCreateWithoutSourceInput> | DocumentCreateWithoutSourceInput[] | DocumentUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutSourceInput | DocumentCreateOrConnectWithoutSourceInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutSourceInput | DocumentUpsertWithWhereUniqueWithoutSourceInput[]
    createMany?: DocumentCreateManySourceInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutSourceInput | DocumentUpdateWithWhereUniqueWithoutSourceInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutSourceInput | DocumentUpdateManyWithWhereWithoutSourceInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type OAuthTokenUpdateManyWithoutSourceNestedInput = {
    create?: XOR<OAuthTokenCreateWithoutSourceInput, OAuthTokenUncheckedCreateWithoutSourceInput> | OAuthTokenCreateWithoutSourceInput[] | OAuthTokenUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutSourceInput | OAuthTokenCreateOrConnectWithoutSourceInput[]
    upsert?: OAuthTokenUpsertWithWhereUniqueWithoutSourceInput | OAuthTokenUpsertWithWhereUniqueWithoutSourceInput[]
    createMany?: OAuthTokenCreateManySourceInputEnvelope
    set?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    disconnect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    delete?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    update?: OAuthTokenUpdateWithWhereUniqueWithoutSourceInput | OAuthTokenUpdateWithWhereUniqueWithoutSourceInput[]
    updateMany?: OAuthTokenUpdateManyWithWhereWithoutSourceInput | OAuthTokenUpdateManyWithWhereWithoutSourceInput[]
    deleteMany?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutSourceNestedInput = {
    create?: XOR<DocumentCreateWithoutSourceInput, DocumentUncheckedCreateWithoutSourceInput> | DocumentCreateWithoutSourceInput[] | DocumentUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutSourceInput | DocumentCreateOrConnectWithoutSourceInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutSourceInput | DocumentUpsertWithWhereUniqueWithoutSourceInput[]
    createMany?: DocumentCreateManySourceInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutSourceInput | DocumentUpdateWithWhereUniqueWithoutSourceInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutSourceInput | DocumentUpdateManyWithWhereWithoutSourceInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type OAuthTokenUncheckedUpdateManyWithoutSourceNestedInput = {
    create?: XOR<OAuthTokenCreateWithoutSourceInput, OAuthTokenUncheckedCreateWithoutSourceInput> | OAuthTokenCreateWithoutSourceInput[] | OAuthTokenUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutSourceInput | OAuthTokenCreateOrConnectWithoutSourceInput[]
    upsert?: OAuthTokenUpsertWithWhereUniqueWithoutSourceInput | OAuthTokenUpsertWithWhereUniqueWithoutSourceInput[]
    createMany?: OAuthTokenCreateManySourceInputEnvelope
    set?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    disconnect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    delete?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    update?: OAuthTokenUpdateWithWhereUniqueWithoutSourceInput | OAuthTokenUpdateWithWhereUniqueWithoutSourceInput[]
    updateMany?: OAuthTokenUpdateManyWithWhereWithoutSourceInput | OAuthTokenUpdateManyWithWhereWithoutSourceInput[]
    deleteMany?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
  }

  export type ChunkCreateNestedManyWithoutDocumentInput = {
    create?: XOR<ChunkCreateWithoutDocumentInput, ChunkUncheckedCreateWithoutDocumentInput> | ChunkCreateWithoutDocumentInput[] | ChunkUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: ChunkCreateOrConnectWithoutDocumentInput | ChunkCreateOrConnectWithoutDocumentInput[]
    createMany?: ChunkCreateManyDocumentInputEnvelope
    connect?: ChunkWhereUniqueInput | ChunkWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocumentsInput
    connect?: UserWhereUniqueInput
  }

  export type SourceCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<SourceCreateWithoutDocumentsInput, SourceUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: SourceCreateOrConnectWithoutDocumentsInput
    connect?: SourceWhereUniqueInput
  }

  export type ChunkUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<ChunkCreateWithoutDocumentInput, ChunkUncheckedCreateWithoutDocumentInput> | ChunkCreateWithoutDocumentInput[] | ChunkUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: ChunkCreateOrConnectWithoutDocumentInput | ChunkCreateOrConnectWithoutDocumentInput[]
    createMany?: ChunkCreateManyDocumentInputEnvelope
    connect?: ChunkWhereUniqueInput | ChunkWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ChunkUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<ChunkCreateWithoutDocumentInput, ChunkUncheckedCreateWithoutDocumentInput> | ChunkCreateWithoutDocumentInput[] | ChunkUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: ChunkCreateOrConnectWithoutDocumentInput | ChunkCreateOrConnectWithoutDocumentInput[]
    upsert?: ChunkUpsertWithWhereUniqueWithoutDocumentInput | ChunkUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: ChunkCreateManyDocumentInputEnvelope
    set?: ChunkWhereUniqueInput | ChunkWhereUniqueInput[]
    disconnect?: ChunkWhereUniqueInput | ChunkWhereUniqueInput[]
    delete?: ChunkWhereUniqueInput | ChunkWhereUniqueInput[]
    connect?: ChunkWhereUniqueInput | ChunkWhereUniqueInput[]
    update?: ChunkUpdateWithWhereUniqueWithoutDocumentInput | ChunkUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: ChunkUpdateManyWithWhereWithoutDocumentInput | ChunkUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: ChunkScalarWhereInput | ChunkScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocumentsInput
    upsert?: UserUpsertWithoutDocumentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDocumentsInput, UserUpdateWithoutDocumentsInput>, UserUncheckedUpdateWithoutDocumentsInput>
  }

  export type SourceUpdateOneWithoutDocumentsNestedInput = {
    create?: XOR<SourceCreateWithoutDocumentsInput, SourceUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: SourceCreateOrConnectWithoutDocumentsInput
    upsert?: SourceUpsertWithoutDocumentsInput
    disconnect?: SourceWhereInput | boolean
    delete?: SourceWhereInput | boolean
    connect?: SourceWhereUniqueInput
    update?: XOR<XOR<SourceUpdateToOneWithWhereWithoutDocumentsInput, SourceUpdateWithoutDocumentsInput>, SourceUncheckedUpdateWithoutDocumentsInput>
  }

  export type ChunkUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<ChunkCreateWithoutDocumentInput, ChunkUncheckedCreateWithoutDocumentInput> | ChunkCreateWithoutDocumentInput[] | ChunkUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: ChunkCreateOrConnectWithoutDocumentInput | ChunkCreateOrConnectWithoutDocumentInput[]
    upsert?: ChunkUpsertWithWhereUniqueWithoutDocumentInput | ChunkUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: ChunkCreateManyDocumentInputEnvelope
    set?: ChunkWhereUniqueInput | ChunkWhereUniqueInput[]
    disconnect?: ChunkWhereUniqueInput | ChunkWhereUniqueInput[]
    delete?: ChunkWhereUniqueInput | ChunkWhereUniqueInput[]
    connect?: ChunkWhereUniqueInput | ChunkWhereUniqueInput[]
    update?: ChunkUpdateWithWhereUniqueWithoutDocumentInput | ChunkUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: ChunkUpdateManyWithWhereWithoutDocumentInput | ChunkUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: ChunkScalarWhereInput | ChunkScalarWhereInput[]
  }

  export type DocumentCreateNestedOneWithoutChunksInput = {
    create?: XOR<DocumentCreateWithoutChunksInput, DocumentUncheckedCreateWithoutChunksInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutChunksInput
    connect?: DocumentWhereUniqueInput
  }

  export type EmbeddingCreateNestedOneWithoutChunkInput = {
    create?: XOR<EmbeddingCreateWithoutChunkInput, EmbeddingUncheckedCreateWithoutChunkInput>
    connectOrCreate?: EmbeddingCreateOrConnectWithoutChunkInput
    connect?: EmbeddingWhereUniqueInput
  }

  export type EmbeddingUncheckedCreateNestedOneWithoutChunkInput = {
    create?: XOR<EmbeddingCreateWithoutChunkInput, EmbeddingUncheckedCreateWithoutChunkInput>
    connectOrCreate?: EmbeddingCreateOrConnectWithoutChunkInput
    connect?: EmbeddingWhereUniqueInput
  }

  export type DocumentUpdateOneRequiredWithoutChunksNestedInput = {
    create?: XOR<DocumentCreateWithoutChunksInput, DocumentUncheckedCreateWithoutChunksInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutChunksInput
    upsert?: DocumentUpsertWithoutChunksInput
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutChunksInput, DocumentUpdateWithoutChunksInput>, DocumentUncheckedUpdateWithoutChunksInput>
  }

  export type EmbeddingUpdateOneWithoutChunkNestedInput = {
    create?: XOR<EmbeddingCreateWithoutChunkInput, EmbeddingUncheckedCreateWithoutChunkInput>
    connectOrCreate?: EmbeddingCreateOrConnectWithoutChunkInput
    upsert?: EmbeddingUpsertWithoutChunkInput
    disconnect?: EmbeddingWhereInput | boolean
    delete?: EmbeddingWhereInput | boolean
    connect?: EmbeddingWhereUniqueInput
    update?: XOR<XOR<EmbeddingUpdateToOneWithWhereWithoutChunkInput, EmbeddingUpdateWithoutChunkInput>, EmbeddingUncheckedUpdateWithoutChunkInput>
  }

  export type EmbeddingUncheckedUpdateOneWithoutChunkNestedInput = {
    create?: XOR<EmbeddingCreateWithoutChunkInput, EmbeddingUncheckedCreateWithoutChunkInput>
    connectOrCreate?: EmbeddingCreateOrConnectWithoutChunkInput
    upsert?: EmbeddingUpsertWithoutChunkInput
    disconnect?: EmbeddingWhereInput | boolean
    delete?: EmbeddingWhereInput | boolean
    connect?: EmbeddingWhereUniqueInput
    update?: XOR<XOR<EmbeddingUpdateToOneWithWhereWithoutChunkInput, EmbeddingUpdateWithoutChunkInput>, EmbeddingUncheckedUpdateWithoutChunkInput>
  }

  export type ChunkCreateNestedOneWithoutEmbeddingInput = {
    create?: XOR<ChunkCreateWithoutEmbeddingInput, ChunkUncheckedCreateWithoutEmbeddingInput>
    connectOrCreate?: ChunkCreateOrConnectWithoutEmbeddingInput
    connect?: ChunkWhereUniqueInput
  }

  export type ChunkUpdateOneRequiredWithoutEmbeddingNestedInput = {
    create?: XOR<ChunkCreateWithoutEmbeddingInput, ChunkUncheckedCreateWithoutEmbeddingInput>
    connectOrCreate?: ChunkCreateOrConnectWithoutEmbeddingInput
    upsert?: ChunkUpsertWithoutEmbeddingInput
    connect?: ChunkWhereUniqueInput
    update?: XOR<XOR<ChunkUpdateToOneWithWhereWithoutEmbeddingInput, ChunkUpdateWithoutEmbeddingInput>, ChunkUncheckedUpdateWithoutEmbeddingInput>
  }

  export type UserCreateNestedOneWithoutTasksInput = {
    create?: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksInput
    upsert?: UserUpsertWithoutTasksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTasksInput, UserUpdateWithoutTasksInput>, UserUncheckedUpdateWithoutTasksInput>
  }

  export type UserCreateNestedOneWithoutRemindersInput = {
    create?: XOR<UserCreateWithoutRemindersInput, UserUncheckedCreateWithoutRemindersInput>
    connectOrCreate?: UserCreateOrConnectWithoutRemindersInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRemindersNestedInput = {
    create?: XOR<UserCreateWithoutRemindersInput, UserUncheckedCreateWithoutRemindersInput>
    connectOrCreate?: UserCreateOrConnectWithoutRemindersInput
    upsert?: UserUpsertWithoutRemindersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRemindersInput, UserUpdateWithoutRemindersInput>, UserUncheckedUpdateWithoutRemindersInput>
  }

  export type UserCreateNestedOneWithoutQueriesInput = {
    create?: XOR<UserCreateWithoutQueriesInput, UserUncheckedCreateWithoutQueriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutQueriesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutQueriesNestedInput = {
    create?: XOR<UserCreateWithoutQueriesInput, UserUncheckedCreateWithoutQueriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutQueriesInput
    upsert?: UserUpsertWithoutQueriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutQueriesInput, UserUpdateWithoutQueriesInput>, UserUncheckedUpdateWithoutQueriesInput>
  }

  export type UserCreateNestedOneWithoutOauthTokensInput = {
    create?: XOR<UserCreateWithoutOauthTokensInput, UserUncheckedCreateWithoutOauthTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauthTokensInput
    connect?: UserWhereUniqueInput
  }

  export type SourceCreateNestedOneWithoutOauthTokensInput = {
    create?: XOR<SourceCreateWithoutOauthTokensInput, SourceUncheckedCreateWithoutOauthTokensInput>
    connectOrCreate?: SourceCreateOrConnectWithoutOauthTokensInput
    connect?: SourceWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutOauthTokensNestedInput = {
    create?: XOR<UserCreateWithoutOauthTokensInput, UserUncheckedCreateWithoutOauthTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauthTokensInput
    upsert?: UserUpsertWithoutOauthTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOauthTokensInput, UserUpdateWithoutOauthTokensInput>, UserUncheckedUpdateWithoutOauthTokensInput>
  }

  export type SourceUpdateOneWithoutOauthTokensNestedInput = {
    create?: XOR<SourceCreateWithoutOauthTokensInput, SourceUncheckedCreateWithoutOauthTokensInput>
    connectOrCreate?: SourceCreateOrConnectWithoutOauthTokensInput
    upsert?: SourceUpsertWithoutOauthTokensInput
    disconnect?: SourceWhereInput | boolean
    delete?: SourceWhereInput | boolean
    connect?: SourceWhereUniqueInput
    update?: XOR<XOR<SourceUpdateToOneWithWhereWithoutOauthTokensInput, SourceUpdateWithoutOauthTokensInput>, SourceUncheckedUpdateWithoutOauthTokensInput>
  }

  export type UserCreateNestedOneWithoutFileUploadsInput = {
    create?: XOR<UserCreateWithoutFileUploadsInput, UserUncheckedCreateWithoutFileUploadsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFileUploadsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFileUploadsNestedInput = {
    create?: XOR<UserCreateWithoutFileUploadsInput, UserUncheckedCreateWithoutFileUploadsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFileUploadsInput
    upsert?: UserUpsertWithoutFileUploadsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFileUploadsInput, UserUpdateWithoutFileUploadsInput>, UserUncheckedUpdateWithoutFileUploadsInput>
  }

  export type UserCreateNestedOneWithoutAuditsInput = {
    create?: XOR<UserCreateWithoutAuditsInput, UserUncheckedCreateWithoutAuditsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutAuditsNestedInput = {
    create?: XOR<UserCreateWithoutAuditsInput, UserUncheckedCreateWithoutAuditsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditsInput
    upsert?: UserUpsertWithoutAuditsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditsInput, UserUpdateWithoutAuditsInput>, UserUncheckedUpdateWithoutAuditsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type SourceCreateWithoutUserInput = {
    provider: string
    providerId?: string | null
    displayName?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    encryptedToken?: string | null
    connectedAt?: Date | string | null
    createdAt?: Date | string
    documents?: DocumentCreateNestedManyWithoutSourceInput
    oauthTokens?: OAuthTokenCreateNestedManyWithoutSourceInput
  }

  export type SourceUncheckedCreateWithoutUserInput = {
    id?: number
    provider: string
    providerId?: string | null
    displayName?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    encryptedToken?: string | null
    connectedAt?: Date | string | null
    createdAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutSourceInput
    oauthTokens?: OAuthTokenUncheckedCreateNestedManyWithoutSourceInput
  }

  export type SourceCreateOrConnectWithoutUserInput = {
    where: SourceWhereUniqueInput
    create: XOR<SourceCreateWithoutUserInput, SourceUncheckedCreateWithoutUserInput>
  }

  export type SourceCreateManyUserInputEnvelope = {
    data: SourceCreateManyUserInput | SourceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DocumentCreateWithoutUserInput = {
    title: string
    docType: string
    s3Path: string
    size?: number | null
    language?: string | null
    hash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    chunks?: ChunkCreateNestedManyWithoutDocumentInput
    source?: SourceCreateNestedOneWithoutDocumentsInput
  }

  export type DocumentUncheckedCreateWithoutUserInput = {
    id?: number
    sourceId?: number | null
    title: string
    docType: string
    s3Path: string
    size?: number | null
    language?: string | null
    hash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    chunks?: ChunkUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutUserInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput>
  }

  export type DocumentCreateManyUserInputEnvelope = {
    data: DocumentCreateManyUserInput | DocumentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutUserInput = {
    title: string
    description?: string | null
    dueAt?: Date | string | null
    completed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskUncheckedCreateWithoutUserInput = {
    id?: number
    title: string
    description?: string | null
    dueAt?: Date | string | null
    completed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateOrConnectWithoutUserInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput>
  }

  export type TaskCreateManyUserInputEnvelope = {
    data: TaskCreateManyUserInput | TaskCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ReminderCreateWithoutUserInput = {
    text: string
    remindAt: Date | string
    sent?: boolean
    createdAt?: Date | string
  }

  export type ReminderUncheckedCreateWithoutUserInput = {
    id?: number
    text: string
    remindAt: Date | string
    sent?: boolean
    createdAt?: Date | string
  }

  export type ReminderCreateOrConnectWithoutUserInput = {
    where: ReminderWhereUniqueInput
    create: XOR<ReminderCreateWithoutUserInput, ReminderUncheckedCreateWithoutUserInput>
  }

  export type ReminderCreateManyUserInputEnvelope = {
    data: ReminderCreateManyUserInput | ReminderCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type QueryLogCreateWithoutUserInput = {
    query: string
    response?: string | null
    usedChunks?: string | null
    latencyMs?: number | null
    createdAt?: Date | string
  }

  export type QueryLogUncheckedCreateWithoutUserInput = {
    id?: number
    query: string
    response?: string | null
    usedChunks?: string | null
    latencyMs?: number | null
    createdAt?: Date | string
  }

  export type QueryLogCreateOrConnectWithoutUserInput = {
    where: QueryLogWhereUniqueInput
    create: XOR<QueryLogCreateWithoutUserInput, QueryLogUncheckedCreateWithoutUserInput>
  }

  export type QueryLogCreateManyUserInputEnvelope = {
    data: QueryLogCreateManyUserInput | QueryLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OAuthTokenCreateWithoutUserInput = {
    provider: string
    refreshToken: string
    accessToken?: string | null
    scope?: string | null
    expiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    source?: SourceCreateNestedOneWithoutOauthTokensInput
  }

  export type OAuthTokenUncheckedCreateWithoutUserInput = {
    id?: number
    sourceId?: number | null
    provider: string
    refreshToken: string
    accessToken?: string | null
    scope?: string | null
    expiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OAuthTokenCreateOrConnectWithoutUserInput = {
    where: OAuthTokenWhereUniqueInput
    create: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput>
  }

  export type OAuthTokenCreateManyUserInputEnvelope = {
    data: OAuthTokenCreateManyUserInput | OAuthTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutUserInput = {
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    ip?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: number
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    ip?: string | null
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FileUploadCreateWithoutUserInput = {
    filename: string
    s3Path: string
    size?: number | null
    mimeType?: string | null
    createdAt?: Date | string
  }

  export type FileUploadUncheckedCreateWithoutUserInput = {
    id?: number
    filename: string
    s3Path: string
    size?: number | null
    mimeType?: string | null
    createdAt?: Date | string
  }

  export type FileUploadCreateOrConnectWithoutUserInput = {
    where: FileUploadWhereUniqueInput
    create: XOR<FileUploadCreateWithoutUserInput, FileUploadUncheckedCreateWithoutUserInput>
  }

  export type FileUploadCreateManyUserInputEnvelope = {
    data: FileUploadCreateManyUserInput | FileUploadCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SourceUpsertWithWhereUniqueWithoutUserInput = {
    where: SourceWhereUniqueInput
    update: XOR<SourceUpdateWithoutUserInput, SourceUncheckedUpdateWithoutUserInput>
    create: XOR<SourceCreateWithoutUserInput, SourceUncheckedCreateWithoutUserInput>
  }

  export type SourceUpdateWithWhereUniqueWithoutUserInput = {
    where: SourceWhereUniqueInput
    data: XOR<SourceUpdateWithoutUserInput, SourceUncheckedUpdateWithoutUserInput>
  }

  export type SourceUpdateManyWithWhereWithoutUserInput = {
    where: SourceScalarWhereInput
    data: XOR<SourceUpdateManyMutationInput, SourceUncheckedUpdateManyWithoutUserInput>
  }

  export type SourceScalarWhereInput = {
    AND?: SourceScalarWhereInput | SourceScalarWhereInput[]
    OR?: SourceScalarWhereInput[]
    NOT?: SourceScalarWhereInput | SourceScalarWhereInput[]
    id?: IntFilter<"Source"> | number
    userId?: IntFilter<"Source"> | number
    provider?: StringFilter<"Source"> | string
    providerId?: StringNullableFilter<"Source"> | string | null
    displayName?: StringNullableFilter<"Source"> | string | null
    config?: JsonNullableFilter<"Source">
    encryptedToken?: StringNullableFilter<"Source"> | string | null
    connectedAt?: DateTimeNullableFilter<"Source"> | Date | string | null
    createdAt?: DateTimeFilter<"Source"> | Date | string
  }

  export type DocumentUpsertWithWhereUniqueWithoutUserInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutUserInput, DocumentUncheckedUpdateWithoutUserInput>
    create: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutUserInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutUserInput, DocumentUncheckedUpdateWithoutUserInput>
  }

  export type DocumentUpdateManyWithWhereWithoutUserInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutUserInput>
  }

  export type DocumentScalarWhereInput = {
    AND?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    OR?: DocumentScalarWhereInput[]
    NOT?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    id?: IntFilter<"Document"> | number
    userId?: IntFilter<"Document"> | number
    sourceId?: IntNullableFilter<"Document"> | number | null
    title?: StringFilter<"Document"> | string
    docType?: StringFilter<"Document"> | string
    s3Path?: StringFilter<"Document"> | string
    size?: IntNullableFilter<"Document"> | number | null
    language?: StringNullableFilter<"Document"> | string | null
    hash?: StringNullableFilter<"Document"> | string | null
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
  }

  export type TaskUpsertWithWhereUniqueWithoutUserInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutUserInput, TaskUncheckedUpdateWithoutUserInput>
    create: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutUserInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutUserInput, TaskUncheckedUpdateWithoutUserInput>
  }

  export type TaskUpdateManyWithWhereWithoutUserInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutUserInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: IntFilter<"Task"> | number
    userId?: IntFilter<"Task"> | number
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    dueAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    completed?: BoolFilter<"Task"> | boolean
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
  }

  export type ReminderUpsertWithWhereUniqueWithoutUserInput = {
    where: ReminderWhereUniqueInput
    update: XOR<ReminderUpdateWithoutUserInput, ReminderUncheckedUpdateWithoutUserInput>
    create: XOR<ReminderCreateWithoutUserInput, ReminderUncheckedCreateWithoutUserInput>
  }

  export type ReminderUpdateWithWhereUniqueWithoutUserInput = {
    where: ReminderWhereUniqueInput
    data: XOR<ReminderUpdateWithoutUserInput, ReminderUncheckedUpdateWithoutUserInput>
  }

  export type ReminderUpdateManyWithWhereWithoutUserInput = {
    where: ReminderScalarWhereInput
    data: XOR<ReminderUpdateManyMutationInput, ReminderUncheckedUpdateManyWithoutUserInput>
  }

  export type ReminderScalarWhereInput = {
    AND?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
    OR?: ReminderScalarWhereInput[]
    NOT?: ReminderScalarWhereInput | ReminderScalarWhereInput[]
    id?: IntFilter<"Reminder"> | number
    userId?: IntFilter<"Reminder"> | number
    text?: StringFilter<"Reminder"> | string
    remindAt?: DateTimeFilter<"Reminder"> | Date | string
    sent?: BoolFilter<"Reminder"> | boolean
    createdAt?: DateTimeFilter<"Reminder"> | Date | string
  }

  export type QueryLogUpsertWithWhereUniqueWithoutUserInput = {
    where: QueryLogWhereUniqueInput
    update: XOR<QueryLogUpdateWithoutUserInput, QueryLogUncheckedUpdateWithoutUserInput>
    create: XOR<QueryLogCreateWithoutUserInput, QueryLogUncheckedCreateWithoutUserInput>
  }

  export type QueryLogUpdateWithWhereUniqueWithoutUserInput = {
    where: QueryLogWhereUniqueInput
    data: XOR<QueryLogUpdateWithoutUserInput, QueryLogUncheckedUpdateWithoutUserInput>
  }

  export type QueryLogUpdateManyWithWhereWithoutUserInput = {
    where: QueryLogScalarWhereInput
    data: XOR<QueryLogUpdateManyMutationInput, QueryLogUncheckedUpdateManyWithoutUserInput>
  }

  export type QueryLogScalarWhereInput = {
    AND?: QueryLogScalarWhereInput | QueryLogScalarWhereInput[]
    OR?: QueryLogScalarWhereInput[]
    NOT?: QueryLogScalarWhereInput | QueryLogScalarWhereInput[]
    id?: IntFilter<"QueryLog"> | number
    userId?: IntFilter<"QueryLog"> | number
    query?: StringFilter<"QueryLog"> | string
    response?: StringNullableFilter<"QueryLog"> | string | null
    usedChunks?: StringNullableFilter<"QueryLog"> | string | null
    latencyMs?: IntNullableFilter<"QueryLog"> | number | null
    createdAt?: DateTimeFilter<"QueryLog"> | Date | string
  }

  export type OAuthTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: OAuthTokenWhereUniqueInput
    update: XOR<OAuthTokenUpdateWithoutUserInput, OAuthTokenUncheckedUpdateWithoutUserInput>
    create: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput>
  }

  export type OAuthTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: OAuthTokenWhereUniqueInput
    data: XOR<OAuthTokenUpdateWithoutUserInput, OAuthTokenUncheckedUpdateWithoutUserInput>
  }

  export type OAuthTokenUpdateManyWithWhereWithoutUserInput = {
    where: OAuthTokenScalarWhereInput
    data: XOR<OAuthTokenUpdateManyMutationInput, OAuthTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type OAuthTokenScalarWhereInput = {
    AND?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
    OR?: OAuthTokenScalarWhereInput[]
    NOT?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
    id?: IntFilter<"OAuthToken"> | number
    userId?: IntFilter<"OAuthToken"> | number
    sourceId?: IntNullableFilter<"OAuthToken"> | number | null
    provider?: StringFilter<"OAuthToken"> | string
    refreshToken?: StringFilter<"OAuthToken"> | string
    accessToken?: StringNullableFilter<"OAuthToken"> | string | null
    scope?: StringNullableFilter<"OAuthToken"> | string | null
    expiry?: DateTimeNullableFilter<"OAuthToken"> | Date | string | null
    createdAt?: DateTimeFilter<"OAuthToken"> | Date | string
    updatedAt?: DateTimeFilter<"OAuthToken"> | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: IntFilter<"AuditLog"> | number
    userId?: IntNullableFilter<"AuditLog"> | number | null
    action?: StringFilter<"AuditLog"> | string
    details?: JsonNullableFilter<"AuditLog">
    ip?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type FileUploadUpsertWithWhereUniqueWithoutUserInput = {
    where: FileUploadWhereUniqueInput
    update: XOR<FileUploadUpdateWithoutUserInput, FileUploadUncheckedUpdateWithoutUserInput>
    create: XOR<FileUploadCreateWithoutUserInput, FileUploadUncheckedCreateWithoutUserInput>
  }

  export type FileUploadUpdateWithWhereUniqueWithoutUserInput = {
    where: FileUploadWhereUniqueInput
    data: XOR<FileUploadUpdateWithoutUserInput, FileUploadUncheckedUpdateWithoutUserInput>
  }

  export type FileUploadUpdateManyWithWhereWithoutUserInput = {
    where: FileUploadScalarWhereInput
    data: XOR<FileUploadUpdateManyMutationInput, FileUploadUncheckedUpdateManyWithoutUserInput>
  }

  export type FileUploadScalarWhereInput = {
    AND?: FileUploadScalarWhereInput | FileUploadScalarWhereInput[]
    OR?: FileUploadScalarWhereInput[]
    NOT?: FileUploadScalarWhereInput | FileUploadScalarWhereInput[]
    id?: IntFilter<"FileUpload"> | number
    userId?: IntFilter<"FileUpload"> | number
    filename?: StringFilter<"FileUpload"> | string
    s3Path?: StringFilter<"FileUpload"> | string
    size?: IntNullableFilter<"FileUpload"> | number | null
    mimeType?: StringNullableFilter<"FileUpload"> | string | null
    createdAt?: DateTimeFilter<"FileUpload"> | Date | string
  }

  export type UserCreateWithoutSourcesInput = {
    email: string
    password: string
    displayName?: string | null
    imageUrl?: string | null
    timezone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    reminders?: ReminderCreateNestedManyWithoutUserInput
    queries?: QueryLogCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenCreateNestedManyWithoutUserInput
    audits?: AuditLogCreateNestedManyWithoutUserInput
    fileUploads?: FileUploadCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSourcesInput = {
    id?: number
    email: string
    password: string
    displayName?: string | null
    imageUrl?: string | null
    timezone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutUserInput
    queries?: QueryLogUncheckedCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
    audits?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    fileUploads?: FileUploadUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSourcesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSourcesInput, UserUncheckedCreateWithoutSourcesInput>
  }

  export type DocumentCreateWithoutSourceInput = {
    title: string
    docType: string
    s3Path: string
    size?: number | null
    language?: string | null
    hash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    chunks?: ChunkCreateNestedManyWithoutDocumentInput
    user: UserCreateNestedOneWithoutDocumentsInput
  }

  export type DocumentUncheckedCreateWithoutSourceInput = {
    id?: number
    userId: number
    title: string
    docType: string
    s3Path: string
    size?: number | null
    language?: string | null
    hash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    chunks?: ChunkUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutSourceInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutSourceInput, DocumentUncheckedCreateWithoutSourceInput>
  }

  export type DocumentCreateManySourceInputEnvelope = {
    data: DocumentCreateManySourceInput | DocumentCreateManySourceInput[]
    skipDuplicates?: boolean
  }

  export type OAuthTokenCreateWithoutSourceInput = {
    provider: string
    refreshToken: string
    accessToken?: string | null
    scope?: string | null
    expiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOauthTokensInput
  }

  export type OAuthTokenUncheckedCreateWithoutSourceInput = {
    id?: number
    userId: number
    provider: string
    refreshToken: string
    accessToken?: string | null
    scope?: string | null
    expiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OAuthTokenCreateOrConnectWithoutSourceInput = {
    where: OAuthTokenWhereUniqueInput
    create: XOR<OAuthTokenCreateWithoutSourceInput, OAuthTokenUncheckedCreateWithoutSourceInput>
  }

  export type OAuthTokenCreateManySourceInputEnvelope = {
    data: OAuthTokenCreateManySourceInput | OAuthTokenCreateManySourceInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutSourcesInput = {
    update: XOR<UserUpdateWithoutSourcesInput, UserUncheckedUpdateWithoutSourcesInput>
    create: XOR<UserCreateWithoutSourcesInput, UserUncheckedCreateWithoutSourcesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSourcesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSourcesInput, UserUncheckedUpdateWithoutSourcesInput>
  }

  export type UserUpdateWithoutSourcesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    reminders?: ReminderUpdateManyWithoutUserNestedInput
    queries?: QueryLogUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUpdateManyWithoutUserNestedInput
    audits?: AuditLogUpdateManyWithoutUserNestedInput
    fileUploads?: FileUploadUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSourcesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutUserNestedInput
    queries?: QueryLogUncheckedUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
    audits?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    fileUploads?: FileUploadUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DocumentUpsertWithWhereUniqueWithoutSourceInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutSourceInput, DocumentUncheckedUpdateWithoutSourceInput>
    create: XOR<DocumentCreateWithoutSourceInput, DocumentUncheckedCreateWithoutSourceInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutSourceInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutSourceInput, DocumentUncheckedUpdateWithoutSourceInput>
  }

  export type DocumentUpdateManyWithWhereWithoutSourceInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutSourceInput>
  }

  export type OAuthTokenUpsertWithWhereUniqueWithoutSourceInput = {
    where: OAuthTokenWhereUniqueInput
    update: XOR<OAuthTokenUpdateWithoutSourceInput, OAuthTokenUncheckedUpdateWithoutSourceInput>
    create: XOR<OAuthTokenCreateWithoutSourceInput, OAuthTokenUncheckedCreateWithoutSourceInput>
  }

  export type OAuthTokenUpdateWithWhereUniqueWithoutSourceInput = {
    where: OAuthTokenWhereUniqueInput
    data: XOR<OAuthTokenUpdateWithoutSourceInput, OAuthTokenUncheckedUpdateWithoutSourceInput>
  }

  export type OAuthTokenUpdateManyWithWhereWithoutSourceInput = {
    where: OAuthTokenScalarWhereInput
    data: XOR<OAuthTokenUpdateManyMutationInput, OAuthTokenUncheckedUpdateManyWithoutSourceInput>
  }

  export type ChunkCreateWithoutDocumentInput = {
    userId: number
    text: string
    chunkHash: string
    startPos?: number | null
    endPos?: number | null
    tokenCount?: number | null
    embeddingId?: number | null
    createdAt?: Date | string
    embedding?: EmbeddingCreateNestedOneWithoutChunkInput
  }

  export type ChunkUncheckedCreateWithoutDocumentInput = {
    id?: number
    userId: number
    text: string
    chunkHash: string
    startPos?: number | null
    endPos?: number | null
    tokenCount?: number | null
    embeddingId?: number | null
    createdAt?: Date | string
    embedding?: EmbeddingUncheckedCreateNestedOneWithoutChunkInput
  }

  export type ChunkCreateOrConnectWithoutDocumentInput = {
    where: ChunkWhereUniqueInput
    create: XOR<ChunkCreateWithoutDocumentInput, ChunkUncheckedCreateWithoutDocumentInput>
  }

  export type ChunkCreateManyDocumentInputEnvelope = {
    data: ChunkCreateManyDocumentInput | ChunkCreateManyDocumentInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutDocumentsInput = {
    email: string
    password: string
    displayName?: string | null
    imageUrl?: string | null
    timezone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sources?: SourceCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    reminders?: ReminderCreateNestedManyWithoutUserInput
    queries?: QueryLogCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenCreateNestedManyWithoutUserInput
    audits?: AuditLogCreateNestedManyWithoutUserInput
    fileUploads?: FileUploadCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDocumentsInput = {
    id?: number
    email: string
    password: string
    displayName?: string | null
    imageUrl?: string | null
    timezone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sources?: SourceUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutUserInput
    queries?: QueryLogUncheckedCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
    audits?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    fileUploads?: FileUploadUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDocumentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
  }

  export type SourceCreateWithoutDocumentsInput = {
    provider: string
    providerId?: string | null
    displayName?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    encryptedToken?: string | null
    connectedAt?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSourcesInput
    oauthTokens?: OAuthTokenCreateNestedManyWithoutSourceInput
  }

  export type SourceUncheckedCreateWithoutDocumentsInput = {
    id?: number
    userId: number
    provider: string
    providerId?: string | null
    displayName?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    encryptedToken?: string | null
    connectedAt?: Date | string | null
    createdAt?: Date | string
    oauthTokens?: OAuthTokenUncheckedCreateNestedManyWithoutSourceInput
  }

  export type SourceCreateOrConnectWithoutDocumentsInput = {
    where: SourceWhereUniqueInput
    create: XOR<SourceCreateWithoutDocumentsInput, SourceUncheckedCreateWithoutDocumentsInput>
  }

  export type ChunkUpsertWithWhereUniqueWithoutDocumentInput = {
    where: ChunkWhereUniqueInput
    update: XOR<ChunkUpdateWithoutDocumentInput, ChunkUncheckedUpdateWithoutDocumentInput>
    create: XOR<ChunkCreateWithoutDocumentInput, ChunkUncheckedCreateWithoutDocumentInput>
  }

  export type ChunkUpdateWithWhereUniqueWithoutDocumentInput = {
    where: ChunkWhereUniqueInput
    data: XOR<ChunkUpdateWithoutDocumentInput, ChunkUncheckedUpdateWithoutDocumentInput>
  }

  export type ChunkUpdateManyWithWhereWithoutDocumentInput = {
    where: ChunkScalarWhereInput
    data: XOR<ChunkUpdateManyMutationInput, ChunkUncheckedUpdateManyWithoutDocumentInput>
  }

  export type ChunkScalarWhereInput = {
    AND?: ChunkScalarWhereInput | ChunkScalarWhereInput[]
    OR?: ChunkScalarWhereInput[]
    NOT?: ChunkScalarWhereInput | ChunkScalarWhereInput[]
    id?: IntFilter<"Chunk"> | number
    documentId?: IntFilter<"Chunk"> | number
    userId?: IntFilter<"Chunk"> | number
    text?: StringFilter<"Chunk"> | string
    chunkHash?: StringFilter<"Chunk"> | string
    startPos?: IntNullableFilter<"Chunk"> | number | null
    endPos?: IntNullableFilter<"Chunk"> | number | null
    tokenCount?: IntNullableFilter<"Chunk"> | number | null
    embeddingId?: IntNullableFilter<"Chunk"> | number | null
    createdAt?: DateTimeFilter<"Chunk"> | Date | string
  }

  export type UserUpsertWithoutDocumentsInput = {
    update: XOR<UserUpdateWithoutDocumentsInput, UserUncheckedUpdateWithoutDocumentsInput>
    create: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDocumentsInput, UserUncheckedUpdateWithoutDocumentsInput>
  }

  export type UserUpdateWithoutDocumentsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sources?: SourceUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    reminders?: ReminderUpdateManyWithoutUserNestedInput
    queries?: QueryLogUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUpdateManyWithoutUserNestedInput
    audits?: AuditLogUpdateManyWithoutUserNestedInput
    fileUploads?: FileUploadUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDocumentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sources?: SourceUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutUserNestedInput
    queries?: QueryLogUncheckedUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
    audits?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    fileUploads?: FileUploadUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SourceUpsertWithoutDocumentsInput = {
    update: XOR<SourceUpdateWithoutDocumentsInput, SourceUncheckedUpdateWithoutDocumentsInput>
    create: XOR<SourceCreateWithoutDocumentsInput, SourceUncheckedCreateWithoutDocumentsInput>
    where?: SourceWhereInput
  }

  export type SourceUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: SourceWhereInput
    data: XOR<SourceUpdateWithoutDocumentsInput, SourceUncheckedUpdateWithoutDocumentsInput>
  }

  export type SourceUpdateWithoutDocumentsInput = {
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    encryptedToken?: NullableStringFieldUpdateOperationsInput | string | null
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSourcesNestedInput
    oauthTokens?: OAuthTokenUpdateManyWithoutSourceNestedInput
  }

  export type SourceUncheckedUpdateWithoutDocumentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    encryptedToken?: NullableStringFieldUpdateOperationsInput | string | null
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    oauthTokens?: OAuthTokenUncheckedUpdateManyWithoutSourceNestedInput
  }

  export type DocumentCreateWithoutChunksInput = {
    title: string
    docType: string
    s3Path: string
    size?: number | null
    language?: string | null
    hash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDocumentsInput
    source?: SourceCreateNestedOneWithoutDocumentsInput
  }

  export type DocumentUncheckedCreateWithoutChunksInput = {
    id?: number
    userId: number
    sourceId?: number | null
    title: string
    docType: string
    s3Path: string
    size?: number | null
    language?: string | null
    hash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentCreateOrConnectWithoutChunksInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutChunksInput, DocumentUncheckedCreateWithoutChunksInput>
  }

  export type EmbeddingCreateWithoutChunkInput = {
    model?: string | null
    vectorRef?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type EmbeddingUncheckedCreateWithoutChunkInput = {
    id?: number
    model?: string | null
    vectorRef?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type EmbeddingCreateOrConnectWithoutChunkInput = {
    where: EmbeddingWhereUniqueInput
    create: XOR<EmbeddingCreateWithoutChunkInput, EmbeddingUncheckedCreateWithoutChunkInput>
  }

  export type DocumentUpsertWithoutChunksInput = {
    update: XOR<DocumentUpdateWithoutChunksInput, DocumentUncheckedUpdateWithoutChunksInput>
    create: XOR<DocumentCreateWithoutChunksInput, DocumentUncheckedCreateWithoutChunksInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutChunksInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutChunksInput, DocumentUncheckedUpdateWithoutChunksInput>
  }

  export type DocumentUpdateWithoutChunksInput = {
    title?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
    s3Path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDocumentsNestedInput
    source?: SourceUpdateOneWithoutDocumentsNestedInput
  }

  export type DocumentUncheckedUpdateWithoutChunksInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    sourceId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
    s3Path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmbeddingUpsertWithoutChunkInput = {
    update: XOR<EmbeddingUpdateWithoutChunkInput, EmbeddingUncheckedUpdateWithoutChunkInput>
    create: XOR<EmbeddingCreateWithoutChunkInput, EmbeddingUncheckedCreateWithoutChunkInput>
    where?: EmbeddingWhereInput
  }

  export type EmbeddingUpdateToOneWithWhereWithoutChunkInput = {
    where?: EmbeddingWhereInput
    data: XOR<EmbeddingUpdateWithoutChunkInput, EmbeddingUncheckedUpdateWithoutChunkInput>
  }

  export type EmbeddingUpdateWithoutChunkInput = {
    model?: NullableStringFieldUpdateOperationsInput | string | null
    vectorRef?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmbeddingUncheckedUpdateWithoutChunkInput = {
    id?: IntFieldUpdateOperationsInput | number
    model?: NullableStringFieldUpdateOperationsInput | string | null
    vectorRef?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChunkCreateWithoutEmbeddingInput = {
    userId: number
    text: string
    chunkHash: string
    startPos?: number | null
    endPos?: number | null
    tokenCount?: number | null
    embeddingId?: number | null
    createdAt?: Date | string
    document: DocumentCreateNestedOneWithoutChunksInput
  }

  export type ChunkUncheckedCreateWithoutEmbeddingInput = {
    id?: number
    documentId: number
    userId: number
    text: string
    chunkHash: string
    startPos?: number | null
    endPos?: number | null
    tokenCount?: number | null
    embeddingId?: number | null
    createdAt?: Date | string
  }

  export type ChunkCreateOrConnectWithoutEmbeddingInput = {
    where: ChunkWhereUniqueInput
    create: XOR<ChunkCreateWithoutEmbeddingInput, ChunkUncheckedCreateWithoutEmbeddingInput>
  }

  export type ChunkUpsertWithoutEmbeddingInput = {
    update: XOR<ChunkUpdateWithoutEmbeddingInput, ChunkUncheckedUpdateWithoutEmbeddingInput>
    create: XOR<ChunkCreateWithoutEmbeddingInput, ChunkUncheckedCreateWithoutEmbeddingInput>
    where?: ChunkWhereInput
  }

  export type ChunkUpdateToOneWithWhereWithoutEmbeddingInput = {
    where?: ChunkWhereInput
    data: XOR<ChunkUpdateWithoutEmbeddingInput, ChunkUncheckedUpdateWithoutEmbeddingInput>
  }

  export type ChunkUpdateWithoutEmbeddingInput = {
    userId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    chunkHash?: StringFieldUpdateOperationsInput | string
    startPos?: NullableIntFieldUpdateOperationsInput | number | null
    endPos?: NullableIntFieldUpdateOperationsInput | number | null
    tokenCount?: NullableIntFieldUpdateOperationsInput | number | null
    embeddingId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    document?: DocumentUpdateOneRequiredWithoutChunksNestedInput
  }

  export type ChunkUncheckedUpdateWithoutEmbeddingInput = {
    id?: IntFieldUpdateOperationsInput | number
    documentId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    chunkHash?: StringFieldUpdateOperationsInput | string
    startPos?: NullableIntFieldUpdateOperationsInput | number | null
    endPos?: NullableIntFieldUpdateOperationsInput | number | null
    tokenCount?: NullableIntFieldUpdateOperationsInput | number | null
    embeddingId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutTasksInput = {
    email: string
    password: string
    displayName?: string | null
    imageUrl?: string | null
    timezone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sources?: SourceCreateNestedManyWithoutUserInput
    documents?: DocumentCreateNestedManyWithoutUserInput
    reminders?: ReminderCreateNestedManyWithoutUserInput
    queries?: QueryLogCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenCreateNestedManyWithoutUserInput
    audits?: AuditLogCreateNestedManyWithoutUserInput
    fileUploads?: FileUploadCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTasksInput = {
    id?: number
    email: string
    password: string
    displayName?: string | null
    imageUrl?: string | null
    timezone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sources?: SourceUncheckedCreateNestedManyWithoutUserInput
    documents?: DocumentUncheckedCreateNestedManyWithoutUserInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutUserInput
    queries?: QueryLogUncheckedCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
    audits?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    fileUploads?: FileUploadUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTasksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
  }

  export type UserUpsertWithoutTasksInput = {
    update: XOR<UserUpdateWithoutTasksInput, UserUncheckedUpdateWithoutTasksInput>
    create: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTasksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTasksInput, UserUncheckedUpdateWithoutTasksInput>
  }

  export type UserUpdateWithoutTasksInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sources?: SourceUpdateManyWithoutUserNestedInput
    documents?: DocumentUpdateManyWithoutUserNestedInput
    reminders?: ReminderUpdateManyWithoutUserNestedInput
    queries?: QueryLogUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUpdateManyWithoutUserNestedInput
    audits?: AuditLogUpdateManyWithoutUserNestedInput
    fileUploads?: FileUploadUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTasksInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sources?: SourceUncheckedUpdateManyWithoutUserNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutUserNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutUserNestedInput
    queries?: QueryLogUncheckedUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
    audits?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    fileUploads?: FileUploadUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutRemindersInput = {
    email: string
    password: string
    displayName?: string | null
    imageUrl?: string | null
    timezone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sources?: SourceCreateNestedManyWithoutUserInput
    documents?: DocumentCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    queries?: QueryLogCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenCreateNestedManyWithoutUserInput
    audits?: AuditLogCreateNestedManyWithoutUserInput
    fileUploads?: FileUploadCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRemindersInput = {
    id?: number
    email: string
    password: string
    displayName?: string | null
    imageUrl?: string | null
    timezone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sources?: SourceUncheckedCreateNestedManyWithoutUserInput
    documents?: DocumentUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    queries?: QueryLogUncheckedCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
    audits?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    fileUploads?: FileUploadUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRemindersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRemindersInput, UserUncheckedCreateWithoutRemindersInput>
  }

  export type UserUpsertWithoutRemindersInput = {
    update: XOR<UserUpdateWithoutRemindersInput, UserUncheckedUpdateWithoutRemindersInput>
    create: XOR<UserCreateWithoutRemindersInput, UserUncheckedCreateWithoutRemindersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRemindersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRemindersInput, UserUncheckedUpdateWithoutRemindersInput>
  }

  export type UserUpdateWithoutRemindersInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sources?: SourceUpdateManyWithoutUserNestedInput
    documents?: DocumentUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    queries?: QueryLogUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUpdateManyWithoutUserNestedInput
    audits?: AuditLogUpdateManyWithoutUserNestedInput
    fileUploads?: FileUploadUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRemindersInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sources?: SourceUncheckedUpdateManyWithoutUserNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    queries?: QueryLogUncheckedUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
    audits?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    fileUploads?: FileUploadUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutQueriesInput = {
    email: string
    password: string
    displayName?: string | null
    imageUrl?: string | null
    timezone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sources?: SourceCreateNestedManyWithoutUserInput
    documents?: DocumentCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    reminders?: ReminderCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenCreateNestedManyWithoutUserInput
    audits?: AuditLogCreateNestedManyWithoutUserInput
    fileUploads?: FileUploadCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutQueriesInput = {
    id?: number
    email: string
    password: string
    displayName?: string | null
    imageUrl?: string | null
    timezone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sources?: SourceUncheckedCreateNestedManyWithoutUserInput
    documents?: DocumentUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
    audits?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    fileUploads?: FileUploadUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutQueriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutQueriesInput, UserUncheckedCreateWithoutQueriesInput>
  }

  export type UserUpsertWithoutQueriesInput = {
    update: XOR<UserUpdateWithoutQueriesInput, UserUncheckedUpdateWithoutQueriesInput>
    create: XOR<UserCreateWithoutQueriesInput, UserUncheckedCreateWithoutQueriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutQueriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutQueriesInput, UserUncheckedUpdateWithoutQueriesInput>
  }

  export type UserUpdateWithoutQueriesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sources?: SourceUpdateManyWithoutUserNestedInput
    documents?: DocumentUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    reminders?: ReminderUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUpdateManyWithoutUserNestedInput
    audits?: AuditLogUpdateManyWithoutUserNestedInput
    fileUploads?: FileUploadUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutQueriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sources?: SourceUncheckedUpdateManyWithoutUserNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
    audits?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    fileUploads?: FileUploadUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutOauthTokensInput = {
    email: string
    password: string
    displayName?: string | null
    imageUrl?: string | null
    timezone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sources?: SourceCreateNestedManyWithoutUserInput
    documents?: DocumentCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    reminders?: ReminderCreateNestedManyWithoutUserInput
    queries?: QueryLogCreateNestedManyWithoutUserInput
    audits?: AuditLogCreateNestedManyWithoutUserInput
    fileUploads?: FileUploadCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOauthTokensInput = {
    id?: number
    email: string
    password: string
    displayName?: string | null
    imageUrl?: string | null
    timezone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sources?: SourceUncheckedCreateNestedManyWithoutUserInput
    documents?: DocumentUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutUserInput
    queries?: QueryLogUncheckedCreateNestedManyWithoutUserInput
    audits?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    fileUploads?: FileUploadUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOauthTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOauthTokensInput, UserUncheckedCreateWithoutOauthTokensInput>
  }

  export type SourceCreateWithoutOauthTokensInput = {
    provider: string
    providerId?: string | null
    displayName?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    encryptedToken?: string | null
    connectedAt?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSourcesInput
    documents?: DocumentCreateNestedManyWithoutSourceInput
  }

  export type SourceUncheckedCreateWithoutOauthTokensInput = {
    id?: number
    userId: number
    provider: string
    providerId?: string | null
    displayName?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    encryptedToken?: string | null
    connectedAt?: Date | string | null
    createdAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutSourceInput
  }

  export type SourceCreateOrConnectWithoutOauthTokensInput = {
    where: SourceWhereUniqueInput
    create: XOR<SourceCreateWithoutOauthTokensInput, SourceUncheckedCreateWithoutOauthTokensInput>
  }

  export type UserUpsertWithoutOauthTokensInput = {
    update: XOR<UserUpdateWithoutOauthTokensInput, UserUncheckedUpdateWithoutOauthTokensInput>
    create: XOR<UserCreateWithoutOauthTokensInput, UserUncheckedCreateWithoutOauthTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOauthTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOauthTokensInput, UserUncheckedUpdateWithoutOauthTokensInput>
  }

  export type UserUpdateWithoutOauthTokensInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sources?: SourceUpdateManyWithoutUserNestedInput
    documents?: DocumentUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    reminders?: ReminderUpdateManyWithoutUserNestedInput
    queries?: QueryLogUpdateManyWithoutUserNestedInput
    audits?: AuditLogUpdateManyWithoutUserNestedInput
    fileUploads?: FileUploadUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOauthTokensInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sources?: SourceUncheckedUpdateManyWithoutUserNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutUserNestedInput
    queries?: QueryLogUncheckedUpdateManyWithoutUserNestedInput
    audits?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    fileUploads?: FileUploadUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SourceUpsertWithoutOauthTokensInput = {
    update: XOR<SourceUpdateWithoutOauthTokensInput, SourceUncheckedUpdateWithoutOauthTokensInput>
    create: XOR<SourceCreateWithoutOauthTokensInput, SourceUncheckedCreateWithoutOauthTokensInput>
    where?: SourceWhereInput
  }

  export type SourceUpdateToOneWithWhereWithoutOauthTokensInput = {
    where?: SourceWhereInput
    data: XOR<SourceUpdateWithoutOauthTokensInput, SourceUncheckedUpdateWithoutOauthTokensInput>
  }

  export type SourceUpdateWithoutOauthTokensInput = {
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    encryptedToken?: NullableStringFieldUpdateOperationsInput | string | null
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSourcesNestedInput
    documents?: DocumentUpdateManyWithoutSourceNestedInput
  }

  export type SourceUncheckedUpdateWithoutOauthTokensInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    encryptedToken?: NullableStringFieldUpdateOperationsInput | string | null
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutSourceNestedInput
  }

  export type UserCreateWithoutFileUploadsInput = {
    email: string
    password: string
    displayName?: string | null
    imageUrl?: string | null
    timezone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sources?: SourceCreateNestedManyWithoutUserInput
    documents?: DocumentCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    reminders?: ReminderCreateNestedManyWithoutUserInput
    queries?: QueryLogCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenCreateNestedManyWithoutUserInput
    audits?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFileUploadsInput = {
    id?: number
    email: string
    password: string
    displayName?: string | null
    imageUrl?: string | null
    timezone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sources?: SourceUncheckedCreateNestedManyWithoutUserInput
    documents?: DocumentUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutUserInput
    queries?: QueryLogUncheckedCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
    audits?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFileUploadsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFileUploadsInput, UserUncheckedCreateWithoutFileUploadsInput>
  }

  export type UserUpsertWithoutFileUploadsInput = {
    update: XOR<UserUpdateWithoutFileUploadsInput, UserUncheckedUpdateWithoutFileUploadsInput>
    create: XOR<UserCreateWithoutFileUploadsInput, UserUncheckedCreateWithoutFileUploadsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFileUploadsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFileUploadsInput, UserUncheckedUpdateWithoutFileUploadsInput>
  }

  export type UserUpdateWithoutFileUploadsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sources?: SourceUpdateManyWithoutUserNestedInput
    documents?: DocumentUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    reminders?: ReminderUpdateManyWithoutUserNestedInput
    queries?: QueryLogUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUpdateManyWithoutUserNestedInput
    audits?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFileUploadsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sources?: SourceUncheckedUpdateManyWithoutUserNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutUserNestedInput
    queries?: QueryLogUncheckedUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
    audits?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAuditsInput = {
    email: string
    password: string
    displayName?: string | null
    imageUrl?: string | null
    timezone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sources?: SourceCreateNestedManyWithoutUserInput
    documents?: DocumentCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    reminders?: ReminderCreateNestedManyWithoutUserInput
    queries?: QueryLogCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenCreateNestedManyWithoutUserInput
    fileUploads?: FileUploadCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuditsInput = {
    id?: number
    email: string
    password: string
    displayName?: string | null
    imageUrl?: string | null
    timezone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sources?: SourceUncheckedCreateNestedManyWithoutUserInput
    documents?: DocumentUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    reminders?: ReminderUncheckedCreateNestedManyWithoutUserInput
    queries?: QueryLogUncheckedCreateNestedManyWithoutUserInput
    oauthTokens?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
    fileUploads?: FileUploadUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuditsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditsInput, UserUncheckedCreateWithoutAuditsInput>
  }

  export type UserUpsertWithoutAuditsInput = {
    update: XOR<UserUpdateWithoutAuditsInput, UserUncheckedUpdateWithoutAuditsInput>
    create: XOR<UserCreateWithoutAuditsInput, UserUncheckedCreateWithoutAuditsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditsInput, UserUncheckedUpdateWithoutAuditsInput>
  }

  export type UserUpdateWithoutAuditsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sources?: SourceUpdateManyWithoutUserNestedInput
    documents?: DocumentUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    reminders?: ReminderUpdateManyWithoutUserNestedInput
    queries?: QueryLogUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUpdateManyWithoutUserNestedInput
    fileUploads?: FileUploadUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sources?: SourceUncheckedUpdateManyWithoutUserNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    reminders?: ReminderUncheckedUpdateManyWithoutUserNestedInput
    queries?: QueryLogUncheckedUpdateManyWithoutUserNestedInput
    oauthTokens?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
    fileUploads?: FileUploadUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SourceCreateManyUserInput = {
    id?: number
    provider: string
    providerId?: string | null
    displayName?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    encryptedToken?: string | null
    connectedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type DocumentCreateManyUserInput = {
    id?: number
    sourceId?: number | null
    title: string
    docType: string
    s3Path: string
    size?: number | null
    language?: string | null
    hash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateManyUserInput = {
    id?: number
    title: string
    description?: string | null
    dueAt?: Date | string | null
    completed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReminderCreateManyUserInput = {
    id?: number
    text: string
    remindAt: Date | string
    sent?: boolean
    createdAt?: Date | string
  }

  export type QueryLogCreateManyUserInput = {
    id?: number
    query: string
    response?: string | null
    usedChunks?: string | null
    latencyMs?: number | null
    createdAt?: Date | string
  }

  export type OAuthTokenCreateManyUserInput = {
    id?: number
    sourceId?: number | null
    provider: string
    refreshToken: string
    accessToken?: string | null
    scope?: string | null
    expiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuditLogCreateManyUserInput = {
    id?: number
    action: string
    details?: NullableJsonNullValueInput | InputJsonValue
    ip?: string | null
    createdAt?: Date | string
  }

  export type FileUploadCreateManyUserInput = {
    id?: number
    filename: string
    s3Path: string
    size?: number | null
    mimeType?: string | null
    createdAt?: Date | string
  }

  export type SourceUpdateWithoutUserInput = {
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    encryptedToken?: NullableStringFieldUpdateOperationsInput | string | null
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUpdateManyWithoutSourceNestedInput
    oauthTokens?: OAuthTokenUpdateManyWithoutSourceNestedInput
  }

  export type SourceUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    encryptedToken?: NullableStringFieldUpdateOperationsInput | string | null
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutSourceNestedInput
    oauthTokens?: OAuthTokenUncheckedUpdateManyWithoutSourceNestedInput
  }

  export type SourceUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    encryptedToken?: NullableStringFieldUpdateOperationsInput | string | null
    connectedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
    s3Path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunks?: ChunkUpdateManyWithoutDocumentNestedInput
    source?: SourceUpdateOneWithoutDocumentsNestedInput
  }

  export type DocumentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    sourceId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
    s3Path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunks?: ChunkUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    sourceId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
    s3Path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReminderUpdateWithoutUserInput = {
    text?: StringFieldUpdateOperationsInput | string
    remindAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReminderUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    remindAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReminderUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    remindAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueryLogUpdateWithoutUserInput = {
    query?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    usedChunks?: NullableStringFieldUpdateOperationsInput | string | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueryLogUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    query?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    usedChunks?: NullableStringFieldUpdateOperationsInput | string | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueryLogUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    query?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    usedChunks?: NullableStringFieldUpdateOperationsInput | string | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenUpdateWithoutUserInput = {
    provider?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: SourceUpdateOneWithoutOauthTokensNestedInput
  }

  export type OAuthTokenUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    sourceId?: NullableIntFieldUpdateOperationsInput | number | null
    provider?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    sourceId?: NullableIntFieldUpdateOperationsInput | number | null
    provider?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutUserInput = {
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileUploadUpdateWithoutUserInput = {
    filename?: StringFieldUpdateOperationsInput | string
    s3Path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileUploadUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    filename?: StringFieldUpdateOperationsInput | string
    s3Path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileUploadUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    filename?: StringFieldUpdateOperationsInput | string
    s3Path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentCreateManySourceInput = {
    id?: number
    userId: number
    title: string
    docType: string
    s3Path: string
    size?: number | null
    language?: string | null
    hash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OAuthTokenCreateManySourceInput = {
    id?: number
    userId: number
    provider: string
    refreshToken: string
    accessToken?: string | null
    scope?: string | null
    expiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentUpdateWithoutSourceInput = {
    title?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
    s3Path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunks?: ChunkUpdateManyWithoutDocumentNestedInput
    user?: UserUpdateOneRequiredWithoutDocumentsNestedInput
  }

  export type DocumentUncheckedUpdateWithoutSourceInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
    s3Path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunks?: ChunkUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateManyWithoutSourceInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
    s3Path?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenUpdateWithoutSourceInput = {
    provider?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOauthTokensNestedInput
  }

  export type OAuthTokenUncheckedUpdateWithoutSourceInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    provider?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthTokenUncheckedUpdateManyWithoutSourceInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    provider?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChunkCreateManyDocumentInput = {
    id?: number
    userId: number
    text: string
    chunkHash: string
    startPos?: number | null
    endPos?: number | null
    tokenCount?: number | null
    embeddingId?: number | null
    createdAt?: Date | string
  }

  export type ChunkUpdateWithoutDocumentInput = {
    userId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    chunkHash?: StringFieldUpdateOperationsInput | string
    startPos?: NullableIntFieldUpdateOperationsInput | number | null
    endPos?: NullableIntFieldUpdateOperationsInput | number | null
    tokenCount?: NullableIntFieldUpdateOperationsInput | number | null
    embeddingId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    embedding?: EmbeddingUpdateOneWithoutChunkNestedInput
  }

  export type ChunkUncheckedUpdateWithoutDocumentInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    chunkHash?: StringFieldUpdateOperationsInput | string
    startPos?: NullableIntFieldUpdateOperationsInput | number | null
    endPos?: NullableIntFieldUpdateOperationsInput | number | null
    tokenCount?: NullableIntFieldUpdateOperationsInput | number | null
    embeddingId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    embedding?: EmbeddingUncheckedUpdateOneWithoutChunkNestedInput
  }

  export type ChunkUncheckedUpdateManyWithoutDocumentInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    chunkHash?: StringFieldUpdateOperationsInput | string
    startPos?: NullableIntFieldUpdateOperationsInput | number | null
    endPos?: NullableIntFieldUpdateOperationsInput | number | null
    tokenCount?: NullableIntFieldUpdateOperationsInput | number | null
    embeddingId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}