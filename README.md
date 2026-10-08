# HybridFlow-ITS

An Intelligent Transportation System (ITS) for real-time adaptive traffic signal control and automated emergency vehicle preemption in heterogeneous, non-lane-disciplined traffic environments.

---

## Overview

HybridFlow-ITS is an edge-native traffic management platform designed to replace legacy fixed-cycle signal controllers with vision-driven dynamic scheduling. The system operates on standard CCTV and IP camera feeds at urban intersections, computing vehicle queues and approach densities to dynamically optimize green splits while providing deterministic preemption for emergency vehicles.

Unlike traditional adaptive signal systems (e.g., SCATS, SCOOT) that require embedded inductive loop sensors and assume lane-disciplined passenger vehicle flows, HybridFlow-ITS is engineered specifically for mixed-traffic conditions where two-wheelers, three-wheelers, buses, and commercial vehicles share undivided road space.

---

## System Architecture

The platform uses a decoupled, dual-engine design to balance real-time edge inference throughput with mission-critical signal safety:

```
[ Camera Feeds ]
       |
       v
+-------------------------------------------------------------------+
| Engine 1: Spatial Perception & Multi-Object Tracking              |
| - High-throughput YOLO object detector (ONNX / TensorRT)          |
| - ByteTrack data association (Kalman filter state estimation)     |
| - Dynamic Passenger Car Unit (PCU) calculation per approach       |
+-------------------------------------------------------------------+
       |                                             |
       | (Periodic Telemetry)                        | (Candidate Detected)
       v                                             v
+------------------------------------+   +--------------------------+
| Traffic Signal Controller          |   | Engine 2: Emergency      |
| - Webster delay optimization       |   | Verification             |
| - Dynamic green-split allocation   |   | - Signature verification |
| - Deterministic phase transitions  |   |   (audio/visual markers) |
+------------------------------------+   +--------------------------+
       |                                             |
       |                                             | (Preemption Trigger)
       +----------------------+----------------------+
                              v
             [ Signal Hardware / Web Telemetry ]
```

### 1. Engine 1: Perception and Spatial Dynamics
- **Detection**: Single-stage neural network fine-tuned on heterogeneous traffic classes: `car`, `threewheel`, `bus`, `truck`, `motorbike`, and `van`.
- **Tracking**: ByteTrack association maintaining vehicle trajectories across partial occlusions and high-density clustering.
- **Density Metric**: Lane occupancy is evaluated in Passenger Car Units (PCU) rather than raw vehicle counts, accounting for disparate road footprint and acceleration dynamics.

### 2. Engine 2: Emergency Vehicle Preemption
- Operates asynchronously when candidate priority vehicles (ambulances, fire engines) enter an intersection approach.
- Validates vehicle markers before interrupting standard phase rotations to prevent false preemption triggers.
- Executes an automated green clearance corridor to clear downstream queues ahead of the emergency vehicle.

### 3. Traffic Flow Optimization Engine
- Green split durations are calculated dynamically using Webster's minimum delay formulation, bounded by strictly enforced safety constraints ($g_{min}$, $g_{max}$, and inter-green clearance intervals).
- Automatic green truncation triggers when queue clearance is detected prior to timer expiration, eliminating wasted green time.

---

## Repository Structure

```
HybridFlow-ITS/
├── core/             # High-performance Rust edge engine
│   ├── Cargo.toml    # Dependencies (ort, tokio, axum, nalgebra, serde)
│   └── src/          # Tracking, PCU calculation, Webster control, and telemetry
├── training/         # Model training and artifact export
│   ├── data.yaml     # Dataset configuration for mixed traffic classes
│   ├── prepare.py    # Dataset integrity verification and class distribution check
│   ├── export_onnx.py# PyTorch to ONNX conversion pipeline
│   └── train.ipynb   # Jupyter / Colab training workflow
├── dashboard/        # Operator command center (React, TypeScript, Bun, Vite)
├── data/             # Heterogeneous vehicle detection dataset
│   └── vehicle_dataset/
├── .gitignore        # Unified repository exclusion rules
└── README.md         # Technical documentation
```

---

## Technical Specifications

### Passenger Car Unit (PCU) Weighting
To reflect road space occupancy and acceleration profiles in mixed traffic, detections are weighted according to standardized traffic engineering criteria:

| Vehicle Class | PCU Weight | Description |
| :--- | :--- | :--- |
| Bus | 3.0 | Heavy public transit vehicle |
| Truck | 3.0 | Heavy commercial goods vehicle |
| Van | 1.0 | Light commercial vehicle |
| Car | 1.0 | Standard passenger car |
| ThreeWheel | 1.0 | Auto-rickshaw / intermediate public transit |
| Motorbike | 0.5 | Powered two-wheeler |

### Signal Optimization Formulation
Optimal cycle length ($C_o$) and green split ($g_i$) for phase $i$ are computed via Webster's method:

$$C_o = \frac{1.5 L + 5}{1 - Y}$$

$$g_i = \frac{y_i}{Y} (C_o - L)$$

Where:
- $L$ is total lost time per cycle (start-up lost time and yellow/all-red clearance intervals).
- $y_i = q_i / s_i$ is the flow ratio for critical phase $i$.
- $Y = \sum y_i$ is the total intersection flow ratio, subject to $Y < 1$.

---

## Getting Started

### Prerequisites
- **Rust Toolchain**: 1.80+ (`cargo`, `rustc`)
- **Node Runtime**: Bun 1.0+
- **Python**: 3.10+ (for model training and dataset tooling)
- **NVIDIA GPU Driver**: CUDA 12.0+ (recommended for edge inference acceleration)

### Building the Core Engine
```bash
cd core
cargo check
cargo build --release
```

### Validating the Training Dataset
```bash
python training/prepare_dataset.py
```

### Initializing the Dashboard
```bash
cd dashboard
bun install
bun run dev
```

---

## License

This project is licensed under the MIT License.
