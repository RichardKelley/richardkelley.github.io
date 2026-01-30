---
layout: page
title: Data
description: Data sets I'm sharing.
---

## Data

Sharing data is fundamental to the robotics community. When I managed
an autonomous vehicle group in Nevada, I collected some data that I
made publically available. You can find links to that data below.

### <a name="snow-velodyne"></a> Lidar in Snow

<img src="/img/snow.jpg" alt="Picture of the snow storm just before we started collecting this data" height="400" />

[Data set link](https://drive.google.com/open?id=1-4qCXTCvPO-xZgKpPipGOdA-R5Fi27NO){:target="empty"}

This is a ROS bag file containing point clouds collected by a single
Velodyne VLP-16 lidar unit on top of our MKZ. The bag was recorded
while we drove through a brief but intense snow storm.

A few items to note: The ROS package we used for our ROS driver is the
[velodyne_puck package from Vijay Kumar's
lab](https://github.com/KumarRobotics/velodyne_puck){:target="empty"}. You'll
want to use that node to replay the bag file. The reference frame is
`velodyne`, and you'll want to set `use_sim_time` to `true` on the ROS
parameter server before running any nodes (including the `rviz`
visualizer, if that's something you use). Failing to use simulation
time has led to incoherent visualizations, so when you play the bag
file I recommend that you use the command:

```
rosbag play --clock snow.bag
```
