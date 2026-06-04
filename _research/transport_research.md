---
# title: "Transport in AMO Systems"
title: "Transport Properties"
layout: single-portfolio
author_profile: true
excerpt: "<img src='/images/newXTempsFig2_nobg.png' alt=''>"
collection: research
order_number: 1
header: 
  og_image: "/annotatedXTemps.png"
---

<img src="/images/newXTempsFig2_nobg.png" alt="isolated" width="400"/>

## Background

Transport properties describe how easily some quantity (e.g. charge, mass, spin or energy) can move through a material. In a conventional metal, for example, conduction electrons are not bound to atomic nuclei and therefore are free to move around. If one then applies a constant electric field, $$E$$, the electrons should feel a force and begin to move. After a relatively short period of time, one would find that there is a constant current $$J$$ of electrons flowing through the metal. The conductivity, $$\sigma$$, is the constant that relates these two quantities: $$J=\sigma E$$. If $$\sigma=0$$, then the system is an insulator: no current flows in the steady-state regime, no matter the electric field applied. If $$\sigma>0$$, then the system allows charge transport. The coefficients relating applied fields and their associated currents are, broadly speaking, what we refer to as the transport properties of a material.

These properties are notoriously tricky to calculate. To understand why, lets about the physical process that produces a constant current. The electric field $$E$$ provides a constant acceleration for electrons in the material, which in principle means that their velocity increases linearly with time. The reason we don't observe this is that the electrons aren't completely free to move about the material: they can, for example, bump into impurities in the material, or even scatter off of the atomic nuclei. When they run into things, they transfer some of their momentum to whatever they collided with and, on average, slow down. Our classical picture of the electron would be that it takes a ciruitous path through the material, on average "drifting" rather slowly in the direction the field is pushing it. This drift velocity, which is akin to the terminal velocity of something falling through air, determines the value of the conductivity.

This classical perspective is a useful but often imprecise picture of what's going on in materials. Conduction electrons are really quantum objects and we therefore must worry about the interplay between their propensity to _delocalize_ (from Feynman's perspective, to take multiple paths at once as they traverse the material) and the tendency of scattering events to _localize_ them. The story is similar for the constituent particles in analog quantum simulators, which may be bosons or fermions. This setting makes it very challenging to compute such transport properties from first principles. The promise of analog quantum simulation in this realm, then, is to provide measurements of transport properties in settings where calculations are presently infeasible.

<!-- ## Questions
- How can cold atoms be used to measure the thermoelectric transport properties of strongly-correlated model systems?
- What is the "expected" transport behavior in these AMO systems? What are the reliable indicators of strong correlations (i.e. "exotic" physics) in this context?
- What are the necessary ingredients to observe superconductivity in repulsively-interacting cold atom systems? -->

## Relevant Article(s)

[_Vacancy-assisted superfluid drag_](https://arxiv.org/abs/2502.00542)<br>Thomas G. Kiely, Chao Zhang and Erich J. Mueller

[_High temperature Transport in the One Dimensional Mass-Imbalanced Fermi-Hubbard model_](https://arxiv.org/abs/2404.08076)<br>Thomas G. Kiely and Erich J. Mueller

[_Transport in the 2D Fermi-Hubbard Model: Lessons from Weak Coupling_](https://arxiv.org/abs/2106.04479)<br>Thomas G. Kiely and Erich J. Mueller
