---
title: "Resistivity of Ultracold Fermions"
layout: single-portfolio
author_profile: true
excerpt: "<img src='/images/annotatedXTemps.png' alt=''>"
collection: research
order_number: 1
header: 
  og_image: "/annotatedXTemps.png"
---

<img src="/images/annotatedXTemps.png" alt="isolated" width="400"/>

## What is resistivity?

Resistivity is the property of a material to inhibit electric current. For example, if I connect a battery to a copper wire, the current flowing through the wire will be greater than if (all things being equal) it were made out of aluminium. This is indicative of the fact that the resistivity of copper at room temperature is less than that of aluminium.

You can think of resistivity kind of like air resistance, but applied to a metal. A battery accelerates electrons in a wire (as gravity accelerates objects on Earth), but after a while those electrons will run into things (e.g. defects, phonons, other electrons). When they run into things, they transfer momentum to the material and slow down. This means that electrons end up taking a very circuitous path through a wire, bumping into a bunch of things and "drifting" slowly in the direction that the battery pulls it. This drift velocity is akin to the terminal velocity of something falling through air.

As should be clear, resistivity involves a sort of average over a lot of effects -- i.e. the electron is only "drifting" if you squint your eyes and ignore how it bumps into things. The fact that it can depend on so many things means that resistivity can be quite challenging to calculate from first principles.

## Why is it interesting?

Around the time I began my Ph.D., three different experimental groups published groundbreaking studies of resistivity in cold atom systems. One of those [experiments](https://www.science.org/doi/10.1126/science.aat4134) found that the resistivity, $$\rho$$, increased linearly with the temperature of the system: $$\rho\propto T$$. This is an unusual result that paralleled observations made in the normal state of high-temperature superconductors (HTSCs). The ubiquity of this observation, which is known as "strange metal" behavior, has been a major unsolved problem in the condensed matter community for over 30 years now.

While the result of the experiment has much in common with HTSCs, the physical system is very different. In particular, the experiment took place on an optical lattice (made of light) with no defects or lattice vibrations (phonons), meaning that the resistivity was solely due to collisions between the atoms. Another important difference is that, despite the "ultracold" moniker, the effective temperature of the cold atom system (i.e. relative to the kinetic energy of the atoms) was actually much _higher_ than in the normal state of HTSCs. As a result, transport experiments with cold atoms operate in an entirely different regime than in real materials.

## What did we do?

The experiment in question simulated a quantum system that was beyond the means of exact calculations, so we made an approximation. While the experiment took place in a regime where the atoms repelled each other strongly, we considered what would happen if they felt only a weak repulsion. This is by no means a novel idea -- indeed, as it's basically the only way to solve for the resistivity, it's the starting point of almost every canonical calculation. With that said, the cold atom experiment takes place in a different regime, so it wasn't obvious how the calculation would shake out.

As it turns out, we found that the system they studied is quite particular. For the cold-atom system, $$\rho\propto T$$ emerges naturally in the limit $$T\to\infty$$, for reasons that almost certainly have nothing to do with the resistivity of HTSCs. The question is _how high_ does the temperature have to be for this $$T\to\infty$$ behavior to take over? Interestingly, we found that this behavior takes over at dramatically lower temperatures than expected due to an instability that occurs at a special point in the phase diagram. While the experimentalists were careful to avoid that point, it turns out that it affects the behavior of the resistivity at nearby points as well.

As our results pertain to weakly-interacting atoms, we cannot quantitatively describe the experiment. Furthermore, as the interactions get stronger, our weak-coupling explanation is not the only possibility. With that said, given the limitation of high temperatures, we conjecture in our paper that the mechanism describing their results is the same one that describes our own results. Moreover, this is a falsifiable hypothesis that can readily be tested with present-day technology.

## Relevant Article(s)

[_Transport in the 2D Fermi-Hubbard Model: Lessons from Weak Coupling_](https://arxiv.org/abs/2106.04479), Thomas G. Kiely and Erich J. Mueller, Phys. Rev. B 104, 165143 (2021)
