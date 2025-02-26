---
layout: page
title: Software
description: Code I've written, or helped to write.
---

## Software

Open-source software is an important part of what I do. Here are some
open-source packages I've developed or contributed to. For quick
reference here's the list:

- [Dendron](#dendron)
- [HFLM](#hflm)
- [Andron](#andron)
- [DeepSpeech ROS Node](#deepspeech)
- [Novatel GNSS Driver](#gnss-driver)
- [Kinetic PR2](#pr2-kinetic)

### - <a name="dendron"></a> Dendron

[Github link](https://github.com/RichardKelley/dendron){:target="blank"}

Dendron is a library for building software agents using behavior trees and language models. Behavior trees are a technique for building complex reactive agents by composing simpler behaviors in a principled way. The behavior tree abstraction arose from Robotics and Game AI, but the premise of Dendron is that this abstraction can enable more sophisticated language-based agents.

### - <a name="hflm"></a> HFLM

[Github link](https://github.com/RichardKelley/hflm){:target="blank"}

### - <a name="andron"></a> Andron

[Github link](https://github.com/RichardKelley/andron){:target="blank"}

### - <a name="deepspeech"></a> DeepSpeech ROS Node
 
[Github link](https://github.com/RichardKelley/unr_deepspeech){:target="blank"}

We've been wanting to get speech recognition running on the MKZ, but
we didn't want to use a cloud provider and the standard ROS tools for
speech are honestly just not very good. Mozilla has invested an
impressive amount of effort over the past few years into building an
open-source version of Baidu's DeepSpeech system, which gives
state-of-the-art recognition performance for English
speech. Additionally, they've released a pre-trained model for speech
recognition that achieves a word-error rate of less than seven
percent! Some of my undergraduate students and I have written a ROS
wrapper for this model, and released it so that roboticists everywhere
can yell at their robots and have at least some hope that the robots
will understand :)

### - <a name="gnss-driver"></a> Novatel GNSS Driver

[Github link](https://github.com/RichardKelley/gnss_driver){:target="blank"}

The first thing we had to write when we got our MKZ from
AutonomouStuff was a driver for the Novatel GNSS system that came with
the car. Baidu had written a robust solution for the same Novatel
hardware as a part of their [Apollo
Project](http://apollo.auto/){:target="blank"}, but it was tightly
integrated into the rest of their system. In this package, I adapted
Baidu's driver code to function as a standalone ROS package that we
could run with or without the rest of an autonomous car platform.

### - <a name="pr2-kinetic"></a> PR2 Kinetic Packages

[Github link](https://github.com/RichardKelley/kinetic_pr2){:target="blank"}

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





