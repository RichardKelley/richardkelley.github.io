---
title: References for Topology and Robotics
description: A collection of papers on connections between topology and robotics
header: References for Topology and Robotics
duration: 15 minute read
---

Topology is at the core of the most successful algorithms in
Robotics. To understand how these methods work, you need a basic grasp
of topological ideas (see [Chapter 4 of LaValle's book for
example](http://planning.cs.uiuc.edu/){:target="blank"}). But as
computational topology has advanced and computers have gotten faster,
there has been an increase in interest in the application of more
sophisticated methods (particularly homotopy and homology) to problems
in Robotics. I think these methods are going to get more important, so
I've started collecting references to papers on the subject so I can
better understand the field. This is an evolving list, so if you have
recommendations, please [let me
know](https://twitter.com/richardkelley){:target="blank"}.

### Topology for Planning

The connection between topology and robotics is most apparent through
motion planning. Configuration spaces (see LaValle's book above) are
manifolds, and the papers in this list show that robot trajectories
can be analyzed in terms of homotopy and homology.

- [Identity and Representation of Homotopy Classes of Trajectories for Search-based Path Planning in 3D](http://www.roboticsproceedings.org/rss07/p02.html){:target="blank"} (2011)
- [Hierarchical Motion Planning in Topological Representations](http://www.roboticsproceedings.org/rss08/p59.pdf){:target="blank"} (2012)
- [Multiscale Topological Trajectory Classification with Persistent Homology](http://www.roboticsproceedings.org/rss10/p54.pdf){:target="blank"} (2014)
- [Topological Trajectory Classification with Filtrations of Simplicial Complexes and Persistent Homology](https://journals.sagepub.com/doi/abs/10.1177/0278364915586713){:target="blank"} (2014)
- [Data-Driven Topological Motion Planning with Persistent Cohomology](http://www.roboticsproceedings.org/rss11/p49.pdf){:target="blank"} (2015)
- [Topological Motion Planning](http://www.csc.kth.se/icra2016topology/sbhattacharya.pdf){:target="blank"} ([2016 ICRA Workshop](http://www.csc.kth.se/icra2016topology/){:target="blank"}) 
- [Uses of Persistence for Interpreting Coarse Instructions](http://www.csc.kth.se/icra2016topology/sramamoorthy.pdf){:target="blank"} ([2016 ICRA Workshop](http://www.csc.kth.se/icra2016topology/){:target="blank"})
- [Persistence & Topological Data Analysis for Robotics](http://www.csc.kth.se/icra2016topology/ftpokorny.pdf){:target="blank"} ([2016 ICRA Workshop](http://www.csc.kth.se/icra2016topology/){:target="blank"})
- [Search-based Motion Planning with Topology-based Heuristic Functions](http://www.csc.kth.se/icra2016topology/mlikhachev.pdf){:target="blank"} ([2016 ICRA Workshop](http://www.csc.kth.se/icra2016topology/){:target="blank"})
- [High-Dimensional Winding-Augmented Motion Planning with 2D Topological Task Projections and Persistent Homology](https://ieeexplore.ieee.org/document/7487113){:target="blank"} (2016)
- [Topological Trajectory Clustering with Relative Persistent Homology](https://ieeexplore.ieee.org/document/7487092){:target="blank"} (2016)
- [Caging and Path Non-Existence: a Deterministic Sampling-Based Verification Algorithm](https://crvs.github.io/files/path_non_ex.pdf){:target="blank"} (2017)
- [Topology-Guided Path Integral Approach for Stochastic Optimal Control in Cluttered Environment](https://arxiv.org/abs/1603.05099){:target="blank"} (2018)
- [Topological Signatures for Fast Mobility Analysis](http://homepages.inf.ed.ac.uk/rsarkar/papers/forms-signature.pdf){:target="blank"} (2018)

### Topology for Tracking

The following papers consider the problem of tracking a target using
sensors. They organize the plausible paths of the target using
homotopy classes.

- [Multi-hypothesis Motion Planning for Visual Object Tracking](https://www.cis.upenn.edu/~jshi/papers/ICCV-2011-Tracking-Planning.pdf){:target="blank"} (2011)
- [Activity Forecasting](http://www.cs.cmu.edu/~kkitani/pdf/KZBH-ECCV12.pdf){:target="blank"} (2012)