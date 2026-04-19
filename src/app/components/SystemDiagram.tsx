import { motion } from "motion/react";
import taprootLogo from "../../imports/Taproot_just_logo_svg.png";
import taprootLogoWhite from "../../imports/Taproot_just_logo_svg-1.png";

const ORBIT_NODES = [
  { angle: 0, label: "Prompt", delay: 0.5 },
  { angle: 60, label: "Retrieve", delay: 0.6 },
  { angle: 120, label: "Tool", delay: 0.7 },
  { angle: 180, label: "Guard", delay: 0.8 },
  { angle: 240, label: "Eval", delay: 0.9 },
  { angle: 300, label: "Worker", delay: 1.0 },
] as const;

const FEEDBACK_ARCS = [
  { from: 0, to: 60 },
  { from: 60, to: 120 },
  { from: 120, to: 180 },
  { from: 180, to: 240 },
  { from: 240, to: 300 },
  { from: 300, to: 360 },
] as const;

const CENTER = 200;
const HUB_RADIUS = 40;
const NODE_RADIUS = 28;
const ORBIT_RADIUS = 120;

export function SystemDiagram() {
  return (
    <div className="relative w-full aspect-square max-w-xl mx-auto">
      {/* Background logo watermark */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center opacity-5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <img src={taprootLogo} alt="" className="w-64 h-64 object-contain" />
      </motion.div>

      <svg viewBox="0 0 400 400" className="w-full h-full relative z-10">
        {/* Spokes — render first so they sit behind nodes */}
        {ORBIT_NODES.map(({ angle, label, delay }) => {
          const radian = (angle * Math.PI) / 180;
          const x1 = CENTER + Math.cos(radian) * HUB_RADIUS;
          const y1 = CENTER + Math.sin(radian) * HUB_RADIUS;
          const x2 = CENTER + Math.cos(radian) * (ORBIT_RADIUS - NODE_RADIUS);
          const y2 = CENTER + Math.sin(radian) * (ORBIT_RADIUS - NODE_RADIUS);

          return (
            <motion.line
              key={`spoke-${label}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#28c39d"
              strokeWidth="2"
              opacity="0.4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay }}
            />
          );
        })}

        {/* Feedback-loop arcs around the orbit */}
        {FEEDBACK_ARCS.map(({ from, to }, i) => {
          const r1 = (from * Math.PI) / 180;
          const r2 = (to * Math.PI) / 180;
          const clearRadius = ORBIT_RADIUS + NODE_RADIUS + 8;

          const x1 = CENTER + Math.cos(r1) * clearRadius;
          const y1 = CENTER + Math.sin(r1) * clearRadius;
          const x2 = CENTER + Math.cos(r2) * clearRadius;
          const y2 = CENTER + Math.sin(r2) * clearRadius;

          const midAngle = (from + to) / 2;
          const midRadian = (midAngle * Math.PI) / 180;
          const controlRadius = clearRadius + 20;
          const cx = CENTER + Math.cos(midRadian) * controlRadius;
          const cy = CENTER + Math.sin(midRadian) * controlRadius;

          return (
            <motion.path
              key={`arc-${i}`}
              d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
              stroke="#28c39d"
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1.5,
                delay: 1.2 + i * 0.1,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          );
        })}

        {/* Central hub */}
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={HUB_RADIUS}
          fill="#28c39d"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />

        {/* Hub logo */}
        <motion.image
          href={taprootLogoWhite}
          x={CENTER - 25}
          y={CENTER - 25}
          width="50"
          height="50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        />

        {/* Orbiting nodes */}
        {ORBIT_NODES.map(({ angle, label, delay }) => {
          const radian = (angle * Math.PI) / 180;
          const x = CENTER + Math.cos(radian) * ORBIT_RADIUS;
          const y = CENTER + Math.sin(radian) * ORBIT_RADIUS;

          return (
            <g key={label}>
              <motion.circle
                cx={x}
                cy={y}
                r={NODE_RADIUS}
                fill="#000000"
                stroke="#28c39d"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay }}
              />
              <motion.text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fill="#28c39d"
                fontSize="11"
                fontWeight="500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: delay + 0.2 }}
              >
                {label}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
