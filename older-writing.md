---
layout: page
title: Older Writing
permalink: /older-writing/
---

<h2>Older Writing</h2>

<p>Here’s an archive of my past posts:</p>

<ul>
{% for post in site.posts %}
  <li>
    <a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">
      {{ post.title }}
    </a>
    <span class="post-meta"> — {{ post.date | date: "%B %-d, %Y" }}</span>
  </li>
{% endfor %}
</ul>

