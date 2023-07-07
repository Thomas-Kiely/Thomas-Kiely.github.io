---
title: "Transport in AMO Systems"
layout: single-portfolio
author_profile: true
excerpt: "<img src='/images/annotatedXTemps.png' alt=''>"
collection: research
order_number: 1
header: 
  og_image: "/annotatedXTemps.png"
---

<img src="/images/annotatedXTemps.png" alt="isolated" width="400"/>

## Questions
- How can cold atoms be used to measure the thermoelectric transport properties of strongly-correlated model systems?
- What is the "expected" transport behavior in these AMO systems? What are the reliable indicators of strong correlations (i.e. "exotic" physics) in this context?
- What are the necessary ingredients to observe superconductivity in repulsively-interacting cold atom systems?

## Background

In a nutshell, transport properties describe how easily some quantity (most often charge, spin or energy) can move through a material. In a conventional metal, for example, conduction electrons are not bound to atomic nuclei and therefore are free to move around. If I were to put a chunk of metal in a DC (constant) electric field, $$E$$, the electrons should feel a force and begin to move. After waiting a bit, we'll find that there is an electric current $$J$$ in the metal. The DC (charge) conductivity, $$\sigma$$, is the constant that relates these two quantities: $$J=\sigma E$$. If $$\sigma=0$$, then the system is an insulator: no current flows in the steady-state regime, no matter the electric field applied. If $$\sigma>0$$, then the system allows charge transport. When someone says they're studying the "transport properties" of a material, that most likely means that they are measuring or computing either a conductivity or a closely-related quantity.

These properties are tricky to calculate. Here I actually calculate the resistivity, $$\rho$$, which is just the reciprocal of the conductivity: $$\rho=1/\sigma$$. You can think of resistivity somewhat like air resistance, but applied to a metal. A battery accelerates electrons in a wire (as gravity accelerates objects on Earth), but after a while those electrons will run into things (e.g. impurities, other electrons). When they run into things, they transfer momentum to the material and slow down. This means that electrons end up taking a very circuitous path through a wire, bumping into a bunch of things and "drifting" slowly in the direction that the battery pulls it. This drift velocity is akin to the terminal velocity of something falling through air.

As should be clear, resistivity is sort of an average over many different physical processes -- in other words, the electron is only "drifting" at a constant speed if you squint your eyes and ignore how it bumps into things. The fact that it can depend on so many things means that resistivity can be quite challenging to calculate from first principles.

<!-- ## Why is it interesting?

Around the time I began my Ph.D., three different experimental AMO groups published groundbreaking studies of resistivity in cold atom systems. One of those [experiments](https://www.science.org/doi/10.1126/science.aat4134) found that the resistivity increased linearly with the temperature of the system: $$\rho\propto T$$. This is an unusual result that paralleled observations made in the normal state of high-temperature superconductors (HTSCs). The origin of this behavior, as well as its puzzling ubiquity in strongly-correlated systems, has been a major unsolved problem in the condensed matter community for decades.

While the result of the experiment has much in common with HTSCs, the physical system is very different. In particular, the experiment took place on an optical lattice (made of light) with no defects or lattice vibrations, meaning that the resistivity was solely due to collisions between the atoms. Another important difference is that, despite the "ultracold" moniker, the effective temperature of the cold atom system (i.e. relative to the kinetic energy of the atoms) was actually much _higher_ than in the normal state of HTSCs. As a result, transport experiments with cold atoms operate in an entirely different regime than in real materials. Determining the "expected" behavior in this regime and what sort of properties one should study as signatures of more exotic physics was the subject of the [first paper](https://arxiv.org/abs/2106.04479) in my Ph.D. -->

<!-- ## What did we do?

The experiment in question simulated a quantum system that was beyond the means of exact calculations, so we made an approximation. While the experiment took place in a regime where the atoms repelled each other strongly, we considered what would happen if they felt only a weak repulsion. This is by no means a novel idea -- indeed, as it's basically the only way to solve for the resistivity, it's the starting point of almost every canonical calculation. With that said, the cold atom experiment takes place in a different regime, so it wasn't obvious how the calculation would shake out.

As it turns out, we found that the system they studied is quite particular. For the cold-atom system, $$\rho\propto T$$ emerges naturally in the limit $$T\to\infty$$, for reasons that almost certainly have nothing to do with the resistivity of HTSCs. The question is _how high_ does the temperature have to be for this $$T\to\infty$$ behavior to take over? Interestingly, we found that this behavior takes over at dramatically lower temperatures than expected due to an instability that occurs at a special point in the phase diagram. While the experimentalists were careful to avoid that point, it turns out that it affects the behavior of the resistivity at nearby points as well.

As our results pertain to weakly-interacting atoms, we cannot quantitatively describe the experiment. Furthermore, as the interactions get stronger, our weak-coupling explanation is not the only possibility. With that said, given the limitation of high temperatures, we conjecture in our paper that the mechanism describing their results is the same one that describes our own results. Moreover, this is a falsifiable hypothesis that can readily be tested with present-day technology. -->

## Relevant Article(s)

[_Transport in the 2D Fermi-Hubbard Model: Lessons from Weak Coupling_](https://arxiv.org/abs/2106.04479), Thomas G. Kiely and Erich J. Mueller, Phys. Rev. B __104__, 165143 (2021)

_High temperature Transport in the One Dimensional Mass-Imbalanced Fermi-Hubbard model_, Thomas G. Kiely and Erich J. Mueller, _in preparation_
