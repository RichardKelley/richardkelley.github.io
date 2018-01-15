---
layout: page
title: Software
description: Code I've written, or helped to write.
---

## Software



Open-source software is an important part of what I do. Here are some
open-source packages I've developed or contributed to. For quick
reference here's the list:

- [Novatel GNSS Driver](#gnss-driver)
- [Kinetic PR2](#pr2-kinetic)

### - <a name="gnss-driver"></a> Novatel GNSS Driver

[Github link](https://github.com/RichardKelley/gnss_driver)

The first thing we had to write when we got our MKZ from
AutonomouStuff was a driver for the Novatel GNSS system that came with
the car. Baidu had written a robust solution for the same Novatel
hardware as a part of their [Apollo
Project](http://apollo.auto/){:target="blank"}, but it was tightly
integrated into the rest of their system. In this package, I adapted
Baidu's driver code to function as a standalone ROS package that we
could run with or without the rest of an autonomous car platform.

### - <a name="pr2-kinetic"></a> PR2 Kinetic Packages

[Github link](https://github.com/RichardKelley/kinetic_pr2)

One of the most frustrating things about working with a PR2 is the
need to work with an old Ubuntu distribution and an old ROS
distribution. This collection of packages aims to fix that by making
the PR2 work on [ROS
Kinetic](http://wiki.ros.org/kinetic){:target="blank"} with Gazebo and
Moveit on Ubuntu 16.04.

I built this collection by starting with the Indigo versions of the
packages and modifying them until all of the Kinetic incompabilities
were gone. It's been tested on several machines by several people, and
is good enough for simulation. We haven't tried it on the Nevada PR2
yet, but when we do I'll update this code as needed.





