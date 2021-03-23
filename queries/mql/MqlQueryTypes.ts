export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
};

/**
 * Base Query object exposed by GraphQL for the MQL Server
 *
 * Each field defined below is accessible by the API, by calling the equivalent resolver.
 */
export type Query = {
  __typename?: 'Query';
  version?: Maybe<Scalars['String']>;
  mqlQuery?: Maybe<MqlQuery>;
  metrics?: Maybe<Array<Metric>>;
  metricByName?: Maybe<Metric>;
  measures?: Maybe<Array<Measure>>;
  measureByName?: Maybe<Measure>;
  dimensionNamesForMetrics?: Maybe<Array<Maybe<Scalars['String']>>>;
  queries?: Maybe<Array<Maybe<MqlQuery>>>;
  healthReport?: Maybe<Array<Maybe<MqlServerHealthItem>>>;
};


/**
 * Base Query object exposed by GraphQL for the MQL Server
 *
 * Each field defined below is accessible by the API, by calling the equivalent resolver.
 */
export type QueryMqlQueryArgs = {
  id: Scalars['ID'];
};


/**
 * Base Query object exposed by GraphQL for the MQL Server
 *
 * Each field defined below is accessible by the API, by calling the equivalent resolver.
 */
export type QueryMetricsArgs = {
  modelKey?: Maybe<ModelKeyArgument>;
};


/**
 * Base Query object exposed by GraphQL for the MQL Server
 *
 * Each field defined below is accessible by the API, by calling the equivalent resolver.
 */
export type QueryMetricByNameArgs = {
  modelKey?: Maybe<ModelKeyArgument>;
  name: Scalars['String'];
};


/**
 * Base Query object exposed by GraphQL for the MQL Server
 *
 * Each field defined below is accessible by the API, by calling the equivalent resolver.
 */
export type QueryMeasuresArgs = {
  modelKey?: Maybe<ModelKeyArgument>;
};


/**
 * Base Query object exposed by GraphQL for the MQL Server
 *
 * Each field defined below is accessible by the API, by calling the equivalent resolver.
 */
export type QueryMeasureByNameArgs = {
  modelKey?: Maybe<ModelKeyArgument>;
  name: Scalars['String'];
};


/**
 * Base Query object exposed by GraphQL for the MQL Server
 *
 * Each field defined below is accessible by the API, by calling the equivalent resolver.
 */
export type QueryDimensionNamesForMetricsArgs = {
  modelKey?: Maybe<ModelKeyArgument>;
  metricNames?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/**
 * Base Query object exposed by GraphQL for the MQL Server
 *
 * Each field defined below is accessible by the API, by calling the equivalent resolver.
 */
export type QueryQueriesArgs = {
  activeOnly?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

/**
 * The MQL Query class is used to access the output of an MQL Query.
 *
 * Since queries are processed asynchronously, the status field indicates whether results are available.
 * Once complete, the results are available either in a strongly typed format, `result`, or
 * a generic, tabular format suitable for constructing a Pandas DataFrame.
 */
export type MqlQuery = {
  __typename?: 'MqlQuery';
  /** Query IDs are disposable, as query results expire in a short period of time. It is expected that queries are created, and then results are retrieved immediately upon query completion. */
  id?: Maybe<Scalars['ID']>;
  /** The model key used when creating the query */
  modelKey?: Maybe<ModelKey>;
  metrics?: Maybe<Array<Scalars['String']>>;
  dimensions?: Maybe<Array<Scalars['String']>>;
  /** The status of the requested query */
  status?: Maybe<MqlQueryStatus>;
  result?: Maybe<Array<MqlQueryResultSeries>>;
  /** The Tabular Results are Base 64-encoded JSON of a subset of rows from the query results Data Frame. */
  resultTabular?: Maybe<MqlQueryTabularResult>;
  /** The completion time for the query result. If using the MQL result cache, helps check when the latest cache fill occurred. */
  completedAt?: Maybe<Scalars['DateTime']>;
  resultTableSchema?: Maybe<Scalars['String']>;
  resultTableName?: Maybe<Scalars['String']>;
  /** Time this query was submitted to the MQL server */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Time the MQL Server start query execution */
  startedAt?: Maybe<Scalars['DateTime']>;
  logs?: Maybe<Scalars['String']>;
  logsByLine?: Maybe<Scalars['String']>;
};


/**
 * The MQL Query class is used to access the output of an MQL Query.
 *
 * Since queries are processed asynchronously, the status field indicates whether results are available.
 * Once complete, the results are available either in a strongly typed format, `result`, or
 * a generic, tabular format suitable for constructing a Pandas DataFrame.
 */
export type MqlQueryResultTabularArgs = {
  cursor?: Maybe<Scalars['Int']>;
  orient?: Maybe<PandasJsonOrient>;
};


/**
 * The MQL Query class is used to access the output of an MQL Query.
 *
 * Since queries are processed asynchronously, the status field indicates whether results are available.
 * Once complete, the results are available either in a strongly typed format, `result`, or
 * a generic, tabular format suitable for constructing a Pandas DataFrame.
 */
export type MqlQueryLogsByLineArgs = {
  fromLine?: Maybe<Scalars['Int']>;
  maxLines?: Maybe<Scalars['Int']>;
};

/** A Model Key is unsed to uniquely identify a model at a specific commit */
export type ModelKey = {
  __typename?: 'ModelKey';
  organization: Scalars['String'];
  repo: Scalars['String'];
  branch: Scalars['String'];
  commit: Scalars['String'];
};

/**
 * The status of queries submitted for execution in the query manager.
 *
 * Note: Obviously we need to link this from the version in query_manager.
 */
export enum MqlQueryStatus {
  Pending = 'PENDING',
  Running = 'RUNNING',
  Successful = 'SUCCESSFUL',
  Failed = 'FAILED',
  UnhandledException = 'UNHANDLED_EXCEPTION',
  Unknown = 'UNKNOWN'
}

/** This is the canonical shape for chart-ready data. */
export type MqlQueryResultSeries = {
  __typename?: 'MqlQueryResultSeries';
  /** For queries without dimensional cuts, series_value will be `ALL`. For queries with dimensional cuts, one of these Result will be returned per dimension */
  seriesValue?: Maybe<Scalars['String']>;
  data?: Maybe<Array<ResultDatum>>;
};

/** This interface is used to describe any type of MQL Query result data */
export type ResultDatum = {
  y: Scalars['Float'];
};

/** Object type for Tabular data used to populate Pandas DataFrames */
export type MqlQueryTabularResult = {
  __typename?: 'MqlQueryTabularResult';
  /** Base-64 encoded Pandas DataFrame dumped to JSON using the specified orient. */
  data?: Maybe<Scalars['String']>;
  /** If present, the cursor indicates the value to pass for the next batch of records. If null, all results have been transferred. */
  nextCursor?: Maybe<Scalars['String']>;
};

/**
 * Determines the format of the JSON output for the DataFrame
 *
 * See https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.to_json.html
 */
export enum PandasJsonOrient {
  Split = 'SPLIT',
  Records = 'RECORDS',
  Index = 'INDEX',
  Columns = 'COLUMNS',
  Values = 'VALUES',
  Table = 'TABLE'
}


export type Metric = {
  __typename?: 'Metric';
  name: Scalars['String'];
  measures?: Maybe<Array<Scalars['String']>>;
  dimensions?: Maybe<Array<Scalars['String']>>;
  dimensionValues?: Maybe<Array<Scalars['String']>>;
};


export type MetricDimensionValuesArgs = {
  modelKey?: Maybe<ModelKeyArgument>;
  dimensionName?: Maybe<Scalars['String']>;
};

/** Directly mirrors ModelKey in models as an input argument */
export type ModelKeyArgument = {
  organization?: Maybe<Scalars['String']>;
  repo?: Maybe<Scalars['String']>;
  branch?: Maybe<Scalars['String']>;
  commit?: Maybe<Scalars['String']>;
};

export type Measure = {
  __typename?: 'Measure';
  name: Scalars['String'];
  dataSources?: Maybe<Array<Scalars['String']>>;
};

export type MqlServerHealthItem = {
  __typename?: 'MqlServerHealthItem';
  name: Scalars['String'];
  status: Scalars['String'];
  errorMessage?: Maybe<Scalars['String']>;
};

/** Base mutation object exposed by GraphQL. */
export type Mutation = {
  __typename?: 'Mutation';
  createMqlMaterialization?: Maybe<CreateMqlMaterializationPayload>;
  /**
   * This mutation is used to initiate an MQL Query, but the results are fetched separately.
   *
   * The return value is a queryId that can be used to fetch the query status, errors, and results.
   */
  createMqlQuery?: Maybe<CreateMqlQueryPayload>;
  /** @deprecated Moving to async implementation (CreateMqlMaterialization) */
  materialize?: Maybe<Materialize>;
  /** Drop the MQL dynamic cache. Please avoid doing this unless there's a cache corruption issue. */
  dropCache?: Maybe<DropCache>;
  /** Stores hosted MQL Server config using AWS Secrets Manager. */
  updateMqlServerConfig?: Maybe<UpdateMqlServerConfig>;
  /** Removes hosted MQL Server config using AWS Secrets Manager. */
  revokeMqlServerConfig?: Maybe<RevokeMqlServerConfig>;
};


/** Base mutation object exposed by GraphQL. */
export type MutationCreateMqlMaterializationArgs = {
  input: CreateMqlMaterializationInput;
};


/** Base mutation object exposed by GraphQL. */
export type MutationCreateMqlQueryArgs = {
  input: CreateMqlQueryInput;
};


/** Base mutation object exposed by GraphQL. */
export type MutationMaterializeArgs = {
  asTable?: Maybe<Scalars['String']>;
  cacheMode?: Maybe<CacheMode>;
  groupBy?: Maybe<Array<Scalars['String']>>;
  metrics?: Maybe<Array<Scalars['String']>>;
  modelKey?: Maybe<ModelKeyInput>;
  where?: Maybe<ConstraintInput>;
};


/** Base mutation object exposed by GraphQL. */
export type MutationDropCacheArgs = {
  confirm?: Maybe<Scalars['String']>;
};


/** Base mutation object exposed by GraphQL. */
export type MutationUpdateMqlServerConfigArgs = {
  dwPassword?: Maybe<Scalars['String']>;
  mqlServerId?: Maybe<Scalars['Int']>;
  tfdApiKey?: Maybe<Scalars['String']>;
};


/** Base mutation object exposed by GraphQL. */
export type MutationRevokeMqlServerConfigArgs = {
  mqlServerId?: Maybe<Scalars['Int']>;
};

export type CreateMqlMaterializationPayload = {
  __typename?: 'CreateMqlMaterializationPayload';
  id?: Maybe<Scalars['ID']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateMqlMaterializationInput = {
  modelKey?: Maybe<ModelKeyInput>;
  asTable?: Maybe<Scalars['String']>;
  metrics?: Maybe<Array<Scalars['String']>>;
  groupBy?: Maybe<Array<Scalars['String']>>;
  where?: Maybe<ConstraintInput>;
  cacheMode?: Maybe<CacheMode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Directly mirrors ModelKey in models */
export type ModelKeyInput = {
  organization?: Maybe<Scalars['String']>;
  repo?: Maybe<Scalars['String']>;
  branch?: Maybe<Scalars['String']>;
  commit?: Maybe<Scalars['String']>;
};

/** Container class for inputs to allow for and/or wrappers on the `where` clause */
export type ConstraintInput = {
  And?: Maybe<Array<SingleConstraintInput>>;
  Or?: Maybe<Array<SingleConstraintInput>>;
  constraint?: Maybe<SingleConstraintInput>;
};

/** Actual `where` clauses to be applied */
export type SingleConstraintInput = {
  constraintType?: Maybe<AtomicConstraintType>;
  dimensionName?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Scalars['String']>>;
  start?: Maybe<Scalars['String']>;
  stop?: Maybe<Scalars['String']>;
};

/** Current possible values for constraints */
export enum AtomicConstraintType {
  Set = 'SET',
  Range = 'RANGE'
}

/** An enumeration. */
export enum CacheMode {
  Read = 'READ',
  Readwrite = 'READWRITE',
  Write = 'WRITE',
  Ignore = 'IGNORE'
}

/**
 * This mutation is used to initiate an MQL Query, but the results are fetched separately.
 *
 * The return value is a queryId that can be used to fetch the query status, errors, and results.
 */
export type CreateMqlQueryPayload = {
  __typename?: 'CreateMqlQueryPayload';
  id?: Maybe<Scalars['ID']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateMqlQueryInput = {
  modelKey?: Maybe<ModelKeyInput>;
  metrics?: Maybe<Array<Scalars['String']>>;
  groupBy?: Maybe<Array<Scalars['String']>>;
  where?: Maybe<ConstraintInput>;
  order?: Maybe<Array<Scalars['String']>>;
  limit?: Maybe<Scalars['Int']>;
  /** Set to True if you want to automatically add a default Time Series dimension to the query. This is useful for plotting the metric in time series without needing to know the time dimension up front. */
  addTimeSeries?: Maybe<Scalars['Boolean']>;
  /** Optionally, provide a cache mode to instruct the query engine how/whether to check the cache for data. */
  cacheMode?: Maybe<CacheMode>;
  useResultCache?: Maybe<Scalars['Boolean']>;
  postProcessor?: Maybe<Scalars['String']>;
  postProcessors?: Maybe<Array<Scalars['String']>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type Materialize = {
  __typename?: 'Materialize';
  schema?: Maybe<Scalars['String']>;
  table?: Maybe<Scalars['String']>;
};

/** Drop the MQL dynamic cache. Please avoid doing this unless there's a cache corruption issue. */
export type DropCache = {
  __typename?: 'DropCache';
  success?: Maybe<Scalars['Boolean']>;
};

/** Stores hosted MQL Server config using AWS Secrets Manager. */
export type UpdateMqlServerConfig = {
  __typename?: 'UpdateMqlServerConfig';
  config?: Maybe<MqlServerConfig>;
};

/** MQL Server configuration for hosted MQL Servers */
export type MqlServerConfig = {
  __typename?: 'MqlServerConfig';
  /** MQL Server ID as stored in the Backend */
  mqlServerId?: Maybe<Scalars['Int']>;
  /** Transform Data API Key. _Note:_ Stored securely using AWS Secrets Manager. */
  tfdApiKey?: Maybe<Scalars['String']>;
  /** Password used to access the Data Warehouse. _Note:_ Stored securely using AWS Secrets Manager. */
  dwPassword?: Maybe<Scalars['String']>;
};

/** Removes hosted MQL Server config using AWS Secrets Manager. */
export type RevokeMqlServerConfig = {
  __typename?: 'RevokeMqlServerConfig';
  success?: Maybe<Scalars['Boolean']>;
};

/** MQL Query Result Data are expected to be plotted on a time series so this is the most common result type */
export type TimeSeriesDatum = ResultDatum & {
  __typename?: 'TimeSeriesDatum';
  y: Scalars['Float'];
  xDate: Scalars['DateTime'];
};

export type FetchMqlTimeSeriesQueryVariables = Exact<{
  queryId: Scalars['ID'];
}>;


export type FetchMqlTimeSeriesQuery = (
  { __typename?: 'Query' }
  & { mqlQuery?: Maybe<(
    { __typename?: 'MqlQuery' }
    & Pick<MqlQuery, 'id' | 'status' | 'metrics'>
    & { result?: Maybe<Array<(
      { __typename?: 'MqlQueryResultSeries' }
      & Pick<MqlQueryResultSeries, 'seriesValue'>
      & { data?: Maybe<Array<(
        { __typename?: 'TimeSeriesDatum' }
        & Pick<TimeSeriesDatum, 'xDate' | 'y'>
      )>> }
    )>> }
  )> }
);
