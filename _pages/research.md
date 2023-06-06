---
layout: archive
title: "Research"
permalink: /research/
author_profile: true
---

{% include base_path %}

My research is largely focused on solving problems relevant to AMO experiments, whether that involves carefully modeling a prior experiment or proposing future experiments that would enrich the field. Up to now, most of my work has been centered around a particular class of AMO experiments known as ultracold atoms. In many ways, these are precisely what they sound like: a vapor of neutral atoms, cooled to extraordinarily low temperatures by a combination of lasers and magnetic fields, is confined to some region in space and made to interact in some way.

These are beautiful experiments that realize some of the most extreme conditions in the known universe, an incredible achievement in its own right. Recent developments, however, have improved the precision and control of these experiments so much that they are able to enter the regime of [quantum simulation](https://arxiv.org/abs/1308.6253). In this paradigm, experimentalists can engineer states and interactions to match a desired theoretical model, kind of like a quantum Lego set. The oft-mentioned quantum computer is the apex of quantum simulation: a quantum simulator that can simulate arbitrary interactions.

Of course, trapping and controlling atoms is very tricky, and the long-term goals of quantum simulation are still a ways off. As a theorist, this is what makes the field so interesting. Whether the contributions are experiment- or model-driven, there are a range of ways for theorists to contribute to the growth of this field.

<!-- The links below will take you to descriptions of a few of the projects I've worked on over the course of my graduate and undergraduate education. While most projects are centered around these AMO-type applications, I've also had the opportunity to work on some more conventional condensed matter problems.  -->

<nbsp>

{% include base_path %}

{% assign ordered_pages = site.research | sort:"order_number" %}

{% for post in ordered_pages %} 
  {% include archive-single.html type="grid" %} 
{% endfor %}

<!-- {% for post in ordered_pages %} 
  {% include archive-single.html %} 
{% endfor %} -->
