
import { PipelineData, NodeType } from './types';

export const INITIAL_PIPELINE_DATA: PipelineData = {
  nodes: [
    {
      id: 'postgres_customers',
      name: 'Customer DB (Postgres)',
      type: NodeType.DataSource,
      description: 'Primary database for customer information.',
      owner: 'DBA Team',
      lastModified: '2023-10-26T10:00:00Z',
    },
    {
      id: 's3_sales_csv',
      name: 'Sales CSV (S3)',
      type: NodeType.DataSource,
      description: 'Daily CSV uploads of sales transactions.',
      owner: 'Sales Ops',
      lastModified: '2023-10-27T01:00:00Z',
    },
    {
      id: 'etl_join',
      name: 'ETL: Clean & Join Data',
      type: NodeType.Transformation,
      description: 'Spark job to clean and join customer and sales data.',
      owner: 'Data Engineering',
      lastModified: '2026-02-26T03:00:00Z',
    },
    {
      id: 'feature_engineering',
      name: 'Feature Engineering',
      type: NodeType.Transformation,
      description: 'Generates features for machine learning models.',
      owner: 'Data Science',
      lastModified: '2023-10-27T04:00:00Z',
    },
    {
      id: 'dwh_bigquery',
      name: 'Data Warehouse (BigQuery)',
      type: NodeType.DataSink,
      description: 'Centralized data warehouse for analytics.',
      owner: 'Analytics Team',
      lastModified: '2026-02-27T05:00:00Z',
    },
    {
      id: 'sales_dashboard',
      name: 'Sales Analytics Dashboard',
      type: NodeType.Dashboard,
      description: 'Tableau dashboard for monitoring sales performance.',
      owner: 'BI Team',
      lastModified: '2023-10-27T08:00:00Z',
    },
    {
      id: 'fraud_model',
      name: 'Fraud Detection Model',
      type: NodeType.Model,
      description: 'ML model to detect fraudulent transactions in real-time.',
      owner: 'Data Science',
      lastModified: '2023-10-27T06:00:00Z',
    },
  ],
  links: [
    { source: 'postgres_customers', target: 'etl_join' },
    { source: 's3_sales_csv', target: 'etl_join' },
    { source: 'etl_join', target: 'dwh_bigquery' },
    { source: 'etl_join', target: 'feature_engineering' },
    { source: 'dwh_bigquery', target: 'sales_dashboard' },
    { source: 'feature_engineering', target: 'fraud_model' },
  ],
};
