import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { LineageGraph } from './components/LineageGraph';
import { NodeDetailPanel } from './components/NodeDetailPanel';
import { FileUpload } from './components/FileUpload';
import { INITIAL_PIPELINE_DATA } from './constants';
import type { PipelineData, Node } from './types';
import { ZoomControls } from './components/ZoomControls';

export default function App() {
  const [pipelineData, setPipelineData] = useState<PipelineData>(INITIAL_PIPELINE_DATA);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [zoomTransform, setZoomTransform] = useState({ k: 1, x: 0, y: 0 });

  const handleDataLoaded = useCallback((data: PipelineData) => {
    // Basic validation
    if (data && Array.isArray(data.nodes) && Array.isArray(data.links)) {
      setPipelineData(data);
      setSelectedNode(null); // Reset selection on new data
    } else {
      alert('Invalid data format. Please upload a JSON file with "nodes" and "links" arrays.');
    }
  }, []);

  const handleNodeClick = useCallback((node: Node) => {
    setSelectedNode(node);
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedNode(null);
  }, []);
  
  const handleResetData = useCallback(() => {
    setPipelineData(INITIAL_PIPELINE_DATA);
    setSelectedNode(null);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-white text-gray-800 font-sans">
      <Header />
      <main className="flex-grow flex overflow-hidden">
        <aside className="w-full md:w-1/4 lg:w-1/5 h-full flex flex-col bg-gray-50 p-4 space-y-4 overflow-y-auto border-r border-gray-200">
          <div>
            <h2 className="text-xl font-bold mb-2 text-yellow-600">Controls</h2>
            <div className="space-y-2">
              <FileUpload onDataLoaded={handleDataLoaded} />
              <button
                onClick={handleResetData}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
              >
                Reset to Default
              </button>
            </div>
          </div>
          <NodeDetailPanel node={selectedNode} onClear={handleClearSelection} />
        </aside>
        <div className="flex-grow h-full relative">
          <LineageGraph 
            data={pipelineData} 
            onNodeClick={handleNodeClick} 
            selectedNodeId={selectedNode?.id}
            zoomTransform={zoomTransform}
            setZoomTransform={setZoomTransform}
          />
          <ZoomControls setZoomTransform={setZoomTransform} />
        </div>
      </main>
    </div>
  );
}