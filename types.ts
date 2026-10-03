import type { SimulationNodeDatum, SimulationLinkDatum } from 'd3';

export enum NodeType {
  DataSource = 'DataSource',
  Transformation = 'Transformation',
  DataSink = 'DataSink',
  Dashboard = 'Dashboard',
  Model = 'Model',
}

export interface Node extends SimulationNodeDatum {
  id: string;
  name: string;
  type: NodeType;
  description?: string;
  owner?: string;
  lastModified?: string;
  // Fix: Explicitly declare d3 simulation properties to fix type resolution errors.
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface Link extends SimulationLinkDatum<Node> {
  source: string;
  target: string;
}

export interface PipelineData {
  nodes: Node[];
  links: Link[];
}
