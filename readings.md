---
layout: page
title: Autonomous Vehicle Readings
description: Weekly readings for my students
---

<img src="/img/car.jpg" alt="UNR MKZ Robot" width="500" />

## Autonomous Vehicle Readings - 2018

_Originally posted in 2018. The references are still probably useful
for people who are just starting out in automated vehicles or
robotics._

I have a few new graduate students this semester, and to get them up
to speed working on the car (and robotics more generally) I'm giving
them weekly readings of papers, books, and code. If you want to follow
along, check out the list below. And if you have any suggestions or
comments, please share them with me!

### Week 5

_Theme:_ Sampling-based motion planning. The standard reference for
this subject is LaValle's book:

- [Planning Algorithms](http://lavalle.pl/planning/){:target="blank"}

We're going to read specific sections from this book, covering the
minimum you need to know to understand and implement a sampling-based
planner.

The readings come from chapters 4 and 5 of _Planning Algorithms_:

- [Chapter 4: The Configuration Space](http://lavalle.pl/planning/ch4.pdf){:target="blank"}
- [Chapter 5: Sampling-Based Motion Planning](http://lavalle.pl/planning/ch5.pdf){:target="blank"}

In chapter 4, read sections 4.3.1 for the definition of the basic
motion planning problem and skim section 4.3.2 to understand what's
involved in explicitly constructing the configuration space. Unless
you've taken algebra and topology, you'll need to refer back to
sections 4.1 and 4.2 for some definitions.

In chapter 5, skim 5.3 and read 5.4.1 and 5.5. This covers RRT. Skim
5.6 so that you understand the difference between single-query
planners and multi-query planners.

You might also want to look at the analysis in 5.1 (metric spaces and
measure theory), the sampling theory in 5.2, and especially the
collision detection in 5.3.

A passable RRT implementation in a simple environment requires less
than 100 lines of Python. You should try to implement the basic RRT
for a purely geometric problem.

If you get all of that done and you still want more, you're in luck!
Sampling-based planning is a large subject. The next place to look is
at _optimal_ planning. Read this paper:

- [Incremental Sampling-based Algorithms for Optimal Motion Planning](http://roboticsproceedings.org/rss06/p34.pdf){:target="blank"}

To see one way sampling-based planning can be used on a car, check
out:

- [Motion Planning for Urban Driving using RRT](http://acl.mit.edu/papers/KuwataIROS08.pdf){:target="blank"}

as well as the more recent planning survey linked in the General
Resources section below.

### Week 4

This is a code review week. We're looking at the following repo:

- [Dataspeed ADAS Vehicle Development Kit](https://bitbucket.org/DataspeedInc/dbw_mkz_ros){:target="blank"}

### Week 3

_Theme:_ Reference frames and a bit of geometry. This week we're going
to look at conventions for reference frames in robotics and Apollo,
and then we're going to do just enough differential geometry to
understand the reference frames we use for planning and control on the
car. We'll start with two REPs ("ROS Enhancement Proposals") for


- [Standard Units of Measure](http://www.ros.org/reps/rep-0103.html){:target="blank"}
- [Coordinate Frames for Mobile Platforms](http://www.ros.org/reps/rep-0105.html){:target="blank"}

Once you have the general ideas down, look at

- [Apollo's Coordinate System](https://github.com/ApolloAuto/apollo/blob/master/docs/specs/coordination.pdf){:target="blank"}

Lastly, we have one paper to get through:

- [Optimal Trajectory Generation for Dynamic Street Scenarios in a
Frenet
Frame](https://www.researchgate.net/profile/Moritz_Werling/publication/224156269_Optimal_Trajectory_Generation_for_Dynamic_Street_Scenarios_in_a_Frenet_Frame/links/54f749df0cf210398e9277af.pdf){:target="blank"}

This paper describes the reference frames we work with in our planner
and controller. As you work through the paper, also look at Atsushi
Sakai's

- [Python implementation of this paper](https://github.com/AtsushiSakai/PythonRobotics/blob/master/PathPlanning/FrenetOptimalTrajectory/frenet_optimal_trajectory.py){:target="blank"}

As we go, we'll review the background differential geometry necessary
to understand the paper and implementation. If you're looking for a
good differential geometry book, I recommend Manfredo do Carmo's
_Differential Geometry of Curves & Surfaces_.

### Week 2

_Theme:_ Point cloud registration and sensor calibration. In order to
locate obstacles around the car in a useful way, we need to be able to
express lidar measurements in the reference frame of our car. This
requires us to _calibrate_ our lidar to our IMU (which serves as the
center of our vehicle frame). We're going to look at four resources to
help us address this problem. First we need to understand the
_Iterative Closest Point_ algorithm, which solves the problem of
computing an optimal alignment of two shapes. Read Section 1.3 of the
following, which provides definitions, notation, and an outline of the
ICP algorithm:

- [A Review of Point Cloud Registration Algorithms for Mobile Robotics (pdf)](https://hal.archives-ouvertes.fr/hal-01178661/document){:target="blank"}

Once you're familiar with the problem ICP is solving, read this early
paper on lidar-IMU calibration to see one method for solving the
lidar-IMU calibration problem:

- [Unsupervised Calibration for Multi-beam Lasers (pdf)](http://driving.stanford.edu/papers/ISER2010.pdf){:target="blank"}

Finally, to gain an understanding of sensor calibration on a modern
platform, look at these resources from Apollo:

- [Method for Calibrating Extrinsic Parameters Between Multiple-beam LiDAR and GNSS/INS (pdf)](https://github.com/ApolloAuto/apollo/blob/master/docs/specs/lidar_calibration.pdf){:target="blank"}
- [Apollo 2.0 Sensor Calibration Guide](https://github.com/ApolloAuto/apollo/blob/master/docs/quickstart/apollo_2_0_sensor_calibration_guide.md){:target="blank"}

The first is a description of how Apollo handles lidar-IMU
calibration, which is similar (but not identical to) Levinson's
approach. The second guide looks at sensor calibration for other
sensor pairs (camera-camera, camera-lidar, radar-camera).

### Week 1

_Theme:_ Probabilistic Robotics. Modern robotics uses probability as
the framework for almost everything. The book [Probabilistic
Robotics](http://www.probabilistic-robotics.org/){:target="blank"} is
still, 12 years after publication, the best resource to learn how
probability can be used to solve core Robotics problems. This week
we're reviewing chapter two, on the Bayes filter. The notation and
vocabulary set out in that chapter is what we'll be using for most of
our own work on social robotics for cars.

We'll also start reviewing the code that currently runs on the car,
and students should be prepared to present an overview of their
assigned modules from our internal codebase on Friday.

### Week 0

_Theme:_ Robot architecture. To the best of my knowledge, all of the
architectures currently deployed on autonomous vehicles are based on
some variation of the Sense-Plan-Act framework. There are decent
reasons for this, but we should keep in mind that this isn't the only
way to design a robot, and in fact [most of the
robots](https://en.wikipedia.org/wiki/Roomba){:target="blank"}
deployed in the civilian world use a more reactive approach. To get
started, we'll read a classic Rodney Brooks paper reviewing these
approaches and presenting the Subsumption Architecture, along with a
more recent blog post asking why the architecture never quite got to
full intelligence:

- [A Robust Layered Control System for a Mobile
  Robot](https://people.csail.mit.edu/brooks/papers/AIM-864.pdf){:target="blank"}

- [Robot Mind or Robot Body: Whatever happened to the Subsumption
  Architecture?](http://www.artificialhumancompanions.com/robot-mind-robot-body-whatever-happened-subsumption-architecture/){:target="blank"}

### General Resources

There are a few resources that we'll refer back to repeatedly over the
semester. In no particular order, here are some _**survey papers**_ we'll
revisit as we go:

- [A Survey of Motion Planning and Control Techniques for Self-driving
  Urban
  Vehicles](https://arxiv.org/abs/1604.07446){:target="blank"}. This
  is a good and recent overview of decision-making, planning, and
  control, with an emphasis on sampling-based motion planning.

- [Computer Vision for Autonomous Vehicles: Problems, Datasets and
  State-of-the-Art](https://arxiv.org/abs/1704.05519){:target="blank"}. This
  review paper covers (a lot of) perception, which is the other major
  task in self-driving.

- The Journal of Field Robotics Special Issues on the 2007 DARPA Urban
  Challenge, parts
  [one](https://onlinelibrary.wiley.com/toc/15564967/25/8){:target="blank"}
  and
  [two](https://onlinelibrary.wiley.com/toc/15564967/25/9){:target="blank"}. Historical
  perspective is always nice.

And here are some _**code repositories**_ that we'll refer to:

- [Baidu's
  Apollo](https://github.com/ApolloAuto/apollo/tree/master/modules){:target="blank"} -
  In addition to our ROS-only codebase, we also have a configuration
  for the car where we use Apollo. We'll make frequent references to
  this code to understand what our car is (and isn't) doing.

- [Stanford Self-Driving
  Code](https://github.com/emmjaykay/stanford_self_driving_car_code){:target="blank"} -
  This is a GitHub mirror of the original, which is still on
  SourceForge (you can find it if you're willing to tolerate
  SourceForge). Old code, but lots of interesting ideas. Also
  interesting to look at how perception was being done before deep
  learning happened.

- [Atsushi Sakai's PythonRobotics](https://github.com/AtsushiSakai/PythonRobotics){:target="blank"} -
  A great resource for reference implementations of robotics algorithms,
  in Python.
