import React, { useEffect, useRef } from 'react';
import parseColor from 'parse-color';
import Point from './Point';

const CanvasAnimation = ({ isActive, isPinging, config, onClick }) => {
  const canvasRef = useRef();
  const ctxRef = useRef();
  const dprRef = useRef(1);
  const centerRef = useRef({ x: 0, y: 0 });
  const numPointsRef = useRef(14);
  const pointsRef = useRef([]);
  const lastFrame = useRef(0);
  const currentColor = useRef();
  const targetColor = useRef();
  const targetWindowWidth = useRef(0);
  const targetWindowHeight = useRef(0);
  const targetZoom = useRef(1);
  const zoom = useRef(1);

  useEffect(() => {
    ctxRef.current = canvasRef.current.getContext('2d');
    dprRef.current = window.devicePixelRatio || 1;
    canvasRef.current.width = config.widget_size * dprRef.current;
    canvasRef.current.height = config.widget_size * dprRef.current;
    targetColor.current = parseColor(config.color_widget_border).rgba;
    currentColor.current = targetColor.current;
    targetWindowWidth.current = config.widget_size / 3.54;
    targetWindowHeight.current = config.widget_size / 3;

    const pointStep = (Math.PI * 2) / numPointsRef.current;
    const midPoint = (config.widget_size / 2) * dprRef.current;
    centerRef.current = { x: midPoint, y: midPoint };
    for (let i = 0; i < numPointsRef.current; ++i) {
      let point = new Point(pointStep * (i + 1), centerRef.current, midPoint);
      pointsRef.current.push(point);
    }

    draw(0);
  }, []);

  useEffect(() => {
    if (isPinging) {
      targetColor.current = parseColor(config.color_widget_ping_border).rgba;
    } else {
      targetColor.current = parseColor(config.color_widget_border).rgba;
    }

    if (isActive || isPinging) {
      targetZoom.current = 1.3;
    } else {
      targetZoom.current = 1;
    }
  }, [isActive, isPinging]);

  const drawBlob = (ctx, delta) => {
    let pointsArray = pointsRef.current;
    let points = numPointsRef.current;

    let p0 = pointsArray[points - 1].position;
    let p1 = pointsArray[0].position;

    let _p2 = p1;

    ctx.beginPath();
    ctx.moveTo(centerRef.current.x, centerRef.current.y);
    ctx.moveTo((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);

    pointsArray[0].solveWith(pointsArray[points - 1], pointsArray[1], delta);
    for (let i = 1; i < points; ++i) {
      pointsArray[i].solveWith(
        pointsArray[i - 1],
        pointsArray[i + 1] || pointsArray[0],
        delta,
      );

      let p2 = pointsArray[i].position;
      var xc = (p1.x + p2.x) / 2;
      var yc = (p1.y + p2.y) / 2;
      ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
      p1 = p2;
    }

    var xc = (p1.x + _p2.x) / 2;
    var yc = (p1.y + _p2.y) / 2;
    ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);

    ctx.fillStyle = `rgba(${currentColor.current[0]}, ${currentColor.current[1]}, ${currentColor.current[2]}, ${currentColor.current[3]})`;
    ctx.closePath();
    ctx.fill();
  };

  const draw = (time) => {
    const delta = (time - lastFrame.current) / 1000;
    lastFrame.current = time;
    requestAnimationFrame(draw);

    const ctx = ctxRef.current;

    ctx.clearRect(
      0,
      0,
      config.widget_size * dprRef.current,
      config.widget_size * dprRef.current,
    );

    lerpColor(delta);

    drawBlob(ctx, delta);

    ctx.save();
    ctx.beginPath();

    if (Math.abs(targetZoom.current - zoom.current) > 0.01) {
      zoom.current += (targetZoom.current - zoom.current) / 20;
    }

    let x = (config.widget_size / 2) * dprRef.current;
    let w = targetWindowWidth.current * dprRef.current * 0.7 * zoom.current;
    let h = targetWindowHeight.current * dprRef.current * 0.7 * zoom.current;

    ctx.moveTo(x, x - h);
    ctx.bezierCurveTo(
      x + 0.13 * w,
      x - h,
      x + 0.25 * w,
      x - 0.97 * h,
      x + 0.37 * w,
      x - 0.93 * h,
    );
    ctx.bezierCurveTo(
      x + 0.49 * w,
      x - 0.89 * h,
      x + 0.59 * w,
      x - 0.82 * h,
      x + 0.68 * w,
      x - 0.74 * h,
    );
    ctx.bezierCurveTo(
      x + 0.86 * w,
      x - 0.57 * h,
      x + w,
      x - 0.32 * h,
      x + w,
      x,
    );
    ctx.bezierCurveTo(
      x + w,
      x + 0.32 * h,
      x + 0.86 * w,
      x + 0.57 * h,
      x + 0.68 * w,
      x + 0.74 * h,
    );
    ctx.bezierCurveTo(
      x + 0.59 * w,
      x + 0.82 * h,
      x + 0.49 * w,
      x + 0.89 * h,
      x + 0.37 * w,
      x + 0.93 * h,
    );
    ctx.bezierCurveTo(
      x + 0.25 * w,
      x + 0.97 * h,
      x + 0.13 * w,
      x + h,
      x,
      x + h,
    );
    ctx.bezierCurveTo(
      x - 0.13 * w,
      x + h,
      x - 0.25 * w,
      x + 0.97 * h,
      x - 0.37 * w,
      x + 0.93 * h,
    );
    ctx.bezierCurveTo(
      x - 0.49 * w,
      x + 0.89 * h,
      x - 0.59 * w,
      x + 0.82 * h,
      x - 0.68 * w,
      x + 0.74 * h,
    );
    ctx.bezierCurveTo(
      x - 0.86 * w,
      x + 0.57 * h,
      x - w,
      x + 0.32 * h,
      x - w,
      x,
    );
    ctx.bezierCurveTo(
      x - w,
      x - 0.32 * h,
      x - 0.86 * w,
      x - 0.57 * h,
      x - 0.68 * w,
      x - 0.74 * h,
    );
    ctx.bezierCurveTo(
      x - 0.59 * w,
      x - 0.82 * h,
      x - 0.49 * w,
      x - 0.89 * h,
      x - 0.37 * w,
      x - 0.93 * h,
    );
    ctx.bezierCurveTo(
      x - 0.25 * w,
      x - 0.97 * h,
      x - 0.13 * w,
      x - h,
      x,
      x - h,
    );

    ctx.closePath();
    ctx.clip();
    ctx.clearRect(
      0,
      0,
      config.widget_size * dprRef.current,
      config.widget_size * dprRef.current,
    );
    ctx.restore();
  };

  const lerpNumber = (num1, num2, delta) => {
    return Math.round(
      Math.max(Math.min(num1 - (num1 - num2) * delta * 3, 255), 0),
    );
  };

  const lerpColor = (delta) => {
    currentColor.current[0] = lerpNumber(
      currentColor.current[0],
      targetColor.current[0],
      delta,
    );
    currentColor.current[1] = lerpNumber(
      currentColor.current[1],
      targetColor.current[1],
      delta,
    );
    currentColor.current[2] = lerpNumber(
      currentColor.current[2],
      targetColor.current[2],
      delta,
    );
    currentColor.current[3] = lerpNumber(
      currentColor.current[3],
      targetColor.current[3],
      delta,
    );
  };

  return <canvas onClick={onClick} ref={canvasRef} />;
};

export default CanvasAnimation;
