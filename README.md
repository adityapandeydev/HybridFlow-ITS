# HybridFlow-ITS

An Intelligent Transportation System (ITS) for real-time adaptive traffic signal control and automated emergency vehicle preemption in heterogeneous, non-lane-disciplined traffic environments.

---

## Overview

HybridFlow-ITS is an edge-native traffic management platform designed to replace legacy fixed-cycle signal controllers with vision-driven dynamic scheduling. The system operates on standard CCTV and IP camera feeds at urban intersections, computing vehicle queues and approach densities to dynamically optimize green splits while providing deterministic preemption for emergency vehicles.

Unlike traditional adaptive signal systems (e.g., SCATS, SCOOT) that require embedded inductive loop sensors and assume lane-disciplined passenger vehicle flows, HybridFlow-ITS is engineered specifically for mixed-traffic conditions where two-wheelers, three-wheelers, buses, and commercial vehicles share undivided road space.

---

## Core Objectives

- **Adaptive Green Split Allocation**: Transition from rigid, static time-of-day tables to real-time, demand-responsive signal timings.
- **Autonomous Emergency Corridors**: Provide automated green preemption for emergency responders without requiring manual police dispatch.
- **Heterogeneous Traffic Modeling**: Accurately quantify mixed-traffic congestion through Passenger Car Unit (PCU) dynamics rather than simple vehicle counts.
- **Edge Deployment**: Execute high-throughput inference directly on intersection compute units with sub-30ms latency.

---

## License

This project is licensed under the MIT License.
