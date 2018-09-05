---
layout: page
title: Autonomous Vehicle Readings
description: Weekly readings for my students
---

### Autonomous Vehicle Readings

I have a few new graduate students this semester, and to get them up
to speed working on the car (and robotics more generally) I'm giving
them weekly readings of papers, books, and code. If you want to follow
along, check out the list below. And if you have any suggestions or
comments, please share them with me!

## General Resources

There are a few resources that we'll refer back to repeatedly over the
semester. In no particular order, here are some survey papers we'll
revisit repeatedly:

- [A Survey of Motion Planning and Control Techniques for Self-driving
  Urban
  Vehicles](https://arxiv.org/abs/1604.07446){:target="blank"}. This
  is a good and recent overview of decision-making, planning, and
  control, with an emphasis on sampling-based motion planning.

- [ Computer Vision for Autonomous Vehicles: Problems, Datasets and
  State-of-the-Art](https://arxiv.org/abs/1704.05519){:target="blank"}. This
  review paper covers (a lot of) perception, which is the other major
  task in self-driving.

- The Journal of Field Robotics Special Issues on the 2007 DARPA Urban
  Challenge, parts
  [one](https://onlinelibrary.wiley.com/toc/15564967/25/8){:target="blank"}
  and
  [two](https://onlinelibrary.wiley.com/toc/15564967/25/9){:target="blank"}. Historical
  perspective is always nice.

And here are some code repositories that we'll refer to:

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

## Week 0

_Theme:_ Robot architechture. To the best of my knowledge, all of the
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
  Robot](http://www.dtic.mil/dtic/tr/fulltext/u2/a160833.pdf){:target="blank"}

- [Robot Mind or Robot Body: Whatever happened to the Subsumption
  Architecture?](http://www.artificialhumancompanions.com/robot-mind-robot-body-whatever-happened-subsumption-architecture/){:target="blank"}

## Week 1

_Theme:_ Probabilistic Robotics. Modern robotics uses probability as
the framework for almost everything. The book [Probabilistic
Robotics](http://www.probabilistic-robotics.org/){:target="blank"} is
still, 12 years after publication, the best resource to learn how
probability can be used to solve core Robotics problems. This week
we're reviewing chapter two, on the Bayes filter.

We'll also start reviewing the code that currently runs on the car,
and students should be prepared to present an overview of their
assigned modules from our internal codebase on Friday.