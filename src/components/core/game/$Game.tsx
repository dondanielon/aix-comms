import { useEffect, useRef } from 'react';
import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { setupLighting, setupPlayers, setupTerrain } from '@engine/setup';
import { CameraSystem } from '@engine/systems/CameraSystem';
import { MovementSystem } from '@engine/systems/MovementSystem';
import { WebSocketGameState } from '@src/interfaces';
import { gameStore } from '@src/stores/game.store';

const CAMERA_ASPECT_RATIO = window.innerWidth / window.innerHeight;
const CAMERA_FAR_VIEW = 1_000;
const CAMERA_FOV = 25;
const CAMERA_NEAR_VIEW = 0.1;

interface IGameProps {
  loading: (x: boolean) => void;
}

function Game({ loading }: IGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const user = gameStore((state) => state.user);
  const gameState = gameStore((state) => state.gameState);

  const initialize = async (canvas: HTMLCanvasElement, state: WebSocketGameState) => {
    if (!user) return;
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    const scene = new Scene();
    const renderer = new WebGLRenderer({ antialias: true, canvas });
    const camera = new PerspectiveCamera(
      CAMERA_FOV,
      CAMERA_ASPECT_RATIO,
      CAMERA_NEAR_VIEW,
      CAMERA_FAR_VIEW
    );

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    const terrain = setupTerrain(state.terrainId, state.terrainRotation, state.terrainPoints);
    const { directionalLight, ambientLight } = setupLighting();
    const players = await setupPlayers(state.players);
    const mainPlayer = players.find((p) => p.id === user.id);
    if (!mainPlayer) return;

    scene.add(camera);
    scene.add(terrain.mesh);
    scene.add(directionalLight);
    scene.add(ambientLight);

    for (const player of players) {
      scene.add(player.model.mesh);
    }

    mainPlayer.animation.idle.play();

    const clock = new Clock();
    const cameraSystem = new CameraSystem(camera, mainPlayer);
    const movementSystem = new MovementSystem(mainPlayer, canvas, scene, camera, terrain);

    const animationLoop = () => {
      requestAnimationFrame(animationLoop);
      const delta = clock.getDelta();

      cameraSystem.update(delta);
      movementSystem.update(delta);

      renderer.render(scene, camera);
    };

    animationLoop();
    loading(false);
  };

  useEffect(() => {
    if (!canvasRef.current || !gameState) return;

    const canvas = canvasRef.current;
    initialize(canvas, gameState);

    return () => {
      const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (context) {
        context.getExtension('WEBGL_lose_context')?.loseContext();
      }
    };
  }, [canvasRef]);

  return <canvas ref={canvasRef} id='render'></canvas>;
}

export default Game;
