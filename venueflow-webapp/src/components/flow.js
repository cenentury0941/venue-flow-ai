"use client"

import { useCallback, useEffect, useState, useRef } from 'react';
import {
ReactFlow,
MiniMap,
Controls,
Background,
useNodesState,
useEdgesState,
addEdge,
reconnectEdge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import CameraNode from './cameranode';
import { getDevices } from '@/utils/apis/devices';
import { isLoggedIn } from '@/utils/apis/login';
import { getCameraState, getEdgeState, setCameraState, setEdgeState } from '@/utils/firebase';
import { areArraysEqual } from '@/utils/arrayUtil';
import { list } from 'postcss';

const initialNodes = [
{ id: '1', type: 'cameraNode', position: { x: 0, y: 0 }, data: { label: '1' } },
{ id: '2', type: 'cameraNode', position: { x: 0, y: 100 }, data: { label: '2' } },
];

const initialEdges = [{ id: 'INIT', source: '1', target: '2', animated: true }];

function Flow() {
  const [cameraData , setCameraData] = useState([])
  const [devices, setDevices] = useState([])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  useEffect( () => {
    getCameraState(setCameraData);
    getEdgeState(setEdges);
    getDevices(setDevices);
  } , [] )

  useEffect( () => {
    if(edges[0]?.id == "INIT")
    {
      return
    }
    setEdgeState(edges)
  } , [edges] )

  useEffect( () => {
    if(!areArraysEqual(cameraData,devices))
    {
      setCameraState(devices)
      console.log("Updated Camera State")
    }
    else {
      console.log("No change in Camera State")
    }

    var list_of_nodes = []

    devices.forEach( (elem, index, arr) => {
        list_of_nodes.push( {
          id: index.toString(),
          type: "cameraNode",
          position: { x: ( (index % 5) * 100 ) , y: ( Math.floor( index / 5 ) * 100 ) },
          data: {cameraId : elem.name, deviceId : elem.id}
      } )
    } )
    console.log( "Nodes : ", list_of_nodes )

    setNodes( list_of_nodes )

  } , [devices] )

const nodeTypes = {
    cameraNode: CameraNode,
  };

const onConnect = useCallback(
  (params) => setEdges((eds) => addEdge(params, eds)), [setEdges]
);

const edgeReconnectSuccessful = useRef(true);

const onReconnectStart = useCallback(() => {
  edgeReconnectSuccessful.current = false;
}, []);

const onReconnect = useCallback((oldEdge, newConnection) => {
  edgeReconnectSuccessful.current = true;
  setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
}, []);

const onReconnectEnd = useCallback((_, edge) => {
  if (!edgeReconnectSuccessful.current) {
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  }

  edgeReconnectSuccessful.current = true;
}, []);



return (
  <ReactFlow
    nodes={nodes}
    edges={edges}
    onNodesChange={onNodesChange}
    onEdgesChange={onEdgesChange}
    snapToGrid
    onReconnect={onReconnect}
    onReconnectStart={onReconnectStart}
    onReconnectEnd={onReconnectEnd}
    onConnect={onConnect}
    fitView
    attributionPosition="bottom-left"
    nodeTypes={nodeTypes}
  >
    <Background />
  </ReactFlow>
);
}

export default Flow;